<script lang="ts">
	import '@fontsource-variable/archivo/wdth.css';
	import '../app.css';
	import { onNavigate } from '$app/navigation';
	import favicon from '$lib/assets/favicon.ico';
	import DisclosureBanner from '$lib/components/DisclosureBanner.svelte';
	import SiteHeader from '$lib/components/SiteHeader.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();

	/** A project name travels from its row in the list to the top of its own page. */
	onNavigate((navigation) => {
		if (!document.startViewTransition) return;
		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="apple-touch-icon" href={favicon} />
</svelte:head>

<a href="#content" class="skip">Skip to content</a>

<DisclosureBanner />
<SiteHeader />

<main id="content">{@render children?.()}</main>

<Footer />

<style>
	.skip {
		position: absolute;
		top: var(--space-2);
		left: var(--space-2);
		z-index: 1;
		padding: var(--space-3) var(--space-4);
		background: var(--paper);
		color: var(--ink);
		font-weight: 700;
		translate: 0 -200%;
	}

	.skip:focus {
		translate: 0;
	}
</style>
