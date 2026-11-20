<script lang="ts">
	import Meta from '$lib/components/Meta.svelte';
	import { githubRepoUrl } from '$lib/config/site';
</script>

<Meta
	title="About"
	description="OpenBayan is a public list of open source projects for the Philippines, run by volunteers from BetterGov.ph."
/>

<div class="page">
	<h1 class="poster">About OpenBayan</h1>
	<p class="lead">
		OpenBayan is a public list of open source projects for the Philippines, such as flood maps, tax
		calculators and government data APIs.
	</p>

	<div class="prose">
		<h2>What the list is for</h2>
		<p>
			People use it to find these projects, try them and help build them. Each project says who owns
			it, what stage it is at and what help it is asking for.
		</p>

		<h2>Who runs it</h2>
		<p>
			Volunteers from <a href="https://bettergov.ph" rel="noopener">BetterGov.ph</a> run the site. It
			is not part of any government agency.
		</p>

		<h2>How a project gets listed</h2>
		<p>
			The person who builds a project fills in <a href="/submit">the form</a>. That opens a pull
			request, and a volunteer reads it before merging. Every project is a file in the
			<a href={githubRepoUrl} rel="noopener">public repository</a>, so each change has a history
			anyone can read.
		</p>

		<h2>Verified badge</h2>
		<p>
			A project shows the badge when its owner is a current BetterGov volunteer. Volunteers are
			confirmed by hand for now.
		</p>
	</div>
</div>
