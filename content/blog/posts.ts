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
      en: '<p>Compound interest is interest calculated on the initial principal and also on the accumulated interest of previous periods.</p>',
      ua: '<p>Складні відсотки — це нарахування відсотків не тільки на початкову суму, а й на вже накопичені відсотки попередніх періодів.</p>'
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
    category: i % 2 === 0 ? 'investment-tools' : 'financial-planning',
    tags: i % 2 === 0 ? ['tools'] : ['planning'],
    author: 'Investing Space',
    publishedAt: `2025-02-${String(10 + i).padStart(2, '0')}`,
    readingTime: 4,
    featured: false
  }))
]
