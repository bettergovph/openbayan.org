<script lang="ts">
	import { officialSitesUrl } from '$lib/config/site';
</script>

<aside aria-label="Community notice" class="notice">
	<p>
		<span class="label chip">Volunteer-run</span>
		<span>OpenBayan is run by volunteers of BetterGov.ph. It is not a government website.</span>
		<a href={officialSitesUrl} rel="noopener">Go to the official government portal</a>
	</p>
</aside>

<style>
	.notice {
		background: var(--service);
		color: #ffffff;
		font-size: 0.875rem;
	}

	p {
		display: flex;
		max-width: var(--page);
		margin-inline: auto;
		padding: var(--space-2) var(--gutter);
		flex-wrap: wrap;
		align-items: center;
		gap: var(--space-1) var(--space-3);
	}

	.chip {
		padding: 3px 8px;
		background: #ffffff;
		color: var(--service);
		font-size: 0.625rem;
		font-weight: 600;
	}

	a {
		padding: 0 var(--space-2);
		background: var(--navy-ink);
		font-weight: 500;
	}

	a:focus-visible {
		outline-color: #ffffff;
	}
</style>
