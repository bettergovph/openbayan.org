/**
 * Reads the issue named by the environment and writes the directory file it asks for.
 * Run by `.github/workflows/submission.yml`. It imports nothing from `node_modules`,
 * so the workflow needs no install step before it.
 *
 * Results go to the file named by GITHUB_OUTPUT: `result` is `ignored`, `invalid` or
 * `ready`, with `path`, `title` and a `message` for the issue comment or pull request.
 */
import { randomUUID } from 'node:crypto';
import { appendFileSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { projectOwner } from '../src/lib/content/schema.ts';
import { readSubmission } from '../src/lib/submissions/issue-form.ts';

function requireEnv(name: string): string {
	const value = process.env[name];
	if (!value) throw new Error(`${name} is not set.`);
	return value;
}

/** Reads the two fields ownership depends on. Entries written by hand may quote them either way. */
function readOwner(slug: string): string | undefined {
	const text = readFileSync(`content/projects/${slug}/index.md`, 'utf8');
	const field = (key: string) =>
		text.match(new RegExp(`^${key}:\\s*['"]?([^'"\\s]+)['"]?\\s*$`, 'm'))?.[1];
	return projectOwner({ owner: field('owner'), repoUrl: field('repoUrl') });
}

function setOutput(name: string, value: string) {
	const delimiter = `end-${randomUUID()}`;
	appendFileSync(requireEnv('GITHUB_OUTPUT'), `${name}<<${delimiter}\n${value}\n${delimiter}\n`);
}

// The en-CA locale writes dates as YYYY-MM-DD.
const manilaDate = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Manila' });
const slugs = readdirSync('content/projects');
const submission = readSubmission({
	body: requireEnv('ISSUE_BODY'),
	author: requireEnv('ISSUE_AUTHOR'),
	issueNumber: Number(requireEnv('ISSUE_NUMBER')),
	today: manilaDate.format(new Date()),
	projects: new Map(slugs.map((slug) => [slug, readOwner(slug)]))
});

if (submission === null) {
	setOutput('result', 'ignored');
} else if (!submission.ok) {
	setOutput('result', 'invalid');
	setOutput(
		'message',
		[
			'Thanks for the submission. It needs a few changes before a pull request can be opened:',
			'',
			...submission.errors.map((error) => `- ${error}`),
			'',
			'Edit this issue to fix them and the check runs again.'
		].join('\n')
	);
} else {
	mkdirSync(dirname(submission.path), { recursive: true });
	writeFileSync(submission.path, submission.content);
	setOutput('result', 'ready');
	setOutput('path', submission.path);
	setOutput('title', submission.pullRequestTitle);
	setOutput(
		'message',
		[
			`Closes #${requireEnv('ISSUE_NUMBER')}.`,
			'',
			'Before merging:',
			'',
			...submission.reviewNotes.map((note) => `- ${note}`),
			'- Links open and go where they say.',
			'- The text describes a civic tech project and is fit to publish.'
		].join('\n')
	);
}
