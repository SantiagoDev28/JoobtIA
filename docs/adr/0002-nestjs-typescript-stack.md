# ADR 0002: NestJS + TypeScript as the implementation stack

**Date:** 2026-08-18  
**Status:** accepted  
**Deciders:** Santiago Hurtado  
**Related:** `docs/vision.md` v0.2, ADR 0001  

## Context

JoobtIA is both a personal job-search tool and a portfolio project. The author's target junior roles (frontend, backend, or full stack) ask for NestJS, React, TypeScript, PostgreSQL, and Docker. The product's AI features (compatibility, CV/cover generation, interview prep) would also fit Python, where LangChain is more mature.

Python was considered mainly as a learning opportunity, not because NestJS cannot support the domain.

## Decision

Build JoobtIA in **NestJS + TypeScript** (backend), **React + TypeScript** (frontend), **PostgreSQL**, and **Docker**. Use **LangChain.js** (or the equivalent JS/TS LLM orchestration layer) for AI workflows.

Python is deferred as a personal learning track **outside** this repo. Depth in the declared stack beats collecting another backend language during an active junior job search.

## Alternatives considered

1. **Python (FastAPI) + LangChain (Python)** — Best native AI ecosystem; weaker demonstration of NestJS, which is the stack to master for current applications. Rejected for this project.  
2. **Hybrid (NestJS API + Python AI worker)** — Clean separation, more moving parts than a personal MVP needs. Rejected for now.  
3. **FastAPI + React** — Keeps frontend proof, still dilutes NestJS mastery. Rejected.  
4. **NestJS + React + TypeScript** — Aligns product, CV, and learning goal. **Accepted.**

## Consequences

### Positive

- The flagship repo proves the same stack the author is applying with.  
- Faster delivery of a usable MVP (existing NestJS/React muscle memory).  
- Interview story stays consistent: architecture and LangChain *on* the stack they already use.  
- One backend to deepen (modules, DI, hexagonal/clean boundaries, testing) instead of splitting focus.

### Negative / trade-offs

- LangChain.js is thinner than the Python ecosystem; some RAG/document patterns may need more custom glue.  
- PDF parsing and NLP utilities are less “batteries included” than in Python (mitigation: proven Node libraries, e.g. `pdf-parse`, plus structured LLM output).  
- Learning Python is postponed; that is intentional.

### Follow-ups

- ADR for LLM provider (OpenAI, Anthropic, local, etc.).  
- ADR for how LangChain.js is isolated behind a domain port (so the rest of NestJS stays framework-agnostic).  
- Requirements MoSCoW, then architecture notes for NestJS module boundaries.
