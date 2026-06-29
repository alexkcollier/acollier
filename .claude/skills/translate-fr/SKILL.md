---
name: translate-fr
description: Project guidelines for writing in French
when_to_use: Any time you localize, write or translate content in French, use these guidelines
---

# translate-fr

Translate content files from English to Quebec French.

## Guidelines

### Language and register

- Professional French appropriate for tech companies; audience is design and development roles
- Use **tutoiement** (tu/te/ton/ta) in any direct address
- **Quebec French**, not European French. Key differences to enforce:
  - `mettre de l'avant` not `mettre en avant`
  - `on` + third-person-singular conjugation instead of `nous` + first-person-plural (e.g. `on a fait` not `nous avons fait`; `on est passé` not `nous sommes passés`; reflexive `s'engager` not `nous engager`)
  - `sans nécessiter` not `sans requérir`
  - `à ce moment-là` not `à cette période`
  - `s'est étendu sans accroc` not `s'est étendu proprement` (proprement as "cleanly" is European)
  - Prefer Quebec phrasing naturally throughout; the above are the most common traps
- Product names (Focus Recommendations, Schedio, etc.) stay in English
- Tags (Design, Development, AI, Data, Design System, Mobile, Medical) stay in English — standard in Quebec tech

### Typography

- Use **thin non-breaking space (U+202F)** before all heavy punctuation: `; ? !`
- Use a **normal non-breaking space (U+00A0)** before: `: % $ »`
- When a, JS/TS string, markdown image title (`![alt](url 'title')`) or HTML `title` attribute uses single-quote delimiters and the title text contains an apostrophe, switch the outer delimiters to double quotes

### What to translate

- Frontmatter: `title`, `description`, `links[].title`
- Body: all headings, prose, image and video `alt` text, image/video `title` attributes
- Use translated slugs for filenames where the title is not a product name (e.g. `rapport-analyse-agentique.md` for "Rapport d'analyse agentique")

### What NOT to translate

- Static asset paths (`src`, `href`, `featureImage`, image paths in markdown)
- Tool `name`, `img`, `href` fields (brand names)
- `tags`, `order`, `featured` — copy verbatim from the English source

## Workflow

1. Read the English source file(s) from `content/en/work/`
2. Produce the French file(s) in `content/fr/work/` with translated slugs
3. After writing, run the spacing fix as a post-pass:

   ```python
   import re
   thin = ' '  # thin non-breaking space — before ; ? !
   nbsp = ' '  # normal non-breaking space — before : % $ »
   text = re.sub(r' ([;?!])', thin + r'\1', text)
   text = re.sub(r' ([:%$»])', nbsp + r'\1', text)
   ```

4. Fix any image title apostrophe conflicts (single-quote delimiter containing apostrophe → switch to double quotes)
5. Verify no `nous` (as subject) remains — replace with `on` + correct conjugation
