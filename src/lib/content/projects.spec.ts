import { describe, expect, it } from 'vitest';
import { getAllProjects, getAllUpdates } from './projects';
import { isVerified, projectOwner, validateProject, validateUpdate } from './schema';

describe('directory content', () => {
	it.each(getAllProjects().map((project) => [project.slug, project] as const))(
		'%s passes the project schema',
		(_slug, project) => {
			expect(validateProject(project)).toEqual([]);
		}
	);

	it('has only valid updates, each for a listed project', () => {
		const slugs = getAllProjects().map((project) => project.slug);
		const problems = getAllUpdates().flatMap((update) => [
			...validateUpdate(update),
			...(slugs.includes(update.projectSlug) ? [] : [`${update.id} has no project`])
		]);
		expect(problems).toEqual([]);
	});
});

describe('ownership and verification', () => {
	it('prefers the stated owner over the account in the repository address', () => {
		const project = { owner: 'aling-nena', repoUrl: 'https://github.com/bettergovph/bettergov' };
		expect(projectOwner(project)).toBe('aling-nena');
	});

	it('falls back to the GitHub account in the repository address', () => {
		expect(projectOwner({ repoUrl: 'https://github.com/JHNLWHD/saln-tracker-ph' })).toBe('JHNLWHD');
		expect(projectOwner({ repoUrl: 'https://gitlab.com/someone/thing' })).toBeUndefined();
	});

	it('matches verified logins without case and never verifies a missing owner', () => {
		expect(isVerified('BetterGovPH', ['bettergovph'])).toBe(true);
		expect(isVerified('bettergovph-fan', ['bettergovph'])).toBe(false);
		expect(isVerified(undefined, ['bettergovph'])).toBe(false);
	});
});
