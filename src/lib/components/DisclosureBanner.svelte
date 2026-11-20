<script lang="ts">
	import { officialSitesUrl } from '$lib/config/site';
</script>

<aside aria-label="Community notice" class="notice">
	<p>
		Run by volunteers. Not a government website.
		<a class="link" href={officialSitesUrl} rel="noopener">Go to the official government portal</a>
	</p>
</aside>

<style>
	.notice {
		background: var(--ink);
		color: var(--paper);
		font-size: var(--text-small);
	}

	p {
		max-width: var(--page);
		margin-inline: auto;
		padding: var(--space-2) var(--gutter);
	}

	a {
		color: inherit;
	}
</style>
