import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: [vitePreprocess(), mdsvex({ extensions: ['.md', '.svx'] })],
	kit: {
		adapter: adapter(),
		// Nothing links to these two old addresses any more, so the crawler is told about their redirects.
		prerender: { entries: ['*', '/search', '/directory'] },
		typescript: {
			config: (config) => {
				config.include.push('../scripts/**/*.ts');
			}
		}
	},
	extensions: ['.svelte', '.md', '.svx']
};

export default config;
