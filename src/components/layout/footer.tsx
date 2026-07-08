"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Globe, X } from "lucide-react";

import { Api } from "@/api";
import { TermsDto, TermsType } from "@/types/Terms";
import { checkApiResult } from "@/utils/apiUtil";

const familySites = [
  {url: "https://www.ksystem.co.kr", name: "영림원소프트랩"},
  {url: "https://www.everjapan.co.jp", name: "Ever Japan Co,Ltd"},
  {url: "https://www.systemever.co.id", name: "PT SYSTEM EVER INDONESIA"},
  {url: "https://www.ksystem.vn", name: "K.SYSTEM JSC (Vietnam)"},
  {url: "https://www.systemever.kr", name: "시스템에버 SystemEver"},
  {url: "https://systemevernpo.co.kr", name: "시스템에버 비영리 SystemEver NPO"},
  {url: "https://flextudio.com", name: "플렉스튜디오 Flextudio"},
  {url: "https://www.everin.co.kr", name: "에버인 기업문화"}
];

const appDownloads = [
  {
    name: "에버웰커밍",
    color: "#00dcaa",
    googlePlay: "https://play.google.com/store/apps/details?id=kr.co.ksystem.everwork",
    appStore: "https://apps.apple.com/kr/app/evertime/id1574250406",
  },
  {
    name: "에버타임",
    color: "#03b565",
    googlePlay: "https://play.google.com/store/apps/details?id=kr.co.ksystem.everwork",
    appStore: "https://apps.apple.com/kr/app/evertime/id1574250406",
  },
  {
    name: "에버페이롤",
    color: "#3344e6",
    googlePlay: "https://play.google.com/store/apps/details?id=kr.co.ylw.everpayroll",
    appStore: "https://apps.apple.com/kr/app/everparoll/id6755950607",
  },
];

export default function Footer() {
  const [isFamilySiteOpen, setIsFamilySiteOpen] = useState(false);
  const [isIsoModalOpen, setIsIsoModalOpen] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isTermsLoading, setIsTermsLoading] = useState(false);
  const [serviceTerms, setServiceTerms] = useState<TermsDto | null>(null);

  const openServiceTerms = async () => {
    setIsTermsModalOpen(true);

    if (serviceTerms?.content) return;

    setIsTermsLoading(true);
    const result = await Api.Terms.getLatestTypeTerms(TermsType.Service);
    if (checkApiResult(result)) {
      setServiceTerms(result.payload as TermsDto);
    }
    setIsTermsLoading(false);
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t-0">
      <div className="mx-auto max-w-[1280px] px-4 py-12">
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
                src="/images/main/softlab-logo-light.svg" 
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
              <button
                type="button"
                onClick={openServiceTerms}
                className="text-slate-400 hover:text-white transition-colors"
              >
                서비스이용약관
              </button>
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

            {/* ISO 27001 인증 버튼 */}
            <button
              type="button"
              onClick={() => setIsIsoModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-lg text-left hover:border-emerald-500/60 hover:bg-slate-800 transition-colors"
            >
              <Globe className="w-5 h-5 text-slate-400" />
              <span className="text-sm text-slate-300">
                {"'"}ISO 27001{"'"} 국제표준 정보보호 인증 획득
              </span>
            </button>

            {/* 모바일 앱 다운로드 */}
            <div className="grid w-full max-w-[500px] grid-cols-3 gap-3">
              {appDownloads.map((app) => (
                <div
                  key={app.name}
                  className="relative flex min-w-0 flex-col items-center gap-2 overflow-hidden rounded-xl border border-slate-700 bg-gradient-to-b from-slate-800 to-slate-800/60 px-3 py-2.5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-slate-600 hover:shadow-lg"
                >
                  <span
                    className="absolute inset-x-0 top-0 h-1"
                    style={{ backgroundColor: app.color }}
                  />
                  <div className="flex min-w-0 items-center justify-center gap-2 pt-0.5">
                    <span
                      className="h-2.5 w-2.5 shrink-0 rounded-full"
                      aria-hidden="true"
                      style={{ backgroundColor: app.color }}
                    />
                    <span className="whitespace-nowrap text-[15px] font-bold tracking-[-0.02em] text-white">
                      {app.name}
                    </span>
                  </div>
                  <div className="h-px w-full bg-slate-700/70" />
                  <div className="flex items-center justify-center gap-3">
                    <a
                      href={app.googlePlay}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${app.name} Google Play 다운로드`}
                      title="Google Play"
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-600 bg-slate-900/50 text-slate-300 transition-all hover:scale-105 hover:border-slate-400 hover:bg-slate-700 hover:text-white"
                    >
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                        <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z" />
                      </svg>
                    </a>
                    <a
                      href={app.appStore}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${app.name} App Store 다운로드`}
                      title="App Store"
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-600 bg-slate-900/50 text-slate-300 transition-all hover:scale-105 hover:border-slate-400 hover:bg-slate-700 hover:text-white"
                    >
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 저작권 */}
        <div className="pt-8 mt-8 border-t border-slate-800">
          <p className="text-xs text-slate-500 text-center">
            Copyright &copy; {new Date().getFullYear()} YOUNGLIMWONSOFTLAB Co., Ltd. All Rights Reserved.
          </p>
        </div>
      </div>

      {isIsoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4 py-8 backdrop-blur-sm">
          <button
            type="button"
            aria-label="ISO 27001 인증서 닫기"
            className="absolute inset-0 cursor-default"
            onClick={() => setIsIsoModalOpen(false)}
          />
          <div className="relative flex max-h-[86vh] w-fit max-w-[calc(100vw-32px)] flex-col overflow-hidden rounded-xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <div>
                <p className="text-lg font-bold text-slate-950">ISO/IEC 27001 인증서</p>
                <p className="text-sm text-slate-500">에버페이롤 & 에버타임 서비스</p>
              </div>
              <button
                type="button"
                aria-label="닫기"
                onClick={() => setIsIsoModalOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="overflow-auto bg-slate-100 p-3">
              <img
                src="/images/certificates/iso27001-certificate.png"
                alt="ISO/IEC 27001 인증서"
                className="mx-auto h-auto max-h-[68vh] w-auto max-w-[calc(100vw-64px)] rounded-lg bg-white object-contain shadow-sm"
              />
            </div>
          </div>
        </div>
      )}

      {isTermsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4 py-8 backdrop-blur-sm">
          <button
            type="button"
            aria-label="서비스이용약관 닫기"
            className="absolute inset-0 cursor-default"
            onClick={() => setIsTermsModalOpen(false)}
          />
          <div
            className="relative flex w-full max-w-[min(760px,calc(100vw-32px))] flex-col overflow-hidden rounded-xl bg-white shadow-2xl"
            style={{ height: "min(760px, calc(100vh - 64px))" }}
          >
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <div>
                <p className="text-lg font-bold text-slate-950">서비스이용약관</p>
                <p className="text-sm text-slate-500">에버인 서비스 이용 약관</p>
              </div>
              <button
                type="button"
                aria-label="닫기"
                onClick={() => setIsTermsModalOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-hidden bg-white p-5">
              {isTermsLoading ? (
                <div className="flex h-full items-center justify-center text-sm font-medium text-slate-500">
                  약관을 불러오는 중입니다.
                </div>
              ) : (
                <iframe
                  title="서비스이용약관"
                  srcDoc={serviceTerms?.content || `<p style="text-align:center;">적용기간에 맞는 약관이 없습니다.</p>`}
                  className="h-full w-full border-0"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
