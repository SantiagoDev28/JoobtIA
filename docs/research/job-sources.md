# Investigación: fuentes de vacantes

**Versión:** 0.2  
**Fecha:** 2026-08-03  
**Relacionado:** `docs/vision.md` v0.2  
**Estado de la decisión:** **No automatizar la recolección.** Este documento conserva el análisis técnico y registra el pivote de producto.

---

## 1. Decisión de producto (v0.2)

JoobtIA **no** incluye connectors, scrapers ni agentes que lean portales de empleo de forma automatizada.

**Motivos:**

1. LinkedIn, Indeed y Computrabajo no ofrecen APIs públicas adecuadas para *buscar/leer* vacantes como candidato; lo automatizable choca con ToS o es partner-only.  
2. El riesgo legal/operativo no aporta al objetivo real: conseguir empleo y construir un portfolio sólido.  
3. La propuesta de valor se desplaza a **CRM + IA de preparación** (fit, CV, carta, entrevistas, stats, plan de estudio).

**Cómo entran las vacantes:** el usuario las pega o registra manualmente (texto, URL como referencia, notas, archivo). Opcional futuro: bookmarklet “guardar en JoobtIA” que solo envía lo que el usuario ya tiene abierto — sin crawl del sitio.

---

## 2. Resumen del landscape (referencia histórica)

| Plataforma | ¿API pública para *buscar*? | Scraping | Conclusión |
|------------|----------------------------|----------|------------|
| LinkedIn | No (API de publicar para partners) | Viola ToS; frágil; riesgo de cuenta | Solo manual |
| Indeed | No (APIs employer/partner) | Anti-bot + ToS | Solo manual |
| Computrabajo | Partner/empleador (`iapi`), no feed candidato | Scrapers terceros | Solo manual |
| Remotive / RemoteOK / Arbeitnow | Feeds JSON públicos | N/A | **Viable técnicamente**, pero **fuera de alcance** del producto v0.2 para no mezclar “agregador” con “copiloto” |
| Adzuna | API free limitada; sin Colombia | N/A | Fuera de alcance v0.2 |

Incluso las APIs “limpias” (Remotive, etc.) se **excluyen del MVP** a propósito: refuerzan la historia de que el valor no está en cazar vacantes, sino en trabajarlas bien.

Si en el futuro se reabre un connector Remotive, requiere **nuevo ADR** y no debe ser el núcleo del producto.

---

## 3. Hallazgos breves por plataforma

### LinkedIn

- Job Posting API = write para ATS partners.  
- No hay search API self-serve.  
- Scrapers / “APIs no oficiales” = ToS + enforcement.

### Indeed

- Publisher/Job Search públicos deprecados o cerrados.  
- APIs actuales orientadas a empleadores/partners.  
- Scraping costoso y frágil.

### Computrabajo

- API histórica de publicación de avisos (empleador).  
- Scrapers LatAm existen (p. ej. Apify) — útiles en teoría, indeseables para este proyecto.

### Remotive / RemoteOK / Arbeitnow

- JSON público; buenos para un agregador remoto.  
- **No usados** en JoobtIA v0.2 por decisión de posicionamiento, no solo por legalidad.

---

## 4. Implicación para arquitectura

```text
Usuario encuentra oferta en cualquier portal
        │
        ▼
   Alta manual en CRM  (texto / URL / metadatos)
        │
        ▼
   Job record normalizado
        │
        ├── Compatibility (LangChain)
        ├── CV optimize
        ├── Cover letter
        ├── Interview prep
        ├── Stats (agregado)
        └── Study plan (skills frecuentes en jobs guardados)
```

No hay módulo `JobSource` de terceros en el MVP. La “fuente” es el usuario.

---

## 5. ADR relacionado

Formalizar en `docs/adr/0001-manual-job-intake-only.md` (o título equivalente):  
**Accepted — manual intake only; automated portal collection rejected for this product.**
