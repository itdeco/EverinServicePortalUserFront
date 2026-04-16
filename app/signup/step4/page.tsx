"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, Home, LogIn, PartyPopper } from "lucide-react";

import Header from "@/components/header";
import Footer from "@/components/footer";
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
        <div className="min-h-screen flex flex-col bg-background">
            <Header />

            <main className="flex-1 flex items-center justify-center px-4 py-12 md:py-20">
                <div className="w-full max-w-lg">
                    {/* Success Animation */}
                    <div className="text-center mb-8">
                        <div className="relative inline-flex items-center justify-center">
                            <div className="absolute w-24 h-24 rounded-full bg-primary/20 animate-ping"></div>
                            <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary">
                                <CheckCircle2 className="w-10 h-10 text-primary-foreground" />
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
                        <p className="text-muted-foreground">
                            에버人 서비스포털 회원가입을 진심으로 환영합니다.
                        </p>
                    </div>

                    {/* User Info Card */}
                    <div className="bg-card rounded-3xl border border-border shadow-xl p-6 md:p-8 mb-6">
                        <div className="bg-primary/5 rounded-2xl p-6 text-center mb-6">
                            <p className="text-lg text-foreground mb-1">{name}님</p>
                            <p className="text-xl font-bold text-primary">{CommonUtil.hideEmailPart(email)}</p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Button
                                variant="outline"
                                size="lg"
                                className="flex-1 h-12 rounded-xl"
                                asChild
                            >
                                <Link href="/">
                                    <Home className="mr-2 h-5 w-5" />
                                    메인으로 이동
                                </Link>
                            </Button>
                            <Button
                                size="lg"
                                className="flex-1 h-12 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg shadow-primary/25"
                                asChild
                            >
                                <Link href={getLoginUrl()}>
                                    <LogIn className="mr-2 h-5 w-5" />
                                    로그인
                                </Link>
                            </Button>
                        </div>
                    </div>

                    {/* Info Notice */}
                    <div className="bg-muted/50 rounded-2xl p-4 text-center">
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

            <Footer />
        </div>
    );
}
