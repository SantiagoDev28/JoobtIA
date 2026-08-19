# Visión del producto — JoobtIA

**Versión:** 0.2  
**Fecha:** 2026-08-03  
**Estado:** Aceptada para MVP personal (pivote respecto a v0.1)  
**Idioma de docs/UI:** Español · **Código/ADRs:** Inglés  
**Cambio clave v0.2:** Se abandona la automatización de recolección de vacantes. El producto pasa a ser un **copiloto de preparación y gestión** alimentado por vacantes que el usuario guarda manualmente.

---

## 1. ¿Qué es JoobtIA?

JoobtIA es un **copiloto inteligente para candidatos**: un CRM personal de búsqueda de empleo potenciado con IA. El usuario encuentra vacantes donde ya busca (LinkedIn, Computrabajo, Indeed, etc.), las guarda en la plataforma y JoobtIA le ayuda a **organizarlas, analizarlas, adaptar materiales y prepararse** para cada proceso.

No busca vacantes en internet. No scrapea portales. No envía postulaciones masivas.

---

## 2. Historia y justificación (portfolio + entrevistas)

**Problema real:** el cuello de botella no era “encontrar vacantes”, sino organizarlas, medir compatibilidad, preparar CV/carta y entrenar para entrevistas técnicas según cada oferta.

**Respuesta de entrevista (versión canónica):**

> Estaba buscando mi primer empleo como desarrollador y me di cuenta de que el problema no era encontrar vacantes, sino organizarlas, analizarlas y prepararme mejor para cada proceso. Así que construí una herramienta que me ayudara a hacerlo.

Esa historia es auténtica, demuestra NLP, diseño de sistemas, arquitectura, integración con IA y UX, y evita dependencias legales dudosas.

> Justificación corta (README/portfolio): *Construí un copiloto de búsqueda de empleo con IA para organizar vacantes, medir fit, optimizar postulaciones y prepararme para entrevistas — nacido de mi propia búsqueda como junior.*

---

## 3. Usuario del MVP

| Aspecto | Definición MVP |
|--------|----------------|
| Audiencia | Un solo usuario: el autor |
| Rol objetivo | Desarrollador junior (frontend, backend o full stack) |
| Experiencia | ~6 meses profesionales |
| Stack declarado | NestJS, React, TypeScript, PostgreSQL, Docker |
| Perfil fuente | `personal-data/CV_Santiago_Hurtado.pdf` (+ versiones optimizadas por oferta) |
| Ubicación | Bogotá, Colombia (remoto o presencial) |
| Salario | No es filtro |
| Idioma UI | Español |

---

## 4. Objetivo de éxito

**Métrica primaria:** tiempo hasta **conseguir un empleo junior** (oferta aceptada), usando JoobtIA como herramienta diaria de preparación.

**Métricas de proceso:**

- Vacantes guardadas y en cada estado del pipeline
- Scores de compatibilidad (distribución / promedio)
- CVs optimizados y cartas generadas / usadas
- Sesiones de prep de entrevista completadas
- Entrevistas conseguidas vs. postulaciones enviadas
- Tecnologías más frecuentes en ofertas guardadas vs. cobertura del plan de estudio

---

## 5. Módulos del producto

| # | Módulo | Qué hace |
|---|--------|----------|
| 1 | **CRM de vacantes** | Alta manual (pegar texto/URL/notas), estados, notas, recordatorios |
| 2 | **Análisis de compatibilidad** | Score + explicación (junior, stack, gaps) vía LangChain |
| 3 | **Optimización de CV** | Variante del CV orientada a *esa* oferta (humano aprueba) |
| 4 | **Cartas de presentación** | Borrador personalizado editable |
| 5 | **Prep de entrevistas** | Preguntas técnicas / behavioral según la vacante + guías de respuesta |
| 6 | **Estadísticas** | Embudo del proceso, tiempos, tasas de respuesta |
| 7 | **Plan de estudio** | Prioriza tecnologías que más aparecen en las ofertas *que tú guardas* |

### Pipeline de estados (CRM)

`saved → scored → drafted → applied → interview → offer | rejected`

