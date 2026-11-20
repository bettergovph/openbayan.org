import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import { getProject } from '$lib/content/projects';

export const load: PageLoad = ({ params }) => {
	const found = getProject(params.slug);
	if (!found) error(404, 'Project not found');
	return found;
};
