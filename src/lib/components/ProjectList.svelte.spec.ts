import { page } from '@vitest/browser/context';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import type { Project } from '$lib/content/projects';
import ProjectList from './ProjectList.svelte';

const project: Project = {
	slug: 'flood-map',
	title: 'Flood Map',
	summary: 'Shows which streets are flooded.',
	status: 'beta',
	sectors: ['Climate'],
	tags: [],
	maintainers: [],
	dateAdded: '2026-01-05',
	owner: 'aling-nena',
	verified: false
};

describe('ProjectList', () => {
	it('links each card to its project and its owner', async () => {
		render(ProjectList, { projects: [project] });

		await expect
			.element(page.getByRole('link', { name: 'Flood Map' }))
			.toHaveAttribute('href', '/projects/flood-map');
		await expect
			.element(page.getByRole('link', { name: 'aling-nena' }))
			.toHaveAttribute('href', '/people/aling-nena');
	});

	it('shows the verified badge only for a verified owner', async () => {
		render(ProjectList, { projects: [project, { ...project, slug: 'b', verified: true }] });

		await expect.element(page.getByText('Verified BetterGov volunteer')).toBeInTheDocument();
		expect(page.getByText('Verified BetterGov volunteer').elements()).toHaveLength(1);
	});
});
