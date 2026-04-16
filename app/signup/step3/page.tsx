"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { User, Lock, Phone, Eye, EyeOff, CheckCircle2 } from "lucide-react";

import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

import { Api } from "@/api";
import { SignUpRequestDto, SmsAuthenticationRequestBaseDto, SmsAuthenticationVerifyDto } from "@/types/Users";
import { TrialDto } from "@/types/Trials";
import { checkApiResult } from "@/utils/apiUtil";
import CommonUtil from "@/utils/commonUtil";
import { alertMessage } from "@/utils/messageBox";
import { useLoginStatus } from "@/redux/selectors/Users";

enum ValidationStatus {
    Valid,
    EmptyName,
    EmptyPassword,
    EmptyConfirmPassword,
    NotMatchPassword,
    InvalidPassword,
    EmptyPhone,
    InvalidPhone,
    AuthCodeNotMatch,
    TimerExpired
}

enum PasswordValidationStatus {
    Valid,
    InsufficientCharCount,
    NotAllowedSpace,
    NeedAlphabetAndNumeric
}

const checkPasswordValidation = (password: string): PasswordValidationStatus => {
    if (!password || password.length < 7 || password.length > 20) {
        return PasswordValidationStatus.InsufficientCharCount;
    }
    if (password.includes(" ")) {
        return PasswordValidationStatus.NotAllowedSpace;
    }
    const hasAlpha = /[a-zA-Z]/.test(password);
    const hasNum = /[0-9]/.test(password);
    if (!hasAlpha || !hasNum) {
        return PasswordValidationStatus.NeedAlphabetAndNumeric;
    }
    return PasswordValidationStatus.Valid;
};

const ROUTES = {
    HOME: "/",
    LOGIN: "/login",
    URL404: "/404",
} as const;

const KSystemURL = {
    Private: "https://www.k-system.co.kr/privacy",
};

