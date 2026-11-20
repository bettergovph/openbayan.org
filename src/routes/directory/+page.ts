import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

// The home page is the directory. Old links to /directory still land on it.
export const load: PageLoad = () => {
	redirect(308, '/');
};
