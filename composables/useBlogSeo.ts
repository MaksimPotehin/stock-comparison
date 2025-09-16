import type { Ref } from 'vue'
import type { IBlogPost } from '~/types/blog'

export const useBlogSeo = () => {
  const { locale } = useI18n()
  const runtimeConfig = useRuntimeConfig()

  const setupBlogIndexSeo = (
    filteredPosts: Ref<IBlogPost[]>,
    pagedPosts: Ref<IBlogPost[]>,
    pagination: { page: number; limit: number }
  ) => {
    watchEffect(() => {
      const currentLocale = locale.value === 'ua' ? 'ua' : 'en'
      const baseUrl = (runtimeConfig.public?.siteUrl as string) || 'https://www.investing-space.tech'
      const path = currentLocale === 'ua' ? '/ua/blog' : '/blog'
      const canonicalBase = `${baseUrl}${path}`

      const total = filteredPosts.value.length
      const totalPages = Math.max(1, Math.ceil(total / pagination.limit))
      const page = Math.min(Math.max(1, pagination.page), totalPages)
      const buildPageUrl = (p: number) => `${canonicalBase}${p > 1 ? `?page=${p}` : ''}`
      const canonicalUrl = buildPageUrl(page)

      const title = locale.value === 'ua'
        ? 'Блог про інвестиції | Фінансова грамотність та складні відсотки'
        : 'Investing Blog | Financial Literacy & Compound Interest'
      const description = locale.value === 'ua'
        ? 'Статті про інвестування, фінансову грамотність, складні відсотки та практичні гіди.'
        : 'Articles on investing, financial literacy, compound interest, and practical guides.'
      const keywords = locale.value === 'ua'
        ? 'блог інвестиції, фінансова грамотність, складні відсотки, інвестиційний калькулятор, пасивний дохід, ETF, довгострокові інвестиції'
        : 'investing blog, financial literacy, compound interest, investment calculator, passive income, ETFs, long-term investing'

      const listItems = pagedPosts.value.map((p, idx) => ({
        '@type': 'ListItem',
        position: (page - 1) * pagination.limit + (idx + 1),
        url: `${baseUrl}${currentLocale === 'ua' ? '/ua' : ''}/blog/${p.slug}`
      }))

      const blogSchema = {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: title,
        description,
        url: canonicalUrl,
        inLanguage: currentLocale === 'ua' ? 'uk-UA' : 'en-US',
        keywords
      }

      const itemListSchema = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: listItems
      }

      useHead({
        title,
        meta: [
          { name: 'description', content: description },
          { name: 'keywords', content: keywords },
          { property: 'og:title', content: title },
          { property: 'og:description', content: description },
          { property: 'og:url', content: canonicalUrl },
          { property: 'og:type', content: 'website' },
          { property: 'og:locale', content: currentLocale === 'ua' ? 'uk_UA' : 'en_US' },
          { property: 'og:locale:alternate', content: currentLocale === 'ua' ? 'en_US' : 'uk_UA' },
          { property: 'og:image', content: `${baseUrl}/og-image.svg` },
          { property: 'og:image:width', content: '1200' },
          { property: 'og:image:height', content: '630' },
          { name: 'twitter:card', content: 'summary_large_image' },
          { name: 'twitter:title', content: title },
          { name: 'twitter:description', content: description },
          { name: 'twitter:image', content: `${baseUrl}/og-image.svg` }
        ],
        link: [
          { rel: 'canonical', href: canonicalUrl },
          ...(page > 1 ? [{ rel: 'prev', href: buildPageUrl(page - 1) }] : []),
          ...(page < totalPages ? [{ rel: 'next', href: buildPageUrl(page + 1) }] : []),
          { rel: 'alternate', hreflang: 'uk', href: `${baseUrl}/ua/blog` },
          { rel: 'alternate', hreflang: 'en', href: `${baseUrl}/blog` },
          { rel: 'alternate', hreflang: 'x-default', href: `${baseUrl}/blog` },
          { rel: 'alternate', type: 'application/rss+xml', title: 'Investing Space Blog RSS', href: `${baseUrl}/rss.xml` }
        ],
        script: [
          { type: 'application/ld+json', innerHTML: JSON.stringify(blogSchema) },
          { type: 'application/ld+json', innerHTML: JSON.stringify(itemListSchema) }
        ]
      })
    })
  }

  const setupBlogPostSeo = (post: Ref<IBlogPost | undefined>) => {
    watchEffect(() => {
      if (!post.value) return
      const baseUrl = (runtimeConfig.public?.siteUrl as string) || 'https://www.investing-space.tech'
      const currentLocale = locale.value === 'ua' ? 'ua' : 'en'
      const path = currentLocale === 'ua' ? `/ua/blog/${post.value.slug}` : `/blog/${post.value.slug}`
      const canonicalUrl = `${baseUrl}${path}`

      const title = post.value.title[currentLocale]
      const description = post.value.excerpt[currentLocale]
      const keywords = (post.value.tags || []).join(', ')

      const articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
        headline: title,
        description,
        inLanguage: currentLocale === 'ua' ? 'uk-UA' : 'en-US',
        datePublished: post.value.publishedAt,
        dateModified: post.value.publishedAt,
        author: { '@type': 'Person', name: post.value.author || 'Investing Space' },
        publisher: { '@type': 'Organization', name: 'Investing Space', logo: { '@type': 'ImageObject', url: `${baseUrl}/favicon/android-chrome-192x192.png`, width: 192, height: 192 } },
        image: [{ '@type': 'ImageObject', url: `${baseUrl}/og-image.svg`, width: 1200, height: 630 }],
        keywords
      }

      const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: currentLocale === 'ua' ? 'Блог' : 'Blog', item: `${baseUrl}${currentLocale === 'ua' ? '/ua/blog' : '/blog'}` },
          { '@type': 'ListItem', position: 2, name: title, item: canonicalUrl }
        ]
      }

      useHead({
        title,
        meta: [
          { name: 'description', content: description },
          { name: 'keywords', content: keywords },
          { property: 'og:title', content: title },
          { property: 'og:description', content: description },
          { property: 'og:url', content: canonicalUrl },
          { property: 'og:type', content: 'article' },
          { property: 'og:locale', content: currentLocale === 'ua' ? 'uk_UA' : 'en_US' },
          { property: 'og:locale:alternate', content: currentLocale === 'ua' ? 'en_US' : 'uk_UA' },
          { property: 'og:image', content: `${baseUrl}/og-image.svg` },
          { property: 'og:image:width', content: '1200' },
          { property: 'og:image:height', content: '630' },
          { property: 'article:published_time', content: post.value.publishedAt },
          { property: 'article:modified_time', content: post.value.publishedAt },
          ...(post.value.tags || []).map(t => ({ property: 'article:tag', content: t })),
          { property: 'article:section', content: post.value.category },
          { name: 'twitter:card', content: 'summary_large_image' },
          { name: 'twitter:title', content: title },
          { name: 'twitter:description', content: description },
          { name: 'twitter:image', content: `${baseUrl}/og-image.svg` }
        ],
        link: [
          { rel: 'canonical', href: canonicalUrl },
          { rel: 'alternate', hreflang: 'uk', href: `${baseUrl}/ua/blog/${post.value.slug}` },
          { rel: 'alternate', hreflang: 'en', href: `${baseUrl}/blog/${post.value.slug}` },
          { rel: 'alternate', hreflang: 'x-default', href: `${baseUrl}/blog/${post.value.slug}` }
        ],
        script: [
          { type: 'application/ld+json', innerHTML: JSON.stringify(articleSchema) },
          { type: 'application/ld+json', innerHTML: JSON.stringify(breadcrumbSchema) }
        ]
      })
    })
  }

  return { setupBlogIndexSeo, setupBlogPostSeo }
}
