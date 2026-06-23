"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { Mail, ArrowRight, Shield, Clock, Sparkles } from "lucide-react";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { SignupProgress } from "@/components/signup/signup-progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Api } from "@/api";
import { checkApiResult } from "@/utils/apiUtil";
import CommonUtil from "@/utils/commonUtil";
import { alertMessage } from "@/utils/messageBox";
import { useLoginStatus, useUserProfile } from "@/redux/selectors/Users";
import { UserActions } from "@/redux/actions/Users";
import { UserStatusType } from "@/types/Users";
import { TrialStatusType } from "@/types/Trials";

enum EmailStatus {
    None,
    Empty,
    Occupied,
    Invalid,
    Valid,
    Sending
}

const ROUTES = {
    HOME: "/",
    LOGIN: "/login",
    SUBSCRIBE: "/subscribe/",
    URL404: "/404",
} as const;

export default function SignUpPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const dispatch = useDispatch();
    
    const companySeq = searchParams.get("companySeq");
    const subscriptionId = searchParams.get("subscriptionId");
    const toSubscribe = searchParams.get("toSubscribe") ? "1" : "0";
    
    const isLoggedIn = useLoginStatus();
    const userProfile = useUserProfile();

    const [employeeCount, setEmployeeCount] = useState(0);
    const [available, setAvailable] = useState(true);
    const [email, setEmail] = useState<string>("");
    const [emailStatus, setEmailStatus] = useState<EmailStatus>(EmailStatus.None);
    const isFromTrial = !!companySeq && !!subscriptionId;

    const checkAvailableTrialSubscription = () => {
        if (!isFromTrial) {
            return;
        }

        const trialSubscriptionId = parseInt(subscriptionId!);
        const trialCompanySeq = parseInt(companySeq!);
        Api.Trials.checkAndSetTrialUpgradeStatus(trialSubscriptionId, trialCompanySeq).then(result => {
            if (!checkApiResult(result)) {
                return;
            }

            const payload = result?.payload;
            const status: TrialStatusType = payload.value;

            if (TrialStatusType.SignedUp === status && isLoggedIn) {
                dispatch(UserActions.setUserProfile({...userProfile, ["status"]: UserStatusType.Upgrading}))
            }

            if (TrialStatusType.SignedUp === status || TrialStatusType.UpgradeComplete === status) {
                alertMessage("이미 가입이 완료된 체험판 사용자입니다</br>로그인 페이지로 이동합니다").then(() => {
                    router.replace(ROUTES.LOGIN);
                });
            } else if (TrialStatusType.Expired === status) {
                alertMessage("이미 만료된 구독정보입니다").then(() => {
                    router.replace(ROUTES.HOME);
                });
            }
        });
    }

    const onEmailChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (0 === value.length) {
            setEmailStatus(EmailStatus.Empty);
        } else {
            setEmailStatus(EmailStatus.Valid);
        }
        setEmail(e.target.value);
    }

    const onEmailKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onStartClick();
            e.preventDefault();
        }
    }

    const onStartClick = () => {
        if (!email || 0 === email.length) {
            setEmailStatus(EmailStatus.Empty);
            return;
        }

        if (!CommonUtil.isValidEmail(email)) {
            setEmailStatus(EmailStatus.Invalid);
            return;
        }

        setEmailStatus(EmailStatus.Sending);
        Api.Users.requestSignUpAuthenticationMail(email).then(result => {
            if (!checkApiResult(result)) {
                setEmailStatus(EmailStatus.Valid);
                return;
            }

            const value = result!.payload.value;
            if (value) {
                if (isFromTrial) {
                    router.push(`/signup/step2?email=${encodeURIComponent(email)}&key=${value}&toSubscribe=${toSubscribe}&companySeq=${companySeq}&subscriptionId=${subscriptionId}&userCount=${employeeCount.toString()}`);
                } else {
                    router.push(`/signup/step2?email=${encodeURIComponent(email)}&key=${value}&toSubscribe=${toSubscribe}`);
                }
            } else {
                setEmailStatus(EmailStatus.Occupied);
            }
        });
    }

    const checkCanSend = () => {
        return EmailStatus.Valid === emailStatus;
    }

    const getEmailErrorText = () => {
        if (EmailStatus.Empty === emailStatus) {
            return "이메일을 입력하지 않았습니다";
        } else if (EmailStatus.Occupied === emailStatus) {
            return "사용할 수 없는 이메일입니다";
        } else if (EmailStatus.Invalid === emailStatus) {
            return "이메일 형식이 맞지 않습니다";
        }
        return "";
    }

    const isEmailInvalid = EmailStatus.None !== emailStatus && EmailStatus.Valid !== emailStatus && EmailStatus.Sending !== emailStatus;

    useEffect(() => {
        if (!isFromTrial && isLoggedIn) {
            router.replace(ROUTES.URL404);
            return;
        }

        if (isFromTrial) {
            checkAvailableTrialSubscription();
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
                                에버웰커밍은 평생무료로 시작하세요.
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

                {/* 오른쪽: 회원가입 폼 */}
                <div className="flex-1 lg:w-1/2 xl:w-[45%] flex flex-col bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_45%,#f6fffb_100%)]">
                    {/* 모바일 헤더 */}
                    <div className="lg:hidden">
                        <Header />
                    </div>

                    {/* 데스크탑 상단 로그인 안내 */}
                    <div className="hidden lg:flex justify-end items-center p-6 xl:p-8">
                        <p className="text-sm text-muted-foreground">
                            이미 계정이 있으신가요?{' '}
                            <Link href={ROUTES.LOGIN} className="text-primary font-semibold hover:underline">
                                로그인
                            </Link>
                        </p>
                    </div>

                    <main className="flex-1 flex items-center justify-center px-6 py-10 lg:px-12 xl:px-16">
                        <div className="w-full max-w-lg">
                            <SignupProgress currentStep={1} />

                            {/* Title */}
                            <div className="mb-8">
                                <h1 className="text-3xl font-bold tracking-tight text-foreground mb-3">
                                    에버人 계정 만들기
                                </h1>
                                <p className="text-base leading-relaxed text-muted-foreground">
                                    현재 근무 중인 직장의 이메일 주소를 추천드립니다.
                                </p>
                            </div>

                            {/* Form Card */}
                            <div className="rounded-2xl border border-slate-200/80 bg-white/95 p-7 shadow-[0_24px_70px_rgba(15,23,42,0.10)] mb-6">
                                <div className="space-y-5">
                                    {/* Email Field */}
                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                                            로그인 아이디로 사용할 이메일
                                        </Label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                            <Input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={email}
                                                onChange={onEmailChanged}
                                                onKeyDown={onEmailKeyDown}
                                                disabled={!available || EmailStatus.Sending === emailStatus}
                                                autoComplete="off"
                                                className={`h-11 pl-12 pr-4 rounded-lg border transition-all bg-gray-50 text-sm ${
                                                    isEmailInvalid
                                                        ? "border-red-300 focus:border-red-500 focus:bg-white focus:ring-red-500/10"
                                                        : "border-gray-200 focus:border-primary focus:bg-white focus:ring-primary/10"
                                                }`}
                                                placeholder="name@example.com"
                                            />
                                        </div>
                                        {getEmailErrorText() && (
                                            <p className="text-sm text-destructive flex items-center gap-1.5">
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                </svg>
                                                {getEmailErrorText()}
                                            </p>
                                        )}
                                    </div>

                                    {/* Submit Button */}
                                    <Button
                                        onClick={onStartClick}
                                        disabled={!available || !checkCanSend() || EmailStatus.Sending === emailStatus}
                                        className={`w-full h-11 rounded-lg text-base font-semibold transition-all mt-2 ${
                                            checkCanSend()
                                                ? "bg-primary hover:bg-primary/90 text-white shadow-md hover:shadow-lg hover:scale-[1.01]"
                                                : "bg-gray-100 text-gray-400 cursor-not-allowed"
                                        }`}
                                    >
                                        {EmailStatus.Sending === emailStatus ? (
                                            <div className="flex items-center gap-2">
                                                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                </svg>
                                                발송 중...
                                            </div>
                                        ) : (
                                            <span className="flex items-center justify-center gap-2">
                                                시작하기
                                                <ArrowRight className="h-5 w-5" />
                                            </span>
                                        )}
                                    </Button>
                                </div>
                            </div>

                            {/* 무료 혜택 안내 */}
                            <div className="mb-6 rounded-2xl border border-primary/15 bg-primary/5 p-4">
                                <div className="space-y-3">
                                    <div className="flex items-start gap-3">
                                        <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                                        <div>
                                            <p className="text-sm font-bold text-gray-900">
                                                에버타임 스탠다드
                                            </p>
                                            <p className="mt-0.5 text-sm leading-relaxed text-gray-600">
                                                1개월 무료 · 결제수단 등록 시 6개월 추가 무료
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                                        <div>
                                            <p className="text-sm font-bold text-gray-900">
                                                에버웰커밍
                                            </p>
                                            <p className="mt-0.5 text-sm leading-relaxed text-gray-600">
                                                기본 솔루션 평생무료
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <p className="mt-3 border-t border-primary/10 pt-3 text-xs leading-relaxed text-muted-foreground">
                                    무료체험은 에버타임 스탠다드 버전에 한하여 제공합니다.
                                </p>
                            </div>

                            {/* Divider */}
                            <div className="relative my-8">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-200" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-4 bg-white text-muted-foreground font-medium">또는</span>
                                </div>
                            </div>

                            {/* Login CTA */}
                            <div className="text-center">
                                <p className="text-muted-foreground mb-4 text-sm">이미 서비스 포털 계정이 있으신가요?</p>
                                <Button
                                    asChild
                                    className="w-full h-11 rounded-lg text-base font-semibold text-white border-0 hover:opacity-90 hover:scale-[1.01] transition-all"
                                    style={{ background: "linear-gradient(135deg, rgb(75, 107, 245) 0%, rgb(0, 204, 153) 100%)" }}
                                >
                                    <Link href={ROUTES.LOGIN}>
                                        로그인하기
                                    </Link>
                                </Button>
                            </div>

                            {/* 혜택 표시 */}
                            <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-center gap-6">
                                <div className="flex items-center gap-1.5 text-muted-foreground">
                                    <Shield className="w-4 h-4 text-primary" />
                                    <span className="text-xs font-medium">안전한 보안</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-muted-foreground">
                                    <Clock className="w-4 h-4 text-primary" />
                                    <span className="text-xs font-medium">스탠다드 1개월 무료</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-muted-foreground">
                                    <Sparkles className="w-4 h-4 text-primary" />
                                    <span className="text-xs font-medium">에버웰커밍 평생무료</span>
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
