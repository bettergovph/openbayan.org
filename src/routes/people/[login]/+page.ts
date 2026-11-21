import type { EntryGenerator, PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import { getAllProjects, getAllUpdates, getProjectsByOwner } from '$lib/content/projects';

export const load: PageLoad = ({ params }) => {
	const projects = getProjectsByOwner(params.login);
	const updates = getAllUpdates().filter(
		(update) => update.author.toLowerCase() === params.login.toLowerCase()
	);
	if (projects.length === 0 && updates.length === 0) error(404, 'Nobody is listed under that name');

	return {
		// The login as its owner wrote it, not as it was typed into the address.
		login: projects[0]?.owner ?? updates[0].author,
		verified: projects.some((project) => project.verified),
		projects,
		updates
	};
};

/** Built for every owner and update author, whether or not a built page links to them. */
export const entries: EntryGenerator = () => {
	const logins = [
		...getAllProjects().flatMap((project) => project.owner ?? []),
		...getAllUpdates().map((update) => update.author)
	];
	return [...new Set(logins)].map((login) => ({ login }));
};
