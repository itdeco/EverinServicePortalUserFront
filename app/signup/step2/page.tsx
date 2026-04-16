"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Mail, RefreshCw } from "lucide-react";

import Header from "@/components/header";
import Footer from "@/components/footer";
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
        <div className="min-h-screen flex flex-col bg-background">
            <Header />

            <main className="flex-1 flex items-center justify-center px-4 py-12 md:py-20">
                <div className="w-full max-w-md">
                    {/* Title */}
                    <div className="text-center mb-8">
                        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                            이메일로 발송된 코드를
                            <br />입력해주세요
                        </h1>
                        <p className="text-muted-foreground">
                            <span className="font-medium text-foreground">{email}</span>
                            <br />으로 6자리 코드를 전송했습니다.
                        </p>
                        <p className="text-sm text-amber-600 mt-2">
                            전송된 코드는 10분 후에 만료됩니다.
                        </p>
                    </div>

                    {/* Code Input Card */}
                    <div className="bg-card rounded-3xl border border-border shadow-xl p-6 md:p-8">
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
                                            className="w-12 h-14 md:w-14 md:h-16 text-center text-xl md:text-2xl font-bold rounded-xl border-2 border-input focus:border-primary focus:ring-primary/20 uppercase"
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
                                variant="outline"
                                size="lg"
                                className="w-full h-12 rounded-xl"
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
                    <div className="mt-6 flex items-center justify-center gap-2 text-muted-foreground">
                        <Mail className="w-4 h-4" />
                        <span className="text-sm">발송된 이메일: {email}</span>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
