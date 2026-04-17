```markdown
# Design System Document: The Artisanal Alchemist

## 1. Overview & Creative North Star
This design system is built to transform a production management tool into a high-end, editorial experience. Our Creative North Star is **"The Digital Apothecary."** 

We are moving away from the "SaaS dashboard" aesthetic. Instead of rigid grids and heavy borders, we embrace the flow of natural ingredients. The system utilizes **Intentional Asymmetry** and **Tonal Depth** to create an environment that feels as professional as a laboratory but as organic as a Madurese herbal garden. We prioritize breathing room (white space) and sophisticated layering to guide the user’s eye through the complex stages of Jamu production.

---

## 2. Colors: The Earthy Palette
Our palette is rooted in the raw materials of Jamu: the deep chlorophyll of herbs, the vibrant glow of turmeric, and the soft warmth of sun-dried parchment.

### Primary & Secondary (The Core)
- **Primary (`#003527` / `#064e3b`):** Use for high-authority elements. It represents the "Deep Herbal Green" essence.
- **Secondary (`#855300` / `#fea619`):** Our "Turmeric Orange." Reserved for kinetic energy—actions, highlights, and moments of transition.

### The "No-Line" Rule
**Borders are prohibited for sectioning.** To define space, use background color shifts. A `surface-container-low` section sitting on a `surface` background creates a sophisticated boundary that feels architectural rather than "boxed in."

### Signature Textures & Glassmorphism
- **Frosted Infusions:** For floating panels or overlays, use `surface` with a 70% opacity and a `backdrop-blur-md`. This mimics the look of frosted apothecary glass.
- **Tonal Gradients:** For primary CTAs, use a subtle linear gradient from `primary` (#003527) to `primary_container` (#064e3b) at a 135-degree angle. This adds "soul" and prevents the UI from feeling flat.

---

## 3. Typography: Editorial Authority
We pair **Manrope** (Display/Headlines) with **Plus Jakarta Sans** (Body/Labels) to balance modern precision with approachable warmth.

- **The Power of Scale:** Use `display-lg` (3.5rem) for high-level production metrics. Large, thin typography suggests a premium, curated brand.
- **Information Hierarchy:**
    - **Headlines (Manrope):** Use for page titles and section headers. Its geometric nature feels "Professional & Clean."
    - **Body (Plus Jakarta Sans):** Optimized for readability in inventory lists and recipe logs.
    - **Labels (Plus Jakarta Sans):** Used for status tags and metadata. Keep these in `label-md` or `label-sm` to maintain the "Editorial" feel.

---

## 4. Elevation & Depth: Tonal Layering
Traditional drop shadows are too "tech." We achieve depth through the **Layering Principle.**

- **The Stack:** 
    1. Base: `surface` (#fdf9e9)
    2. Section: `surface-container-low` (#f8f4e4)
    3. Card/Content: `surface-container-lowest` (#ffffff)
- **Ambient Shadows:** Only use shadows for "Actionable Float" (e.g., a hovering card). Use a large 32px blur with 4% opacity, using the `on-surface` color (#1c1c13) as the shadow tint.
- **The "Ghost Border" Fallback:** If a divider is essential for accessibility, use `outline-variant` at **15% opacity**. It should be felt, not seen.

---

## 5. Components: Refined Utility

### Input Fields & Controls
- **Styling:** Use `rounded-md` (0.375rem) as requested, but elevate the field using `surface-container-highest` as the background. 
- **States:** On focus, transition the background to `surface-container-lowest` and apply a 1px `primary` ghost border.

### Cards & Inventory Lists
- **Rule:** **No Divider Lines.** Use vertical whitespace (Tailwind `py-6` or `py-8`) and background shifts to separate items.
- **Asymmetric Layouts:** In production overviews, don't align every card in a perfect grid. Offset the "Total Stock" card slightly to create a signature, custom-built look.

### Stock Status Indicators (The Vital Signs)
Instead of standard "Traffic Light" dots, use **Tonal Badges**:
- **Critical (Red):** `error_container` background with `on_error_container` text.
- **Warning (Yellow):** `secondary_container` background with `on_secondary_container` text.
- **Healthy (Green):** `tertiary_fixed` background with `on_tertiary_fixed_variant` text.

### Buttons
- **Primary:** Gradient fill (`primary` to `primary_container`), `on_primary` text, `rounded-md`.
- **Secondary:** Transparent background, `primary` text, with a 10% opacity `primary` hover state.

### Artisanal Components
- **The "Batch Progress" Stepper:** Use thick 4px lines in `outline-variant` that "fill" with a `secondary` (Turmeric) color as the Jamu batch moves from *Extraction* to *Bottling*.

---

## 6. Do's and Don'ts

### Do:
- **Embrace White Space:** If a screen feels "busy," increase the padding. In this system, space equals premium quality.
- **Use Material Naming:** Always reference tokens like `surface-container-high` rather than hex codes to ensure the layering logic remains intact.
- **Check Contrast:** Ensure `on-surface` text on `cream` backgrounds meets WCAG AA standards.

### Don't:
- **Don't use 1px solid black/grey borders.** This instantly breaks the "Apothecary" aesthetic.
- **Don't use pure white backgrounds** for the entire page. Use the `surface` (#fdf9e9) cream to maintain the earthy, organic warmth.
- **Don't use "Default" Shadows.** Standard CSS shadows are too harsh. Stick to the Ambient Shadow rules in Section 4.