export default function SignUpStep3Page() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const isLoggedIn = useLoginStatus();

    const email = searchParams.get("email") || "";
    const key = searchParams.get("key") || "";
    const toSubscribe = searchParams.get("toSubscribe") || "0";
    const companySeq = searchParams.get("companySeq");
    const subscriptionId = searchParams.get("subscriptionId");
    const isFromTrial = !!companySeq && !!subscriptionId;

    const [employeeCount, setEmployeeCount] = useState<number | undefined>(undefined);
    const [canSubmit, setCanSubmit] = useState(false);
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    const [agreeAll, setAgreeAll] = useState(false);
    const [confirmAge, setConfirmAge] = useState(false);
    const [serviceTerms, setServiceTerms] = useState(false);
    const [privacyTerms, setPrivacyTerms] = useState(false);
    const [marketingTerms, setMarketingTerms] = useState(false);
    
    const [status, setStatus] = useState<ValidationStatus>(ValidationStatus.Valid);
    const [authenticationCode, setAuthenticationCode] = useState("");
    const [timerStarted, setTimerStarted] = useState(false);
    const [timerExpired, setTimerExpired] = useState(false);
    const [timerSeconds, setTimerSeconds] = useState(180);
    const [authCodeVerified, setAuthCodeVerified] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const loadEmployeeCount = () => {
        if (!isFromTrial) return;
        const trialSubscriptionId = parseInt(subscriptionId!);
        const trialCompanySeq = parseInt(companySeq!);
        Api.Trials.getEmployeeCount(trialSubscriptionId, trialCompanySeq).then(result => {
            if (!checkApiResult(result)) return;
            setEmployeeCount(result!.payload.value);
        });
    }

    const loadTrialInfo = () => {
        if (!isFromTrial) return;
        const trialSubscriptionId = parseInt(subscriptionId!);
        Api.Trials.getTrialInfo(trialSubscriptionId).then((result) => {
            if (!checkApiResult(result)) return;
            const trialInfo: TrialDto = result!.payload;
            if (trialInfo) {
                setName(trialInfo.trialUserName || "");
                setPhone(trialInfo.phone || "");
                setAuthCodeVerified(true);
            }
        });
    }

    const moveToNextStep = () => {
        if (isFromTrial) {
            router.push(ROUTES.LOGIN);
        } else {
            router.push(`/signup/step4?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&toSubscribe=${toSubscribe}`);
        }
    }

    const checkCanSubmit = () => {
        if (!name.length || !password.length || !confirmPassword.length || !phone.length) {
            setCanSubmit(false);
            return;
        }
        if (!authCodeVerified || !confirmAge || !serviceTerms || !privacyTerms) {
            setCanSubmit(false);
            return;
        }
        setCanSubmit(true);
    }

    const checkValidation = () => {
        if (!name || name.length === 0) {
            setStatus(ValidationStatus.EmptyName);
            return false;
        }
        if (!password || password.length === 0) {
            setStatus(ValidationStatus.EmptyPassword);
            return false;
        }
        if (!confirmPassword || confirmPassword.length === 0) {
            setStatus(ValidationStatus.EmptyConfirmPassword);
            return false;
        }
        if (password !== confirmPassword) {
            setStatus(ValidationStatus.NotMatchPassword);
            return false;
        }
        if (checkPasswordValidation(password) !== PasswordValidationStatus.Valid) {
            setStatus(ValidationStatus.InvalidPassword);
            return false;
        }
        if (!phone || phone.length === 0) {
            setStatus(ValidationStatus.EmptyPhone);
            return false;
        }
        if (!CommonUtil.isValidMobilePhone(phone)) {
            setStatus(ValidationStatus.InvalidPhone);
            return false;
        }
        return true;
    }

    const onRequestAuthenticationCodeClick = async () => {
        if (!CommonUtil.isValidMobilePhone(phone)) {
            setStatus(ValidationStatus.InvalidPhone);
            return;
        }

        const params: SmsAuthenticationRequestBaseDto = {
            needToCheckUserName: false,
            phone: phone
        };

        const result = await Api.Sms.requestAuthenticationCode(params);
        if (!checkApiResult(result)) return;

        setTimerStarted(true);
        setTimerExpired(false);
        setTimerSeconds(180);
        setStatus(ValidationStatus.Valid);
    }

    const onVerifyCertNumberClick = async () => {
        const params: SmsAuthenticationVerifyDto = {
            userName: name,
            phone: phone,
            authenticationCode: authenticationCode,
        };

        const result = await Api.Sms.verifyAuthenticationCode(params);
        if (!checkApiResult(result)) return;

        setTimerStarted(false);
        setTimerExpired(false);
        setStatus(ValidationStatus.Valid);
        setAuthCodeVerified(true);
    }

    const onAgreeAllCheck = () => {
        const value = !agreeAll;
        setAgreeAll(value);
        setConfirmAge(value);
        setServiceTerms(value);
        setPrivacyTerms(value);
        setMarketingTerms(value);
    }

    const onSignUpClick = async () => {
        if (!checkValidation()) return;

        const validationStatus = checkPasswordValidation(password);
        if (validationStatus === PasswordValidationStatus.InsufficientCharCount) {
            await alertMessage("암호를 7자리 ~ 20자리 이내로 입력해주세요.");
            return;
        } else if (validationStatus === PasswordValidationStatus.NotAllowedSpace) {
            await alertMessage("암호를 공백 없이 입력해주세요.");
            return;
        } else if (validationStatus === PasswordValidationStatus.NeedAlphabetAndNumeric) {
            await alertMessage("암호를 영문, 숫자를 혼합하여 입력해주세요.");
            return;
        }

        if (!CommonUtil.isValidMobilePhone(phone)) {
            await alertMessage("휴대전화번호가 형식에 맞지 않습니다.");
            return;
        }

        const params: SignUpRequestDto = {
            email: email.trim(),
            name: name.trim(),
            password: password,
            phone: phone.replace(/-/g, "").trim(),
            trialSubscriptionId: subscriptionId ? parseInt(subscriptionId) : undefined,
            trialUserCount: employeeCount,
            agreeMarketingTerms: marketingTerms
        };

        setIsSubmitting(true);
        const result = await Api.Users.signUp(params);
        if (!checkApiResult(result)) {
            setIsSubmitting(false);
            return;
        }

        setIsSubmitting(false);
        moveToNextStep();
    }

    const onGotoPrivacyTerms = () => {
        window.open(KSystemURL.Private, "_blank", "noreferrer");
    }

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    }

    useEffect(() => {
        if (isLoggedIn) {
            router.replace(ROUTES.URL404);
            return;
        }
    }, []);

    useEffect(() => {
        if (isFromTrial) {
            loadEmployeeCount();
            loadTrialInfo();
        }
    }, []);

    useEffect(() => {
        checkCanSubmit();
    }, [name, password, confirmPassword, phone, confirmAge, serviceTerms, privacyTerms, authCodeVerified]);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (timerStarted && timerSeconds > 0) {
            interval = setInterval(() => {
                setTimerSeconds((prev) => {
                    if (prev <= 1) {
                        setTimerStarted(false);
                        setTimerExpired(true);
                        setStatus(ValidationStatus.TimerExpired);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timerStarted, timerSeconds]);

    const getErrorText = (field: string) => {
        switch (status) {
            case ValidationStatus.EmptyName: return field === "name" ? "이름을 입력하지 않았습니다." : "";
            case ValidationStatus.EmptyPassword: return field === "password" ? "비밀번호를 입력하지 않았습니다." : "";
            case ValidationStatus.EmptyConfirmPassword: return field === "confirmPassword" ? "확인 비밀번호를 입력하지 않았습니다." : "";
            case ValidationStatus.NotMatchPassword: return field === "confirmPassword" ? "비밀번호와 확인 비밀번호가 일치하지 않습니다." : "";
            case ValidationStatus.InvalidPassword: return field === "confirmPassword" ? "비밀번호가 조건에 맞지 않습니다." : "";
            case ValidationStatus.EmptyPhone: return field === "phone" ? "휴대전화번호를 입력하지 않았습니다." : "";
            case ValidationStatus.InvalidPhone: return field === "phone" ? "휴대전화번호가 형식에 맞지 않습니다." : "";
            case ValidationStatus.TimerExpired: return field === "authCode" ? "인증시간이 만료되었습니다. 인증번호를 다시 요청하세요." : "";
            default: return "";
        }
    }

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />

            <main className="flex-1 flex items-center justify-center px-4 py-12 md:py-20">
                <div className="w-full max-w-md">
                    {/* Title */}
                    <div className="text-center mb-8">
                        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">프로필 설정하기</h1>
                        <p className="text-muted-foreground">
                            프로필 세부내역을 입력하시면 회원가입이 완료됩니다.
                        </p>
                    </div>

                    {/* Form Card */}
                    <div className="bg-card rounded-3xl border border-border shadow-xl p-6 md:p-8">
                        <div className="space-y-4">
                            {/* Name Field */}
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-sm font-medium text-foreground">이름</Label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                    <Input
                                        type="text"
                                        id="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        autoComplete="off"
                                        className={`h-12 pl-12 pr-4 rounded-xl border-2 ${
                                            status === ValidationStatus.EmptyName 
                                                ? "border-destructive" 
                                                : "border-input focus:border-primary"
                                        }`}
                                        placeholder="홍길동"
                                    />
                                </div>
                                {getErrorText("name") && (
                                    <p className="text-sm text-destructive">{getErrorText("name")}</p>
                                )}
                            </div>

                            {/* Password Field */}
                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-sm font-medium text-foreground">
                                    비밀번호 (7~20자 영문, 숫자 조합)
                                </Label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        autoComplete="new-password"
                                        className={`h-12 pl-12 pr-12 rounded-xl border-2 ${
                                            status === ValidationStatus.EmptyPassword 
                                                ? "border-destructive" 
                                                : "border-input focus:border-primary"
                                        }`}
                                        placeholder="비밀번호 입력"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                    >
                                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                                {getErrorText("password") && (
                                    <p className="text-sm text-destructive">{getErrorText("password")}</p>
                                )}
                            </div>

                            {/* Confirm Password Field */}
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">비밀번호 확인</Label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                    <Input
                                        type={showConfirmPassword ? "text" : "password"}
                                        id="confirmPassword"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        autoComplete="new-password"
                                        className={`h-12 pl-12 pr-12 rounded-xl border-2 ${
                                            [ValidationStatus.EmptyConfirmPassword, ValidationStatus.NotMatchPassword, ValidationStatus.InvalidPassword].includes(status)
                                                ? "border-destructive" 
                                                : "border-input focus:border-primary"
                                        }`}
                                        placeholder="비밀번호 재입력"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                    >
                                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                                {getErrorText("confirmPassword") && (
                                    <p className="text-sm text-destructive">{getErrorText("confirmPassword")}</p>
                                )}
                            </div>

                            {/* Phone Field */}
                            <div className="space-y-2">
                                <Label htmlFor="phone" className="text-sm font-medium text-foreground">휴대전화</Label>
                                <div className="flex gap-2">
                                    <div className="relative flex-1">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                        <Input
                                            type="tel"
                                            id="phone"
                                            value={phone}
                                            onChange={(e) => {
                                                setPhone(e.target.value);
                                                if (status === ValidationStatus.InvalidPhone) setStatus(ValidationStatus.Valid);
                                            }}
                                            disabled={isFromTrial}
                                            className={`h-12 pl-12 pr-4 rounded-xl border-2 ${
                                                [ValidationStatus.EmptyPhone, ValidationStatus.InvalidPhone].includes(status)
                                                    ? "border-destructive" 
                                                    : "border-input focus:border-primary"
                                            }`}
                                            placeholder="01012345678"
                                        />
                                    </div>
                                    {!isFromTrial && (
                                        <Button
                                            type="button"
                                            onClick={onRequestAuthenticationCodeClick}
                                            disabled={!phone.length}
                                            className="h-12 px-4 rounded-xl whitespace-nowrap"
                                        >
                                            인증요청
                                        </Button>
                                    )}
                                </div>
                                {getErrorText("phone") && (
                                    <p className="text-sm text-destructive">{getErrorText("phone")}</p>
                                )}
                            </div>

                            {/* Auth Code Field */}
                            {!isFromTrial && (timerStarted || authCodeVerified) && (
                                <div className="space-y-2">
                                    <Label htmlFor="authCode" className="text-sm font-medium text-foreground">인증번호</Label>
                                    <div className="flex gap-2">
                                        <div className="relative flex-1">
                                            <Input
                                                type="text"
                                                id="authCode"
                                                value={authenticationCode}
                                                onChange={(e) => setAuthenticationCode(e.target.value)}
                                                disabled={authCodeVerified}
                                                className={`h-12 px-4 rounded-xl border-2 ${
                                                    status === ValidationStatus.TimerExpired
                                                        ? "border-destructive" 
                                                        : "border-input focus:border-primary"
                                                }`}
                                                placeholder="인증번호 입력"
                                            />
                                            {timerStarted && !authCodeVerified && (
                                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-amber-600">
                                                    {formatTime(timerSeconds)}
                                                </span>
                                            )}
                                            {authCodeVerified && (
                                                <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-green-600" />
                                            )}
                                        </div>
                                        {!authCodeVerified && (
                                            <Button
                                                type="button"
                                                onClick={onVerifyCertNumberClick}
                                                disabled={!timerStarted || timerExpired}
                                                className="h-12 px-4 rounded-xl whitespace-nowrap"
                                            >
                                                인증확인
                                            </Button>
                                        )}
                                    </div>
                                    {!authCodeVerified && timerStarted && (
                                        <p className="text-sm text-amber-600">
                                            휴대폰으로 전송된 인증번호를 3분 안에 입력해주세요.
                                        </p>
                                    )}
                                    {getErrorText("authCode") && (
                                        <p className="text-sm text-destructive">{getErrorText("authCode")}</p>
                                    )}
                                </div>
                            )}

                            {/* Terms Section */}
                            <div className="pt-4 space-y-3">
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="agreeAll"
                                        checked={agreeAll}
                                        onCheckedChange={onAgreeAllCheck}
                                    />
                                    <Label htmlFor="agreeAll" className="text-sm font-medium text-foreground cursor-pointer">
                                        개인정보처리방침 및 서비스 이용약관에 모두 동의합니다
                                    </Label>
                                </div>

                                <div className="pl-4 space-y-2 border-l-2 border-border">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="confirmAge"
                                                checked={confirmAge}
                                                onCheckedChange={() => setConfirmAge(!confirmAge)}
                                            />
                                            <Label htmlFor="confirmAge" className="text-sm text-muted-foreground cursor-pointer">
                                                <span className="text-destructive">[필수]</span> 만 14세 이상입니다
                                            </Label>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="serviceTerms"
                                                checked={serviceTerms}
                                                onCheckedChange={() => setServiceTerms(!serviceTerms)}
                                            />
                                            <Label htmlFor="serviceTerms" className="text-sm text-muted-foreground cursor-pointer">
                                                <span className="text-destructive">[필수]</span> 서비스 이용약관 동의
                                            </Label>
                                        </div>
                                        <button type="button" className="text-xs text-muted-foreground underline">
                                            내용보기
                                        </button>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="privacyTerms"
                                                checked={privacyTerms}
                                                onCheckedChange={() => setPrivacyTerms(!privacyTerms)}
                                            />
                                            <Label htmlFor="privacyTerms" className="text-sm text-muted-foreground cursor-pointer">
                                                <span className="text-destructive">[필수]</span> 개인정보처리방침 동의
                                            </Label>
                                        </div>
                                        <button type="button" onClick={onGotoPrivacyTerms} className="text-xs text-muted-foreground underline">
                                            내용보기
                                        </button>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="marketingTerms"
                                                checked={marketingTerms}
                                                onCheckedChange={() => setMarketingTerms(!marketingTerms)}
                                            />
                                            <Label htmlFor="marketingTerms" className="text-sm text-muted-foreground cursor-pointer">
                                                [선택] 마케팅 정보 수신동의
                                            </Label>
                                        </div>
                                        <button type="button" className="text-xs text-muted-foreground underline">
                                            내용보기
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <Button
                                onClick={onSignUpClick}
                                disabled={!canSubmit || isSubmitting}
                                size="lg"
                                className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg shadow-primary/25 mt-4"
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        가입 중...
                                    </>
                                ) : (
                                    "가입하기"
                                )}
                            </Button>

                            {/* Login Link */}
                            <div className="flex items-center justify-between pt-2">
                                <span className="text-sm text-muted-foreground">이미 서비스 포털 계정이 있으신가요?</span>
                                <Button variant="outline" size="sm" asChild className="rounded-xl">
                                    <Link href="/login">로그인</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
