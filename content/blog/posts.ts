/* eslint-disable max-len */
import type { IBlogPost, TBlogCategory } from '~/types/blog'

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

<div class="my-6 p-6 rounded-lg bg-gray-800/60 border border-gray-700">
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

<div class="my-6 p-6 rounded-lg bg-gray-800/60 border border-gray-700">
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
<svg viewBox="0 0 600 220" width="100%" height="220" class="rounded-md bg-gray-800/80">
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
    id: 'investment-beginners-2025',
    slug: 'investment-beginners-2025',
    title: {
      en: 'Investing for Beginners in 2025',
      ua: 'Інвестування для початківців у 2025'
    },
    excerpt: {
      en: 'Start investing with confidence using simple, proven principles.',
      ua: 'Почніть інвестувати впевнено, використовуючи прості перевірені принципи.'
    },
    content: {
      en: '<p>Focus on diversification, long-term thinking, and consistent contributions.</p>',
      ua: '<p>Зосередьтесь на диверсифікації, довгостроковому мисленні та регулярних внесках.</p>'
    },
    category: 'investment-basics',
    tags: ['beginner', 'investment-basics'],
    author: 'Investing Space',
    publishedAt: '2025-02-02',
    readingTime: 6,
    featured: false
  },
  ...Array.from({ length: 7 }).map((_, i) => ({
    id: `sample-post-${i + 1}`,
    slug: `sample-post-${i + 1}`,
    title: {
      en: `Sample Post ${i + 1}`,
      ua: `Приклад статті ${i + 1}`
    },
    excerpt: {
      en: 'Short excerpt for sample content to test pagination and layout.',
      ua: 'Короткий опис для тестового контенту, щоб перевірити пагінацію і макет.'
    },
    content: {
      en: '<p>Sample body for testing purposes.</p>',
      ua: '<p>Тестовий текст для перевірки.</p>'
    },
    category: (i % 2 === 0 ? 'investment-tools' : 'financial-planning') as TBlogCategory,
    tags: i % 2 === 0 ? ['tools'] : ['planning'],
    author: 'Investing Space',
    publishedAt: `2025-02-${String(10 + i).padStart(2, '0')}`,
    readingTime: 4,
    featured: false
  }))
]
