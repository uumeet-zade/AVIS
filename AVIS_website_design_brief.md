# AVIS Website — Design Brief

This document describes what to build. It is a design spec, not code — intended to guide an AI coding assistant (e.g. Google Antigravity / Gemini) in generating the site.

---

## 1. Identity Recap

- **Name:** AVIS (Agence pour la Veille et l'Information Sociale)
- **Motto:** "The Record for the People"
- **Positioning:** Independent news agency, sympathetic to the Social Democratic Alliance (SDA), critical of conservative establishment power. Blends fast wire-service reporting with longform investigative analysis.
- **Standalone site** — does not need to link to or match the SDA party website's structure, only reuse its typography for visual consistency within the Caprica universe.

---

## 2. Visual Mood

**Style:** Modern wire-service — think Reuters/AP. Clean, white-dominant, confident use of a bold accent color. Should feel authoritative, fast-moving, and serious — not decorative or playful.

---

## 3. Color Palette

| Role | Color | Notes |
|---|---|---|
| Primary accent | Rose Red | Used for headline highlights, section labels, links, key UI accents (buttons, active states, "breaking" tags) |
| Secondary | White | Dominant background color — clean, high contrast, newspaper-like |
| Tertiary | Black | Body text, headlines, structural lines/borders |

Guidance: white should be the dominant surface color (masthead background, page background). Rose red should be used sparingly and deliberately — for emphasis, category tags, the masthead underline, and interactive elements — not as a large background fill. Black carries the actual reading weight (text, borders, footer).

---

## 4. Typography

- **Headlines / display text:** Playfair Display (serif), fallback: serif
- **Body text / UI / navigation:** Inter (sans-serif), fallback: sans-serif

This matches the existing SDA party website for visual consistency across the Caprica universe. Headlines should feel weighty and editorial (serif); everything else — nav, bylines, captions, article body copy — should be clean and highly readable (Inter).

---

## 5. Homepage Layout

**Style:** Classic newspaper front page.

Structure, top to bottom:
1. **Masthead** — AVIS wordmark (Playfair Display, large), motto "The Record for the People" beneath it in smaller Inter text, rose red underline/divider beneath the masthead.
2. **Top navigation bar** — sections such as: Home, Politics, Analysis (for "AVIS Analyse" longform content), Society, World, About AVIS. Clean horizontal bar, Inter font, black text, rose red highlight on hover/active.
3. **Top story block** — one large featured headline with image placeholder, a short summary/lede, byline, and timestamp. This is the visual anchor of the page.
4. **Article grid** — below the top story, a grid of 4–6 secondary stories, each with: category tag (rose red small label, e.g. "POLITICS" or "ANALYSIS"), headline (Playfair Display), one-line summary (Inter), byline, timestamp.
5. **Footer** — AVIS name, motto repeated small, mission statement in one line, copyright/fictional-universe note.

---

## 6. Sample Articles (placeholder content)

Include 4–5 short placeholder articles so the layout isn't empty. Suggested topics (in-universe, tone should be analytical and skeptical of establishment power, consistent with AVIS editorial stance):

1. A politics piece questioning a conservative-establishment figure or institution's use of power.
2. An "AVIS Analyse" longform piece on SDA policy or the Social Democratic Alliance's platform.
3. A short wire-style dispatch (breaking-news style, very short, factual).
4. A society/culture piece.
5. A world/foreign-affairs piece.

Each placeholder article needs: headline, category tag, one-paragraph summary, byline (fictional AVIS journalist name), timestamp, and a note that this is placeholder content standing in for a full article.

---

## 7. Tone Notes for Any Placeholder Copy

Writing style should read like real wire-service journalism: short declarative sentences, attributed claims, neutral-sounding phrasing even when the underlying analysis is pointed. Avoid party-slogan language — AVIS is editorially independent, not an SDA mouthpiece, even though it's sympathetic to SDA's politics.

---

## 8. Out of Scope for This Brief

- No logo/icon design specified yet (site can use wordmark-only masthead for now)
- No mobile-specific layout instructions given — standard responsive behavior is fine
- No backend/CMS — static/placeholder content only at this stage
