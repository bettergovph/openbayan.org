<script lang="ts">
	import { onMount } from 'svelte';
	import { replaceState } from '$app/navigation';
	import Meta from '$lib/components/Meta.svelte';
	import ProjectList from '$lib/components/ProjectList.svelte';
	import UpdateList from '$lib/components/UpdateList.svelte';
	import { formatDate, plural } from '$lib/format';

	let { data } = $props();

	/** Cards shown before "Show more" is pressed, and added by each press. */
	const PAGE_SIZE = 24;

	let query = $state('');
	let sector = $state('');
	let need = $state('');
	let limit = $state(PAGE_SIZE);

	/** Every word typed must appear somewhere in the project's name, summary, owner, sector or tags. */
	const results = $derived.by(() => {
		const words = query.toLowerCase().split(/\s+/).filter(Boolean);
		return data.projects.filter((project) => {
			if (sector && project.sectors[0] !== sector) return false;
			if (need && !project.needs?.some((asked) => asked === need)) return false;
			if (words.length === 0) return true;
			const text = [
				project.title,
				project.summary,
				project.owner,
				...project.sectors,
				...project.tags
			]
				.join(' ')
				.toLowerCase();
			return words.every((word) => text.includes(word));
		});
	});
	const shown = $derived(results.slice(0, limit));

	/** The page is prerendered, so the address is read after it loads, not during the build. */
	function readAddress() {
		const params = new URLSearchParams(location.search);
		query = params.get('q') ?? '';
		sector = params.get('sector') ?? '';
		need = params.get('needs') ?? '';
	}

	/** Keeps the filters in the address so a filtered list can be shared as a link. */
	function writeAddress() {
		limit = PAGE_SIZE;
		const filters = { q: query.trim(), sector, needs: need };
		const active = Object.entries(filters).filter(([, value]) => value !== '');
		const search = new URLSearchParams(active).toString();
		replaceState(search ? `?${search}` : location.pathname, {});
	}

	function clearFilters() {
		query = '';
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

<div class="hero">
	<div class="hero-inner">
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
		<form class="search" role="search" onsubmit={(event) => event.preventDefault()}>
			<label for="search">Search projects</label>
			<input
				id="search"
				type="search"
				name="q"
				autocomplete="off"
				placeholder="flood, tax, Cebu"
				bind:value={query}
				oninput={writeAddress}
			/>
		</form>
	</div>
</div>

<div class="page">
	<div class="head">
		<h2>Projects</h2>
		<p class="small muted" aria-live="polite">
			Showing {shown.length} of {plural(results.length, 'project')}
		</p>
	</div>

	<p class="filter">
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
		<p>
			No project matches.
			<button type="button" class="link" onclick={clearFilters}>Show all projects</button>
		</p>
	{/if}

	<ProjectList projects={shown}>
		<h3><a class="add" href="/submit">Add your project</a></h3>
	</ProjectList>

	{#if shown.length < results.length}
		<p>
			<button type="button" class="button more" onclick={() => (limit += PAGE_SIZE)}>
				Show more projects
			</button>
		</p>
	{/if}

	{#if data.updates.length > 0}
		<h2>Updates</h2>
		<UpdateList updates={data.updates} />
	{/if}
</div>

<style>
	.head {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		justify-content: space-between;
		gap: var(--space-2) var(--space-5);
	}

	.filter {
		display: flex;
		margin-top: var(--space-4);
		flex-wrap: wrap;
		align-items: center;
		gap: var(--space-2) var(--space-3);
	}

	label {
		display: inline-flex;
		align-items: center;
		gap: var(--space-3);
	}

	/* Svelte 5.39 leaves the scoping class off these selects, so they are matched through their parent. */
	.filter :global(select) {
		min-height: var(--control);
		padding: 0 1.5rem 0 0;
		/* The browser's own arrow sits flush against the text, so the arrow is drawn here instead. */
		-webkit-appearance: none;
		appearance: none;
		background: transparent
			url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' fill='none' stroke='%230c1b33' stroke-width='1.5'%3E%3Cpath d='m2.5 4.5 3.5 3.5 3.5-3.5'/%3E%3C/svg%3E")
			no-repeat right center / 0.75rem;
		color: var(--ink);
		font: inherit;
		font-weight: 600;
		cursor: pointer;
	}

	.add {
		color: var(--pen);
	}

	.search {
		display: grid;
		max-width: 37rem;
		margin-top: var(--space-5);
		gap: var(--space-2);
	}

	.search label {
		font-weight: 600;
	}

	.search :global(input) {
		min-height: 2.875rem;
		padding: 0 var(--space-4);
		border: 1px solid var(--rule);
		background: var(--paper);
		color: var(--ink);
		font: inherit;
	}

	.search :global(input:focus-visible) {
		outline-color: #ffffff;
	}

	.more {
		border-color: var(--rule-strong);
		background: var(--paper);
		color: var(--pen);
	}
</style>
