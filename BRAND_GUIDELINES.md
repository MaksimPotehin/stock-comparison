# Brand Guidelines — investing-space.tech

> Inspired by [Snowball Analytics](https://snowball-analytics.com/) visual language.
> Dark-first design system for a financial data product.

---

## 1. Design Principles

- **Dark-first** — primary experience is dark mode; light mode is secondary
- **Data clarity** — colors serve data visualization, not decoration
- **Calm professionalism** — no aggressive gradients; subtle accents on key actions
- **Consistent density** — compact but readable; financial data needs information density

---

## 2. Color Palette

### 2.1 Brand Colors

| Token | Name | Dark Mode | Light Mode | Usage |
|-------|------|-----------|------------|-------|
| `--sb-primary` | Cyan Blue | `#3699ff` | `#00aff5` | CTAs, links, active states, chart selection |
| `--sb-success` | Teal Green | `#5ac098` | `#1bc5bd` | Positive returns, gains, confirmed states |
| `--sb-danger` | Coral Red | `#f64e60` | `#f27362` | Negative returns, losses, errors |
| `--sb-warning` | Amber | `#ffa800` | `#fea135` | Alerts, caution states |
| `--sb-info` | Violet | `#9a6afa` | `#8950fc` | Info badges, secondary highlights |
| `--sb-magenta` | Magenta | `#f72585` | `#f72585` | Special accents (use sparingly) |
| `--sb-turquoise` | Turquoise | `#56cfe1` | `#56cfe1` | Chart lines, decorative |

### 2.2 Backgrounds & Surfaces

| Token | Name | Dark | Light | Usage |
|-------|------|------|-------|-------|
| `--main-bg` | Page background | `#282832` | `#f9fafb` | Body / app shell |
| `--card-bg` | Card surface | `#32323e` | `#ffffff` | Cards, modals, panels |
| `--sb-solid-input-bg` | Input background | `#424451` | `#f3f6f9` | Form inputs, selects |
| `--sb-dropdown-color` | Dropdown background | `#32323e` | `#ffffff` | Dropdowns, tooltips |
| `--sb-biginput-bg-color` | Deep surface | `#1e1e2d` | `#ffffff` | Nested panels, sidebars |

### 2.3 Text Colors

| Token | Dark | Light | Usage |
|-------|------|-------|-------|
| `--sb-dark` | `#d7d7d7` | `#181c32` | Primary text |
| `--sb-text-dark65` | `#ced4da` | `#5e6278` | Secondary text, labels |
| `--sb-text-dark50` | `#adb5bd` | `#7e8299` | Muted text, captions |
| `--sb-muted` | `#b5b5c3` | `#adb5bd` | Disabled, placeholder |
| `--sb-placeholder` | `#b5b5c3` | `#7f8285` | Input placeholders |

### 2.4 Borders & Dividers

| Token | Dark | Light | Usage |
|-------|------|-------|-------|
| `--sb-border-color` | `#495057` | `#eff2f5` | Default borders |
| `--sb-light-border` | `#6e7781` | `#d4d6dd` | Subtle separators |

### 2.5 Interactive States

| Token | Dark | Light | Usage |
|-------|------|-------|-------|
| `--sb-row-hovered-bg` | `#4d505f` | `#f3f6f9` | Table row hover |
| `--sb-row-selected-bg` | `#2c3844` | `#e1f0ff` | Selected rows |
| `--sb-symbol-hover-color` | `#424451` | `#e8ebed` | Ticker badge hover |

### 2.6 Light Variants (for backgrounds, badges, chips)

| Token | Dark | Light |
|-------|------|-------|
| `--sb-light-primary` | `#78c9ea2e` | `#e1f0ff` |
| `--sb-danger-light` | `#f2736285` | `#f64e608a` |
| `--sb-success-light` | `#1bc5bd8a` | `#5ac09885` |
| `--sb-info-light` | `#9a6afa1a` | `#eee5ff` |
| `--sb-primary-light` | `#3699ff8a` | `#00aff585` |

---

## 3. Typography

### 3.1 Font Stack

```
Primary (UI): -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif
Monospace (data/code): SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace
```

> Snowball uses system fonts — no custom web fonts loaded. This ensures fast performance
> and native feel on each platform. Do NOT add decorative fonts.

### 3.2 Type Scale

| Level | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| Display | `clamp(1.5rem, 4vw, 1.75rem)` | 600 | 1.4 | Page titles (H1) |
| Heading | `1.5rem` | 600 | 1.4 | Section headings (H2) |
| Subheading | `1.25rem` | 600 | 1.4 | Card titles (H3) |
| Body | `1rem` | 400 | 1.6 | Main content |
| Small | `0.875rem` | 400 | 1.5 | Labels, captions, badges |
| Micro | `0.75rem` | 400 | 1.4 | Timestamps, meta info |

---

## 4. Spacing System

Based on 4px grid (Tailwind defaults).

| Scale | Value | Usage |
|-------|-------|-------|
| `xs` | `4px` | Inner padding of chips/badges |
| `sm` | `8px` | Component inner spacing |
| `md` | `16px` | Card padding, form gaps |
| `lg` | `24px` | Section spacing |
| `xl` | `32px` | Page sections |
| `2xl` | `48px` | Major layout gaps |

---

## 5. Border Radius

| Context | Value | Usage |
|---------|-------|-------|
| Buttons | `6px` | Action buttons |
| Inputs | `6px` | Form inputs |
| Cards | `8px` | Content cards |
| Badges/chips | `4px` | Small tags |
| Modals/popovers | `8px` | Overlay containers |
| Fully rounded | `9999px` | Pills, avatar rings |

---

## 6. Shadows

```css
/* Card elevation */
--shadow-card: 0 1px 3px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2);

/* Dropdown */
--shadow-dropdown: 0 4px 16px rgba(0, 0, 0, 0.4);

/* Modal */
--shadow-modal: 0 8px 32px rgba(0, 0, 0, 0.5);
```

---

## 7. Gradients

Snowball використовує **мінімум градієнтів** — тільки в UI-сповіщеннях. Ніяких декоративних градієнтів на сторінках.

### 7.1 Popup / Notification Background

```css
/* Радіальний градієнт — фон popup-сповіщення */
background: radial-gradient(circle, #dadef6 0, #c9dbff 50%, #dadaf6 100%);
```

Кольори: світло-синій → синьо-фіолетовий → назад до світло-синього.
Використання: фіксований popup у правому куті (успішна дія, нотифікація).

### 7.2 Feedback Overlay Tint

```css
/* Лінійний градієнт — синій тінт поверх feedback-попапу */
background-image: linear-gradient(
  90deg,
  rgba(54, 153, 255, 0.15),
  rgba(54, 153, 255, 0.15)
);
```

Це однорідний 15% синій overlay (обидва стопи однакові — суто напівпрозорий фон).
Використання: вікно підтвердження feedback/tour.

### 7.3 Chart Area Gradient (вертикальний, під лінією графіка)

```css
/* Fade з кольору лінії → фон картки */
/* Генерується динамічно через Chart.js createLinearGradient() */

/* Приклад для primary (blue): */
from: rgba(54, 153, 255, 0.3)   /* top */
to:   rgba(54, 153, 255, 0)     /* bottom → прозорий */

/* Приклад для success (teal): */
from: rgba(27, 197, 189, 0.3)
to:   rgba(27, 197, 189, 0)
```

Цей градієнт задається програмно при ініціалізації Chart.js — не через CSS.

### 7.4 Правило використання

| Де | Дозволено | Заборонено |
|----|-----------|------------|
| Popup/notification | ✅ радіальний `#dadef6 → #c9dbff` | ❌ яскраві / веселкові |
| Feedback overlay | ✅ однорідний rgba tint | ❌ multi-stop |
| Графіки (area fill) | ✅ вертикальний fade до прозорого | ❌ horizontal / diagonal |
| Кнопки | ❌ ніяких | — |
| Фони сторінок | ❌ ніяких | — |
| Картки | ❌ ніяких | — |

---

## 8. Chart & Data Visualization

| Purpose | Dark | Light |
|---------|------|-------|
| Grid lines | `#495057` | `#ebedf3` |
| Legend text | `#7e8299` | `#adb5bd` |
| Selection fill | `#3699ff8a` | `#00aff585` |
| Area gradient end | `#32323e` | `#ffffff` |
| Score/reference line | `#3f4254` | `#e6eaee` |

**Chart color sequence** (for multi-line/multi-series):
1. `#3699ff` — Primary Blue (stock 1)
2. `#1bc5bd` — Teal (stock 2)
3. `#ffa800` — Amber (stock 3)
4. `#f64e60` — Coral (stock 4)
5. `#9a6afa` — Violet (stock 5)
6. `#56cfe1` — Turquoise (stock 6)

---

## 9. Component Patterns

### Buttons

```
Primary:   bg #00aff5 → hover #0097d4 · text white · radius 6px · px-4 py-2
Secondary: bg transparent · border 1px #495057 · text #d7d7d7 · same radius
Danger:    bg #f27362 · text white
Ghost:     bg transparent · text #00aff5 · hover bg --sb-light-primary
```

### Badges / Chips

```
Default:   bg --sb-solid-input-bg · text --sb-dark · radius 4px · px-2 py-0.5 · text-xs
Primary:   bg --sb-light-primary · text --sb-primary
Success:   bg --sb-success-light · text --sb-success
Danger:    bg --sb-danger-light · text --sb-danger
```

### Cards

```
bg: --card-bg
border: 1px solid --sb-border-color
border-radius: 8px
padding: 16px–24px
shadow: --shadow-card
```

### Inputs / Selects

```
bg: --sb-solid-input-bg
border: 1px solid --sb-border-color
focus border: --sb-primary
border-radius: 6px
color: --sb-dark
placeholder: --sb-placeholder
```

### Tables

```
header bg: --sb-solid-input-bg
row bg: transparent
row hover: --sb-row-hovered-bg
row selected: --sb-row-selected-bg
border: --sb-border-color
```

---

## 10. Responsive Breakpoints

| Name | Min Width | Tailwind |
|------|-----------|----------|
| xs | 0 | — |
| sm | 576px | `sm:` |
| md | 768px | `md:` |
| lg | 992px | `lg:` |
| xl | 1200px | `xl:` |
| xxl | 1420px | `2xl:` |

---

## 11. Mapping to Project Tokens

### Required changes to `assets/styles/variables/colors.scss`

```scss
// Dark mode (default)
:root {
  --color-primary:    #00aff5;   // was #adb5bd — now cyan blue
  --color-secondary:  #6c757d;
  --color-success:    #1bc5bd;   // was #5bd49a — teal, matches Snowball
  --color-warning:    #fea135;   // ✓ already matches
  --color-danger:     #f27362;   // ✓ already matches
  --color-info:       #8950fc;   // was #00bff5 — now violet

  // New tokens to add:
  --main-bg:          #282832;
  --card-bg:          #32323e;
  --sb-border-color:  #495057;
  --sb-text-muted:    #7e8299;
  --sb-input-bg:      #424451;
}
```

### Required changes to `tailwind.config.ts`

Update `primary` CSS variable — it currently maps to `#adb5bd` (gray).
After the color change, `text-primary` / `bg-primary` will correctly render cyan blue.

---

## 12. What NOT to do

- Do not use warm gradients (purple → pink) — this is a **data product**, not a marketing site
- Do not use white as a default background in dark mode
- Do not use red/green for anything other than financial gain/loss
- Do not add decorative web fonts — system font stack is intentional
- Do not use opacity < 10% for text — readability first
- Do not mix more than 2 accent colors in a single component

---

## 13. Reference

- Source design system: [Snowball Analytics](https://snowball-analytics.com/)
- CSS tokens extracted from: `/_next/static/css/f5f7faa68d0e1ee7.css`
- Token prefix used by Snowball: `--sb-*`
- Token prefix used in this project: `--color-*` (mapped via Tailwind)
