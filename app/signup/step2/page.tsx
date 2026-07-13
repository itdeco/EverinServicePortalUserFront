"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Mail, RefreshCw } from "lucide-react";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { SignupProgress } from "@/components/signup/signup-progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Api } from "@/api";
import { RedisAuthenticationDto } from "@/types/Users";
import { checkApiResult } from "@/utils/apiUtil";
import { alertMessage } from "@/utils/messageBox";
import { useLoginStatus } from "@/redux/selectors/Users";

const ROUTES = {
    URL404: "/404",
} as const;

export default function SignUpStep2Page() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const isLoggedIn = useLoginStatus();

    const companySeq = searchParams.get("companySeq");
    const subscriptionId = searchParams.get("subscriptionId");
    const toSubscribe = searchParams.get("toSubscribe") || "0";
    const userCount = searchParams.get("userCount") || "0";
    const email = searchParams.get("email") || "";
    const [key, setKey] = useState(searchParams.get("key") || "");
    
    const isFromTrial = !!companySeq && !!subscriptionId;

    const [isResending, setIsResending] = useState(false);
    const [codeValues, setCodeValues] = useState(["", "", "", "", "", ""]);
    
    const inputRefs = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
    ];

    const verifyCertificationCode = (certCode: string) => {
        const params: RedisAuthenticationDto = {
            authenticationCode: certCode,
            uniqueKey: key
        };

        Api.Users.verifySignUpAuthenticationCode(params).then(result => {
            if (!checkApiResult(result)) {
                return false;
            }

            if (result!.payload.value) {
                if (isFromTrial) {
                    router.push(`/signup/step3?email=${encodeURIComponent(email)}&key=${key}&toSubscribe=${toSubscribe}&companySeq=${companySeq}&subscriptionId=${subscriptionId}`);
                } else {
                    router.push(`/signup/step3?email=${encodeURIComponent(email)}&key=${key}&toSubscribe=${toSubscribe}`);
                }
            }
        });
    }

    const handleInputChange = (index: number, value: string) => {
        if (value.length > 1) {
            value = value.slice(-1);
        }

        const newValues = [...codeValues];
        newValues[index] = value.toUpperCase();
        setCodeValues(newValues);

        if (value && index < 5) {
            inputRefs[index + 1].current?.focus();
        }

        const certCode = newValues.join("");
        if (certCode.length === 6) {
            verifyCertificationCode(certCode);
        }
    }

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !codeValues[index] && index > 0) {
            inputRefs[index - 1].current?.focus();
        }
    }

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        let pastedData = e.clipboardData.getData("text").trim();
        pastedData = pastedData.replace(/-/g, "");

        if (pastedData.length === 6) {
            const newValues = pastedData.split("").map(char => char.toUpperCase());
            setCodeValues(newValues);
            verifyCertificationCode(pastedData.toUpperCase());
        }
    }

    const onCodeResendClick = async () => {
        setIsResending(true);
        try {
            const result = await Api.Users.requestSignUpAuthenticationMail(email);
            if (!checkApiResult(result)) {
                return;
            }

            setKey(result!.payload.value);
            setCodeValues(["", "", "", "", "", ""]);
            inputRefs[0].current?.focus();
            await alertMessage(`인증코드가 ${email}로 다시 발송되었습니다.`);
        } finally {
            setIsResending(false);
        }
    }

    useEffect(() => {
        if (isLoggedIn) {
            router.replace(ROUTES.URL404);
            return;
        }

        if (!key || key.length === 0) {
            router.push(`/signup`);
            return;
        }

        inputRefs[0].current?.focus();
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
                                지금 시작하면<br />
                                <span className="bg-gradient-to-r from-[#00cc99] to-[#4b6bf5] bg-clip-text text-transparent">
                                    에버타임 7개월 혜택
                                </span>
                            </h1>
                            <p className="text-lg text-gray-400 leading-relaxed">
                                에버타임 스탠다드 1개월 무료 ·<br />
                                결제수단 등록 시 6개월 추가 무료
                            </p>
                            <p className="mt-4 text-base font-semibold text-[#00cc99]">
                                에버웰커밍 스탠다드는 평생무료로 시작하세요.
                            </p>
                            {/* 혜택 */}
                            <div className="grid grid-cols-2 gap-6 mt-12 pt-8 border-t border-white/10">
                                <div>
                                    <p className="text-3xl font-bold text-[#00cc99]">1개월</p>
                                    <p className="text-sm text-gray-500 mt-1">스탠다드 무료체험</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-bold text-[#4b6bf5]">+6개월</p>
                                    <p className="text-sm text-gray-500 mt-1">결제수단 등록 시</p>
                                </div>
                            </div>
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

                {/* 오른쪽: 인증 폼 */}
                <div className="flex-1 lg:w-1/2 xl:w-[45%] flex flex-col bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_45%,#f6fffb_100%)]">
                    {/* 모바일 헤더 */}
                    <div className="lg:hidden">
                        <Header />
                    </div>

                    <main className="flex-1 flex items-center justify-center px-6 py-10 lg:px-12 xl:px-16">
                        <div className="w-full max-w-lg">
                            <SignupProgress currentStep={2} />

                            {/* Title */}
                            <div className="mb-8">
                                <h1 className="text-3xl font-bold tracking-tight text-foreground mb-3">
                                    인증 코드 입력
                                </h1>
                                <p className="text-base leading-relaxed text-muted-foreground">
                                    <span className="font-medium text-foreground">{email}</span>
                                    <br />로 6자리 코드를 전송했습니다.
                                </p>
                            </div>

                            {/* Form Card */}
                            <div className="rounded-3xl border border-slate-200/70 bg-white p-7 shadow-[0_20px_60px_-15px_rgba(15,23,42,0.18)] ring-1 ring-slate-900/[0.02] mb-6">
                                <div className="space-y-6">
                                    {/* Code Input */}
                                    <div className="flex justify-center gap-2 md:gap-3">
                                        {codeValues.map((value, index) => (
                                            <div key={index} className="relative">
                                                {index === 3 && (
                                                    <span className="absolute -left-2 md:-left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
                                                        -
                                                    </span>
                                                )}
                                                <Input
                                                    ref={inputRefs[index]}
                                                    type="text"
                                                    inputMode="text"
                                                    maxLength={1}
                                                    value={value}
                                                    onChange={(e) => handleInputChange(index, e.target.value)}
                                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                                    onPaste={handlePaste}
                                                    className="w-12 h-14 md:w-14 md:h-16 text-center text-xl md:text-2xl font-bold rounded-xl border-2 border-slate-200 bg-white shadow-sm transition-all focus:border-primary focus:ring-2 focus:ring-primary/15 uppercase"
                                                />
                                            </div>
                                        ))}
                                    </div>

                                    {/* Help Text */}
                                    <div className="text-center">
                                        <p className="text-sm text-muted-foreground mb-4">
                                            메일을 받지 않으셨나요? <span className="font-medium">스팸 메일함</span>을 확인해 보세요!
                                        </p>
                                    </div>

                                    {/* Resend Button */}
                                    <Button
                                        onClick={onCodeResendClick}
                                        disabled={isResending}
                                        className="w-full h-12 rounded-xl text-base font-semibold border-2 border-slate-200 hover:border-primary/40 hover:bg-slate-50 transition-all text-foreground bg-white"
                                    >
                                        {isResending ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                발송 중...
                                            </>
                                        ) : (
                                            <>
                                                <RefreshCw className="mr-2 h-5 w-5" />
                                                인증코드 재전송
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </div>

                            {/* Email Info */}
                            <div className="flex items-center justify-center gap-2 text-muted-foreground">
                                <Mail className="w-4 h-4" />
                                <span className="text-sm">발송된 이메일: {email}</span>
                            </div>

                            {/* Warning Text */}
                            <p className="text-sm text-amber-600 text-center mt-6">
                                전송된 코드는 10분 후에 만료됩니다.
                            </p>
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
