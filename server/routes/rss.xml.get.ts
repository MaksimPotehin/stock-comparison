import { BLOG_POSTS } from '~/content/blog/posts'

const site = process.env.NUXT_PUBLIC_SITE_URL || 'https://www.investing-space.tech'

export default defineEventHandler(() => {
  const items = BLOG_POSTS.map(p => {
    const locEn = `${site}/blog/${p.slug}`
    const pub = new Date(p.publishedAt).toUTCString()
    return `
      <item>
        <title><![CDATA[${p.title.en}]]></title>
        <link>${locEn}</link>
        <guid>${locEn}</guid>
        <pubDate>${pub}</pubDate>
        <description><![CDATA[${p.excerpt.en}]]></description>
      </item>
    `
  }).join('')

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
  <rss version="2.0">
    <channel>
      <title>Investing Space Blog</title>
      <link>${site}/blog</link>
      <description>Articles on investing, financial literacy, and compound interest.</description>
      ${items}
    </channel>
  </rss>`

  return new Response(rss, {
    headers: { 'content-type': 'application/rss+xml; charset=utf-8' }
  })
})
