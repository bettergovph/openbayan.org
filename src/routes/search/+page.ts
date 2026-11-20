import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

// The home page has the search. Old links to /search still land somewhere useful.
export const load: PageLoad = () => {
	redirect(308, '/');
};
