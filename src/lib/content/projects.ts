import type { Component } from 'svelte';
import verifiedLogins from '../../../content/verified-members.json';
import {
	isVerified,
	projectOwner,
	type ProjectFrontmatter,
	type UpdateFrontmatter
} from './schema';

export type Project = Omit<ProjectFrontmatter, 'dateAdded' | 'lastUpdated'> & {
	slug: string;
	dateAdded: string;
	lastUpdated?: string;
	owner?: string;
	/** True when the owner is on the list of verified BetterGov volunteers. */
	verified: boolean;
};

export type Update = Omit<UpdateFrontmatter, 'date'> & {
	id: string;
	date: string;
	projectSlug: string;
	projectTitle: string;
};

type ProjectFile = { metadata: ProjectFrontmatter; default: Component };
type UpdateFile = { metadata: UpdateFrontmatter };

const projectFiles = import.meta.glob<ProjectFile>('/content/projects/*/index.md', { eager: true });
const updateFiles = import.meta.glob<UpdateFile>('/content/updates/*/*.md', { eager: true });

function toIsoDate(value: string): string {
	return new Date(value).toISOString().slice(0, 10);
}

function toProject(path: string, frontmatter: ProjectFrontmatter): Project {
	const owner = projectOwner(frontmatter);
	return {
		...frontmatter,
		slug: path.split('/').at(-2) ?? '',
		tags: frontmatter.tags ?? [],
		maintainers: frontmatter.maintainers ?? [],
		dateAdded: toIsoDate(frontmatter.dateAdded),
		lastUpdated: frontmatter.lastUpdated ? toIsoDate(frontmatter.lastUpdated) : undefined,
		owner,
		verified: isVerified(owner, verifiedLogins)
	};
}

const projects = Object.entries(projectFiles)
	.map(([path, file]) => toProject(path, file.metadata))
	.sort(
		(a, b) =>
			Number(b.featured ?? false) - Number(a.featured ?? false) ||
			b.dateAdded.localeCompare(a.dateAdded) ||
			a.title.localeCompare(b.title)
	);

const updates = Object.entries(updateFiles)
	.map(([path, file]): Update => {
		const projectSlug = path.split('/').at(-2) ?? '';
		const project = projects.find((candidate) => candidate.slug === projectSlug);
		return {
			...file.metadata,
			id: `${projectSlug}/${path.split('/').at(-1)?.replace(/\.md$/, '')}`,
			date: toIsoDate(file.metadata.date),
			projectSlug,
			projectTitle: project?.title ?? projectSlug
		};
	})
	.sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id));

/** Featured projects first, then newest first. */
export function getAllProjects(): Project[] {
	return projects;
}

/** Newest first. */
export function getAllUpdates(): Update[] {
	return updates;
}

export function getProject(slug: string) {
	const project = projects.find((candidate) => candidate.slug === slug);
	if (!project) return null;
	return {
		project,
		Body: projectFiles[`/content/projects/${slug}/index.md`].default,
		updates: updates.filter((update) => update.projectSlug === slug)
	};
}

/** GitHub logins compare without case, so `JHNLWHD` and `jhnlwhd` are one owner. */
export function getProjectsByOwner(login: string): Project[] {
	return projects.filter((project) => project.owner?.toLowerCase() === login.toLowerCase());
}
