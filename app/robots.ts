import type { MetadataRoute } from 'next'

const isProduction = process.env.NEXT_PUBLIC_PROFILE === 'prod'
const siteUrl = process.env.NEXT_PUBLIC_FRONT_SERVER || 'https://people.everin.co.kr'

export default function robots(): MetadataRoute.Robots {
  if (!isProduction) {
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    }
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    host: siteUrl,
  }
}
