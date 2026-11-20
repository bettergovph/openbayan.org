<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { Project } from '$lib/content/projects';
	import { formatDate } from '$lib/format';
	import Stamp from './Stamp.svelte';

	type Props = {
		projects: Project[];
		/** Off on an owner's own page, where the stamp is already under their name. */
		stamps?: boolean;
		/** A last row in the same list, for the blank spot where the next project goes. */
		children?: Snippet;
	};

	let { projects, stamps = true, children }: Props = $props();
</script>

<ol class="list">
	{#each projects as project (project.slug)}
		<li>
			<h2>
				<a href="/projects/{project.slug}" style:view-transition-name="p-{project.slug}">
					{project.title}
				</a>
			</h2>
			{#if stamps && project.verified}<p><Stamp /></p>{/if}
			<p class="summary">{project.summary}</p>
			<p class="muted small">
				{#if project.owner}
					By <a class="link" href="/people/{project.owner}">{project.owner}</a>.
				{/if}
				<span class="stage">{project.status}</span>, {project.sectors[0]}.
				{#if project.needs?.length}
					Asking for {project.needs.join(', ')}.
				{/if}
				Added <time datetime={project.dateAdded}>{formatDate(project.dateAdded)}</time>.
			</p>
		</li>
	{/each}
	{#if children}
		<li class="blank">{@render children()}</li>
	{/if}
</ol>

<style>
	.list {
		display: grid;
		gap: var(--space-4);
		grid-template-columns: repeat(auto-fill, minmax(min(100%, 19rem), 1fr));
	}

	/* A slip of lighter paper on the sheet. The whole slip opens the project. */
	li {
		position: relative;
		display: flex;
		padding: var(--space-4);
		flex-direction: column;
		gap: var(--space-3);
		border: 1px solid var(--rule);
		border-radius: var(--radius);
		background: var(--field);
	}

	.blank {
		border: 2px dashed var(--pen);
		background: none;
	}

	li :global(h2) {
		font-size: var(--text-card);
		font-weight: 800;
		font-stretch: 62%;
		line-height: 1;
		overflow-wrap: anywhere;
	}

	li :global(h2 a::after) {
		position: absolute;
		border-radius: var(--radius);
		content: '';
		inset: 0;
	}

	li :global(h2 a:focus-visible) {
		outline: none;
	}

	li :global(h2 a:focus-visible::after) {
		outline: 3px solid var(--pen);
		outline-offset: 2px;
	}

	.summary {
		display: -webkit-box;
		overflow: hidden;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 4;
		line-clamp: 4;
	}

	li > :last-child {
		margin-top: auto;
	}

	.link {
		position: relative;
	}

	.stage {
		text-transform: capitalize;
	}

	@media (hover: hover) and (pointer: fine) {
		li:hover {
			border-color: var(--ink);
		}
	}
</style>
