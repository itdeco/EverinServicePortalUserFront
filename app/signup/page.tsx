"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { Mail, ArrowRight, Shield, Clock, Sparkles } from "lucide-react";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
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
                alertMessage("이미 가입이 완료된 체험판 사용자입니다</br>로그인 페이지로 이동합니다.").then(() => {
                    router.replace(ROUTES.LOGIN);
                });
            } else if (TrialStatusType.Expired === status) {
                alertMessage("이미 만료된 구독정보입니다.").then(() => {
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
            return "이메일을 입력하지 않았습니다.";
        } else if (EmailStatus.Occupied === emailStatus) {
            return "사용할 수 없는 이메일입니다.";
        } else if (EmailStatus.Invalid === emailStatus) {
            return "이메일 형식이 맞지 않습니다.";
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
        <div className="min-h-screen flex flex-col bg-background">
            <Header />

            <main className="flex-1 flex items-center justify-center px-4 py-12 md:py-20">
                <div className="w-full max-w-md">
                    {/* Title */}
                    <div className="text-center mb-8">
                        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                            에버人 계정을 등록하고
                            <br />
                            <span className="text-primary">6개월 무료</span>로 시작하세요!
                        </h1>
                        <p className="text-muted-foreground">
                            현재 근무 중인 직장의 이메일 주소로 하시는 것을 추천해드립니다.
                        </p>
                    </div>

                    {/* Signup Card */}
                    <div className="bg-card rounded-3xl border border-border shadow-xl p-6 md:p-8">
                        <div className="space-y-5">
                            {/* Email Field */}
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-sm font-medium text-foreground">
                                    로그인 아이디로 사용할 이메일
                                </Label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                    <Input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={email}
                                        onChange={onEmailChanged}
                                        onKeyDown={onEmailKeyDown}
                                        disabled={!available || EmailStatus.Sending === emailStatus}
                                        autoComplete="off"
                                        className={`h-12 pl-12 pr-4 rounded-xl border-2 transition-all ${
                                            isEmailInvalid 
                                                ? "border-destructive focus:border-destructive focus:ring-destructive/20" 
                                                : "border-input focus:border-primary focus:ring-primary/20"
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
                                size="lg"
                                className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg shadow-primary/25 transition-all"
                            >
                                {EmailStatus.Sending === emailStatus ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        발송 중...
                                    </>
                                ) : (
                                    <>
                                        시작하기
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </>
                                )}
                            </Button>

                            {/* Divider */}
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-border"></div>
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-card px-2 text-muted-foreground">또는</span>
                                </div>
                            </div>

                            {/* Login Link */}
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">이미 서비스 포털 계정이 있으신가요?</span>
                                <Button variant="outline" size="sm" asChild className="rounded-xl">
                                    <Link href="/login">로그인</Link>
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Trust Badges */}
                    <div className="mt-8 grid grid-cols-3 gap-4">
                        <div className="flex flex-col items-center text-center">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                                <Shield className="w-5 h-5 text-primary" />
                            </div>
                            <span className="text-xs text-muted-foreground">안전한 보안</span>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                                <Clock className="w-5 h-5 text-primary" />
                            </div>
                            <span className="text-xs text-muted-foreground">6개월 무료</span>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                                <Sparkles className="w-5 h-5 text-primary" />
                            </div>
                            <span className="text-xs text-muted-foreground">프리미엄 기능</span>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
