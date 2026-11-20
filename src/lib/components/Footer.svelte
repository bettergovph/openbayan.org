<script lang="ts">
	import { officialSitesUrl, githubRepoUrl, githubIssuesUrl } from '$lib/config/site';
</script>

<footer class="footer">
	<div class="inner">
		<div class="about">
			<p>
				OpenBayan is a public list of open source projects for the Philippines. It has no ads and no
				tracking.
			</p>
			<p>Run by volunteers of BetterGov.ph.</p>
			<p class="chips">
				<span class="label">Volunteer-run</span>
				<span class="label">Open source</span>
			</p>
		</div>
		<nav aria-label="OpenBayan">
			<h2 class="label">OpenBayan</h2>
			<a href="/">Projects</a>
			<a href="/submit">Add a project</a>
			<a href="/mission">About</a>
			<a href="/email">Email activation</a>
		</nav>
		<nav aria-label="BetterGov">
			<h2 class="label">BetterGov</h2>
			<a href="https://bettergov.ph" rel="noopener">BetterGov.ph</a>
			<a href="https://about.bettergov.ph" rel="noopener">About BetterGov</a>
			<a href={officialSitesUrl} rel="noopener">Official government portal</a>
		</nav>
		<nav aria-label="Source">
			<h2 class="label">Source</h2>
			<a href={githubRepoUrl} rel="noopener">GitHub</a>
			<a href={githubIssuesUrl} rel="noopener">Report a problem</a>
		</nav>
	</div>
</footer>

<style>
	.footer {
		margin-top: var(--space-9);
		padding: 3.75rem 0 var(--space-8);
		background: var(--navy-ink);
		color: var(--on-navy);
		font-size: var(--text-small);
	}

	.inner {
		display: grid;
		max-width: var(--page);
		margin-inline: auto;
		padding-inline: var(--gutter);
		gap: var(--space-6);
		grid-template-columns: repeat(auto-fit, minmax(11rem, 1fr));
	}

	.about {
		display: grid;
		max-width: 22rem;
		align-content: start;
		gap: var(--space-3);
	}

	.chips {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
	}

	.chips span {
		padding: 3px 8px;
		border: 1px solid #5f7fc4;
		font-size: 0.625rem;
		font-weight: 400;
	}

	nav {
		display: grid;
		align-content: start;
		justify-items: start;
	}

	h2 {
		margin-bottom: var(--space-2);
		color: #ffffff;
	}

	nav a {
		display: flex;
		min-height: 2rem;
		align-items: center;
	}

	a:focus-visible {
		outline-color: #ffffff;
	}

	@media (hover: hover) and (pointer: fine) {
		nav a:hover {
			color: #ffffff;
			text-decoration: underline;
		}
	}

	@media (pointer: coarse) {
		nav a {
			min-height: var(--control);
		}
	}
</style>
