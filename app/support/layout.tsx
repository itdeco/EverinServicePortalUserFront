import type { ReactNode } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export const metadata = {
  title: "고객센터 - 에버스",
  description: "공지사항, FAQ, 동영상 가이드, 온라인 도움말과 1:1 문의를 제공합니다.",
};

export default function SupportLayout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      {children}
      <Footer />
    </main>
  );
}
