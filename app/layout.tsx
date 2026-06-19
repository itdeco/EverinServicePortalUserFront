import type { Metadata } from 'next'
import StoreProvider from "@/providers/StoreProvider";
import './globals.css'

export const metadata: Metadata = {
  title: '에버人(EVERIN) - 클라우드 HR 솔루션',
  description: '근태·급여·평가·기업문화·ERP를 하나로 통합한 클라우드 HR 솔루션. 33년 영림원 HR 전문성과 2,600+ 도입 사례.',
  generator: 'v0.app',
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
    <html lang="en">
      <body className="font-sans antialiased">
      <StoreProvider>
        {children}
      </StoreProvider>
      </body>
    </html>
  )
}
