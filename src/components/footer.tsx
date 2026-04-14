import Link from "next/link"

const footerLinks = {
  서비스: [
    { name: "에버웰커밍", href: "#" },
    { name: "에버타임", href: "#" },
    { name: "에버페이롤", href: "#" },
    { name: "에버평가", href: "#" },
    { name: "에버레스크", href: "#" },
  ],
  회사소개: [
    { name: "회사 소개", href: "#" },
    { name: "연혁", href: "#" },
    { name: "채용", href: "#" },
    { name: "뉴스룸", href: "#" },
  ],
  리소스: [
    { name: "도입 사례", href: "#" },
    { name: "블로그", href: "#" },
    { name: "제품 소개서", href: "#" },
    { name: "요금제", href: "#" },
  ],
  지원: [
    { name: "고객센터", href: "#" },
    { name: "동영상 가이드", href: "#" },
    { name: "FAQ", href: "#" },
    { name: "1:1 문의", href: "#" },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* 로고 및 회사 정보 */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">E</span>
              </div>
              <span className="text-xl font-bold text-white">에버인</span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              33년 영림원의 노하우로 만든
              <br />
              통합 HR 솔루션
            </p>
          </div>

          {/* 링크 섹션 */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-white mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 하단 정보 */}
        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="text-xs text-slate-500 space-y-1">
              <p>(주)영림원소프트랩 | 대표이사: 권영범</p>
              <p>서울특별시 영등포구 국회대로 76길 18 영림빌딩</p>
              <p>사업자등록번호: 107-81-31887 | 통신판매업신고: 제2019-서울영등포-0544호</p>
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <Link href="#" className="hover:text-white transition-colors">개인정보처리방침</Link>
              <Link href="#" className="hover:text-white transition-colors">이용약관</Link>
              <Link href="#" className="hover:text-white transition-colors">보안정책</Link>
            </div>
          </div>
          <p className="text-xs text-slate-600 mt-6">
            &copy; {new Date().getFullYear()} Youngrimwon Softlab. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
