<script lang="ts">
	import { page } from '$app/state';
	import Meta from '$lib/components/Meta.svelte';

	const title = $derived(page.status === 404 ? 'Page not found' : 'Something went wrong');
	const summary = $derived(
		page.status === 404
			? "The page you're looking for doesn't exist or has been moved."
			: "We're experiencing technical difficulties. Please try again later."
	);
</script>

<Meta {title} description={summary} noindex />

<div class="page">
	<h1 class="poster">{title}</h1>
	<p class="lead">{summary}</p>
	<p class="actions"><a class="button" href="/">See all projects</a></p>
</div>
