# Visión del producto — JoobtIA

**Versión:** 0.1  
**Fecha:** 2026-08-03  
**Estado:** Aceptada para MVP personal  
**Idioma de docs/UI:** Español · **Código/ADRs:** Inglés

---

## 1. ¿Qué es JoobtIA?

JoobtIA es un **copiloto de búsqueda de empleo** para un desarrollador full stack junior. Centraliza vacantes, las analiza con IA frente al perfil del usuario, prepara postulaciones asistidas y lleva el seguimiento de cada aplicación.

No es un bot de envío masivo. El humano decide; la IA acelera y mejora la calidad de cada decisión.

---

## 2. Contexto y justificación

El autor está buscando empleo como desarrollador junior (~6 meses de experiencia profesional). El proceso manual (buscar, filtrar, evaluar fit, redactar) consume tiempo y genera ruido. JoobtIA existe primero para **acortar el tiempo hasta obtener un nuevo empleo junior**, y en paralelo como proyecto de portfolio que documenta decisiones arquitectónicas (ADRs), uso de LangChain e integración de IA.

> Justificación pública (portfolio): *Como estaba buscando empleo, desarrollé una plataforma que analiza vacantes, las compara con mi perfil y prepara postulaciones asistidas por IA.*

---

## 3. Usuario del MVP

| Aspecto | Definición MVP |
|--------|----------------|
| Audiencia | Un solo usuario: el autor |
| Rol objetivo | Desarrollador junior (frontend, backend o full stack) |
| Experiencia | ~6 meses profesionales; junior es el filtro principal |
| Stack declarado | NestJS, React, TypeScript, PostgreSQL, Docker |
| Perfil fuente | `personal-data/CV_Santiago_Hurtado.pdf` (extraíble a texto) |
| Ubicación | Bogotá, Colombia (acepta remoto o presencial) |
| Salario | No es filtro en el MVP |
| Idioma UI | Español |

**Nota de perfil:** El CV indica experiencia full stack (NestJS/React/TS + formación en Java/Spring). Ofertas *solo frontend* o *solo backend* junior son igualmente válidas.

---

## 4. Objetivo de éxito (métrica norte)

**Métrica primaria:** tiempo calendario desde el arranque usable del MVP hasta **conseguir un empleo junior** (oferta aceptada o contrato firmado).

**Métricas de proceso (semanales):**

- Vacantes ingeridas / evaluadas
- % con score de compatibilidad alto (umbral a definir en requisitos)
- Borradores de postulación generados
- Postulaciones enviadas
- Respuestas / entrevistas conseguidas

---

## 5. Alcance del MVP

### Incluye

1. **Perfil del candidato** cargado desde CV (PDF → texto estructurado) + preferencias mínimas (junior, stack, FE/BE/FS).
2. **Ingesta de vacantes** con estrategia híbrida (ver `docs/research/job-sources.md`):
   - Fase A: pegar URL o texto manual + APIs públicas legales (Remotive, RemoteOK, etc.)
   - Fase B: evaluar fuentes LatAm / scrapers solo con ADR y límites claros
3. **Scoring de compatibilidad** con IA (LangChain) orientado a junior + overlap de stack.
4. **Borrador de postulación** (carta / mensaje personalizado) **sin adaptar el CV** en la primera fase.
5. **Pipeline de estados:**

   `saved → scored → drafted → applied → interview → offer | rejected`

6. **UI mínima** en español para revisar scores, editar borradores y actualizar estados.

### Fuera de alcance (MVP)

- Multi-usuario / multi-tenant
- Envío automático a portales (LinkedIn Easy Apply, etc.)
- Adaptación de CV (activable solo si pasan **≥ 2 semanas** sin entrevistas satisfactorias)
- App móvil
- Scraping agresivo a escala de LinkedIn/Indeed sin estrategia legal y operativa documentada
- Monetización

---

## 6. Principios de diseño

1. **Humano en el loop** — la IA sugiere; el usuario aprueba y envía.
2. **Velocidad al empleo** — cada feature se justifica por reducir tiempo a entrevista/oferta.
3. **Perfil como fuente de verdad** — el CV y las preferencias alimentan scoring y textos.
4. **Trazabilidad** — guardar por qué un score y qué contexto usó el modelo (portfolio + debug).
5. **Legalidad antes que cobertura** — preferir APIs oficiales/públicas; scraping solo con ADR y riesgo aceptado.
6. **Documentación portfolio-first** — visión, requisitos, arquitectura y ADRs en inglés para decisiones técnicas; UI/docs de producto en español.
7. **Stack alineado al CV** — NestJS + React + TypeScript + PostgreSQL + Docker, para que el propio producto demuestre el perfil.

---

## 7. Criterio de “MVP usable lo antes posible”

El MVP está listo cuando el usuario puede, en un flujo diario:

1. Ingresar o sincronizar vacantes junior relevantes  
2. Ver un score de fit con explicación breve  
3. Generar un borrador de postulación editable  
4. Marcar `applied` y seguir hasta `interview` / `offer` / `rejected`

Sin autenticación compleja multi-usuario; despliegue local con Docker es suficiente al inicio.

---

## 8. Evolución post-MVP (no comprometer ahora)

- Adaptación de CV si no hay entrevistas en ≥ 2 semanas  
- Más fuentes LatAm (Computrabajo vía integración controlada)  
- Alertas (email/Telegram) de vacantes nuevas con score alto  
- Generalización a más usuarios (solo si el experimento personal ya cumplió el objetivo)

---

## 9. Próximos artefactos

| Orden | Artefacto | Estado |
|------|-----------|--------|
| 1 | Visión (`docs/vision.md`) | Este documento |
| 2 | Investigación de fuentes (`docs/research/job-sources.md`) | Siguiente |
| 3 | Requisitos funcionales / no funcionales | Pendiente |
| 4 | Arquitectura + LangChain | Pendiente |
| 5 | ADRs | Pendiente |
| 6 | Modelo de datos | Pendiente |
| 7 | Diseño de API | Pendiente |
| 8 | Código | Pendiente |

---

## 10. Decisiones abiertas (para requisitos / ADRs)

- Umbral numérico de “score alto” para priorizar postulaciones  
- País/mercado primario de búsqueda (CO local + remoto global)  
- Proveedor LLM y presupuesto de tokens  
- Si el perfil vive solo en DB o también como embeddings (RAG)
