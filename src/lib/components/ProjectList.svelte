<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { Project } from '$lib/content/projects';
	import { formatDate } from '$lib/format';
	import Verified from './Verified.svelte';

	type Props = {
		projects: Project[];
		/** A last row in the same list, for the blank spot where the next project goes. */
		children?: Snippet;
	};

	let { projects, children }: Props = $props();
</script>

<ol class="list">
	{#each projects as project (project.slug)}
		<li>
			<p class="tags">
				<span class="label sector">{project.sectors[0]}</span>
				<span class="label">{project.status}</span>
			</p>
			<h3>
				<a href="/projects/{project.slug}" style:view-transition-name="p-{project.slug}">
					{project.title}
				</a>
				{#if project.verified}<Verified />{/if}
			</h3>
			<p class="summary small muted">{project.summary}</p>
			<p class="small muted">
				{#if project.owner}
					By <a class="link" href="/people/{project.owner}">{project.owner}</a>.
				{/if}
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
		gap: var(--space-5);
		grid-template-columns: repeat(auto-fill, minmax(min(100%, 17.5rem), 1fr));
	}

	/* The whole card opens the project. */
	li {
		position: relative;
		display: flex;
		padding: var(--space-5);
		flex-direction: column;
		gap: var(--space-3);
		border: 1px solid var(--rule);
		background: var(--paper);
	}

	.blank {
		justify-content: center;
		border-style: dashed;
		border-color: var(--rule-strong);
		background: var(--paper-2);
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--space-2) var(--space-3);
		font-size: 0.625rem;
	}

	.sector {
		padding: 3px 8px;
		background: var(--pen);
		color: #ffffff;
	}

	li :global(h3) {
		font-size: var(--text-card);
		font-weight: 700;
		line-height: 1.25;
		overflow-wrap: anywhere;
	}

	li :global(h3 a::after) {
		position: absolute;
		content: '';
		inset: 0;
	}

	li :global(h3 a:focus-visible) {
		outline: none;
	}

	li :global(h3 a:focus-visible::after) {
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

	@media (hover: hover) and (pointer: fine) {
		li:hover {
			border-color: var(--pen);
		}
	}
</style>
