"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, Home, LogIn, PartyPopper } from "lucide-react";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";

import CommonUtil from "@/utils/commonUtil";
import { useLoginStatus } from "@/redux/selectors/Users";

const ROUTES = {
    HOME: "/",
    LOGIN: "/login",
    SUBSCRIBE: "/subscribe/",
    URL404: "/404",
} as const;

export default function SignUpStep4Page() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const isLoggedIn = useLoginStatus();

    const name = searchParams.get("name") || "";
    const email = searchParams.get("email") || "";
    const toSubscribe = searchParams.get("toSubscribe") || "0";

    const getLoginUrl = () => {
        return toSubscribe === "0" ? ROUTES.LOGIN + "?url=" + ROUTES.SUBSCRIBE : ROUTES.LOGIN;
    }

    useEffect(() => {
        if (isLoggedIn) {
            router.replace(ROUTES.URL404);
            return;
        }

        if (!email || email.length === 0 || !name || name.length === 0) {
            router.push(`/signup`);
            return;
        }
    }, []);

    return (
        <div className="min-h-screen flex flex-col lg:flex-row">
            {/* 최대 너비 컨테이너 */}
            <div className="flex flex-col lg:flex-row w-full lg:max-w-7xl lg:mx-auto">
                {/* 왼쪽: 브랜딩 영역 */}
                <div className="hidden lg:flex lg:w-1/2 xl:w-[55%] relative overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]">
                    {/* 배경 블러 */}
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-20 left-20 w-72 h-72 bg-[#00cc99] rounded-full blur-[120px]" />
                        <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#4b6bf5] rounded-full blur-[150px]" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#00cc99]/50 rounded-full blur-[100px]" />
                    </div>
                    {/* 그리드 패턴 */}
                    <div
                        className="absolute inset-0 opacity-[0.03]"
                        style={{
                            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                            backgroundSize: '50px 50px'
                        }}
                    />

                    <div className="relative z-10 flex flex-col justify-between p-12 xl:p-16 w-full h-full">
                        {/* 로고 - 좌우 전체 흰색 배경 */}
                        <div className="absolute top-0 left-0 right-0 bg-white px-12 xl:px-16 py-5">
                            <Link href="/" className="flex items-center">
                                <Image
                                    src="/images/header/ever-person-logo.png"
                                    alt="에버人 로고"
                                    width={140}
                                    height={40}
                                    className="h-10 w-auto"
                                />
                            </Link>
                        </div>

                        {/* 중앙 메시지 */}
                        <div className="flex-1 flex flex-col justify-center max-w-lg pt-16">
                            <h1 className="text-4xl xl:text-5xl font-bold text-white leading-tight mb-6">
                                회원가입
                                <br />
                                <span className="bg-gradient-to-r from-[#00cc99] to-[#4b6bf5] bg-clip-text text-transparent">
                                    완료!
                                </span>
                            </h1>
                            <p className="text-lg text-gray-400 leading-relaxed">
                                에버人 서비스포털 회원가입을<br />
                                진심으로 환영합니다.
                            </p>
                        </div>

                        {/* 하단: 영림원소프트랩 로고 */}
                        <div>
                            <Image
                                src="/images/main/softlab-logo-light.svg"
                                alt="영림원소프트랩"
                                width={160}
                                height={32}
                                className="h-8 w-auto opacity-70"
                            />
                        </div>
                    </div>
                </div>

                {/* 오른쪽: 완료 페이지 */}
                <div className="flex-1 lg:w-1/2 xl:w-[45%] flex flex-col bg-background">
                    {/* 모바일 헤더 */}
                    <div className="lg:hidden">
                        <Header />
                    </div>

                    <main className="flex-1 flex items-center justify-center px-6 py-8 lg:px-12 xl:px-16">
                        <div className="w-full max-w-md">
                            {/* Success Animation */}
                            <div className="text-center mb-8">
                                <div className="relative inline-flex items-center justify-center">
                                    <div className="absolute w-24 h-24 rounded-full bg-primary/20 animate-ping"></div>
                                    <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary">
                                        <CheckCircle2 className="w-10 h-10 text-white" />
                                    </div>
                                </div>
                            </div>

                            {/* Title */}
                            <div className="text-center mb-8">
                                <div className="flex items-center justify-center gap-2 mb-2">
                                    <PartyPopper className="w-6 h-6 text-primary" />
                                    <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                                        회원가입이 완료되었습니다!
                                    </h1>
                                    <PartyPopper className="w-6 h-6 text-primary" />
                                </div>
                            </div>

                            {/* User Info Card */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-6">
                                <div className="bg-primary/5 rounded-2xl p-6 text-center mb-6">
                                    <p className="text-lg text-foreground mb-1">{name}님</p>
                                    <p className="text-xl font-bold text-primary">{CommonUtil.hideEmailPart(email)}</p>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <Button
                                        className="flex-1 h-11 rounded-lg text-base font-semibold border-2 border-gray-200 hover:bg-gray-50 transition-all text-foreground bg-white"
                                        asChild
                                    >
                                        <Link href="/public" className="flex items-center justify-center gap-2">
                                            <Home className="h-5 w-5" />
                                            메인으로 이동
                                        </Link>
                                    </Button>
                                    <Button
                                        className="flex-1 h-11 rounded-lg text-base font-semibold text-white border-0 hover:opacity-90 hover:scale-[1.01] transition-all"
                                        style={{ background: "linear-gradient(135deg, rgb(75, 107, 245) 0%, rgb(0, 204, 153) 100%)" }}
                                        asChild
                                    >
                                        <Link href={getLoginUrl()} className="flex items-center justify-center gap-2">
                                            <LogIn className="h-5 w-5" />
                                            로그인
                                        </Link>
                                    </Button>
                                </div>
                            </div>

                            {/* Info Notice */}
                            <div className="bg-gray-50 rounded-lg p-4 text-center">
                                <p className="text-sm text-muted-foreground">
                                    {"※ 가입하신 회원정보는 MY Page > 계정정보에서 확인하실 수 있습니다."}
                                </p>
                            </div>

                            {/* Celebration Icons */}
                            <div className="mt-8 flex justify-center gap-6">
                                <div className="flex flex-col items-center">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                                        <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <span className="text-xs text-muted-foreground">가입 완료</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                                        <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </div>
                                    <span className="text-xs text-muted-foreground">안전한 계정</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                                        <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <span className="text-xs text-muted-foreground">바로 시작</span>
                                </div>
                            </div>
                        </div>
                    </main>

                    {/* 모바일 푸터 */}
                    <div className="lg:hidden">
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    );
}
