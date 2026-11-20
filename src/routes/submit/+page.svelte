<script lang="ts">
	import Meta from '$lib/components/Meta.svelte';
	import { contactEmail, githubNewIssueUrl, githubRepoUrl } from '$lib/config/site';
	import { LIMITS, SECTORS } from '$lib/content/schema';
	import { PROJECT_FIELDS, UPDATE_FIELDS } from '$lib/submissions/issue-form';

	let { data } = $props();

	const stages = ['Planning', 'Alpha', 'Beta', 'Stable'];
</script>

<Meta
	title="Add a project"
	description="Add an open source project to OpenBayan or post an update on one. A volunteer reads every submission."
/>

<div class="hero">
	<div class="hero-inner">
		<h1 class="poster">Add a project</h1>
		<p class="lead">
			The form opens a GitHub issue with your answers. A pull request is made from the issue, and a
			volunteer reads it before the project is listed.
		</p>
		<p class="muted note">
			You need a GitHub account. Without one, email the same details to
			<a class="link" href="mailto:{contactEmail}">{contactEmail}</a>.
		</p>
	</div>
</div>

<div class="page">
	<form class="form" method="get" action={githubNewIssueUrl}>
		<input type="hidden" name="template" value="submit-project.yml" />

		<div class="field">
			<label for="name">{PROJECT_FIELDS.name}</label>
			<input id="name" name="name" required maxlength={LIMITS.title} autocomplete="off" />
		</div>
		<div class="field">
			<label for="summary">{PROJECT_FIELDS.summary}</label>
			<small id="summary-hint">Up to {LIMITS.summary} characters. Shown in the project list.</small>
			<input
				id="summary"
				name="summary"
				required
				maxlength={LIMITS.summary}
				aria-describedby="summary-hint"
			/>
		</div>
		<div class="field">
			<label for="description">{PROJECT_FIELDS.description}</label>
			<small id="description-hint">Plain text, up to {LIMITS.description} characters.</small>
			<textarea
				id="description"
				name="description"
				required
				maxlength={LIMITS.description}
				aria-describedby="description-hint"
			></textarea>
		</div>
		<div class="pair">
			<div class="field">
				<label for="status">{PROJECT_FIELDS.status}</label>
				<select id="status" name="status" required>
					{#each stages as stage (stage)}
						<option>{stage}</option>
					{/each}
				</select>
			</div>
			<div class="field">
				<label for="sector">{PROJECT_FIELDS.sector}</label>
				<select id="sector" name="sector" required>
					{#each SECTORS as sector (sector)}
						<option>{sector}</option>
					{/each}
				</select>
			</div>
		</div>
		<div class="field">
			<label for="website">{PROJECT_FIELDS.website}</label>
			<small id="website-hint">Optional. Where people can see or use it.</small>
			<input
				id="website"
				name="website"
				type="url"
				inputmode="url"
				autocomplete="url"
				placeholder="https://"
				aria-describedby="website-hint"
			/>
		</div>
		<div class="field">
			<label for="repository">{PROJECT_FIELDS.repository}</label>
			<small id="repository-hint">Optional. Leave empty if there is no public code.</small>
			<input
				id="repository"
				name="repository"
				type="url"
				inputmode="url"
				placeholder="https://github.com/"
				aria-describedby="repository-hint"
			/>
		</div>
		<div class="pair">
			<div class="field">
				<label for="license">{PROJECT_FIELDS.license}</label>
				<input id="license" name="license" maxlength={LIMITS.license} placeholder="MIT" />
			</div>
			<div class="field">
				<label for="tags">{PROJECT_FIELDS.tags}</label>
				<input id="tags" name="tags" placeholder="open-data, mapping" />
			</div>
		</div>
		<div class="field">
			<label for="maintainers">{PROJECT_FIELDS.maintainers}</label>
			<small id="maintainers-hint">Optional. Names separated by commas.</small>
			<input id="maintainers" name="maintainers" aria-describedby="maintainers-hint" />
		</div>

		<div class="actions">
			<button class="button" type="submit">Continue on GitHub</button>
		</div>
	</form>

	<h2 id="update">Post an update</h2>
	<p class="prose">Updates show on the project page and on the home page.</p>

	<form class="form" method="get" action={githubNewIssueUrl}>
		<input type="hidden" name="template" value="post-update.yml" />

		<div class="field">
			<label for="update-project">{UPDATE_FIELDS.project}</label>
			<select id="update-project" name="project" required>
				{#each data.projects as project (project.slug)}
					<option value={project.slug}>{project.title}</option>
				{/each}
			</select>
		</div>
		<div class="field">
			<label for="update-title">{UPDATE_FIELDS.title}</label>
			<input id="update-title" name="title" required maxlength={LIMITS.updateTitle} />
		</div>
		<div class="field">
			<label for="update-body">{UPDATE_FIELDS.body}</label>
			<small id="update-body-hint">Plain text, up to {LIMITS.updateBody} characters.</small>
			<textarea
				id="update-body"
				name="body"
				required
				maxlength={LIMITS.updateBody}
				aria-describedby="update-body-hint"
			></textarea>
		</div>

		<div class="actions">
			<button class="button" type="submit">Continue on GitHub</button>
		</div>
	</form>

	<h2>Verified badge</h2>
	<p class="prose">
		A project shows the badge when its owner is a current BetterGov volunteer. Maintainers confirm
		this by hand and list the GitHub username in
		<a href="{githubRepoUrl}/blob/master/content/verified-members.json" rel="noopener"
			>content/verified-members.json</a
		>.
	</p>
</div>

<style>
	.pair {
		display: grid;
		gap: var(--space-5);
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 14rem), 1fr));
	}

	.note {
		max-width: var(--measure);
	}
</style>
