# Plan de sprints — JoobtIA

**Para:** Santiago (tú programas; el senior guía)  
**Regla:** no pedir implementación completa al asistente. Traer *tu* diseño, dudas puntuales y diffs.  
**Ritmo:** cada sprint es un corte usable, no “terminar NestJS”. Si un sprint se alarga, **no empieces el siguiente**.  
**Tamaño:** 3–6 sesiones de 1–2 h. El calendario no importa; el criterio de hecho sí.

---

## Cómo trabajar (contrato junior ↔ senior)

1. **Tú escribes el código.** El senior no genera archivos de app salvo que lo pidas explícitamente.  
2. Antes de codear un sprint: lee “Conceptos” y anota 3 dudas.  
3. Durante el sprint: un módulo a la vez. Si algo no es de *este* sprint, anótalo en `docs/backlog.md` (créalo cuando haga falta) y sigue.  
4. Al terminar: checklist de “Hecho” en verde. Entonces pide revisión: *qué archivos tocaste, qué decisión te dolió, qué harías distinto*.  
5. ADRs solo cuando la decisión no se pueda deshacer barato (stack, LLM, Prisma vs TypeORM). Un `enum` de estados no necesita ADR el día 1.

**No hagas ahora:** auth multi-usuario, scraping, LangChain, tests E2E, CI perfecto, hexagonal “de libro”.

---

## Mapa (para no perder el norte)

```text
S0  Cimientos (repo, Docker, API hola, UI hola)
S1  CRM de vacantes          ← Must 1  ★ empiezas a USARLO
S2  Perfil desde CV
S3  Compatibilidad (primero reglas; LLM después)
S4  Carta de presentación
S5  CV por oferta            ← aquí el MVP usable de la visión
S6  Prep entrevistas
S7  Estadísticas
S8  Plan de estudio
```

Los sprints 0–5 son el camino. 6–8 son Should/Could: solo si ya usas el CRM en tu búsqueda real.

---

## Sprint 0 — Cimientos

**Objetivo:** poder levantar API + Postgres + frontend vacío en tu máquina.

**Por qué ahora:** sin esto, cada feature pelea con el entorno. Dominar NestJS empieza por *un* módulo que arranca, no por 12 carpetas vacías.

### Conceptos (estudia, luego codea)

- Qué es un módulo / provider / controller en NestJS  
- `docker compose` para un servicio Postgres  
- Variables de entorno (`.env` gitignored, `.env.example` versionado)  
- Monorepo simple: dos apps, un git  

### Entregable

```text
apps/api     NestJS (TypeScript)
apps/web     React + TypeScript (Vite está bien)
docker-compose.yml   postgres
.env.example
```

API: `GET /health` → `{ "status": "ok" }`.  
Web: pantalla “JoobtIA” y un fetch a `/health` que muestre ok/error.

### Tareas (en este orden)

1. `apps/api` con Nest CLI; script `start:dev`.  
2. `docker-compose.yml` con Postgres 16; volumen persistente; puertos locales.  
3. Conectar Nest a Postgres **solo para probar** (un `SELECT 1` en health, o Prisma `prisma db pull` todavía no). Si usas Prisma (recomendado: ya está en tu CV), `prisma init` + datasource + `npx prisma migrate` vacío o una tabla `HealthCheck` no hace falta: basta que el cliente arranque.  
4. CORS abierto a tu Vite (`localhost`).  
5. `apps/web` Vite React TS; una página; `fetch` al health.  
6. README: cómo levantar (compose, api, web).  

### Hecho cuando

- Tres terminales (o compose + dos processes): Postgres up, API responde, UI muestra ok.  
- `personal-data/` sigue fuera de git.  
- No hay dominio de vacantes todavía.

### Fuera de este sprint

Prisma schema de jobs, UI bonita, Tailwind obligatorio, auth.

### Si te trabas

“¿Monorepo npm workspaces o dos `package.json` sueltos?” → **dos carpetas con su `package.json`**, la más simple. Workspaces después.

---

## Sprint 1 — CRM de vacantes (el corazón)

**Objetivo:** guardar una oferta a mano, listarla y cambiar su estado.

