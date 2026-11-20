import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

// The vision page was folded into the about page. Old links to /vision still land there.
export const load: PageLoad = () => {
	redirect(308, '/mission');
};
