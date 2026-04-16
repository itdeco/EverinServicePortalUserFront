"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Globe, Smartphone } from "lucide-react";

const familySites = [
  { name: "Ever Japan Co., Ltd.", url: "https://www.everjapan.co.jp/" },
  { name: "PT SYSTEM EVER INDONESIA", url: "https://www.systemever.co.id/" },
  { name: "K.SYSTEM JSC (Vietnam)", url: "http://www.ksystem.vn/" },
  { name: "시스템에버 SystemEver", url: "https://www.systemever.kr/html/main.html" },
];

export default function Footer() {
  const [isFamilySiteOpen, setIsFamilySiteOpen] = useState(false);

  return (
    <footer className="bg-slate-900 text-slate-300 border-t-0">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
          {/* 왼쪽: 회사 정보 */}
          <div className="flex flex-col gap-4">
            {/* 영림원소프트랩 로고 */}
            <a 
              href="https://www.ksystem.co.kr" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block w-fit"
            >
              <img 
                src="https://www.evertime.co.kr/assets/img/softlab-logo-light.svg" 
                alt="영림원소프트랩" 
                className="h-7"
              />
            </a>

            {/* 회사 정보 */}
            <div className="space-y-2 text-sm text-slate-400 leading-relaxed">
              <p>
                서울시 강서구 양천로 583(우림블루9 비즈니스센터 A동 23F) (우)07547 (주)영림원소프트랩
              </p>
              <p>
                대표 : 권영범
                <span className="px-2 text-slate-600">|</span>
                대표전화 : 1661-1155
                <span className="px-2 text-slate-600">|</span>
                팩스 : 02-6280-3128
              </p>
              <p>
                사업자번호 : 220-81-23474
                <span className="px-2 text-slate-600">|</span>
                통신판매업 신고번호 : 2016-서울강서-1119
              </p>
            </div>

            {/* 링크들 */}
            <div className="flex items-center gap-0 text-sm mt-2">
              <a 
                href="https://www.ksystem.co.kr/history/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
              >
                회사소개
              </a>
              <span className="px-2 text-slate-600">|</span>
              <a 
                href="#" 
                className="text-slate-400 hover:text-white transition-colors"
              >
                서비스이용약관
              </a>
              <span className="px-2 text-slate-600">|</span>
              <a 
                href="https://www.ksystem.co.kr/privacy-statement/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sky-500 font-semibold hover:text-sky-400 transition-colors"
              >
                개인정보처리방침
              </a>
            </div>
          </div>

          {/* 오른쪽: Family Site, ISO 인증, 앱 다운로드 */}
          <div className="flex flex-col items-start xl:items-end gap-4">
            {/* Family Site 드롭다운 */}
            <div className="relative w-full max-w-xs">
              <button
                onClick={() => setIsFamilySiteOpen(!isFamilySiteOpen)}
                className="w-full flex items-center justify-between px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 hover:border-slate-600 transition-colors"
              >
                <span className="text-sm font-medium">FAMILY SITE</span>
                {isFamilySiteOpen ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
              
              {isFamilySiteOpen && (
                <div className="absolute bottom-full left-0 right-0 mb-1 bg-slate-800 border border-slate-700 rounded-lg overflow-hidden z-10">
                  {familySites.map((site, index) => (
                    <a
                      key={index}
                      href={site.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-4 py-2.5 text-sm text-slate-400 hover:bg-slate-700 hover:text-white transition-colors"
                    >
                      {site.name}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* ISO 27001 인증 배지 */}
            <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-lg">
              <Globe className="w-5 h-5 text-slate-400" />
              <span className="text-sm text-slate-300">
                {"'"}ISO 27001{"'"} 국제표준 정보보호 인증 획득
              </span>
            </div>

            {/* 앱 다운로드 버튼들 */}
            <div className="flex flex-wrap items-center gap-3">
              {/* 에버타임 모바일앱 버튼 */}
              <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg">
                <Smartphone className="w-5 h-5 text-slate-400" />
                <span className="text-sm text-slate-300">에버타임 모바일앱</span>
              </div>

              {/* Google Play 버튼 */}
              <a
                href="https://play.google.com/store/apps/details?id=kr.co.ksystem.evertime"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg hover:border-slate-600 transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z"/>
                </svg>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 leading-none">GET IT ON</span>
                  <span className="text-sm font-medium text-slate-200">Google Play</span>
                </div>
              </a>

              {/* App Store 버튼 */}
              <a
                href="https://apps.apple.com/kr/app/evertime/id1455979228"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg hover:border-slate-600 transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-400 leading-none">Download on the</span>
                  <span className="text-sm font-medium text-slate-200">App Store</span>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* 저작권 */}
        <div className="pt-8 mt-8 border-t border-slate-800">
          <p className="text-xs text-slate-500 text-center">
            Copyright &copy; {new Date().getFullYear()} Younglimwon Soft-Lab Co., Ltd. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
