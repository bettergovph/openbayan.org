<script lang="ts">
	import { generateMeta, siteConfig, type PageMeta } from '$lib/config/meta';
	import { page } from '$app/state';

	let pageMeta: PageMeta = $props();

	const meta = $derived(generateMeta(pageMeta));
	const canonicalUrl = $derived(pageMeta.canonical || `${siteConfig.url}${page.url.pathname}`);
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>{meta.title}</title>
	<meta name="title" content={meta.title} />
	<meta name="description" content={meta.description} />
	<meta name="keywords" content={meta.keywords} />

	{#if meta.noindex}
		<meta name="robots" content="noindex, nofollow" />
	{:else}
		<meta name="robots" content="index, follow" />
	{/if}

	<!-- Canonical URL -->
	<link rel="canonical" href={canonicalUrl} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content={meta.ogType} />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:title" content={meta.title} />
	<meta property="og:description" content={meta.description} />
	<meta property="og:image" content={meta.ogImage} />
	<meta property="og:site_name" content={siteConfig.name} />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content={canonicalUrl} />
	<meta property="twitter:title" content={meta.title} />
	<meta property="twitter:description" content={meta.description} />
	<meta property="twitter:image" content={meta.ogImage} />
	{#if siteConfig.twitterHandle}
		<meta property="twitter:site" content={siteConfig.twitterHandle} />
		<meta property="twitter:creator" content={siteConfig.twitterHandle} />
	{/if}

	<!-- Additional Meta -->
	<meta name="theme-color" content="#0a0a0a" />
	<meta name="msapplication-TileColor" content="#0a0a0a" />
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-status-bar-style" content="default" />
	<meta name="apple-mobile-web-app-title" content={siteConfig.name} />
</svelte:head>