**Por qué ahora:** es el producto mínimo *sin IA*. Si esto no te sirve en tu búsqueda, el resto es teatro.

### Mini-requisito

Campos mínimos de una vacante:

| Campo | Notas |
|--------|--------|
| `title` | obligatorio |
| `company` | obligatorio |
| `sourceUrl` | opcional (referencia, no scrape) |
| `rawText` | texto que pegas de la oferta |
| `status` | enum: `saved`, `scored`, `drafted`, `applied`, `interview`, `offer`, `rejected` |
| `notes` | opcional |
| `createdAt` / `updatedAt` | automáticos |

API (REST, nombres en inglés):

- `POST /jobs`  
- `GET /jobs`  
- `GET /jobs/:id`  
- `PATCH /jobs/:id` (incluye cambio de status)  
- `DELETE /jobs/:id` (sí, para uso personal)

UI: formulario pegar texto + título/empresa; lista; detalle; botones de estado.

### Conceptos

- DTO + `class-validator`  
- Capa: Controller → Service → Prisma (o repository). **No** pongas Prisma en el controller.  
- Enum en Prisma alineado al pipeline de la visión  
- React: lista + formulario; no hace falta Redux  

### Tareas

1. Modelo Prisma `Job` + migración.  
2. Módulo Nest `jobs` (controller, service, dtos).  
3. Probar con HTTP client (Insomnia/Thunder Client), no solo desde la UI.  
4. UI: crear / listar / ver / cambiar estado.  
5. Vacío y error: lista sin jobs, validación si falta título.

### Hecho cuando

**Tú** pegas una oferta real de LinkedIn/Computrabajo y la dejas en `saved`. Al día siguiente la ves y la pasas a `applied` a mano.

### Fuera de este sprint

Score, PDF, IA, filtros avanzados, tags.

### Trampa de junior

No diseñes 15 entidades. Una tabla `Job` basta.

---

## Sprint 2 — Perfil candidato

**Objetivo:** el sistema conoce *tu* perfil (texto estructurado), no solo un PDF suelto.

**Por qué ahora:** el scoring y las cartas necesitan una fuente de verdad. El PDF es input, no el modelo.

### Mini-requisito

- Subir o leer el CV (PDF → texto) **una vez**.  
- Guardar perfil: `fullName`, `headline`, `summary`, `skills[]`, `experience` (texto o JSON simple).  
- `GET /profile` / `PUT /profile`.  
- UI: ver perfil y editar skills/resumen (el parseo automático puede ser tosco al inicio).

### Conceptos

- Upload de archivo en Nest (`multipart`) **o** copiar texto extraído a un textarea (más simple y válido).  
- Librería PDF en Node (`pdf-parse` o similar).  
- Un solo perfil (sin `userId`). Tabla `Profile` de una fila, o seed al migrar.

### Tareas

1. Decide: ¿upload PDF o pegar texto del CV? Para ir más rápido, **pegar texto** + botón “reparsear” después. Upload es extra.  
2. Modelo `Profile`.  
3. CRUD mínimo (create-or-update).  
4. UI de perfil.

### Hecho cuando

Abres la app y ves *tus* skills (NestJS, React, TS, PostgreSQL, Docker, etc.) editables, sin tocar `personal-data` en git.

### Fuera

Matching con jobs, embeddings, versiones de CV.

---

## Sprint 3 — Compatibilidad (sin obsesionarse con el LLM)

**Objetivo:** cada job tiene un score y una explicación corta.

**Por qué ahora:** la IA es el diferencial, pero **primero** un score determinista te enseña el dominio. LangChain entra cuando el contrato (input perfil+job → output score+gaps) ya existe.

### Mini-requisito

- `POST /jobs/:id/score`  
- Persistir: `score` (0–100), `summary`, `gaps[]`, `matchedSkills[]`, `scoredAt`  
- Al scorrear, status → `scored` si estaba en `saved`  
- UI: botón “Analizar” y bloque de explicación  

