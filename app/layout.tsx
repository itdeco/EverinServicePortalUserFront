import type { Metadata } from 'next'
import StoreProvider from "@/providers/StoreProvider";
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: '에버人(EVERIN) - 통합 HR 솔루션',
  description: '근태·급여·평가·기업문화·ERP를 하나로 통합한 HR 솔루션. 33년 영림원 HR 전문성과 3,000+ 도입 사례.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
      <StoreProvider>
        {children}
      </StoreProvider>
      </body>
    </html>
  )
}
