<!-- Shown beside a project or owner listed in content/verified-members.json. -->
<span class="verified" title="Verified BetterGov volunteer">
	<svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
		<path
			fill="currentColor"
			d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
		/>
		<path fill="none" stroke="var(--field)" stroke-width="2.4" d="m8.5 12.2 2.4 2.4 4.6-4.9" />
	</svg>
	<span class="sr-only">Verified BetterGov volunteer</span>
</span>

<style>
	.verified {
		display: inline-block;
		color: var(--pen);
		vertical-align: -0.1em;
	}

	svg {
		width: 0.9em;
		height: 0.9em;
	}

	/* On the blue band the badge is white with a blue check. */
	:global(.hero) .verified {
		--field: var(--service);
		color: #ffffff;
		vertical-align: 0.12em;
	}

	:global(.hero) svg {
		width: 0.5em;
		height: 0.5em;
	}
</style>
