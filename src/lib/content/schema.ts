export const STATUSES = ['planning', 'alpha', 'beta', 'stable', 'archived'] as const;
export type Status = (typeof STATUSES)[number];

export const SECTORS = [
	'Government',
	'Local Government',
	'Transparency',
	'Civic Tech',
	'Technology',
	'Finance',
	'Health',
	'Education',
	'Climate',
	'Disaster Management',
	'Public Safety',
	'Infrastructure',
	'Civil Society',
	'Security',
	'Other'
] as const;

/** Kinds of help a project can ask for. Shown in the list so volunteers can find a place to start. */
export const NEEDS = [
	'developers',
	'designers',
	'researchers',
	'data',
	'testers',
	'writers'
] as const;

export const LIMITS = {
	title: 80,
	summary: 240,
	description: 1200,
	license: 40,
	tag: 30,
	tags: 8,
	updateTitle: 100,
	updateBody: 1200
} as const;

export type ProjectFrontmatter = {
	title: string;
	summary: string;
	status: Status;
	sectors: string[];
	tags: string[];
	maintainers: string[];
	dateAdded: string;
	/** GitHub login that speaks for the project. Defaults to the account in `repoUrl`. */
	owner?: string;
	repoUrl?: string;
	website?: string;
	demo?: string;
	license?: string;
	description?: string;
	impact?: string;
	featured?: boolean;
	lastUpdated?: string;
	needs?: string[];
};

export type UpdateFrontmatter = {
	title: string;
	date: string;
	author: string;
	body: string;
};

const GITHUB_LOGIN = /^[a-z\d](?:[a-z\d-]{0,37}[a-z\d])?$/i;
// mdsvex hands an unquoted `2025-09-22` over as `2025-09-22T00:00:00.000Z`.
const ISO_DATE = /^\d{4}-\d{2}-\d{2}(T[\d:.]+Z)?$/;
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function isGithubLogin(value: unknown): value is string {
	return typeof value === 'string' && GITHUB_LOGIN.test(value);
}

export function isSlug(value: string): boolean {
	return value.length <= 60 && SLUG.test(value);
}

export function slugify(title: string): string {
	return title
		.normalize('NFKD')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '')
		.slice(0, 60)
		.replace(/-+$/, '');
}

/** Links are rendered as `href`, so only web addresses pass. */
export function isWebUrl(value: unknown): value is string {
	if (typeof value !== 'string' || !URL.canParse(value)) return false;
	const { protocol } = new URL(value);
	return protocol === 'https:' || protocol === 'http:';
}

/** The GitHub account a repository address lives under, if it is a GitHub address. */
export function githubAccount(repoUrl: string | undefined): string | undefined {
	if (!repoUrl || !URL.canParse(repoUrl)) return undefined;
	const url = new URL(repoUrl);
	if (url.hostname !== 'github.com') return undefined;
	const account = url.pathname.split('/')[1];
	return isGithubLogin(account) ? account : undefined;
}

export function projectOwner(project: { owner?: string; repoUrl?: string }): string | undefined {
	return project.owner ?? githubAccount(project.repoUrl);
}

export function isVerified(owner: string | undefined, verifiedLogins: readonly string[]): boolean {
	if (!owner) return false;
	const login = owner.toLowerCase();
	return verifiedLogins.some((verified) => verified.toLowerCase() === login);
}

function isText(value: unknown, max: number): value is string {
	return typeof value === 'string' && value.trim().length > 0 && value.length <= max;
}

function isDate(value: unknown): boolean {
	return typeof value === 'string' && ISO_DATE.test(value) && !Number.isNaN(Date.parse(value));
}

function isTextList(value: unknown, maxItems: number, maxLength: number): value is string[] {
	return (
		Array.isArray(value) &&
		value.length <= maxItems &&
		value.every((item) => isText(item, maxLength))
	);
}

function checkOptional(
	errors: string[],
	record: Record<string, unknown>,
	key: string,
	isValid: (value: unknown) => boolean,
	expected: string
) {
	const value = record[key];
	if (value === undefined || value === null || value === '') return;
	if (!isValid(value)) errors.push(`${key} must be ${expected}.`);
}

/** Returns one sentence per problem. An empty list means the entry can be published. */
export function validateProject(frontmatter: unknown): string[] {
	if (typeof frontmatter !== 'object' || frontmatter === null) return ['The entry has no fields.'];
	const record = frontmatter as Record<string, unknown>;
	const errors: string[] = [];

	if (!isText(record.title, LIMITS.title)) {
		errors.push(`title is required and can be up to ${LIMITS.title} characters.`);
	}
	if (!isText(record.summary, LIMITS.summary)) {
		errors.push(`summary is required and can be up to ${LIMITS.summary} characters.`);
	}
	if (!STATUSES.includes(record.status as Status)) {
		errors.push(`status must be one of: ${STATUSES.join(', ')}.`);
	}
	if (!isTextList(record.sectors, 3, 40) || record.sectors.length === 0) {
		errors.push('sectors must list one to three sectors.');
	}
	if (!isTextList(record.tags ?? [], 12, LIMITS.tag)) {
		errors.push(`tags must be a list of up to 12 short labels.`);
	}
	if (!isTextList(record.maintainers ?? [], 10, 80)) {
		errors.push('maintainers must be a list of up to 10 names.');
	}
	if (!isDate(record.dateAdded)) errors.push('dateAdded must be a date written as YYYY-MM-DD.');

	checkOptional(errors, record, 'lastUpdated', isDate, 'a date written as YYYY-MM-DD');
	checkOptional(errors, record, 'owner', isGithubLogin, 'a GitHub username');
	checkOptional(errors, record, 'repoUrl', isWebUrl, 'a web address starting with https://');
	checkOptional(errors, record, 'website', isWebUrl, 'a web address starting with https://');
	checkOptional(errors, record, 'demo', isWebUrl, 'a web address starting with https://');
	checkOptional(
		errors,
		record,
		'license',
		(value) => isText(value, LIMITS.license),
		`up to ${LIMITS.license} characters`
	);
	checkOptional(
		errors,
		record,
		'needs',
		(value) => Array.isArray(value) && value.every((need) => NEEDS.some((known) => known === need)),
		`a list from: ${NEEDS.join(', ')}`
	);
	checkOptional(errors, record, 'featured', (value) => typeof value === 'boolean', 'true or false');

	return errors;
}

export function validateUpdate(frontmatter: unknown): string[] {
	if (typeof frontmatter !== 'object' || frontmatter === null) return ['The update has no fields.'];
	const record = frontmatter as Record<string, unknown>;
	const errors: string[] = [];

	if (!isText(record.title, LIMITS.updateTitle)) {
		errors.push(`title is required and can be up to ${LIMITS.updateTitle} characters.`);
	}
	if (!isText(record.body, LIMITS.updateBody)) {
		errors.push(`body is required and can be up to ${LIMITS.updateBody} characters.`);
	}
	if (!isDate(record.date)) errors.push('date must be a date written as YYYY-MM-DD.');
	if (!isGithubLogin(record.author)) errors.push('author must be a GitHub username.');

	return errors;
}
