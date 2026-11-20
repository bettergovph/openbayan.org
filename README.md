# OpenBayan

OpenBayan is a community-led directory of civic tech for the Philippines. People share projects, post progress on them, and find something to help build. The site is at [openbayan.org](https://openbayan.org).

It is not an official government website. It is run by volunteers from [BetterGov.ph](https://bettergov.ph).

## Share a project or post an update

Use the forms at [openbayan.org/submit](https://openbayan.org/submit). You need a GitHub account and nothing else. If you do not have one, email contact@openbayan.org.

1. The form opens a GitHub issue with your answers filled in.
2. A GitHub Action reads the issue and opens a pull request that adds one file under `content/`.
3. A maintainer reviews the pull request and merges it.
4. The issue closes and the site rebuilds with your entry.

If an answer does not pass the checks, the Action comments on the issue and says what to fix. Edit the issue and it runs again.

You can also open a pull request by hand. Copy an existing folder in `content/projects/` and change the fields.

## Content

| Path                                       | What it holds                                                                                        |
| ------------------------------------------ | ---------------------------------------------------------------------------------------------------- |
| `content/projects/<slug>/index.md`         | One project. The fields are in the frontmatter, and any Markdown below it shows on the project page. |
| `content/updates/<slug>/<date>-<issue>.md` | One progress update for the project with that slug.                                                  |
| `content/verified-members.json`            | GitHub usernames of verified BetterGov volunteers.                                                   |

The fields and their limits are defined in `src/lib/content/schema.ts`. The tests check every file in `content/` against it.

### Owners

Each project has one owner, a GitHub username. For a submission made through the form, the owner is the account that opened the issue. For older entries with no `owner` field, it is the GitHub account in `repoUrl`. Each owner gets a page at `/people/<username>`.

### Verified volunteers

A project shows a verified mark when its owner is listed in `content/verified-members.json`. There is no volunteer portal to check against yet, so maintainers confirm membership by hand:

1. Confirm the person is a current BetterGov volunteer.
2. Add their GitHub username to `content/verified-members.json` in a pull request.

The submission Action never edits that file.

## For maintainers reviewing a submission

Pull requests from the Action come from a branch named `submission/issue-<number>`. Before you merge one, check that the links work, the text is fit to publish, and the note about the owner in the pull request description is right.

GitHub does not start workflows for pull requests that an Action opens, so the Code Quality check does not run on them by itself. The Action has already checked the fields. To run the full check, close and reopen the pull request.

## Develop

The site is built with SvelteKit and Tailwind CSS, and uses pnpm.

```sh
pnpm install
pnpm dev
```

Before you push, run every check with one command. CI runs the same one.

```sh
pnpm verify
```

The design follows [about.bettergov.ph](https://about.bettergov.ph). The tokens and shared classes are in `src/app.css`.
