<script lang="ts">
	import type { ProjectMeta } from '$lib/content/projects';
	import Meta from '$lib/components/Meta.svelte';

	let { data } = $props<{ data: { recent: ProjectMeta[] } }>();
</script>

<svelte:head>
	<title>OpenBayan  Open source for the Philippines</title>
	<meta
		name="description"
		content="A consolidated hub for community-led open source initiatives improving the Philippines."
	/>
</svelte:head>

<Meta
	title="Open Source Technology for the Philippines"
	description="Discover and contribute to open source projects that improve public services, transparency, and digital infrastructure across the Philippines. Join our community-led initiative."
	keywords={[
		'open source Philippines',
		'civic technology',
		'government transparency',
		'digital infrastructure',
		'community projects'
	]}
/>

<!-- Hero Section -->
<section class="relative overflow-hidden bg-[#0038A8]">
	<div class="mx-auto max-w-screen-xl px-4 py-16">
		<div class="max-w-4xl">
			<h1 class="mb-6 text-4xl font-bold text-white">Open source technology for the Philippines</h1>
			<p class="mb-8 text-xl leading-relaxed text-blue-100">
				A community-led directory of open source projects that improve public services,
				transparency, and digital infrastructure across the Philippines.
			</p>
			<div class="mb-12 flex flex-col gap-4 sm:flex-row">
				<a
					href="/directory"
					data-sveltekit-preload-data="hover"
					class="inline-flex items-center bg-white px-6 py-3 font-medium text-[#0038A8] transition-colors hover:bg-blue-50"
				>
					Browse projects
				</a>
				<a
					href="/submit"
					data-sveltekit-preload-data="hover"
					class="inline-flex items-center border border-white px-6 py-3 font-medium text-white transition-colors hover:bg-blue-800"
				>
					Submit a project
				</a>
			</div>
		</div>
	</div>

	<!-- Emblem positioned at bottom right -->
	<div class="pointer-events-none absolute right-4 bottom-4 opacity-20">
		<img src="/sun.png" alt="" class="h-20 w-20 brightness-75 hue-rotate-180 filter" />
	</div>
</section>

<!-- Featured Projects -->
{#if data.recent.length}
	<section class="border-t border-gray-200 bg-gray-50 py-16">
		<div class="mx-auto max-w-screen-xl px-4">
			<div class="mb-12">
				<h2 class="mb-4 text-2xl font-bold text-gray-900">Featured projects</h2>
				<p class="max-w-2xl text-gray-700">
					Explore technology projects that are making a real difference across the Philippines.
				</p>
			</div>

			<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{#each data.recent as p (p.slug)}
					<a
						href={`/projects/${p.slug}`}
						class="group flex flex-col border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:border-[--color-brand] hover:shadow-md focus:ring-2 focus:ring-[--color-brand] focus:outline-none active:scale-[0.98]"
					>
						<h3
							class="mb-2 text-lg font-semibold text-gray-900 transition-colors group-hover:text-[--color-brand]"
						>
							{p.title}
						</h3>
						{#if p.summary}
							<p class="mb-4 flex-1 text-sm leading-relaxed text-gray-600">
								{p.summary.length > 120 ? p.summary.slice(0, 120) + '…' : p.summary}
							</p>
						{/if}
						<div class="mt-auto flex items-center justify-between">
							{#if p.status}
								<span
									class="inline-block rounded-full px-2 py-0.5 text-xs font-medium {p.status ===
									'stable'
										? 'bg-green-100 text-green-700'
										: p.status === 'beta'
											? 'bg-blue-100 text-blue-700'
											: p.status === 'alpha'
												? 'bg-yellow-100 text-yellow-700'
												: 'bg-gray-100 text-gray-700'}"
								>
									{p.status}
								</span>
							{/if}
							{#if p.sectors?.length}
								<span class="text-xs text-gray-400">{p.sectors[0]}</span>
							{/if}
						</div>
					</a>
				{/each}
			</div>

			<div class="mt-12">
				<a
					href="/directory"
					class="inline-flex items-center border border-gray-300 px-6 py-3 font-medium text-gray-700 transition-colors hover:border-gray-400 hover:bg-gray-50"
				>
					View all projects
				</a>
			</div>
		</div>
	</section>
{/if}

<!-- Get Involved Section -->
<section class="border-t border-gray-200 bg-white py-16">
	<div class="mx-auto max-w-screen-xl px-4">
		<div class="max-w-4xl">
			<h2 class="mb-6 text-2xl font-bold text-gray-900">Get involved</h2>
			<p class="mb-8 leading-relaxed text-gray-700">
				Whether you're building technology solutions or looking to contribute to existing projects,
				there are many ways to get involved with the OpenBayan community.
			</p>

			<div class="grid gap-8 md:grid-cols-2">
				<div class="border border-gray-200 p-6">
					<h3 class="mb-3 text-lg font-semibold text-gray-900">Submit a project</h3>
					<p class="mb-4 text-gray-600">
						Share your technology project with the community and help others discover your work.
					</p>
					<a
						href="/submit"
						class="inline-flex items-center bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700"
					>
						Submit project
					</a>
				</div>

				<div class="border border-gray-200 p-6">
					<h3 class="mb-3 text-lg font-semibold text-gray-900">Contribute to projects</h3>
					<p class="mb-4 text-gray-600">
						Browse our directory and find projects where you can contribute your skills and
						expertise.
					</p>
					<a
						href="/directory"
						class="inline-flex items-center border border-gray-300 px-4 py-2 font-medium text-gray-700 transition-colors hover:border-gray-400 hover:bg-gray-50"
					>
						Browse projects
					</a>
				</div>
			</div>
		</div>
	</div>
</section>
