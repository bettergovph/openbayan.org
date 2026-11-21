import type { EntryGenerator, PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import { getAllProjects, getProject } from '$lib/content/projects';

export const load: PageLoad = ({ params }) => {
	const found = getProject(params.slug);
	if (!found) error(404, 'Project not found');
	return found;
};

/** The home page links only its first cards, so every project page is listed here to be built. */
export const entries: EntryGenerator = () =>
	getAllProjects().map((project) => ({ slug: project.slug }));
