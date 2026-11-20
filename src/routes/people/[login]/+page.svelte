<script lang="ts">
	import Meta from '$lib/components/Meta.svelte';
	import ProjectList from '$lib/components/ProjectList.svelte';
	import UpdateList from '$lib/components/UpdateList.svelte';
	import Verified from '$lib/components/Verified.svelte';
	import { plural } from '$lib/format';

	let { data } = $props();
</script>

<Meta
	title={data.login}
	description="Civic tech projects and updates shared by {data.login} on OpenBayan."
/>

<div class="hero">
	<div class="hero-inner">
		<p><a class="link" href="/">All projects</a></p>
		<h1 class="poster">
			{data.login}
			{#if data.verified}<Verified />{/if}
		</h1>
		<p class="muted">
			{plural(data.projects.length, 'project')} on OpenBayan.
			<a class="link" href="https://github.com/{data.login}" rel="noopener">GitHub profile</a>
		</p>
	</div>
</div>

<div class="page">
	{#if data.projects.length > 0}
		<ProjectList projects={data.projects} />
	{/if}

	{#if data.updates.length > 0}
		<h2>Updates</h2>
		<UpdateList updates={data.updates} />
	{/if}
</div>
