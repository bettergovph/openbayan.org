import type { PageLoad } from './$types';
import { getAllProjects } from '$lib/content/projects';

export const load: PageLoad = () => ({
	projects: getAllProjects()
		.map((project) => ({ slug: project.slug, title: project.title }))
		.sort((a, b) => a.title.localeCompare(b.title))
});
