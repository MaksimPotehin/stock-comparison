# Voice & Style Guide

## Derived from: investing-space.tech existing content

---

## Tone

Write like a smart friend who understands investing — not a professor, not an influencer.
- Authoritative without being academic
- Warm without being casual
- Direct without being blunt

You can say "you'll end up with $80,000" — not "investors in this scenario may potentially accrue approximately $80,000."

---

## Openings

**Rule:** Never open by explaining a concept. Open by showing its consequence.

Use a specific character in a specific situation with real numbers. Give them a name. Give the contrast a number.

**Pattern that works:**
> At 25, Anna invests $400/month. Her friend Sarah waits until 35 and invests $800/month — twice as much. After 20 years: Anna has $1.2M, Sarah has $600K.

The concept (compound interest) is not named until the reader already feels why it matters.

**What makes an opening land:**
- One person doing one thing
- A specific number that creates tension
- A contrast or unexpected result
- No thesis statement, no "in this article we will explore"

---

## Structure

**Callout box** — use for the opening story, for key warnings, or for a single important rule:
```html
<div class="my-6 p-6 rounded-lg bg-gray-800/60 border border-gray-700">
  <p class="text-lg leading-relaxed mb-4">Your opening story here.</p>
  <p class="text-base text-gray-300 mb-4">Second paragraph.</p>
  <p class="text-base text-gray-300">Conclusion of the story.</p>
</div>
```

**Inline SVG charts** — use for data that would be clearer as a curve or comparison. Keep viewBox at `0 0 600 220`. Dark background: `bg-gray-800/80`. Always add a `<figcaption>`.

**Section headers** — direct, not clever:
- ✅ `## Rule of 72: your mental calculator`
- ✅ `## The hidden cost of fees`
- ❌ `## Why savvy investors know this one trick`
- ❌ `## What everyone gets wrong about returns`

**Lists** — only when each item stands alone and order matters or scanning is the goal. Three parallel narrative items → use a list. A connected thought → use a paragraph.

---

## Examples

Every claim needs one of: a number, a name, a comparison, or a consequence.

- ❌ "Fees can significantly reduce your returns over time."
- ✅ "Two identical portfolios, both earning 10%. One charges 1% annual fees, the other 0.1%. Over 25 years: $200K vs. $270K."

**Follow a character through time** — this works better than abstract projections:
> Maria invests $100/month at 10%:
> - 5 years: $7,500 invested → $9,800 balance
> - 15 years: $22,500 invested → $42,000 balance
> - 20 years: $30,000 invested → $76,000 balance

---

## Rhythm

Vary sentence length deliberately. Short sentences after long ones create emphasis.

> That extra $43,000 is compounding doing the heavy lifting.

> You invested $37,000. The rest came from time.

Never stack 3+ sentences of the same length. Read the draft aloud — if it sounds like a metronome, break the pattern.

---

## Endings

Do not summarize. Do not say "in conclusion."

End with:
- A specific action the reader can take today
- An insight that reframes what they just read
- A single sentence that lands

> The math has been clear for decades. The hard part is starting before you feel ready.

---

## Numbers

- Always use specific numbers, not round vague ones
- Show the before and after: `$37,000 invested → $76,000 balance`
- Show the gap, not just the total: `that extra $39,000 is compounding`
- Prefer real-scenario numbers (modest monthly investments, realistic returns of 7–10%)

---

## Character Names

Use names natural to the language and region of the article:
- **English articles:** Alex, Maria, David, Anna, James, Sophie — readable internationally
- **Ukrainian articles:** Олена, Микола, Іван, Тетяна, Андрій, Марія, Дмитро, Юлія

The same character carries across both versions — just use the correct form: Mykola → Микола, Anna → Анна.

---

## Audience Terminology

Match complexity to the audience level of the article:

**Beginner articles** (tag: beginner, category: investment-basics, practical-tips):
- Jargon must be replaced or explained inline in parentheses on first use
- Explain once, then use freely: TER, AUM, ETF, index, dividend
- Always explain even in beginner articles: volatility ("різкі коливання ціни"), spread ("різниця між ціною купівлі і продажу"), derivatives ("інструменти що копіюють поведінку активів без прямого володіння ними"), hedging, counterparty risk, replication method
- Format: "деривативи (інструменти що копіюють поведінку активів)" — one inline phrase, no footnotes

**Intermediate/advanced articles** (category: strategies-analysis):
- Standard finance vocabulary allowed without explanation
- Avoid stacking unexplained acronyms in a single sentence

---

## Dry Wit & Sarcasm

Use sparingly — 1–2 moments per article. When used well, it signals that the author understands the reader's frustration and isn't just generating content.

**Rules:**
- Target systems, situations, and industry habits — never people or the reader
- Understated works better than obvious: "Analysts publish entire reports on this" beats "This is completely useless"
- The joke should reinforce the argument, not distract from it
- Place after a factual statement that already makes the point — wit lands harder when the reader already half-agrees

**Formats that work:**
- The absurd consequence: "If either structure collapses, your fund selection process won't be the interesting part of that story."
- The deflating comparison: "The best ETF holds more companies than you could name in an afternoon."
- The callback to the opening: "Close the tab — Олена досі на вкладці 47."
- The honest admission: "Analysts publish entire reports on tracking error. For a beginner, it's the least interesting number on the page."

**What to avoid:**
- Sarcasm that punches at the reader ("if you don't know this, you shouldn't be investing")
- Forced humor that breaks the flow
- More than two wit moments per article — it stops being wit and starts being a tone

---

## Translation Naturalness

After translating to Ukrainian, re-read the UA text **without** looking at the English. For each sentence: "Could a Ukrainian writer have written this without seeing the English?" If no — rewrite.

Common Ukrainian-specific failure patterns:
- **Kept "Вона/Він" mid-paragraph** — Ukrainian often drops subject pronouns after the first introduction
- **"в будь-якому випадку"** — calque of "in any case/regardless." Use "все одно", "так чи інакше"
- **"вибір за замовчуванням"** — computing metaphor. Use "звичний вибір", "те що роблять більшість"
- **Sentence order mirrors English** — Ukrainian often inverts: "Шість годин вона читала" not "Вона провела шість годин, читаючи"
- **"це важливо відзначити"** — banned. Delete or rewrite around the point itself

---

## HTML Conventions

The site uses a dark theme. When using HTML inline:
- Cards: `bg-gray-800/60 border border-gray-700 rounded-lg p-6`
- Secondary text: `text-gray-300`
- Emphasis: `<strong>` for numbers, outcomes, key terms
- Charts: inline SVG with `bg-gray-800/80` fill, `#F7A535` for primary line, `#6b7280` for secondary
- Figures always get `<figcaption class="text-center text-gray-400 mt-2">`
