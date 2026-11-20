<script lang="ts">
	import { page } from '$app/state';

	const links = [
		{ href: '/', label: 'Projects' },
		{ href: '/submit', label: 'Add a project' },
		{ href: '/mission', label: 'About' }
	];
</script>

<header class="header">
	<a href="/" class="brand">OpenBayan</a>
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
		display: flex;
		max-width: var(--page);
		margin-inline: auto;
		padding: var(--space-2) var(--gutter);
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 0 var(--space-6);
	}

	a {
		display: flex;
		min-height: var(--control);
		align-items: center;
	}

	.brand {
		font-size: var(--text-heading);
		font-weight: 800;
		font-stretch: 62%;
	}

	nav {
		display: flex;
		flex-wrap: wrap;
		gap: 0 var(--space-5);
	}

	nav a {
		text-decoration: underline;
		text-decoration-color: var(--rule);
		text-decoration-thickness: 0.08em;
		text-underline-offset: 0.3em;
	}

	nav a[aria-current='page'] {
		text-decoration-color: currentColor;
		text-decoration-thickness: 0.16em;
	}

	@media (hover: hover) and (pointer: fine) {
		nav a:hover {
			text-decoration-color: currentColor;
		}
	}
</style>
