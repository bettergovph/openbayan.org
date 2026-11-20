import type { PageLoad } from './$types';
import { getAllProjects, getAllUpdates } from '$lib/content/projects';

export const load: PageLoad = () => {
	// Newest first. The BetterLGU portals are most of the list and were added in one batch, so they
	// go after everything else and do not bury the other projects.
	const isLgu = (project: { sectors: string[] }) => project.sectors[0] === 'Local Government';
	const projects = getAllProjects().toSorted(
		(a, b) => Number(isLgu(a)) - Number(isLgu(b)) || b.dateAdded.localeCompare(a.dateAdded)
	);

	return {
		projects,
		updates: getAllUpdates().slice(0, 5),
		sectors: [...new Set(projects.map((project) => project.sectors[0]))].sort(),
		needs: [...new Set(projects.flatMap((project) => project.needs ?? []))].sort(),
		ownerCount: new Set(projects.flatMap((project) => project.owner?.toLowerCase() ?? [])).size
	};
};
