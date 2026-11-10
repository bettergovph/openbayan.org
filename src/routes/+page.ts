import type { PageLoad } from './$types';
import { getAllProjects } from '$lib/content/projects';

export const load: PageLoad = async () => {
	const projects = getAllProjects();
	const recent = [...projects]
		.sort((a, b) => {
			const da = a.dateAdded ? new Date(a.dateAdded).getTime() : 0;
			const db = b.dateAdded ? new Date(b.dateAdded).getTime() : 0;
			return db - da;
		})
		.slice(0, 6);
	return { recent };
};