(Puede refinarse en requisitos: p. ej. `cv_optimized` como subpaso de `drafted`.)

---

## 6. Alcance MVP vs. posterior

### MVP “usable lo antes posible” (Must)

Orden sugerido para valor inmediato en la búsqueda real:

1. CRM: crear/listar/actualizar vacantes + estados  
2. Perfil base desde CV (PDF → texto estructurado)  
3. Análisis de compatibilidad  
4. Carta de presentación  
5. Optimización de CV por oferta (diff o versión exportable)  

### Should (mismo producto, justo después del Must)

6. Prep de entrevistas técnicas por vacante  
7. Estadísticas básicas del embudo  

### Could (refuerzo portfolio / aprendizaje continuo)

8. Plan de estudio personalizado a partir de skills extraídas de vacantes guardadas  

### Explicitamente fuera

- Scraping o crawling de LinkedIn / Indeed / Computrabajo  
- Integraciones que violen ToS de portales  
- Auto-apply / envío masivo  
- Multi-tenant / app móvil / monetización (por ahora)  

La investigación previa de APIs/scrapers queda como **contexto histórico** en `docs/research/job-sources.md` (decisión: no automatizar recolección).

---

## 7. Principios de diseño

1. **El usuario trae la vacante** — JoobtIA no caza ofertas en la web.  
2. **Humano en el loop** — IA propone; el usuario edita, aprueba y postula.  
3. **Preparación > automatización riesgosa** — valor en análisis, materiales y estudio.  
4. **Trazabilidad** — guardar score, gaps, prompts/contexto usado (portfolio + mejora).  
5. **Legal y sostenible** — cero dependencia de scrapers como feature.  
6. **Portfolio-first** — ADRs en inglés; producto/docs UI en español.  
7. **Stack = demostración y dominio del perfil** — NestJS, React, TS, PostgreSQL, Docker, LangChain.js (ADR 0002). Python queda fuera de este repo a propósito.

---

## 8. Criterio de MVP usable

El usuario puede, en un ciclo de una vacante real:

1. Pegar/guardar la oferta  
2. Ver compatibilidad con explicación  
3. Generar carta + CV optimizado (editables)  
4. Marcar `applied` y seguir el estado  

Con eso ya ayuda a la búsqueda. Prep de entrevistas, stats y plan de estudio completan el relato de producto sin bloquear el día 1.

---

## 9. Relación con v0.1 (pivote)

| Tema | v0.1 | v0.2 |
|------|------|------|
| Ingesta | Híbrida (manual + APIs Remotive/etc.) | **Solo manual** (CRM) |
| CV por oferta | Diferido (≥2 semanas sin entrevistas) | **Módulo core** |
| Prep entrevistas | No | **Sí** |
| Plan de estudio | No | **Sí** (Could → Should según capacidad) |
| Historia portfolio | “Analiza vacantes y prepara postulaciones” | “Organizar, analizar y prepararme mejor” |

---

## 10. Próximos artefactos

| Orden | Artefacto | Estado |
|------|-----------|--------|
| 1 | Visión | v0.2 (este doc) |
| 2 | Research fuentes | Actualizado: no-automatización |
| 3 | ADR 0001 — sourcing / product pivot | accepted |
| 4 | ADR 0002 — NestJS/TS stack (no Python) | accepted |
| 5 | Requisitos (MoSCoW por módulo) | Mini-specs en `docs/sprints.md` |
| 6 | Arquitectura + LangChain.js | Pendiente (S3+) |
| 7 | Modelo de datos | Empieza en S1 (`Job`) |
| 8 | API | Empieza en S0 (`/health`) y S1 (`/jobs`) |
| 9 | Código | **Tú**; guía en `docs/sprints.md` |

---

## 11. Decisiones abiertas

- Nombre comercial: ¿mantener **JoobtIA** o adoptar algo tipo “JobPilot AI”?  
- Formato de salida del CV optimizado (Markdown, DOCX, PDF)  
- Proveedor LLM y presupuesto  
- Embeddings/RAG vs. prompts con perfil + vacante en contexto  
- Granularidad del plan de estudio (skills → recursos → checklist semanal)
