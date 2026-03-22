---
title: "Layer 7"
summary: "A community‑driven scanner that helps Filipinos check if links, messages, or screenshots might be scams."
description: |
  Layer 7 is a free, community‑driven web app that helps people quickly check if a link, text message, or screenshot looks like a scam or phishing attempt. It combines security feeds, simple AI heuristics, and anonymous user reports to give a clear 0–10 risk score plus plain‑language guidance.

  The project is built for everyday Filipinos who regularly receive suspicious SMS, chat messages, and social media links, but don’t have access to enterprise‑grade security tools. Instead of asking users to “just be careful,” Layer 7 gives them a fast, visual check: paste a URL, message, or upload a screenshot and see whether it looks solid, suspicious, or dangerous.

  What makes Layer 7 special is that it treats the community as part of the defense layer. Anonymous feedback (“safe”, “suspicious”, “phishing”) is stored in Supabase and fed back into the scoring logic, so repeated reports on the same scam increase the risk score and future users benefit from earlier victims’ experience. The app also exposes transparent metrics—scans per day, risk distribution, Safe Browsing hit rate, and community reports—through an open dashboard.

# Project URLs
repository: "https://github.com/rockyru/spam-check"
website: "https://spam-check-eta.vercel.app"
demo: "https://spam-check-eta.vercel.app"

# Project Details
license: "MIT"
status: "development"
dateAdded: "2026-03-22"

# People
maintainers:
  - "github.com/rockyru"

# Categorization
sectors:
  - "Technology"
  - "Education"

tags:
  - "web-app"
  - "civic-tech"
  - "security"
  - "anti-phishing"
  - "community-driven"

# Social Impact
impact: |
  Layer 7 helps Filipinos avoid financial loss and account takeovers from SMS scams, fake delivery messages, and phishing links that are now common across telco, banking, and e‑wallet channels. Many users are not security experts; they just want a quick way to ask “legit ba ito?” before clicking.

  By making a free, no‑login scanner that works with links, plain text, and screenshots, the project lowers the barrier to getting a second opinion on suspicious content. The tool is especially useful for students, gig workers, small online sellers, and families who regularly transact via GCash, bank apps, and social platforms where scammers are active.

  The community‑driven feedback loop means that once a scam is reported by one user, it becomes easier for others to avoid it. Anonymous reports are aggregated into a separate “community risk” score that can boost the overall rating for known scams without exposing any personal data. Over time, this creates an open, living memory of scams seen in the wild, which can be reused for education, research, and better public awareness.

  Because the backend is built with FastAPI and Supabase and the frontend is a Vite/React app, Layer 7 is straightforward for other developers to self‑host, extend, or integrate into training materials and awareness campaigns. The project aims to be a reusable building block for local cyber‑hygiene initiatives, not just a single hosted service.
---

