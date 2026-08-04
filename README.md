# JoobtIA

Copiloto de búsqueda de empleo con IA para un desarrollador full stack junior.

> Como estaba buscando empleo, desarrollé una plataforma que analiza vacantes, las compara con mi perfil y prepara postulaciones asistidas por IA.

## Estado actual

Fase de **definición arquitectónica** (visión → requisitos → arquitectura/LangChain → ADRs → datos → API → código).

| Artefacto | Ruta | Estado |
|-----------|------|--------|
| Visión | [`docs/vision.md`](docs/vision.md) | v0.1 |
| Fuentes de vacantes | [`docs/research/job-sources.md`](docs/research/job-sources.md) | v0.1 |
| ADRs | [`docs/adr/`](docs/adr/) | Plantilla lista |
| Requisitos | — | Pendiente |
| Código | — | Pendiente |

## Stack objetivo (MVP)

- **Backend:** NestJS + TypeScript  
- **Frontend:** React + TypeScript  
- **DB:** PostgreSQL  
- **Infra local:** Docker  
- **IA:** LangChain (+ LLM a decidir en ADR)

## Datos personales

El CV vive en `personal-data/` y **no** debe versionarse en remoto público. Ver `.gitignore`.

## Idiomas

- UI y documentación de producto: **español**  
- Código, comentarios técnicos y ADRs: **inglés**