**Fase A (obligatoria en este sprint):** reglas (keywords junior, overlap de skills, flags senior/lead).  
**Fase B (si te alcanza):** misma interfaz, implementación LangChain.js. Si no te alcanza, Fase B = sprint 3.1.

### Conceptos

- Puerto/interfaz: `ScoreJob(profile, job) → CompatibilityResult`  
- El service de jobs **no** debe importar el SDK del LLM. Un `ScoringService` inyectable.  
- Output estructurado (JSON schema / parser). Si usas LLM, temperatura baja.

### Hecho cuando

Una oferta junior React y una oferta “Staff Engineer 8 años” dan scores claramente distintos, con texto que *tú* entiendes.

### Fuera

Prompts perfectos, historial de 10 scores, RAG.

### ADR

Cuando elijas proveedor LLM (OpenAI, etc.), escribe **ADR 0003**. No lo dejes solo en `.env`.

---

## Sprint 4 — Carta de presentación

**Objetivo:** generar un borrador editable por job, que tú copias al portal.

### Mini-requisito

- `POST /jobs/:id/cover-letter`  
- Guardar documento: `type=cover_letter`, `content`, `createdAt`  
- UI: textarea editable + “regenerar” + copiar  
- Status puede pasar a `drafted`  

Humano en el loop: **nunca** envía el email por ti.

### Conceptos

- Tabla `Document` (jobId, type, content) en lugar de columnas sueltas por cada artefacto.  
- Prompt = perfil + `rawText` del job + instrucción de tono junior, español.

### Hecho cuando

Generas carta para una vacante real, la editas 2 minutos y la usas.

---

## Sprint 5 — CV por oferta (cierra el MVP usable)

**Objetivo:** variante del CV orientada a *esa* vacante, aprobada por ti.

### Mini-requisito

- `POST /jobs/:id/cv-variant`  
- Output Markdown (export PDF puede esperar)  
- Mostrar perfil base vs. sugerencias (qué enfatizar, qué no inventar)  
- Regla de producto: **no fabricar experiencia**

### Hecho cuando

Ciclo completo de la visión §8: guardar → score → carta → CV → marcar `applied`.

Ahí **paras y usas la herramienta una semana** en tu búsqueda real. Sprints 6–8 no empiezan si no hay jobs reales en la DB.

---

## Sprint 6 — Prep de entrevistas

Preguntas técnicas + 1 guía de respuesta según `rawText` + tu perfil. Guardar en `Document` o tabla `InterviewPrep`. UI: lista de preguntas, marcar “practicada”.

## Sprint 7 — Estadísticas

Conteo por estado, % applied→interview, tiempo medio en cada estado. SQL/`groupBy` Prisma; **sin** LLM. Un dashboard feo pero verdadero vale más que gráficos.

## Sprint 8 — Plan de estudio

Extraer tecnologías de `rawText` de jobs guardados, frecuencia, contraste con `Profile.skills`, checklist semanal. Puede ser heurística primero, LLM después.

---

## Orden de estudio NestJS (acoplado a sprints)

| Sprint | Qué debes poder explicar en voz alta |
|--------|--------------------------------------|
| 0 | Módulo, ciclo de arranque, config |
| 1 | DI, DTO, capa service, Prisma migrate |
| 2 | Files o pipes; un agregado Profile |
| 3 | Interfaz + implementación; por qué el LLM no vive en el controller |
| 4–5 | Otro agregado (Document) sin romper Jobs |
| 7 | Consultas de agregación |

Si no puedes explicarlo, no copies un tutorial entero: reduce el sprint.

---

## Qué pedirle al senior (ejemplos buenos)

- “Este es mi modelo Prisma de Job. ¿Me falta algo para el sprint 1?”  
- “Puse Prisma en el controller. ¿Cómo lo saco sin reescribir todo?”  
- “El score por keywords me da 90 a ofertas senior. ¿qué señal se me escapa?”  

## Qué no pedir

- “Hazme el CRUD.”  
- “Pásame el proyecto entero.”  
- “Genera el frontend.”

Cuando termines el Sprint 0, vuelve con: estructura de carpetas + cómo levantas + una duda concreta. Revisamos y recién ahí Sprint 1.
