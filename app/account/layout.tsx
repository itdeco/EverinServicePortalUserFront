import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'

export const metadata = {
  title: '계정 관리 - EverinServicePortal',
  description: '개인 계정 정보 관리 페이지',
}

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}
