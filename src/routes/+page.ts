import type { PageLoad } from './$types';
import { getAllProjects, getAllUpdates } from '$lib/content/projects';

export const load: PageLoad = () => {
	const projects = getAllProjects().toSorted((a, b) => b.dateAdded.localeCompare(a.dateAdded));

	return {
		projects,
		updates: getAllUpdates().slice(0, 5),
		sectors: [...new Set(projects.map((project) => project.sectors[0]))].sort(),
		needs: [...new Set(projects.flatMap((project) => project.needs ?? []))].sort(),
		ownerCount: new Set(projects.flatMap((project) => project.owner?.toLowerCase() ?? [])).size
	};
};
