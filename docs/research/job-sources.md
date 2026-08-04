# Investigación: fuentes de vacantes

**Versión:** 0.1  
**Fecha:** 2026-08-03  
**Relacionado:** `docs/vision.md`  
**Propósito:** Decidir cómo el agente puede recopilar vacantes sin bloquear el MVP ni asumir riesgo legal innecesario.

---

## 1. Resumen ejecutivo

| Plataforma | ¿API pública para *buscar* vacantes? | Scraping | Recomendación MVP |
|------------|--------------------------------------|----------|-------------------|
| **LinkedIn** | No (solo API de *publicar* para partners ATS) | Viola ToS; rate limits; riesgo de cuenta/legal | **No automatizar.** Ingesta manual (pegar URL/texto) |
| **Indeed** | No (Publisher/Job Search API cerrada/deprecada; APIs actuales son partner/empleador) | Anti-bot fuerte; ToS | **No automatizar al inicio.** Manual o proveedor de pago más adelante |
| **Computrabajo** | API partner `iapi` orientada a *empleadores* (publicar avisos), no a candidatos | Scrapers de terceros (Apify, etc.) | **Fase B:** evaluar scraper controlado o pegado manual; no base del día 1 |
| **Remotive / RemoteOK / Arbeitnow** | Sí, feeds JSON públicos (sin key o con límites leves) | No necesario | **Fase A — sí.** Buenas para remoto / software |
| **Adzuna** | Sí, API free con key; ~18 países (fuerte UK/EU; **no Colombia**) | N/A | Opcional si se buscan mercados Adzuna |

**Conclusión para el MVP “usable lo antes posible”:**  
Arquitectura de **ingesta pluggable** + **dos caminos día 1**:

1. **Manual / semi-manual:** usuario pega URL o texto de LinkedIn, Computrabajo, Indeed, etc.  
2. **Connectors legales:** Remotive (+ RemoteOK / Arbeitnow) para vacantes remote/software.

El “agente que recorre LinkedIn solo” **no** es viable como cimiento del MVP.

---

## 2. LinkedIn

### Qué existe oficialmente

- **Job Posting API:** write-only para partners ATS / Talent Solutions (publicar y sincronizar ofertas *hacia* LinkedIn).  
- **No hay** API self-serve para *buscar o leer* listados de empleo.  
- Programas partner cerrados o muy selectivos; extracción de datos no es un use case aprobado.

### Scraping / “APIs no oficiales”

- Páginas públicas y endpoints guest existen en la práctica, pero:
  - Violan términos de LinkedIn
  - Hay rate limiting agresivo (~pocas páginas por IP)
  - LinkedIn ha litigado contra recolectores comerciales (ej. casos conocidos en 2025)
- Terceros que venden “LinkedIn Jobs API” suelen ser scrapers envueltos; frágiles y de alto riesgo.

### Implicación JoobtIA

Para portfolio + uso personal: **el usuario copia el texto o la URL de la oferta**; el backend normaliza y pasa al pipeline de scoring. Un bookmarklet o extensión “Enviar a JoobtIA” puede ser fase temprana sin scrapear el sitio a escala.

---

## 3. Indeed

### Qué existe oficialmente

- La **Publisher / Job Search API** pública ya no está disponible para nuevos desarrolladores (deprecación ~2021–2024 según fuentes).  
- APIs actuales (Job Sync, Apply, etc.) son para **empleadores y partners**, no para “dame vacantes junior en Bogotá”.  
- Widget embebido de publisher ≠ acceso a JSON de resultados.

### Scraping

- Indeed usa protecciones anti-bot fuertes (Cloudflare y similares).  
- Scraping es frágil, costoso (proxies) y contra ToS.  
- Servicios tipo Bright Data / Apify existen, pero añaden costo y deuda operativa.

### Implicación JoobtIA

Misma estrategia que LinkedIn en MVP: **ingesta manual**. Un connector Indeed solo se reevalúa con ADR si el volumen manual se vuelve el cuello de botella.

---

## 4. Computrabajo (LatAm / Colombia)

### Oficial

- Existe documentación/comunidad alrededor de `iapi.computrabajo.com` orientada a **empresas que publican** avisos (crear/consultar publicaciones propias), no a un feed abierto de búsqueda para candidatos.  
- Acceso típico: credenciales partner / acuerdo comercial.

### No oficial

