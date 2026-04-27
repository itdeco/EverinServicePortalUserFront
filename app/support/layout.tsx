import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export const metadata = {
  title: "고객 지원 - EverinServicePortal",
  description: "공지사항, FAQ, 도움말 등 다양한 고객 지원 서비스를 제공합니다.",
}

export default function SupportLayout({
                                        children,
                                      }: {
  children: React.ReactNode
}) {
  return (
      <main className="min-h-screen bg-background">
        <Header />
        {children}
        <Footer />
      </main>
  )
}