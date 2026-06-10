"use client";

import {useEffect, useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {User, Lock, Phone, Eye, EyeOff, CheckCircle2} from "lucide-react";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Checkbox} from "@/components/ui/checkbox";

import {Api} from "@/api";
import {SignUpRequestDto, SmsAuthenticationRequestBaseDto, SmsAuthenticationVerifyDto} from "@/types/Users";
import {TrialDto} from "@/types/Trials";
import {checkApiResult} from "@/utils/apiUtil";
import CommonUtil from "@/utils/commonUtil";
import {alertMessage} from "@/utils/messageBox";
import {useLoginStatus} from "@/redux/selectors/Users";

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
            await alertMessage("암호를 7자리 ~ 20자리 이내로 입력해주세요");
            return;
        } else if (validationStatus === PasswordValidationStatus.NotAllowedSpace) {
            await alertMessage("암호를 공백 없이 입력해주세요");
            return;
        } else if (validationStatus === PasswordValidationStatus.NeedAlphabetAndNumeric) {
            await alertMessage("암호를 영문, 숫자를 혼합하여 입력해주세요");
            return;
        }

        if (!CommonUtil.isValidMobilePhone(phone)) {
            await alertMessage("휴대전화번호가 형식에 맞지 않습니다");
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
            case ValidationStatus.EmptyName:
                return field === "name" ? "이름을 입력하지 않았습니다" : "";
            case ValidationStatus.EmptyPassword:
                return field === "password" ? "비밀번호를 입력하지 않았습니다" : "";
            case ValidationStatus.EmptyConfirmPassword:
                return field === "confirmPassword" ? "확인 비밀번호를 입력하지 않았습니다" : "";
            case ValidationStatus.NotMatchPassword:
                return field === "confirmPassword" ? "비밀번호와 확인 비밀번호가 일치하지 않습니다" : "";
            case ValidationStatus.InvalidPassword:
                return field === "confirmPassword" ? "비밀번호가 조건에 맞지 않습니다" : "";
            case ValidationStatus.EmptyPhone:
                return field === "phone" ? "휴대전화번호를 입력하지 않았습니다" : "";
            case ValidationStatus.InvalidPhone:
                return field === "phone" ? "휴대전화번호가 형식에 맞지 않습니다" : "";
            case ValidationStatus.TimerExpired:
                return field === "authCode" ? "인증시간이 만료되었습니다. 인증번호를 다시 요청하세요" : "";
            default:
                return "";
        }
    }

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
                                    6개월 무료!
                                </span>
                            </h1>
                            <p className="text-lg text-gray-400 leading-relaxed">
                                급여, 근태, 평가, 온보딩까지<br />
                                하나의 플랫폼에서 모든 HR 업무를 관리하세요.
                            </p>
                            {/* 혜택 */}
                            <div className="grid grid-cols-2 gap-6 mt-12 pt-8 border-t border-white/10">
                                <div>
                                    <p className="text-3xl font-bold text-[#00cc99]">6개월</p>
                                    <p className="text-sm text-gray-500 mt-1">무료 체험</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-bold text-[#4b6bf5]">100%</p>
                                    <p className="text-sm text-gray-500 mt-1">전 기능</p>
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

                {/* 오른쪽: 프로필 폼 */}
                <div className="flex-1 lg:w-1/2 xl:w-[45%] flex flex-col bg-background">
                    {/* 모바일 헤더 */}
                    <div className="lg:hidden">
                        <Header/>
                    </div>

                    <main
                        className="flex-1 flex items-center justify-center px-6 py-8 lg:px-12 xl:px-16 overflow-y-auto">
                        <div className="w-full max-w-md">
                            {/* Title */}
                            <div className="mb-10">
                                <h1 className="text-3xl font-bold text-foreground mb-3">프로필 설정</h1>
                                <p className="text-base text-muted-foreground">
                                    프로필 정보를 입력해주세요.
                                </p>
                            </div>

                            {/* Form Card */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-6">
                                <div className="space-y-4">
                                    {/* Name Field */}
                                    <div className="space-y-2">
                                        <Label htmlFor="name" className="text-sm font-medium text-foreground">이름</Label>
                                        <div className="relative">
                                            <User
                                                className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"/>
                                            <Input
                                                type="text"
                                                id="name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                autoComplete="off"
                                                className={`h-11 pl-12 pr-4 rounded-lg border transition-all bg-gray-50 text-sm ${
                                                    status === ValidationStatus.EmptyName
                                                        ? "border-red-300 focus:border-red-500 focus:bg-white focus:ring-red-500/10"
                                                        : "border-gray-200 focus:border-primary focus:bg-white focus:ring-primary/10"
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
                                            <Lock
                                                className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"/>
                                            <Input
                                                type={showPassword ? "text" : "password"}
                                                id="password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                autoComplete="new-password"
                                                className={`h-11 pl-12 pr-12 rounded-lg border transition-all bg-gray-50 text-sm ${
                                                    status === ValidationStatus.EmptyPassword
                                                        ? "border-red-300 focus:border-red-500 focus:bg-white focus:ring-red-500/10"
                                                        : "border-gray-200 focus:border-primary focus:bg-white focus:ring-primary/10"
                                                }`}
                                                placeholder="비밀번호 입력"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                            >
                                                {showPassword ? <EyeOff className="h-5 w-5"/> :
                                                    <Eye className="h-5 w-5"/>}
                                            </button>
                                        </div>
                                        {getErrorText("password") && (
                                            <p className="text-sm text-destructive">{getErrorText("password")}</p>
                                        )}
                                    </div>

                                    {/* Confirm Password Field */}
                                    <div className="space-y-2">
                                        <Label htmlFor="confirmPassword"
                                               className="text-sm font-medium text-foreground">비밀번호 확인</Label>
                                        <div className="relative">
                                            <Lock
                                                className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"/>
                                            <Input
                                                type={showConfirmPassword ? "text" : "password"}
                                                id="confirmPassword"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                autoComplete="new-password"
                                                className={`h-11 pl-12 pr-12 rounded-lg border transition-all bg-gray-50 text-sm ${
                                                    [ValidationStatus.EmptyConfirmPassword, ValidationStatus.NotMatchPassword, ValidationStatus.InvalidPassword].includes(status)
                                                        ? "border-red-300 focus:border-red-500 focus:bg-white focus:ring-red-500/10"
                                                        : "border-gray-200 focus:border-primary focus:bg-white focus:ring-primary/10"
                                                }`}
                                                placeholder="비밀번호 재입력"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                            >
                                                {showConfirmPassword ? <EyeOff className="h-5 w-5"/> :
                                                    <Eye className="h-5 w-5"/>}
                                            </button>
                                        </div>
                                        {getErrorText("confirmPassword") && (
                                            <p className="text-sm text-destructive">{getErrorText("confirmPassword")}</p>
                                        )}
                                    </div>

                                    {/* Phone Field */}
                                    <div className="space-y-2">
                                        <Label htmlFor="phone"
                                               className="text-sm font-medium text-foreground">휴대전화</Label>
                                        <div className="flex gap-2">
                                            <div className="relative flex-1">
                                                <Phone
                                                    className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"/>
                                                <Input
                                                    type="tel"
                                                    id="phone"
                                                    value={phone}
                                                    onChange={(e) => {
                                                        setPhone(CommonUtil.formatPhoneNumber(e.target.value));
                                                        if (status === ValidationStatus.InvalidPhone) setStatus(ValidationStatus.Valid);
                                                    }}
                                                    disabled={isFromTrial}
                                                    className={`h-11 pl-12 pr-4 rounded-lg border transition-all bg-gray-50 text-sm ${
                                                        [ValidationStatus.EmptyPhone, ValidationStatus.InvalidPhone].includes(status)
                                                            ? "border-red-300 focus:border-red-500 focus:bg-white focus:ring-red-500/10"
                                                            : "border-gray-200 focus:border-primary focus:bg-white focus:ring-primary/10"
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
                                            <Label htmlFor="authCode"
                                                   className="text-sm font-medium text-foreground">인증번호</Label>
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
                                                        <span
                                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-amber-600">
                                                            {formatTime(timerSeconds)}
                                                        </span>
                                                    )}
                                                    {authCodeVerified && (
                                                        <CheckCircle2
                                                            className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-green-600"/>
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
                                            <Label htmlFor="agreeAll"
                                                   className="text-sm font-medium text-foreground cursor-pointer">
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
                                                    <Label htmlFor="confirmAge"
                                                           className="text-sm text-muted-foreground cursor-pointer">
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
                                                    <Label htmlFor="serviceTerms"
                                                           className="text-sm text-muted-foreground cursor-pointer">
                                                        <span className="text-destructive">[필수]</span> 서비스 이용약관 동의
                                                    </Label>
                                                </div>
                                                <button type="button"
                                                        className="text-xs text-muted-foreground underline">
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
                                                    <Label htmlFor="privacyTerms"
                                                           className="text-sm text-muted-foreground cursor-pointer">
                                                        <span className="text-destructive">[필수]</span> 개인정보처리방침 동의
                                                    </Label>
                                                </div>
                                                <button type="button" onClick={onGotoPrivacyTerms}
                                                        className="text-xs text-muted-foreground underline">
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
                                                    <Label htmlFor="marketingTerms"
                                                           className="text-sm text-muted-foreground cursor-pointer">
                                                        [선택] 마케팅 정보 수신동의
                                                    </Label>
                                                </div>
                                                <button type="button"
                                                        className="text-xs text-muted-foreground underline">
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
                                                <svg className="animate-spin -ml-1 mr-2 h-5 w-5"
                                                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10"
                                                            stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor"
                                                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
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

                    {/* 모바일 푸터 */}
                    <div className="lg:hidden">
                        <Footer/>
                    </div>
                </div>
            </div>
        </div>
    );
}
