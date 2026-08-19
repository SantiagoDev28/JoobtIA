# ADR 0001: Manual job intake only (product pivot)

**Date:** 2026-08-03  
**Status:** accepted  
**Deciders:** Santiago Hurtado  
**Related:** `docs/vision.md` v0.2, `docs/research/job-sources.md` v0.2  

## Context

The first vision (v0.1) explored hybrid job ingestion: manual paste plus public APIs (Remotive/RemoteOK) and, later, possible LatAm scrapers. Research showed that LinkedIn, Indeed, and Computrabajo do not offer a clean candidate-facing search API; automation tends to violate terms of service or depend on fragile scrapers.

Meanwhile, the real bottleneck in a junior job search is not discovering listings, but organizing them, measuring fit, preparing CV/cover materials, and studying for interviews. Building a scraper-centric product adds legal/operational risk and weakens the portfolio narrative.

## Decision

JoobtIA will **not** automate collection of job postings from third-party portals (no scrapers, no crawl agents, no Remotive/RemoteOK connectors in the MVP).

Job data enters the system **only through explicit user action** (paste text, optional URL as reference, notes, file upload). The product is a **candidate copiloto / personal CRM** with AI modules: compatibility, CV optimization, cover letters, interview prep, statistics, and a study plan derived from skills in *user-saved* jobs.

## Alternatives considered

1. **Hybrid ingestion (manual + public remote APIs)** — Legally safer than scrapers, but shifts the product toward “job aggregator” and dilutes the authentic story. Rejected for v0.2.  
2. **Scraper / third-party scrape APIs (Apify, etc.)** — Coverage for LatAm, high ToS and maintenance risk. Rejected.  
3. **Manual intake only** — Slightly more friction to add jobs; maximum clarity, safety, and portfolio alignment. **Accepted.**

## Consequences

### Positive

- Clear, interview-friendly product story.  
- No dependency on brittle portal HTML or ToS gray areas.  
- Architecture focuses on NLP/AI workflows and domain modeling (applications, artifacts, skills).  
- Faster path to a useful personal tool.

### Negative / trade-offs

- User must copy/paste jobs (mitigation: good UX; optional later bookmarklet that only submits user-visible content).  
- No automatic “new jobs” alerts from the web (out of scope by design).

### Follow-ups

- Requirements MoSCoW for the seven product modules.  
- Domain model: JobApplication, CompatibilityReport, GeneratedDocument, InterviewPrep, SkillInsight.  
- Future ADR only if a *explicitly legal* connector is reconsidered (e.g. Remotive) as an optional add-on — not as the core value proposition.
