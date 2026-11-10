<script lang="ts">
	import { page } from '$app/state';

	let open = $state(false);
	let purposeOpen = $state(false);
	let contributingOpen = $state(false);
	let purposeDropdown: HTMLElement;
	let contributingDropdown: HTMLElement;

	let pathname = $derived(page.url.pathname);

	function isActive(href: string): boolean {
		if (href === '/') return pathname === '/';
		return pathname === href || pathname.startsWith(href + '/');
	}

	function isPurposeActive(): boolean {
		return isActive('/mission') || isActive('/vision');
	}

	function isContributingActive(): boolean {
		return isActive('/email');
	}

	// Close dropdowns when clicking outside
	$effect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (purposeDropdown && !purposeDropdown.contains(event.target as Node)) {
				purposeOpen = false;
			}
			if (contributingDropdown && !contributingDropdown.contains(event.target as Node)) {
				contributingOpen = false;
			}
		}

		if (purposeOpen || contributingOpen) {
			document.addEventListener('click', handleClickOutside);
			return () => document.removeEventListener('click', handleClickOutside);
		}
	});
</script>

<header class="w-full border-b border-gray-200 bg-white">
	<div class="mx-auto flex max-w-screen-xl items-center justify-between gap-4 px-4 py-3">
		<div class="flex items-center gap-6">
			<a href="/" class="flex items-center gap-2 text-lg font-semibold">
				<svg aria-hidden="true" width="24" height="24" viewBox="0 0 640 640" focusable="false">
					<defs>
						<linearGradient id="tricolor" x1="0%" y1="0%" x2="100%" y2="100%">
							<stop offset="0%" style="stop-color:var(--flag-blue)" />
							<stop offset="50%" style="stop-color:var(--flag-yellow)" />
							<stop offset="100%" style="stop-color:var(--flag-red)" />
						</linearGradient>
					</defs>
					<path
						fill="url(#tricolor)"
						d="M286.7 96.1C291.7 113 282.1 130.9 265.2 135.9C185.9 159.5 128.1 233 128.1 320C128.1 426 214.1 512 320.1 512C426.1 512 512.1 426 512.1 320C512.1 233.1 454.3 159.6 375 135.9C358.1 130.9 348.4 113 353.5 96.1C358.6 79.2 376.4 69.5 393.3 74.6C498.9 106.1 576 204 576 320C576 461.4 461.4 576 320 576C178.6 576 64 461.4 64 320C64 204 141.1 106.1 246.9 74.6C263.8 69.6 281.7 79.2 286.7 96.1z"
					/>
				</svg>
				<span>OpenBayan</span>
			</a>

			<nav class="hidden sm:block">
				<ul class="flex items-center gap-6 text-sm">
					<li>
						<a
							class="border-b-2 pb-0.5 transition-colors {isActive('/directory')
								? 'border-[--color-brand] font-medium text-[--color-brand]'
								: 'border-transparent hover:border-gray-300 hover:text-gray-900'}"
							href="/directory"
							aria-current={isActive('/directory') ? 'page' : undefined}
						>
							Directory
						</a>
					</li>
					<li class="relative" bind:this={purposeDropdown}>
						<button
							class="flex items-center gap-1 border-b-2 pb-0.5 transition-colors {isPurposeActive()
								? 'border-[--color-brand] font-medium text-[--color-brand]'
								: 'border-transparent hover:border-gray-300 hover:text-gray-900'}"
							onclick={() => (purposeOpen = !purposeOpen)}
							aria-expanded={purposeOpen}
						>
							Purpose
							<svg
								class="h-4 w-4 transition-transform {purposeOpen ? 'rotate-180' : ''}"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M19 9l-7 7-7-7"
								></path>
							</svg>
						</button>
						{#if purposeOpen}
							<div
								class="absolute top-full left-0 z-50 mt-1 min-w-48 border border-gray-300 bg-white py-1 shadow-lg"
							>
								<a
									href="/mission"
									onclick={() => (purposeOpen = false)}
									class="block border-b border-gray-100 px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
									>Mission</a
								>
								<a
									href="/vision"
									onclick={() => (purposeOpen = false)}
									class="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
									>Vision</a
								>
							</div>
						{/if}
					</li>
					<li class="relative" bind:this={contributingDropdown}>
						<button
							class="flex items-center gap-1 border-b-2 pb-0.5 transition-colors {isContributingActive()
								? 'border-[--color-brand] font-medium text-[--color-brand]'
								: 'border-transparent hover:border-gray-300 hover:text-gray-900'}"
							onclick={() => (contributingOpen = !contributingOpen)}
							aria-expanded={contributingOpen}
						>
							Contributing
							<svg
								class="h-4 w-4 transition-transform {contributingOpen ? 'rotate-180' : ''}"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M19 9l-7 7-7-7"
								></path>
							</svg>
						</button>
						{#if contributingOpen}
							<div
								class="absolute top-full left-0 z-50 mt-1 min-w-48 border border-gray-300 bg-white py-1 shadow-lg"
							>
								<a
									href="/email"
									onclick={() => (contributingOpen = false)}
									class="block border-b border-gray-100 px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
									>Email activation</a
								>
								<a
									href="https://github.com/openbayan/openbayan.org/issues"
									onclick={() => (contributingOpen = false)}
									class="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
									target="_blank"
									rel="noopener">Report an issue</a
								>
							</div>
						{/if}
					</li>
				</ul>
			</nav>
		</div>

		<div class="flex items-center gap-2">
			<a
				href="/search"
				class="rounded-[--radius-sm] p-2 hover:bg-gray-100 focus:ring-2 focus:ring-[--color-brand] focus:outline-none"
				aria-label="Search projects"
			>
				<svg
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
				>
					<circle cx="11" cy="11" r="8"></circle>
					<path d="m21 21-4.35-4.35"></path>
				</svg>
			</a>
			<a
				href="/submit"
				class="inline-flex items-center justify-center bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-[--color-brand] focus:outline-none"
			>
				<span class="sm:hidden">Submit</span>
				<span class="hidden sm:inline">Submit a project</span>
			</a>

			<button
				class="rounded-[--radius-sm] border p-2 sm:hidden"
				aria-expanded={open}
				aria-controls="primary-nav"
				onclick={() => (open = !open)}
			>
				<span class="sr-only">Menu</span>
				<svg
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					aria-hidden="true"
				>
					{#if open}
						<path d="M18 6 6 18"></path>
						<path d="m6 6 12 12"></path>
					{:else}
						<path d="M4 6h16"></path>
						<path d="M4 12h16"></path>
						<path d="M4 18h16"></path>
					{/if}
				</svg>
			</button>
		</div>
	</div>

	<nav class={open ? 'block sm:hidden' : 'hidden'}>
		<ul class="space-y-2 px-4 pb-4 text-sm">
			<li>
				<a
					class="block py-1 {isActive('/directory')
						? 'font-medium text-[--color-brand]'
						: 'text-gray-900'}"
					href="/directory"
					onclick={() => (open = false)}
					aria-current={isActive('/directory') ? 'page' : undefined}
				>
					Directory
				</a>
			</li>
			<li>
				<div class="py-1">
					<div
						class="mb-2 font-medium {isPurposeActive() ? 'text-[--color-brand]' : 'text-gray-900'}"
					>
						Purpose
					</div>
					<div class="space-y-1 pl-3">
						<a
							class="block py-1 {isActive('/mission')
								? 'font-medium text-[--color-brand]'
								: 'text-gray-600'}"
							href="/mission"
							onclick={() => (open = false)}
							aria-current={isActive('/mission') ? 'page' : undefined}
						>
							Mission
						</a>
						<a
							class="block py-1 {isActive('/vision')
								? 'font-medium text-[--color-brand]'
								: 'text-gray-600'}"
							href="/vision"
							onclick={() => (open = false)}
							aria-current={isActive('/vision') ? 'page' : undefined}
						>
							Vision
						</a>
					</div>
				</div>
			</li>
			<li>
				<div class="py-1">
					<div
						class="mb-2 font-medium {isContributingActive()
							? 'text-[--color-brand]'
							: 'text-gray-900'}"
					>
						Contributing
					</div>
					<div class="space-y-1 pl-3">
						<a
							class="block py-1 {isActive('/email')
								? 'font-medium text-[--color-brand]'
								: 'text-gray-600'}"
							href="/email"
							onclick={() => (open = false)}
							aria-current={isActive('/email') ? 'page' : undefined}
						>
							Email activation
						</a>
						<a
							class="block py-1 text-gray-600"
							href="https://github.com/openbayan/openbayan.org/issues"
							onclick={() => (open = false)}
							target="_blank"
							rel="noopener">Report an issue</a
						>
					</div>
				</div>
			</li>
		</ul>
	</nav>
</header>
