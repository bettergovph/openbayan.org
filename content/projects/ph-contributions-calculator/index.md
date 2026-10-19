---
title: "Philippine Contributions Calculator"
summary: "A free website, REST API, and TypeScript library for Philippine statutory contributions, starting with SSS and growing to cover PhilHealth and Pag-IBIG."
description: |
  The Philippine Contributions Calculator is building a single, open and verifiable home for the mandatory contributions every Filipino worker and employer deals with: SSS, PhilHealth, and Pag-IBIG (HDMF). Today it fully covers SSS. PhilHealth and Pag-IBIG are next, and will be added with the same approach.

  Statutory contribution rules are published as circulars and PDF tables that change over time and differ by membership type. Working out the right amount usually means finding the right document, the right bracket, and the right effective date. This project turns those official sources into structured, tested, versioned data, and exposes them three ways: a no-install website, a free read-only REST API that needs no registration or key, and a JavaScript/TypeScript library. Every result shows the official source it came from, and amounts are handled as integer centavos to avoid rounding errors.

  SSS is live now. It includes all five official table groups for 2023 and 2025 (10 schedules, 572 rows), seven membership types, and a reverse lookup that traces a payslip deduction back to the implied monthly salary credit. The next phase adds PhilHealth premium contributions with the employer/employee split, and Pag-IBIG Fund monthly savings for employees, employers, and individually paying members, each verified against official sources the way the SSS tables are. The longer-term goal is one consistent data model and API across all three agencies, so a developer or employer can calculate a worker's full statutory deductions in one place.

# Project URLs
repository: "https://github.com/jpabellon/ph-contributions-calculator"
website: "https://jpabellon.github.io/ph-contributions-calculator/"
demo: "https://jpabellon.github.io/ph-contributions-calculator/webapicalculator/"

# Project Details
license: "MIT"
status: "beta"
dateAdded: "2026-10-20"

# People
maintainers:
  - "jpabellon"

# Categorization
sectors:
  - "Government"
  - "Finance"
  - "Technology"

tags:
  - "web-app"
  - "api"
  - "open-data"
  - "civic-tech"
  - "sss"
  - "philhealth"
  - "pag-ibig"
  - "payroll"
  - "typescript"

# Social Impact
impact: |
  Employers, HR and payroll staff, household employers, freelancers, OFWs, and voluntary members often have to dig through official PDF tables to find the right contribution amount, and do it separately for each agency. This project aims to give them a free, accurate, source-linked way to calculate SSS, PhilHealth, and Pag-IBIG contributions, and to check payslip deductions against them.

  For developers, a free API with no registration means payroll tools, budgeting apps, and remittance checkers can be built without parsing circulars by hand. Because the data is open and versioned, rate changes can be reviewed and corrected in public instead of being buried in closed software.
---

SSS coverage is available today. PhilHealth and Pag-IBIG are planned, and the project does not yet claim to calculate them.
