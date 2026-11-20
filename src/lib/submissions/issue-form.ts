import {
	LIMITS,
	SECTORS,
	isSlug,
	slugify,
	validateProject,
	validateUpdate,
	type ProjectFrontmatter,
	type UpdateFrontmatter
} from '../content/schema.ts';

/**
 * Field ids and labels of the two issue forms. GitHub writes each answer under a
 * `### <label>` heading, and the site's forms prefill a field through its id, so
 * keep these in sync with `.github/ISSUE_TEMPLATE/*.yml`.
 */
export const PROJECT_FIELDS = {
	name: 'Project name',
	summary: 'One-line summary',
	description: 'What it does and who it helps',
	status: 'Stage',
	sector: 'Main sector',
	website: 'Website',
	repository: 'Source code',
	license: 'License',
	tags: 'Tags',
	maintainers: 'Maintainers'
} as const;

export const UPDATE_FIELDS = {
	project: 'Project',
	title: 'Update title',
	body: 'What changed'
} as const;

export type SubmissionContext = {
	/** The issue body exactly as GitHub stored it. */
	body: string;
	/** Login of the account that opened the issue. GitHub sets this, not the submitter. */
	author: string;
	issueNumber: number;
	/** Today as YYYY-MM-DD. */
	today: string;
	/** Slugs already in the directory, each with its owner when one is known. */
	projects: ReadonlyMap<string, string | undefined>;
};

export type Submission =
	| { ok: false; errors: string[] }
	| {
			ok: true;
			kind: 'project' | 'update';
			path: string;
			content: string;
			pullRequestTitle: string;
			/** Things a maintainer should look at before merging. */
			reviewNotes: string[];
	  };

const EMPTY_ANSWER = '_No response_';

/** Reads the answers of an issue form. A label that appears twice keeps its first answer. */
export function readAnswers(body: string, fields: Record<string, string>): Record<string, string> {
	const idByLabel = new Map(Object.entries(fields).map(([id, label]) => [label, id]));
	const answers: Record<string, string> = {};
	let currentId: string | undefined;

	for (const line of body.replace(/\r\n/g, '\n').split('\n')) {
		const id = line.startsWith('### ') ? idByLabel.get(line.slice(4).trim()) : undefined;
		if (id && !(id in answers)) {
			currentId = id;
			answers[id] = '';
		} else if (currentId) {
			answers[currentId] += `${line}\n`;
		}
	}

	for (const [id, answer] of Object.entries(answers)) {
		const trimmed = answer.trim();
		answers[id] = trimmed === EMPTY_ANSWER ? '' : trimmed;
	}
	return answers;
}

function hasEveryField(answers: Record<string, string>, fields: Record<string, string>): boolean {
	return Object.keys(fields).every((id) => id in answers);
}

function oneLine(text: string): string {
	return text.replace(/\s+/g, ' ').trim();
}

function splitList(text: string): string[] {
	return text
		.split(/[,\n]/)
		.map(oneLine)
		.filter((item) => item.length > 0);
}

/** JSON strings and arrays are also valid YAML, so every value is written as JSON. */
function toFrontmatter(fields: Record<string, unknown>): string {
	const lines = Object.entries(fields)
		.filter(([, value]) => value !== undefined && value !== '')
		.map(([key, value]) => `${key}: ${JSON.stringify(value)}`);
	return `---\n${lines.join('\n')}\n---\n`;
}

function projectSubmission(
	answers: Record<string, string>,
	context: SubmissionContext
): Submission {
	const title = oneLine(answers.name);
	const slug = slugify(title);
	const frontmatter: ProjectFrontmatter = {
		title,
		summary: oneLine(answers.summary),
		description: answers.description,
		status: answers.status.toLowerCase() as ProjectFrontmatter['status'],
		sectors: [answers.sector],
		tags: splitList(answers.tags).map((tag) => slugify(tag)),
		maintainers: splitList(answers.maintainers),
		owner: context.author,
		repoUrl: answers.repository,
		website: answers.website,
		license: oneLine(answers.license),
		dateAdded: context.today
	};

	const errors = validateProject(frontmatter);
	if (!isSlug(slug)) errors.push('Project name needs at least one letter or number.');
	if (context.projects.has(slug)) {
		errors.push(
			`The directory already has a project at /projects/${slug}. Use the "Post an update" form for news about it, or pick a different name.`
		);
	}
	if (!answers.description) errors.push('Describe what the project does and who it helps.');
	if (!SECTORS.some((sector) => sector === answers.sector)) {
		errors.push(`Main sector must be one of: ${SECTORS.join(', ')}.`);
	}
	if (answers.description.length > LIMITS.description) {
		errors.push(`The description can be up to ${LIMITS.description} characters.`);
	}
	if (frontmatter.tags.length > LIMITS.tags) errors.push(`Use up to ${LIMITS.tags} tags.`);
	if (errors.length > 0) return { ok: false, errors };

	return {
		ok: true,
		kind: 'project',
		path: `content/projects/${slug}/index.md`,
		content: toFrontmatter(frontmatter),
		pullRequestTitle: `content: add ${title}`,
		reviewNotes: [
			`\`owner\` is @${context.author}, the account that opened the issue. A verified badge shows only if that login is in \`content/verified-members.json\`.`
		]
	};
}

/** Accepts a slug or the address of a project page. */
function projectSlugFrom(answer: string): string {
	const lastSegment = answer.trim().replace(/\/+$/, '').split('/').at(-1) ?? '';
	return lastSegment.toLowerCase();
}

function updateSubmission(answers: Record<string, string>, context: SubmissionContext): Submission {
	const slug = projectSlugFrom(answers.project);
	const frontmatter: UpdateFrontmatter = {
		title: oneLine(answers.title),
		date: context.today,
		author: context.author,
		body: answers.body
	};

	const errors = validateUpdate(frontmatter);
	if (!context.projects.has(slug)) {
		errors.push(
			`No project is listed at /projects/${slug}. Copy the last part of the project's address on OpenBayan.`
		);
	}
	if (errors.length > 0) return { ok: false, errors };

	const owner = context.projects.get(slug);
	const authorIsOwner = owner?.toLowerCase() === context.author.toLowerCase();
	const ownerNote = authorIsOwner
		? `@${context.author} is the listed owner of this project.`
		: `@${context.author} is not the listed owner of this project (${owner ? `@${owner}` : 'no owner on file'}). Confirm they speak for it before merging.`;

	return {
		ok: true,
		kind: 'update',
		path: `content/updates/${slug}/${context.today}-${context.issueNumber}.md`,
		content: toFrontmatter(frontmatter),
		pullRequestTitle: `content: add update for ${slug}`,
		reviewNotes: [ownerNote]
	};
}

/** Turns a submitted issue form into the file a pull request should add. Returns null for any other issue. */
export function readSubmission(context: SubmissionContext): Submission | null {
	const project = readAnswers(context.body, PROJECT_FIELDS);
	if (hasEveryField(project, PROJECT_FIELDS)) return projectSubmission(project, context);

	const update = readAnswers(context.body, UPDATE_FIELDS);
	if (hasEveryField(update, UPDATE_FIELDS)) return updateSubmission(update, context);

	return null;
}