- Actores en Apify y repos de scrapers extraen título, empresa, salario, ubicación, descripción, URL, etc.  
- Útiles para LatAm, pero: dependencia de terceros, HTML que cambia, posible conflicto con ToS, costo.

### Implicación JoobtIA

Alta relevancia geográfica (Bogotá/CO). Prioridad:

1. MVP: pegar oferta desde Computrabajo  
2. Post-MVP / Fase B: ADR “Computrabajo connector” evaluando Apify vs. fetch propio de bajo volumen solo para uso personal

---

## 5. Fuentes recomendadas para automatización temprana

### Remotive

- `GET https://remotive.com/api/remote-jobs`  
- Filtros: `category` (ej. `software-dev`), `search`, `limit`  
- Sin API key; atribución y ToS del publisher a respetar  

### RemoteOK

- `GET https://remoteok.com/api`  
- Requiere `User-Agent`; el primer elemento del array suele ser aviso legal  
- Cuidado: tags ruidosos — filtrar por título/descripción, no solo tags  

### Arbeitnow

- API de job board gratuita (documentada; a menudo vía su sitio / RapidAPI)  
- Mezcla remote y on-site (Europa); filtrar por `remote` y keywords junior/dev  

### Adzuna (opcional)

- Free tier con `app_id` / `app_key`  
- Cobertura limitada a países Adzuna; **no sustituye** Computrabajo en Colombia  

---

## 6. Estrategia de producto recomendada

```text
                    ┌─────────────────────┐
                    │   Job Ingestion     │
                    │   (NestJS module)   │
                    └──────────┬──────────┘
           ┌───────────────────┼───────────────────┐
           ▼                   ▼                   ▼
   ManualIngest          PublicApiIngest      FutureScrapers
   (URL / paste)         (Remotive, …)        (ADR required)
           │                   │                   │
           └───────────────────┴───────────────────┘
                               ▼
                      Normalized Job schema
                               ▼
                      Score → Draft → Track
```

### Fase A (MVP — máximo 1–2 sprints de ingesta)

- [x] Contrato interno `JobSource` (interface)  
- [ ] `ManualJobSource` (texto + URL + metadatos)  
- [ ] `RemotiveJobSource` (+ opcional RemoteOK)  
- [ ] Deduplicación por URL / hash de título+empresa  
- [ ] Filtro heurístico: “junior” / “jr” / “trainee” / “entry” + keywords stack  

### Fase B (solo si hace falta volumen LatAm)

- ADR: Computrabajo via Apify o scraper propio de bajo volumen  
- Bookmarklet “Send to JoobtIA” para LinkedIn/Indeed/Computrabajo  

### Fase C (explícitamente no ahora)

- Agente headless que inicia sesión en LinkedIn  
- Compra de datasets comerciales a gran escala  

---

## 7. Riesgos y mitigaciones

| Riesgo | Impacto | Mitigación |
|--------|---------|------------|
| Bloqueo de cuenta LinkedIn | Alto (búsqueda personal) | Sin automatización de LinkedIn |
| ToS / legal | Medio–alto en scrapers | Preferir manual + APIs públicas; ADR por fuente |
| Pocas vacantes junior CO en Remotive | Medio | Manual desde Computrabajo/LinkedIn + remote global |
| Fragilidad de scrapers | Alto mantenimiento | No acoplar el core al scraper |
| Tags falsos (RemoteOK) | Scores malos | Matching por título/descripción + LLM |

---

## 8. Decisión provisional (a formalizar en ADR)

**ADR candidato:** *Job sourcing strategy for MVP*

- **Accepted direction:** hybrid ingestion; manual + public remote APIs first.  
- **Rejected for MVP:** automated LinkedIn/Indeed scraping as primary source.  
- **Deferred:** Computrabajo automated connector pending volume needs.

Próximo paso documental: volcar esto en `docs/adr/0001-job-sourcing-strategy.md` cuando se abran los ADRs formales.

---

## 9. Referencias (consulta 2026-08)

- Indeed Partner Docs — Job Sync / auth (employer-side)  
- Análisis de ecosistema LinkedIn Jobs API 2025–2026 (partner write-only; no search self-serve)  
- Remotive Remote Jobs API — `https://remotive.com/api/remote-jobs`  
- RemoteOK API — `https://remoteok.com/api`  
- Computrabajo scrapers (Apify) y gem histórico `iapi.computrabajo.com` (empleadores)  
- Adzuna Developer — cobertura limitada de países, free tier con rate limits  
