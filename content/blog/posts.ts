/* eslint-disable max-len */
import type { IBlogPost } from '~/types/blog'

export const BLOG_POSTS: IBlogPost[] = [
  {
    id: 'compound-interest-basics',
    slug: 'compound-interest-basics',
    title: {
      en: 'Compound Interest: The Basics',
      ua: 'Складні відсотки: основи'
    },
    excerpt: {
      en: 'Understand how compounding grows your wealth exponentially over time.',
      ua: 'Зрозумійте, як складні відсотки експоненційно збільшують ваш капітал.'
    },
    content: {
      en: `
  # Compound Your Money: The Simple System That Quietly Builds Wealth

<div class="my-4 p-4 rounded-lg bg-gray-800/60 border border-gray-700">
<p class="text-lg leading-relaxed mb-4">
At 25, Anna starts investing $400 a month at a 10% annual return. Her friend Sarah is skeptical: "Why start so early? It's better to wait until my salary is higher."
</p>
<p class="text-base text-gray-300 mb-4">
Sarah doesn't start until age 35, but she invests $800 a month — twice as much as Anna. "Now I'm really serious about investing," she thinks.
</p>
<p class="text-base text-gray-300 mb-4">
After 20 years, the results are eye-opening: Anna has <strong>$1.2 million</strong> while Sarah has only <strong>$600,000</strong>.
</p>
<p class="text-base text-gray-300">
This $600,000 difference is even more striking when you realize that Sarah invested twice as much money ($192,000 vs. Anna's $96,000). But time is the one resource you can't buy. Anna started 10 years earlier, and those 10 years turned out to be more valuable than doubling her contributions.
</p>
<p class="text-base text-gray-300">
This is the power of compound interest: your money earns returns — and then those returns earn returns too.  
Like a snowball rolling downhill, it starts slowly but picks up incredible speed over time.
</p>
</div>

<figure class="my-6">
<svg viewBox="0 0 600 220" width="100%" height="220" class="rounded-md bg-gray-800/80">
<defs>
<linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
<stop offset="0%" stop-color="#F7A535" stop-opacity="0.6" />
<stop offset="100%" stop-color="#F7A535" stop-opacity="0.05" />
</linearGradient>
</defs>
<rect x="0" y="0" width="600" height="220" fill="transparent" />
<line x1="40" y1="10" x2="40" y2="190" stroke="#3f4761" stroke-width="1"/>
<line x1="40" y1="190" x2="580" y2="190" stroke="#3f4761" stroke-width="1"/>
<polyline fill="none" stroke="#6b7280" stroke-width="2" points="40,180 140,165 240,150 340,135 440,120 540,105" />
<path d="M40,180 C140,175 240,160 340,135 C420,110 500,85 540,55" fill="none" stroke="#F7A535" stroke-width="3"/>
<path d="M40,180 C140,175 240,160 340,135 C420,110 500,85 540,55 L540,190 L40,190 Z" fill="url(#g)"/>
<circle cx="460" cy="25" r="5" fill="#6b7280"/>
<text x="472" y="29" fill="#d1d5db" font-size="12">Deposits only</text>
<circle cx="460" cy="45" r="5" fill="#F7A535"/>
<text x="472" y="49" fill="#d1d5db" font-size="12">Deposits + compounding</text>
</svg>
<figcaption class="text-center text-gray-400 mt-2">
Notice how the orange curve (with compounding) accelerates dramatically in later years, while the gray line (deposits only) stays flat.
</figcaption>
</figure>

## What is compounding?

Imagine you lend a friend $100 at 10% interest. After one year, they pay you back $110. But if you leave that $110 for another year, you end up with $121, not $120.  
That extra $1 is compounding in action.

Think of your investments like a garden. At first, you plant seeds (your money) and water them regularly (consistent contributions). The plants grow slowly at first, but as they mature, they produce seeds of their own. Those seeds grow into more plants, which produce even more seeds. Before long, your garden is thriving on its own.

**Three dials that control your wealth-building machine:**
- **Time** — the longer you let it run, the more powerful it becomes  
- **Rate** — how much your money grows each year  
- **Regular contributions** — consistency beats intensity every time  

### Quick example

- Start: $1,000  
- Add: $200 monthly  
- Average annual return: 10%  
- Time: 15 years  

Result: you’d end up with about <strong>$80,000–$90,000</strong> (vs <strong>$37,000</strong> of deposits).  
That extra $43,000–$53,000 is compounding doing the heavy lifting.

## Rule of 72: your mental calculator

This is the simplest way to estimate how long it takes for your money to double.  
Just divide 72 by your annual rate of return.

**How it works:**  
- 10% annual → 72 ÷ 10 = 7.2 years to double  
- 12% annual → 72 ÷ 12 = 6 years to double  
- 6% annual → 72 ÷ 6 = 12 years to double  

**Why it's useful:**  
- Quickly assess if your goals are realistic  
- Compare different investment strategies  
- Understand how your growth rate affects time to reach goals  

For example, if you want to grow $50,000 into $100,000 at 10% annual returns, you'll get there in roughly 7 years.

### The power of time (beginner's journey)

Let's follow Maria, who invests $100 monthly at 10% annual return:

- **5 years**: $7,500 total invested → $9,800 balance (growth: $2,300)  
- **10 years**: $15,000 invested → $20,500 balance (growth: $5,500)  
- **15 years**: $22,500 invested → $42,000 balance (growth: $19,500)  
- **20 years**: $30,000 invested → $76,000 balance (growth: $46,000)  

Notice how the growth accelerates dramatically in the later years.  
Maria's money is now working harder than she is.

### The hidden cost of fees

Two identical portfolios, both earning 10% gross returns.  
The only difference: one charges 1% annual fees, the other 0.1%.

Over 25 years with $200 monthly contributions:
- **High-fee portfolio**: $200,000 final balance  
- **Low-fee portfolio**: $250,000 final balance  

That $50,000 difference comes from just 0.9% in annual fees.  
It's like having a small leak in your boat — barely noticeable day by day, but over time it will sink you.

## The reality check: what can go wrong

**Market volatility** — Your portfolio will drop 20–30% during market crashes. This is normal.  
Don't invest money you'll need in the next 3–5 years.

**Your own behavior** — The biggest risk isn't market crashes; it's abandoning your strategy after every scary headline.  
Pick a plan and stick to it.

**Putting all eggs in one basket** — Diversify across different asset types and time periods.  
Don't bet everything on one stock or sector.

<div class="my-4 p-4 rounded-lg bg-gray-800/60 border border-gray-700">
Build a 3–6 month emergency fund first — it protects your long-term investments from becoming short-term panic sells.  
When you know you can cover unexpected expenses without touching your investments, you'll stay calm during downturns.  
Without this safety net, an emergency might force you to sell at the worst time, locking in losses.
</div>

## Conclusion

Compound interest is the most powerful wealth-building tool that works quietly in the background.  
The key to success isn't complex strategies or high incomes — it's time and consistency.  
Anna from our story proved that $400 monthly for 20 years beats $800 monthly for 10 years.  
Time is the only resource you can't buy, but you can use it wisely.  
Start today, automate the process, minimize fees, and let time do its magic.`,
      ua: `# Сила складних відсотків: простий підхід, що працює роками

<div class="my-4 p-4 rounded-lg bg-gray-800/60 border border-gray-700">
<p class="text-lg leading-relaxed mb-4">
У 25 років Анна починає інвестувати $400 щомісяця під 10% річних. Її подруга Оксана ставиться до цього скептично: "Навіщо починати так рано? Краще зачекати, поки зарплата буде більшою."
</p>
<p class="text-base text-gray-300 mb-4">
Оксана починає інвестувати лише у 35 років, але вже $800 щомісяця — удвічі більше за Анну. "Тепер я справді серйозно підходжу до інвестицій", — думає вона.
</p>
<p class="text-base text-gray-300 mb-4">
Через 20 років результати вражають: у Анни <strong>$1.2 мільйона</strong>, а в Оксани лише <strong>$600 000</strong>.
</p>
<p class="text-base text-gray-300">
Ця різниця ще більш показова, якщо врахувати, що Оксана інвестувала удвічі більше грошей ($192 000 проти $96 000 у Анни). Але час — це єдиний ресурс, який неможливо купити. Анна почала на 10 років раніше, і ці 10 років виявилися ціннішими, ніж навіть подвоєні внески.
</p>
<p class="text-base text-gray-300">
Це і є сила складних відсотків: ваші гроші приносять прибуток, а потім цей прибуток теж починає працювати.
Як снігова куля, що котиться з гори — спочатку повільно, а з часом набирає шаленої швидкості.
</p>
</div>

<figure class="my-6">
<svg viewBox="0 0 600 220" width="100%" height="250" class="rounded-md bg-gray-800/80">
<defs>
<linearGradient id="g2" x1="0" x2="0" y1="0" y2="1">
<stop offset="0%" stop-color="#F7A535" stop-opacity="0.6" />
<stop offset="100%" stop-color="#F7A535" stop-opacity="0.05" />
</linearGradient>
</defs>
<rect x="0" y="0" width="600" height="220" fill="transparent" />
<line x1="40" y1="10" x2="40" y2="190" stroke="#3f4761" stroke-width="1"/>
<line x1="40" y1="190" x2="580" y2="190" stroke="#3f4761" stroke-width="1"/>
<polyline fill="none" stroke="#6b7280" stroke-width="2" points="40,180 140,165 240,150 340,135 440,120 540,105" />
<path d="M40,180 C140,175 240,160 340,135 C420,110 500,85 540,55" fill="none" stroke="#F7A535" stroke-width="3"/>
<path d="M40,180 C140,175 240,160 340,135 C420,110 500,85 540,55 L540,190 L40,190 Z" fill="url(#g2)"/>
<circle cx="460" cy="25" r="5" fill="#6b7280"/>
<text x="472" y="29" fill="#d1d5db" font-size="12">Лише внески</text>
<circle cx="460" cy="45" r="5" fill="#F7A535"/>
<text x="472" y="49" fill="#d1d5db" font-size="12">Внески + капіталізація</text>
</svg>
<figcaption class="text-center text-gray-400 mt-2">
Зверніть увагу, як помаранчева крива (з капіталізацією) різко прискорюється в останні роки, тоді як сіра лінія (лише внески) залишається майже рівною.
</figcaption>
</figure>

## Що таке складні відсотки

Уявіть, що ви даєте другу 100 грн під 10% річних. Через рік він повертає вам 110 грн.  
Якщо ці 110 грн залишити ще на рік, ви отримаєте не 120, а 121 грн.  
Ця додаткова гривня — це і є складні відсотки в дії.

Уявіть свої інвестиції як сад: ви садите насіння (ваші гроші) і поливаєте його регулярно (щомісячні внески). Спершу рослини ростуть повільно, але коли дозрівають, вони дають нове насіння. Нові рослини з часом утворюють ще більше насіння — і ваш сад починає рости самостійно.

**Три регулятори вашої машини зростання:**
- **Час** — чим довше гроші працюють, тим сильніший ефект  
- **Ставка** — різниця між 6% і 10% здається невеликою, але за 30 років це може означати сотні тисяч різниці  
- **Регулярність** — постійні внески важливіші, ніж великі, але одноразові  

### Швидкий приклад

- Старт: $1,000  
- Щомісяця: $200  
- Середня дохідність: 10%  
- Горизонт: 15 років  

Результат: <strong>$80,000–$90,000</strong> проти <strong>$37,000</strong> внесків.  
Додаткові <strong>$43,000–$53,000</strong> — це чистий ефект капіталізації.

## Правило 72: ваш ментальний калькулятор

Це простий спосіб оцінити, скільки часу потрібно, щоб гроші подвоїлися:  
просто поділіть 72 на річну ставку доходності.

**Як це працює:**  
- 10% річних → 72 ÷ 10 = 7.2 року  
- 12% річних → 72 ÷ 12 = 6 років  
- 6% річних → 72 ÷ 6 = 12 років  

**Чому це корисно:**  
- Допомагає швидко оцінити реалістичність цілей  
- Дозволяє порівнювати інвестиційні стратегії  
- Показує, як ставка впливає на час досягнення цілей  

Наприклад, якщо ви маєте $50,000 і хочете $100,000 під 10% річних, це займе близько 7 років.

### Сила часу (шлях початківця)

Подивімося на Марію, яка інвестує $100 щомісяця під 10% річних:

- **5 років**: $7 500 внесено → $9 800 баланс (приріст: $2 300)  
- **10 років**: $15 000 внесено → $20 500 баланс (приріст: $5 500)  
- **15 років**: $22 500 внесено → $42 000 баланс (приріст: $19 500)  
- **20 років**: $30 000 внесено → $76 000 баланс (приріст: $46 000)  

Зверніть увагу, як приріст різко прискорюється в останні роки.  
Гроші Марії тепер працюють важче, ніж вона сама.

### Прихована вартість комісій

Два однакові портфелі з дохідністю 10% річних.  
Різниця лише в комісії: 1% проти 0.1%.

За 25 років із $200 щомісяця:
- **Дорогий портфель**: $200 000 фінальний баланс  
- **Дешевий портфель**: $250 000 фінальний баланс  

Ця різниця в $50 000 — лише ціна комісії.  
Це як маленька теча в човні: непомітно день за днем, але з часом може його потопити.

## Ризики: що може піти не так

**Волатильність ринку** — ваш портфель може падати на 20–30% під час криз. Це нормально.  
Не інвестуйте гроші, які можуть знадобитися в найближчі 3–5 років.

**Власна поведінка** — найбільший ризик не в ринку, а у зміні стратегії після кожної тривожної новини.  
Обирайте систему й дотримуйтеся її.

**Концентрація активів** — диверсифікуйте між різними класами активів та часовими горизонтами.  
Не ставте все на одну карту.

<div class="my-4 p-4 rounded-lg bg-gray-800/60 border border-gray-700">
Майте резерв на 3–6 місяців витрат — це захистить ваші довгострокові інвестиції від вимушеного продажу в мінус.  
Знаючи, що ви покриєте непередбачені витрати без продажу активів, ви спокійно переживете ринкові падіння.
</div>

## Висновок

Складні відсотки — це найпотужніший інструмент зростання багатства, який працює тихо на задньому плані. Ключ успіху не в складних стратегіях чи високих доходах, а в часі та постійності. Анна з нашої історії довела, що $400 щомісяця протягом 20 років перемагають $800 щомісяця протягом 10 років. Час — це єдиний ресурс, який неможливо купити, але можна використати мудро. Почніть сьогодні, автоматизуйте процес, мінімізуйте комісії та дозвольте часу зробити свою магію.`
    },
    category: 'calculator-guides',
    tags: ['compound-interest', 'beginner', 'calculator'],
    author: 'Investing Space',
    publishedAt: '2025-01-20',
    readingTime: 5,
    featured: true
  },
  {
    id: 'how-to-choose-etf-for-beginners',
    slug: 'how-to-choose-etf-for-beginners',
    title: {
      en: 'How to Choose Your First ETF (Without the Paralysis)',
      ua: 'Як вибрати перший ETF: 3 критерії що справді мають значення'
    },
    excerpt: {
      en: 'Three criteria filter most ETFs for beginners: the index it tracks, the annual cost (TER under 0.30%), and fund size. Everything else can wait.',
      ua: 'Три критерії допоможуть вибрати перший ETF: що відстежує фонд, річна плата (TER до 0,30%) і розмір фонду. Решта може почекати.'
    },
    content: {
      en: `
# Choose Your First ETF Without Spending 6 Hours on It

An ETF (Exchange-Traded Fund) is a security that holds a basket of assets and trades on a stock exchange — like a stock, but instead of one company you get hundreds or thousands at once.

<div class="my-8 p-4 rounded-lg bg-gray-800/60 border border-gray-700">
<p class="text-lg leading-relaxed mb-4">
Olena had €5,000 ready to invest. She spent six hours reading about ETFs — tracking error, synthetic replication, currency hedging, fund domicile, dividend reinvestment policy. She built a spreadsheet. Then she couldn't decide, closed the tab, and left the money in a savings account paying 1.2%.
</p>
<p class="text-base text-gray-300 mb-4">
Mykola had the same €5,000. He spent 45 minutes, applied three filters, and bought a broad world index ETF with a 0.20% annual cost. He hasn't touched it since.
</p>
<p class="text-base text-gray-300 mb-4">
Three years later at a 7% average annual return: Mykola's account shows <strong>€6,125</strong>. Olena's savings account shows <strong>€5,181</strong> — and after 3% average inflation over the same period, she lost purchasing power.
</p>
<p class="text-base text-gray-300">
The six hours of research didn't make her eventual choice better. They prevented her from making any choice at all.
</p>
</div>

<p class="mt-6">Mykola's 45 minutes came down to three questions. The answers haven't changed since he first asked them.</p>

## The three criteria that matter

### 1. What the fund tracks

The index determines what you own. For a first ETF, broad beats specific.

A fund tracking the MSCI World index owns shares in roughly 1,400 companies across 23 developed countries. A fund tracking "clean energy innovation" owns 40 companies in one sector. The first gives you exposure to global economic growth. The second is a concentrated bet on one industry's future.

For a first investment, stick to a broad index: global equities (MSCI World, FTSE All-World), US equities (S&P 500), or European equities (EURO STOXX 600). The best ETF holds more companies than you could name in an afternoon. Sector and thematic ETFs belong later — if at all.

### 2. TER — the annual cost

TER stands for Total Expense Ratio. It's the percentage the fund deducts from your holdings each year automatically. You never see an invoice — the cost is reflected in the fund's price.

The difference looks small. Over 30 years it isn't.

<figure class="my-6">
<svg viewBox="0 0 600 220" width="100%" height="220" class="rounded-md bg-gray-800/80">
<defs>
<linearGradient id="etf-g1" x1="0" x2="0" y1="0" y2="1">
<stop offset="0%" stop-color="#F7A535" stop-opacity="0.5" />
<stop offset="100%" stop-color="#F7A535" stop-opacity="0.05" />
</linearGradient>
<linearGradient id="etf-g2" x1="0" x2="0" y1="0" y2="1">
<stop offset="0%" stop-color="#6b7280" stop-opacity="0.4" />
<stop offset="100%" stop-color="#6b7280" stop-opacity="0.05" />
</linearGradient>
</defs>
<rect x="0" y="0" width="600" height="220" fill="transparent" />
<line x1="50" y1="10" x2="50" y2="185" stroke="#3f4761" stroke-width="1"/>
<line x1="50" y1="185" x2="580" y2="185" stroke="#3f4761" stroke-width="1"/>
<path d="M50,175 C150,168 250,150 350,122 C450,94 520,68 570,48" fill="none" stroke="#F7A535" stroke-width="3"/>
<path d="M50,175 C150,168 250,150 350,122 C450,94 520,68 570,48 L570,185 L50,185 Z" fill="url(#etf-g1)"/>
<path d="M50,175 C150,169 250,154 350,132 C450,108 520,86 570,68" fill="none" stroke="#6b7280" stroke-width="2"/>
<path d="M50,175 C150,169 250,154 350,132 C450,108 520,86 570,68 L570,185 L50,185 Z" fill="url(#etf-g2)"/>
<circle cx="380" cy="22" r="5" fill="#F7A535"/>
<text x="392" y="26" fill="#d1d5db" font-size="12">0.07% TER → €74,600</text>
<circle cx="380" cy="42" r="5" fill="#6b7280"/>
<text x="392" y="46" fill="#d1d5db" font-size="12">0.50% TER → €66,100</text>
<text x="48" y="200" fill="#9ca3af" font-size="11" text-anchor="middle">0y</text>
<text x="200" y="200" fill="#9ca3af" font-size="11" text-anchor="middle">10y</text>
<text x="385" y="200" fill="#9ca3af" font-size="11" text-anchor="middle">20y</text>
<text x="570" y="200" fill="#9ca3af" font-size="11" text-anchor="middle">30y</text>
</svg>
<figcaption class="text-center text-gray-400 mt-2">
€10,000 invested at 7% annual return over 30 years. The gap between a 0.07% and 0.50% TER fund: <strong>€8,500</strong> — paid in fees rather than kept as your return.
</figcaption>
</figure>

Target a TER under 0.30%. Broad world index funds are available at 0.07–0.20%. A 0.50% fund tracking the same index as a 0.07% fund is a worse deal with no compensating benefit.

### 3. Fund size

Check the AUM — Assets Under Management. Two reasons this matters:

**Liquidity.** Larger funds trade more volume. The spread between buy and sell price stays narrow. Small funds can cost you 0.1–0.3% extra on the bid-ask spread alone — every time you trade.

**Longevity.** Funds below €100M are at risk of closure. When a fund closes, you're forced to sell at market price and reinvest — with possible tax consequences. Look for at least €100M AUM. €500M or more is comfortable.

## What to stop researching

Most beginner guides cover these. Few explain they matter much less than the three above, at your stage.

**Tracking error** measures how closely a fund follows its index. For established ETFs, the typical gap is 0.05–0.15% per year — smaller than one bad day in a volatile market. TER explains most of tracking error anyway. Analysts publish entire reports on this difference. For a beginner choosing between two broad index ETFs from major providers, it's the least interesting number on the page.

**Accumulating vs. distributing.** Accumulating funds reinvest dividends automatically; distributing funds pay them to your account. For long-term investors who plan to reinvest regardless, accumulating is simpler: no manual reinvestment step, slightly better compounding, and in many jurisdictions deferred tax on those dividends. Choose distributing only if you need the cash flow or your tax situation specifically favors it.

Physical vs. synthetic replication and currency hedging are both worth understanding eventually, but neither should slow down a first purchase. Physical ETFs own the assets directly; synthetic ones use derivatives — both are regulated, both carry 40-page risk disclosures, and both are used by pension funds managing more than most countries' GDP. If either structure were to collapse, your ETF selection process would not be the interesting part of that story. Currency-hedged funds remove exposure to foreign exchange movements, but hedging costs 0.1–0.3% per year, and over a 10+ year horizon, currency effects tend to average out. For a first long-term ETF, unhedged physical on a broad index is the default for a reason.

## Finding the numbers

Two screeners: **[JustETF](https://www.justetf.com)** (Europe-focused) and **[ETF.com](https://www.etf.com)** (US-focused).

The workflow takes 45 minutes, not six hours:
1. Search by index name: "MSCI World", "FTSE All-World", or "S&P 500"
2. Sort by TER, ascending
3. Filter AUM to €100M minimum
4. Pick any fund near the top of the remaining list

Typical result after filtering: four to six funds, TERs between 0.07% and 0.20%, AUM ranging from €2B to €60B. All tracking the same index. Pick the lowest TER among funds above €500M — and close the tab. Olena is still on tab 47.

---

A good-enough ETF held for 15 years beats a theoretically perfect one you never buy.
`,
      ua: `
# Як вибрати перший ETF без шести годин досліджень

Найперше, що потрібно знати — що таке ETF. Exchange-Traded Fund (біржовий інвестиційний фонд) — це цінний папір, що тримає кошик активів і торгується на біржі, як звичайна акція. Тільки замість однієї компанії ви одразу отримуєте сотні або тисячі.

<div class="my-4 p-4 rounded-lg bg-gray-800/60 border border-gray-700">
<p class="text-lg leading-relaxed mb-4">
Олена мала €5 000, які хотіла вкласти. Шість годин вона читала про ETF — помилка відстеження, синтетичне реплікування, валютне хеджування, юрисдикція фонду, політика реінвестування дивідендів. Склала таблицю в Excel. Так і не вирішила, закрила браузер і залишила гроші на ощадному рахунку під 1,2%.
</p>
<p class="text-base text-gray-300 mb-4">
Микола мав ті самі €5 000. Витратив 45 хвилин, застосував три фільтри і купив широкий індексний ETF з річною платою 0,20%. Відтоді не чіпав.
</p>
<p class="text-base text-gray-300 mb-4">
Через три роки при середньорічній дохідності 7%: на рахунку Миколи <strong>€6 125</strong>. На ощадному рахунку Олени — <strong>€5 181</strong>, і з урахуванням інфляції 3% вона втратила купівельну спроможність.
</p>
<p class="text-base text-gray-300">
Шість годин досліджень не зробили б її вибір кращим. Вони взагалі завадили їй щось вибрати.
</p>
</div>

<p class="mt-6">45 хвилин Миколи звелись до трьох питань. Відповіді на них не змінились відтоді.</p>

## Три критерії що справді мають значення

### 1. Що відстежує фонд

Індекс визначає те, чим ви фактично володієте. Для першого ETF широкий завжди краще за вузький.

Фонд, що відстежує індекс MSCI World, тримає акції приблизно 1 400 компаній з 23 розвинених країн. Фонд "чиста енергетична інновація" — 40 компаній з одного сектору. Перший дає доступ до глобального економічного зростання. Другий — це концентрована ставка на майбутнє однієї галузі.

Для першої інвестиції тримайтесь широкого індексу: глобальних акцій (MSCI World, FTSE All-World), американських (S&P 500) або європейських (EURO STOXX 600). Найкращий ETF тримає більше компаній, ніж ви встигнете назвати за день. Секторні та тематичні ETF — на потім, якщо взагалі.

### 2. TER — річна плата

TER (Total Expense Ratio, коефіцієнт загальних витрат) — це відсоток, який фонд автоматично вираховує з ваших вкладень щороку. Рахунку ви не отримаєте — плата відображається у ціні фонду.

Різниця здається маленькою. За 30 років — ні.

<figure class="my-6">
<svg viewBox="0 0 600 220" width="100%" height="220" class="rounded-md bg-gray-800/80">
<defs>
<linearGradient id="etf-g1-ua" x1="0" x2="0" y1="0" y2="1">
<stop offset="0%" stop-color="#F7A535" stop-opacity="0.5" />
<stop offset="100%" stop-color="#F7A535" stop-opacity="0.05" />
</linearGradient>
<linearGradient id="etf-g2-ua" x1="0" x2="0" y1="0" y2="1">
<stop offset="0%" stop-color="#6b7280" stop-opacity="0.4" />
<stop offset="100%" stop-color="#6b7280" stop-opacity="0.05" />
</linearGradient>
</defs>
<rect x="0" y="0" width="600" height="220" fill="transparent" />
<line x1="50" y1="10" x2="50" y2="185" stroke="#3f4761" stroke-width="1"/>
<line x1="50" y1="185" x2="580" y2="185" stroke="#3f4761" stroke-width="1"/>
<path d="M50,175 C150,168 250,150 350,122 C450,94 520,68 570,48" fill="none" stroke="#F7A535" stroke-width="3"/>
<path d="M50,175 C150,168 250,150 350,122 C450,94 520,68 570,48 L570,185 L50,185 Z" fill="url(#etf-g1-ua)"/>
<path d="M50,175 C150,169 250,154 350,132 C450,108 520,86 570,68" fill="none" stroke="#6b7280" stroke-width="2"/>
<path d="M50,175 C150,169 250,154 350,132 C450,108 520,86 570,68 L570,185 L50,185 Z" fill="url(#etf-g2-ua)"/>
<circle cx="380" cy="22" r="5" fill="#F7A535"/>
<text x="392" y="26" fill="#d1d5db" font-size="12">TER 0,07% → €74 600</text>
<circle cx="380" cy="42" r="5" fill="#6b7280"/>
<text x="392" y="46" fill="#d1d5db" font-size="12">TER 0,50% → €66 100</text>
<text x="48" y="200" fill="#9ca3af" font-size="11" text-anchor="middle">0р</text>
<text x="200" y="200" fill="#9ca3af" font-size="11" text-anchor="middle">10р</text>
<text x="385" y="200" fill="#9ca3af" font-size="11" text-anchor="middle">20р</text>
<text x="570" y="200" fill="#9ca3af" font-size="11" text-anchor="middle">30р</text>
</svg>
<figcaption class="text-center text-gray-400 mt-2">
€10 000 інвестованих при 7% річній дохідності протягом 30 років. Різниця між фондом з TER 0,07% і 0,50%: <strong>€8 500</strong> — виплачено у комісіях замість вашого доходу.
</figcaption>
</figure>

Орієнтир для початківця: TER до 0,30%. Широкі світові індексні ETF доступні за 0,07–0,20%. Фонд з TER 0,50%, що відстежує той самий індекс що й фонд за 0,07%, — просто гірша угода без жодних компенсуючих переваг.

### 3. Розмір фонду

Перевірте AUM — активи під управлінням (Assets Under Management). Два аргументи:

**Ліквідність.** Більші фонди торгуються активніше. Спред (різниця між ціною купівлі і продажу) залишається вузьким. Маленькі фонди можуть додатково коштувати вам 0,1–0,3% на спреді — щоразу при торгівлі.

**Довговічність.** Фонди нижче €100 млн можуть закрити. Коли фонд закривається, ви змушені продати за поточною ринковою ціною і реінвестувати — з можливими податковими наслідками. Мінімум — €100 млн AUM. €500 млн і більше — комфортно.

## Що можна перестати досліджувати

Більшість посібників для початківців згадують ці критерії. Рідко хто пояснює, що для початківця це другорядне порівняно з трьома попередніми.

**Помилка відстеження** (tracking error) показує, наскільки точно фонд слідує за індексом. Для усталених ETF типова різниця — 0,05–0,15% на рік, що менше ніж звичайний денний рух ринку. TER і так пояснює більшу частину цієї різниці. Аналітики пишуть про неї цілі звіти. Для початківця, який обирає між двома широкими індексними ETF від великих провайдерів, це найнецікавіша цифра на сторінці.

**Накопичувальний чи розподільний.** Накопичувальні фонди автоматично реінвестують дивіденди; розподільні — виплачують їх на рахунок. Хто все одно планує реінвестувати, тому накопичувальний простіший: не треба робити це вручну, трохи краще складне нарахування, і в багатьох країнах — відстрочений податок на дивіденди. Розподільний вибирайте, тільки якщо вам потрібен грошовий потік або ваша податкова ситуація конкретно цьому сприяє.

Фізичне та синтетичне реплікування і валютне хеджування варто розуміти з часом, але жодне з них не повинно гальмувати перше рішення про купівлю. Фізичні ETF тримають активи напряму; синтетичні використовують деривативи (інструменти що копіюють поведінку активів без прямого володіння ними) — обидва регульовані, обидва мають 40-сторінкові проспекти ризиків, і обидва використовують пенсійні фонди, що управляють більшими сумами ніж ВВП більшості країн. Якщо така структура колись впаде — вибір типу реплікування буде найнецікавішою частиною тієї новини. Фонди з валютним хеджуванням усувають вплив курсових коливань, але хеджування коштує 0,1–0,3% на рік, і на горизонті 10+ років валютні ефекти зазвичай вирівнюються. Саме тому більшість початківців починають з нехеджованих фізичних фондів на широкий індекс — і не без підстав.

## Де знайти цифри

Два скринери: **[JustETF](https://www.justetf.com)** (орієнтований на Європу) і **[ETF.com](https://www.etf.com)** (США).

Процес займає 45 хвилин, не шість годин:
1. Пошук за назвою індексу: "MSCI World", "FTSE All-World" або "S&P 500"
2. Сортування за TER за зростанням
3. Фільтр AUM — мінімум €100 млн
4. Будь-який фонд близько до вершини списку що залишився

Типовий результат після фільтрації: чотири-шість фондів, TER від 0,07% до 0,20%, AUM від €2 млрд до €60 млрд. Усі відстежують той самий індекс. Обираємо з найнижчим TER серед фондів від €500 млн — і закриваємо браузер. Олена досі на вкладці 47.

---

Достатньо хороший ETF, що тримається 15 років, виграє у теоретично ідеального, який так і не купили.
`
    },
    category: 'investment-tools',
    tags: ['etf', 'index-fund', 'beginner', 'ter', 'passive-investing', 'portfolio'],
    author: 'Investing Space',
    publishedAt: '2026-04-01',
    readingTime: 5,
    featured: false
  }
  // {
  //   id: 'investment-beginners-2025',
  //   slug: 'investment-beginners-2025',
  //   title: {
  //     en: 'Investing for Beginners in 2025',
  //     ua: 'Інвестування для початківців у 2025'
  //   },
  //   excerpt: {
  //     en: 'Start investing with confidence using simple, proven principles.',
  //     ua: 'Почніть інвестувати впевнено, використовуючи прості перевірені принципи.'
  //   },
  //   content: {
  //     en: '<p>Focus on diversification, long-term thinking, and consistent contributions.</p>',
  //     ua: '<p>Зосередьтесь на диверсифікації, довгостроковому мисленні та регулярних внесках.</p>'
  //   },
  //   category: 'investment-basics',
  //   tags: ['beginner', 'investment-basics'],
  //   author: 'Investing Space',
  //   publishedAt: '2025-02-02',
  //   readingTime: 6,
  //   featured: false
  // }
]
