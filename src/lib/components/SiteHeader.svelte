<script lang="ts">
	import { page } from '$app/state';

	const links = [
		{ href: '/', label: 'Projects' },
		{ href: '/submit', label: 'Add a project' },
		{ href: '/mission', label: 'About' },
		{ href: '/email', label: 'Email activation' }
	];
</script>

<header class="header">
	<div class="top">
		<a href="/" class="brand">
			<img src="/bettergov/emblem-inverse.svg" alt="" width="44" height="44" />
			OpenBayan
		</a>
		<p class="label tagline">Open source projects<br />for the Philippines</p>
		<a class="button label" href="/submit">Add a project</a>
	</div>
	<nav aria-label="Primary navigation">
		{#each links as link (link.href)}
			<a href={link.href} aria-current={page.url.pathname === link.href ? 'page' : undefined}>
				{link.label}
			</a>
		{/each}
	</nav>
</header>

<style>
	.header {
		border-bottom: 2px solid var(--ink);
		background: var(--paper);
	}

	.top,
	nav {
		display: flex;
		max-width: var(--page);
		margin-inline: auto;
		padding-inline: var(--gutter);
		flex-wrap: wrap;
		align-items: center;
	}

	.top {
		padding-block: var(--space-5);
		gap: var(--space-3) var(--space-5);
	}

	.brand {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		color: var(--pen);
		font: 800 1.75rem / 1 var(--font-display);
		letter-spacing: -0.02em;
	}

	.tagline {
		padding-left: var(--space-5);
		border-left: 1px solid var(--rule);
		font-size: 0.625rem;
		font-weight: 400;
		letter-spacing: 0.16em;
	}

	.button {
		margin-left: auto;
		font: 500 0.875rem / 1 var(--font);
		letter-spacing: 0.08em;
	}

	nav a {
		padding: var(--space-3) 1.25rem;
		color: var(--muted);
		font: 600 1rem / 1.5 var(--font-display);
	}

	nav a[aria-current='page'] {
		background: var(--navy-tint);
		color: var(--pen);
	}

	@media (hover: hover) and (pointer: fine) {
		nav a:hover {
			color: var(--pen);
		}
	}

	/* On a phone the links stay on one row that scrolls sideways, and the header gets shorter. */
	@media (max-width: 40rem) {
		.tagline,
		.button {
			display: none;
		}

		.top {
			padding-block: var(--space-3);
		}

		.brand {
			gap: var(--space-2);
			font-size: 1.375rem;
		}

		.brand img {
			width: 2rem;
			height: 2rem;
		}

		nav {
			padding-inline: calc(var(--gutter) - var(--space-3));
			flex-wrap: nowrap;
			overflow-x: auto;
			scrollbar-width: none;
		}

		nav a {
			padding-inline: var(--space-3);
			font-size: 0.9375rem;
			white-space: nowrap;
		}
	}
</style>
