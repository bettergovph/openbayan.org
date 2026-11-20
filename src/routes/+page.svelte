<script lang="ts">
	import { onMount } from 'svelte';
	import { replaceState } from '$app/navigation';
	import Meta from '$lib/components/Meta.svelte';
	import ProjectList from '$lib/components/ProjectList.svelte';
	import UpdateList from '$lib/components/UpdateList.svelte';
	import { formatDate, plural } from '$lib/format';

	let { data } = $props();

	let sector = $state('');
	let need = $state('');

	const results = $derived(
		data.projects.filter(
			(project) =>
				(!sector || project.sectors[0] === sector) &&
				(!need || project.needs?.some((asked) => asked === need))
		)
	);

	/** The page is prerendered, so the address is read after it loads, not during the build. */
	function readAddress() {
		const params = new URLSearchParams(location.search);
		sector = params.get('sector') ?? '';
		need = params.get('needs') ?? '';
	}

	/** Keeps the filters in the address so a filtered list can be shared as a link. */
	function writeAddress() {
		const active = Object.entries({ sector, needs: need }).filter(([, value]) => value !== '');
		const search = new URLSearchParams(active).toString();
		replaceState(search ? `?${search}` : location.pathname, {});
	}

	function clearFilters() {
		sector = '';
		need = '';
		writeAddress();
	}

	onMount(readAddress);
</script>

<svelte:window onpopstate={readAddress} />

<Meta
	title="Open source projects for the Philippines"
	description="A public list of open source projects for the Philippines. Anyone can add a project, and a BetterGov volunteer reads each one before it is listed."
/>

<div class="page">
	<h1 class="poster">Open source projects for the Philippines</h1>
	<p class="lead">
		Anyone can add a project. A BetterGov volunteer reads each one before it is listed.
	</p>
	<p class="muted count">
		{plural(data.projects.length, 'project')} from
		{plural(data.ownerCount, 'person or group', 'people and groups')}.
		{#if data.projects.length > 0}
			The newest was added on {formatDate(data.projects[0].dateAdded)}.
		{/if}
	</p>

	<p class="lead filter">
		<label>
			Show
			<select bind:value={need} onchange={writeAddress} style="field-sizing: content">
				<option value="">all projects</option>
				{#each data.needs as name (name)}
					<option value={name}>projects asking for {name}</option>
				{/each}
			</select>
		</label>
		<label>
			in
			<select bind:value={sector} onchange={writeAddress} style="field-sizing: content">
				<option value="">every sector</option>
				{#each data.sectors as name (name)}
					<option value={name}>{name.toLowerCase()}</option>
				{/each}
			</select>
		</label>
	</p>

	{#if results.length === 0}
		<p aria-live="polite">
			No project matches.
			<button type="button" class="link" onclick={clearFilters}>Show all projects</button>
		</p>
	{/if}

	<ProjectList projects={results}>
		<h2><a class="add" href="/submit">Add your project</a></h2>
	</ProjectList>

	{#if data.updates.length > 0}
		<h2>Updates</h2>
		<UpdateList updates={data.updates} />
	{/if}
</div>

<style>
	.count {
		margin-top: var(--space-2);
	}

	.filter {
		margin-top: var(--space-6);
	}

	select {
		min-height: var(--control);
		padding: 0 var(--space-2);
		border-bottom: 2px solid var(--ink);
		border-radius: var(--radius) var(--radius) 0 0;
		background: var(--field);
		color: var(--ink);
		font: inherit;
		font-weight: 700;
		cursor: pointer;
	}

	.add {
		color: var(--pen);
	}
</style>
