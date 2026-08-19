# JoobtIA

Copiloto inteligente para candidatos: CRM personal de búsqueda de empleo con IA.

> Estaba buscando mi primer empleo como desarrollador y me di cuenta de que el problema no era encontrar vacantes, sino organizarlas, analizarlas y prepararme mejor para cada proceso. Así que construí una herramienta que me ayudara a hacerlo.

## Qué hace

El usuario **guarda** las vacantes que encuentra en cualquier portal. JoobtIA ayuda a:

1. Gestionarlas (CRM + estados)  
2. Analizar compatibilidad con el perfil  
3. Optimizar el CV por oferta  
4. Generar cartas de presentación  
5. Preparar entrevistas técnicas  
6. Ver estadísticas del proceso  
7. Armar un plan de estudio según las tecnologías que más aparecen en *tus* ofertas guardadas  

**No scrapea** LinkedIn, Indeed ni Computrabajo. La vacante la trae el usuario.

## Estado actual

Fase de **definición arquitectónica** (visión → requisitos → arquitectura/LangChain → ADRs → datos → API → código).

| Artefacto | Ruta | Estado |
|-----------|------|--------|
| Visión | [`docs/vision.md`](docs/vision.md) | **v0.2** |
| Fuentes / pivote legal | [`docs/research/job-sources.md`](docs/research/job-sources.md) | v0.2 |
| ADR 0001 | [`docs/adr/0001-manual-job-intake-only.md`](docs/adr/0001-manual-job-intake-only.md) | accepted |
| ADR 0002 | [`docs/adr/0002-nestjs-typescript-stack.md`](docs/adr/0002-nestjs-typescript-stack.md) | accepted |
| Sprints | [`docs/sprints.md`](docs/sprints.md) | S0–S8 (tú programas) |
| Requisitos | embebidos por sprint en `docs/sprints.md` | vivo |
| Código | — | A partir de Sprint 0, a mano |

## Stack objetivo (MVP)

- **Backend:** NestJS + TypeScript  
- **Frontend:** React + TypeScript  
- **DB:** PostgreSQL  
- **Infra local:** Docker  
- **IA:** LangChain.js (+ LLM a decidir en ADR)

## Datos personales

El CV vive en `personal-data/` y **no** debe versionarse en remoto público. Ver `.gitignore`.

## Idiomas

- UI y documentación de producto: **español**  
- Código, comentarios técnicos y ADRs: **inglés**
