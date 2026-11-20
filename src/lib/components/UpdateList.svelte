<script lang="ts">
	import type { Update } from '$lib/content/projects';
	import { formatDate } from '$lib/format';

	type Props = {
		updates: Update[];
		/** Hide the project name where the page is already about one project. */
		showProject?: boolean;
	};

	let { updates, showProject = true }: Props = $props();
</script>

<ol class="updates">
	{#each updates as update (update.id)}
		<li>
			<h3>{update.title}</h3>
			<p class="muted small">
				<time datetime={update.date}>{formatDate(update.date)}</time>, by
				<a class="link" href="/people/{update.author}">{update.author}</a>{#if showProject}, on
					<a class="link" href="/projects/{update.projectSlug}">{update.projectTitle}</a>{/if}
			</p>
			<p class="body">{update.body}</p>
		</li>
	{/each}
</ol>

<style>
	.updates {
		max-width: var(--measure);
		border-top: 1px solid var(--ink);
	}

	li {
		padding: var(--space-4) 0;
		border-bottom: 1px solid var(--rule);
	}

	.body {
		margin-top: var(--space-2);
		white-space: pre-line;
		overflow-wrap: anywhere;
	}
</style>
