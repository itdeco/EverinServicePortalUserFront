"use client";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import MypageSidebar from "@/components/layout/mypage-sidebar";

export default function MyPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* 사이드바 - 모바일에서는 숨김 */}
            <div className="hidden lg:block">
              <MypageSidebar />
            </div>
            {/* 콘텐츠 영역 */}
            <div className="flex-1 min-w-0">
              {children}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
