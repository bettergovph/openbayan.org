<script lang="ts">
	import Meta from '$lib/components/Meta.svelte';
	import UpdateList from '$lib/components/UpdateList.svelte';
	import Verified from '$lib/components/Verified.svelte';
	import { githubNewIssueUrl } from '$lib/config/site';
	import { formatDate } from '$lib/format';

	let { data } = $props();
	const project = $derived(data.project);
	const Body = $derived(data.Body);

	function paragraphs(text: string | undefined): string[] {
		return (text ?? '').split(/\n\s*\n/).filter((paragraph) => paragraph.trim().length > 0);
	}
</script>

<Meta
	title={project.title}
	description={project.summary}
	keywords={[...project.tags, ...project.sectors, 'open source Philippines', 'civic technology']}
	ogType="article"
/>

<div class="page">
	<p><a class="link" href="/">All projects</a></p>
	<h1 class="poster" style:view-transition-name="p-{project.slug}">
		{project.title}
		{#if project.verified}<Verified />{/if}
	</h1>
	<p class="lead">{project.summary}</p>

	{#if project.website || project.repoUrl || project.demo}
		<p class="actions">
			{#if project.website}
				<a class="button" href={project.website} rel="noopener">Visit website</a>
			{/if}
			{#if project.repoUrl}
				<a class="link" href={project.repoUrl} rel="noopener">Source code</a>
			{/if}
			{#if project.demo && project.demo !== project.website}
				<a class="link" href={project.demo} rel="noopener">Demo</a>
			{/if}
		</p>
	{/if}

	<dl class="facts">
		{#if project.owner}
			<div>
				<dt>Owner</dt>
				<dd>
					<a class="link" href="/people/{project.owner}">{project.owner}</a>
				</dd>
			</div>
		{/if}
		{#if project.maintainers.length > 0}
			<div>
				<dt>Maintainers</dt>
				<dd>{project.maintainers.join(', ')}</dd>
			</div>
		{/if}
		{#if project.needs?.length}
			<div>
				<dt>Asking for</dt>
				<dd>{project.needs.join(', ')}</dd>
			</div>
		{/if}
		<div>
			<dt>Stage</dt>
			<dd class="stage">{project.status}</dd>
		</div>
		{#if project.license}
			<div>
				<dt>License</dt>
				<dd>{project.license}</dd>
			</div>
		{/if}
		<div>
			<dt>Sectors</dt>
			<dd>{project.sectors.join(', ')}</dd>
		</div>
		{#if project.tags.length > 0}
			<div>
				<dt>Tags</dt>
				<dd>{project.tags.join(', ')}</dd>
			</div>
		{/if}
		<div>
			<dt>Added</dt>
			<dd><time datetime={project.dateAdded}>{formatDate(project.dateAdded)}</time></dd>
		</div>
		{#if project.lastUpdated}
			<div>
				<dt>Last updated</dt>
				<dd><time datetime={project.lastUpdated}>{formatDate(project.lastUpdated)}</time></dd>
			</div>
		{/if}
	</dl>

	<div class="prose">
		{#each paragraphs(project.description) as paragraph (paragraph)}
			<p>{paragraph}</p>
		{/each}
		<Body />
		{#if project.impact}
			<h2>Who it helps</h2>
			{#each paragraphs(project.impact) as paragraph (paragraph)}
				<p>{paragraph}</p>
			{/each}
		{/if}
	</div>

	<h2>Updates</h2>
	{#if data.updates.length > 0}
		<UpdateList updates={data.updates} showProject={false} />
	{:else}
		<p class="muted">No updates yet.</p>
	{/if}
	<p>
		<a
			class="link"
			href="{githubNewIssueUrl}?template=post-update.yml&project={project.slug}"
			rel="noopener">Post an update</a
		>
	</p>
</div>

<style>
	h1 {
		margin-top: var(--space-3);
	}

	.stage {
		text-transform: capitalize;
	}
</style>
