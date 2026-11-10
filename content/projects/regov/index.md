---
title: 'RE:GOV'
summary: 'An AI agent that crawls a legacy Philippine government website and rebuilds it as an accessible concept site on the BetterGov.ph Kapwa design system, with a migration report.'
description: |
  RE:GOV (Reimagine Government) takes the address of any .gov.ph or .edu.ph website and, in a few minutes, produces a modern concept of that site built on Kapwa, the BetterGov.ph design system. The agent crawls the public pages politely, falls back to the Wayback Machine when a site is behind bot protection, reads every page with Meta Muse Spark into a typed content model, segments the old homepage with SAM 3.1 to extract the agency seal, and paints an identity band with Muse Image from a brief about the real place and mandate.

  The rebuilt site keeps the agency's content and structure: services, offices, people, news, downloads and contacts, re-planned into a service-first navigation with mega menus, site search, emergency hotlines from the BetterGov hotlines data, Open-Meteo weather for local government units, and a transparency section linking to the Official Gazette, FOI and the Open Data Portal. Every rebuild comes with a migration report that lists what moved, what broke, the accessibility findings a screen reader would hit on the old site, and the items that need a human editor.

  Every output is an unofficial concept for demonstration and discussion. It is marked as such on every page and in its metadata, and it is not operated by, endorsed by, or affiliated with any agency. RE:GOV is a solo entry to the Meta Global AI Developer Hackathon 2026 (Indie track).

# Project URLs
repository: 'https://github.com/rockyru/regov'
website: 'https://regov.app'
demo: 'https://regov.app/showcase'

# Project Details
license: 'MIT'
status: 'beta'
dateAdded: '2026-10-27'

# People
maintainers:
  - 'rockyru'

# Categorization
sectors:
  - 'Government'
  - 'Technology'
  - 'Education'

tags:
  - 'web-app'
  - 'ai-agent'
  - 'civic-tech'
  - 'accessibility'
  - 'design-system'
  - 'kapwa'
  - 'government-websites'
  - 'nextjs'
  - 'typescript'

# Social Impact
impact: |
  Thousands of Philippine public-sector websites, from municipalities to state universities, still run on templates from the early 2010s: no mobile layout, image-only announcements, broken links, and pages a screen reader cannot read. Agencies rarely have the budget or staff for a redesign, and a manual migration of even a small site takes weeks.

  RE:GOV shows an agency what its site could look like on the national Kapwa standard in minutes, using its own content, and hands back a concrete report of accessibility and content problems to fix on the real site. For citizens, the showcase makes the gap between today's portals and a modern standard visible and specific. For developers and civic-tech volunteers, the open source pipeline is a starting point for migration tools, audits, and Kapwa adoption.
---

Generated sites are unofficial concepts; agency names, seals and content belong to their respective institutions. The live instance limits concurrent runs and rate-limits submissions, and every site in the showcase was built from public pages or a Wayback Machine capture.
