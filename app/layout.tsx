import type { Metadata } from 'next'
import Script from 'next/script'
import StoreProvider from "@/providers/StoreProvider";
import './globals.css'

const isProduction = process.env.NEXT_PUBLIC_PROFILE === 'prod'
const siteUrl = process.env.NEXT_PUBLIC_FRONT_SERVER || 'https://people.everin.co.kr'
const googleAnalyticsId = 'G-97BLV95358'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: '에버인(EVERIN) - 클라우드 HR 솔루션',
    template: '%s | 에버인',
  },
  description: '근태, 급여, 평가, 기업문화, ERP를 하나로 연결하는 클라우드 HR 솔루션입니다. 33년 HR 전문성과 2,600+ 구축 사례를 바탕으로 기업의 인적 자원 관리를 돕습니다.',
  alternates: isProduction ? {
    canonical: '/',
  } : undefined,
  robots: isProduction ? {
    index: true,
    follow: true,
  } : {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
  verification: isProduction ? {
    other: {
      'naver-site-verification': '89382419dce8453b04d65acca05435891aeb0e78',
    },
  } : undefined,
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: siteUrl,
    siteName: '에버인',
    title: '에버인(EVERIN) - 클라우드 HR 솔루션',
    description: '근태, 급여, 평가, 기업문화, ERP를 하나로 연결하는 클라우드 HR 솔루션입니다.',
  },
  icons: {
    icon: [
      {
        url: '/images/favicon/favicon_icon32.ico',
        type: 'image/x-icon',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/images/favicon/favicon_icon32.ico',
        type: 'image/x-icon',
        media: '(prefers-color-scheme: dark)',
      },
    ],
    shortcut: '/images/favicon/favicon_icon32.ico',
    apple: '/images/favicon/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className="font-sans antialiased">
      <StoreProvider>
        {children}
      </StoreProvider>
      {isProduction && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
            strategy="beforeInteractive"
          />
          <Script id="google-analytics" strategy="beforeInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${googleAnalyticsId}');
            `}
          </Script>
        </>
      )}
      </body>
    </html>
  )
}
