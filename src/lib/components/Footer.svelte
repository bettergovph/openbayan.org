<script lang="ts">
	import { githubRepoUrl, githubIssuesUrl } from '$lib/config/site';
</script>

<footer class="footer">
	<p>
		Run by volunteers from
		<a class="link" href="https://bettergov.ph" rel="noopener">BetterGov.ph</a>. No ads and no
		tracking. The site and its project list are in a
		<a class="link" href={githubRepoUrl} rel="noopener">public repository</a>.
		<a class="link" href={githubIssuesUrl} rel="noopener">Report a problem</a>.
	</p>
	<nav aria-label="More pages">
		<a class="link" href="/mission">About</a>
		<a class="link" href="/email">Email activation</a>
		<a class="link" href="/submit">Add a project</a>
	</nav>
</footer>

<style>
	.footer {
		display: grid;
		max-width: var(--page);
		margin: var(--space-9) auto 0;
		padding: 0 var(--gutter) var(--space-8);
		gap: var(--space-3);
		font-size: var(--text-small);
	}

	.footer::before {
		margin-bottom: var(--space-2);
		border-top: 2px solid var(--ink);
		content: '';
	}

	p {
		max-width: var(--measure);
	}

	nav {
		display: flex;
		flex-wrap: wrap;
		gap: 0 var(--space-5);
	}

	nav a {
		display: flex;
		min-height: var(--control);
		align-items: center;
	}
</style>
