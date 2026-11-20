import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import {
	PROJECT_FIELDS,
	UPDATE_FIELDS,
	readSubmission,
	type SubmissionContext
} from './issue-form';

const projectBody = [
	'### Project name',
	'',
	'Bantay Baha: Marikina',
	'',
	'### One-line summary',
	'',
	'River level alerts for Marikina residents.',
	'',
	'### What it does and who it helps',
	'',
	'Reads the city gauges every five minutes.',
	'',
	'Texts a warning when the river passes 15 meters.',
	'',
	'### Stage',
	'',
	'Beta',
	'',
	'### Main sector',
	'',
	'Disaster Management',
	'',
	'### Website',
	'',
	'https://bantaybaha.example.org',
	'',
	'### Source code',
	'',
	'_No response_',
	'',
	'### License',
	'',
	'MIT',
	'',
	'### Tags',
	'',
	'Open Data, SMS alerts',
	'',
	'### Maintainers',
	'',
	'_No response_'
].join('\n');

const context: SubmissionContext = {
	body: projectBody,
	author: 'aling-nena',
	issueNumber: 42,
	today: '2026-11-21',
	projects: new Map([['psgc-api', 'mystique09']])
};

function withAnswer(body: string, label: string, answer: string): string {
	const lines = body.split('\n');
	lines[lines.indexOf(`### ${label}`) + 2] = answer;
	return lines.join('\n');
}

describe('readSubmission', () => {
	it('turns a project form into a directory entry owned by the issue author', () => {
		expect(readSubmission(context)).toEqual({
			ok: true,
			kind: 'project',
			path: 'content/projects/bantay-baha-marikina/index.md',
			pullRequestTitle: 'content: add Bantay Baha: Marikina',
			reviewNotes: [expect.stringContaining('@aling-nena')],
			content: [
				'---',
				'title: "Bantay Baha: Marikina"',
				'summary: "River level alerts for Marikina residents."',
				'description: "Reads the city gauges every five minutes.\\n\\nTexts a warning when the river passes 15 meters."',
				'status: "beta"',
				'sectors: ["Disaster Management"]',
				'tags: ["open-data","sms-alerts"]',
				'maintainers: []',
				'owner: "aling-nena"',
				'website: "https://bantaybaha.example.org"',
				'license: "MIT"',
				'dateAdded: "2026-11-21"',
				'---',
				''
			].join('\n')
		});
	});

	it('ignores an owner the submitter writes into an answer', () => {
		const body = withAnswer(projectBody, 'Maintainers', 'Nena\n### owner\n\nbettergovph');
		const submission = readSubmission({ ...context, body });
		expect(submission).toMatchObject({ ok: true });
		expect(submission?.ok && submission.content).toContain('owner: "aling-nena"');
	});

	it.each([
		['a script link', 'Website', 'javascript:alert(1)', 'website must be a web address'],
		['a sector off the list', 'Main sector', 'Astrology', 'Main sector must be one of'],
		[
			'a name already listed',
			'Project name',
			'PSGC API',
			'already has a project at /projects/psgc-api'
		],
		['a name with no letters', 'Project name', '!!!', 'needs at least one letter or number'],
		['a summary over 240 characters', 'One-line summary', 'a'.repeat(241), 'summary is required']
	])('rejects %s', (_case, label, answer, message) => {
		const submission = readSubmission({ ...context, body: withAnswer(projectBody, label, answer) });
		expect(submission).toMatchObject({ ok: false, errors: [expect.stringContaining(message)] });
	});

	const updateBody = [
		'### Project',
		'',
		'https://openbayan.org/projects/psgc-api/',
		'',
		'### Update title',
		'',
		'Barangay codes for Q4 2026 are in',
		'',
		'### What changed',
		'',
		'Loaded the October PSGC release.'
	].join('\n');

	it('files an update under its project and names the owner check', () => {
		const submission = readSubmission({ ...context, body: updateBody, author: 'Mystique09' });
		expect(submission).toMatchObject({
			ok: true,
			kind: 'update',
			path: 'content/updates/psgc-api/2026-11-21-42.md',
			reviewNotes: ['@Mystique09 is the listed owner of this project.']
		});
	});

	it('asks maintainers to confirm an update from someone who is not the owner', () => {
		const submission = readSubmission({ ...context, body: updateBody });
		expect(submission).toMatchObject({
			ok: true,
			reviewNotes: [expect.stringContaining('@aling-nena is not the listed owner')]
		});
	});

	it('rejects an update for a project that is not listed', () => {
		const body = withAnswer(updateBody, 'Project', '../../etc/passwd');
		expect(readSubmission({ ...context, body })).toMatchObject({
			ok: false,
			errors: [expect.stringContaining('No project is listed at /projects/passwd')]
		});
	});

	it('returns null for an issue that is not a submission form', () => {
		expect(readSubmission({ ...context, body: 'The search page is broken on mobile.' })).toBeNull();
	});
});

describe('issue form templates', () => {
	it.each([
		['submit-project.yml', PROJECT_FIELDS],
		['post-update.yml', UPDATE_FIELDS]
	])('%s declares every field the parser reads', (file, fields) => {
		const template = readFileSync(`.github/ISSUE_TEMPLATE/${file}`, 'utf8');
		for (const [id, label] of Object.entries(fields)) {
			expect(template).toContain(`id: ${id}\n`);
			expect(template).toContain(`label: ${label}\n`);
		}
	});
});
