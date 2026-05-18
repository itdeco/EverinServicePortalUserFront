"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import { Mail, Lock, ArrowRight, Eye, EyeOff, CheckCircle2 } from "lucide-react";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

import { Api } from "@/api";
import {
    LogInRequestDto,
    UserDto,
    UserStatusType,
} from "@/types/Users";
import {
    PaymentLogStatusType,
    PaymentStatusDto,
} from "@/types/Payments";

import { checkApiResult, getApiErrorMessage } from "@/utils/apiUtil";
import { alertMessage, confirmMessage } from "@/utils/messageBox";
import TokenUtil from "@/utils/tokenUtil";
import CommonUtil from "@/utils/commonUtil";
import DateUtil from "@/utils/dateUtil";
import { TOKEN_EXPIRED, TOKEN_INVALID } from "@/utils/constant";

import { UserActions } from "@/redux/actions/Users";
import { PlanActions } from "@/redux/actions/Plans";
import { useLoginStatus, useUserProfile } from "@/redux/selectors/Users";

const COOKIE_LOGIN = "ylw_login_info";
const MIN_LOGIN_ID = 1;
const MIN_PASSWORD = 1;
const DORMANT_ERROR_CODE = 3015;

const ROUTES = {
    HOME: "/",
    LOGIN: "/login",
    SIGNUP: "/signup",
    PASSWORD: "/password",
    FIND: "/find",
    SUBSCRIBE: "/subscribe/",
    MY_PAGE: "/mypage/subscription",
    MY_PAGE_PAYMENT_ERROR: "/mypage/payment/error",
} as const;

type LoginInfo = {
    loginId: string;
    password: string;
    saveId: boolean;
    token: string;
};

enum EmailValidationType {
    none,
    empty,
    invalid,
    notFound,
}

enum LoginMode {
    Normal,
    Dormant,
}

export default function LoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const url = searchParams.get("url");

    const dispatch = useDispatch();
    const profile = useUserProfile();
    const isLoggedIn = useLoginStatus();

    const [cookies, setCookie, removeCookie] = useCookies([COOKIE_LOGIN]);

    const [loginMode, setLoginMode] = useState<LoginMode>(LoginMode.Normal);
    const [saveId, setSaveId] = useState(false);
    const [canLogin, setCanLogin] = useState(false);
    const [emailValidation, setEmailValidation] = useState<EmailValidationType>(EmailValidationType.none);
    const [passwordNotMatch, setPasswordNotMatch] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [loginInfo, setLoginInfo] = useState<LoginInfo>({
        loginId: "",
        password: "",
        saveId: false,
        token: "",
    });

    const isEmailInvalid =
        emailValidation === EmailValidationType.empty ||
        emailValidation === EmailValidationType.invalid ||
        emailValidation === EmailValidationType.notFound;

    const emailErrorText = useMemo(() => {
        if (emailValidation === EmailValidationType.empty) {
            return "이메일을 입력하지 않았습니다.";
        }
        if (emailValidation === EmailValidationType.invalid) {
            return "이메일 형식에 맞지 않습니다.";
        }
        if (emailValidation === EmailValidationType.notFound) {
            return "가입된 이메일이 아닙니다.";
        }
        return "";
    }, [emailValidation]);

    const passwordErrorText = useMemo(() => {
        if (loginInfo.password.length === 0) {
            return "비밀번호를 입력하지 않았습니다.";
        }
        if (passwordNotMatch) {
            return "비밀번호가 일치하지 않습니다.";
        }
        return "";
    }, [loginInfo.password.length, passwordNotMatch]);

    const checkLogin = (data?: LoginInfo | null) => {
        if (!data) {
            setCanLogin(false);
            return;
        }

        const enable =
            !!data.loginId &&
            data.loginId.length >= MIN_LOGIN_ID &&
            !!data.password &&
            data.password.length >= MIN_PASSWORD;

        setCanLogin(enable);
    };

    const onChangeTextBox = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const updatedData = {
            ...loginInfo,
            [name]: value,
        };

        if (name === "loginId") {
            setEmailValidation(EmailValidationType.none);
        }
        if (name === "password") {
            setPasswordNotMatch(false);
        }

        setLoginInfo(updatedData);
        checkLogin(updatedData);
    };

    const onChangeSaveID = (checked: boolean) => {
        setSaveId(checked);
    };

    const moveAfterLogin = async (user: UserDto) => {
        if (url) {
            router.replace(url);
            return;
        }

        if (user.status === UserStatusType.Upgrading) {
            await alertMessage(
                "무료체험 중인 상태에서 업그레이드 중입니다.<br/>플랜 업그레이드를 완료하기 위해 구독 페이지로 이동합니다."
            );
            router.push(ROUTES.SUBSCRIBE);
            return;
        }

        if (user.status === UserStatusType.Dormant) {
            setLoginMode(LoginMode.Dormant);
            return;
        }

        if (user.preference?.passwordChangeMonth && user.passwordDate) {
            const passwordChangeTermDays = user.preference.passwordChangeMonth * 30;
            const passwordDays = DateUtil.calcIntervalDays(user.passwordDate, new Date());

            if (passwordDays > passwordChangeTermDays) {
                router.push(ROUTES.PASSWORD);
                return;
            }
        }

        const prevMonthDate = DateUtil.getPrevMonthDate();
        const paymentResult = await Api.Payments.getPaymentStatus(
            user.userId,
            prevMonthDate.getFullYear(),
            prevMonthDate.getMonth() + 1
        );

        if (!checkApiResult(paymentResult)) {
            return;
        }

        const paymentStatuses = (paymentResult?.payload || []) as PaymentStatusDto[];
        dispatch(UserActions.setPaymentStatuses(paymentStatuses));

        if (paymentStatuses.length > 0) {
            const paymentStatus = paymentStatuses[paymentStatuses.length - 1];
            if (paymentStatus.status === PaymentLogStatusType.Error) {
                const alertDays = user.preference?.paymentErrorAlertDays || 1;
                const passedDays = DateUtil.calcIntervalDays(paymentStatus.errorDate, new Date());

                if (passedDays > alertDays) {
                    router.replace(ROUTES.MY_PAGE_PAYMENT_ERROR);
                    return;
                }
            }
        }

        router.replace(ROUTES.MY_PAGE);
    };

    const login = async () => {
        setIsLoading(true);
        const params: LogInRequestDto = {
            loginId: loginInfo.loginId,
            password: loginInfo.password,
        };

        const result = await Api.Users.logIn(params);

        if (result?.code === DORMANT_ERROR_CODE) {
            setLoginMode(LoginMode.Dormant);
            setIsLoading(false);
            return;
        }

        if (!checkApiResult(result)) {
            setIsLoading(false);
            return;
        }

        const errorMessage = getApiErrorMessage(result);

        if (errorMessage) {
            if (result?.code === 3000) {
                setEmailValidation(EmailValidationType.notFound);
                setPasswordNotMatch(false);
                setIsLoading(false);
                return;
            }

            if (result?.code === 3001) {
                setEmailValidation(EmailValidationType.none);
                setPasswordNotMatch(true);
                setIsLoading(false);
                return;
            }

            setIsLoading(false);
            return;
        }

        const user = result?.payload as UserDto;

        if (user.status === UserStatusType.DelegationTarget) {
            await alertMessage(
                "신용카드를 등록하지 않아 권한위임 절차가 완료되지 않았기 때문에 확인 버튼을 클릭하시면 신용카드 등록 절차를 계속 진행합니다."
            );

            const delegationResult = await Api.Users.getDelegationLogId(user.userId);
            if (!checkApiResult(delegationResult)) {
                setIsLoading(false);
                return;
            }

            const delegationLogId = delegationResult?.payload?.value;
            router.push(
                `/delegate/step2?toUserId=${user.userId}&toUserName=${user.name}&toUserEmail=${user.loginId}&delegationLogId=${delegationLogId}`
            );
            return;
        }

        const token = user.token || "";
        const tokenResult = TokenUtil.validateToken(token);

        if (!tokenResult.success) {
            if (tokenResult.code === TOKEN_INVALID) {
                await alertMessage("유효하지 않은 토큰입니다.");
                setIsLoading(false);
                return;
            }

            if (tokenResult.code === TOKEN_EXPIRED) {
                await alertMessage("토큰이 만료되었습니다.");
                setIsLoading(false);
                return;
            }
        }

        dispatch(UserActions.setUserProfile(user));

        if (saveId) {
            setCookie(
                COOKIE_LOGIN,
                {
                    ...loginInfo,
                    saveId,
                    token,
                    password: "",
                },
                { path: "/", maxAge: 60 * 60 * 24 * 30 }
            );
        } else {
            removeCookie(COOKIE_LOGIN, { path: "/" });
        }

        TokenUtil.setToken(token);

        await moveAfterLogin(user);
        setIsLoading(false);
    };

    const onClickLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!loginInfo.loginId) {
            setEmailValidation(EmailValidationType.empty);
            return;
        }

        const valid = CommonUtil.isValidEmail(loginInfo.loginId);
        if (!valid) {
            setEmailValidation(EmailValidationType.invalid);
            return;
        }

        if (!loginInfo.password) {
            setPasswordNotMatch(false);
            return;
        }

        await login();
    };

    const onTextKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            await onClickLogin(e as unknown as React.MouseEvent<HTMLButtonElement>);
        }
    };

    const onWakeupClick = async () => {
        const answer = await confirmMessage(
            "휴면상태를 해제하시겠습니까?<br>해제 후 확인 버튼을 클릭하시면 로그인 화면으로 이동합니다"
        );

        if (!answer?.isConfirmed) {
            return;
        }

        const result = await Api.Users.wakeupDormant();
        if (!checkApiResult(result)) {
            return;
        }

        setLoginMode(LoginMode.Normal);
    };

    useEffect(() => {
        if (typeof document !== "undefined") {
            document.body.classList.add("height-full");
        }

        if (cookies?.ylw_login_info) {
            setSaveId(!!cookies.ylw_login_info.saveId);
            setLoginInfo((prev) => ({
                ...prev,
                ...cookies.ylw_login_info,
                password: "",
            }));
            checkLogin({
                ...cookies.ylw_login_info,
                password: "",
            });
        }

        dispatch(PlanActions.setPlans(null));

        return () => {
            if (typeof document !== "undefined") {
                document.body.classList.remove("height-full");
            }
        };
    }, [cookies, dispatch]);

    useEffect(() => {
        if (!isLoggedIn) {
            return;
        }

        if (profile?.status === UserStatusType.Upgrading) {
            alertMessage(
                "무료체험 중인 상태에서 업그레이드 중입니다.<br/>플랜 업그레이드를 완료하기 위해 구독 페이지로 이동합니다."
            ).then(() => {
                router.push(ROUTES.SUBSCRIBE);
            });
            return;
        }

        if (profile?.status === UserStatusType.Dormant) {
            setLoginMode(LoginMode.Dormant);
            return;
        }

        router.replace(ROUTES.MY_PAGE);
    }, [isLoggedIn, profile, router]);

    if (isLoggedIn && loginMode === LoginMode.Normal) {
        return null;
    }

    if (loginMode === LoginMode.Dormant) {
        return (
            <div className="min-h-screen flex flex-col bg-background">
                <Header />

                <main className="flex-1 flex items-center justify-center px-4 py-16">
                    <div className="w-full max-w-2xl">
                        <div className="bg-card rounded-3xl border border-border shadow-lg p-8 md:p-12">
                            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-100 mx-auto mb-6">
                                <svg className="w-8 h-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>

                            <h1 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-2">휴면계정 안내</h1>
                            <p className="text-muted-foreground text-center mb-8">
                                회원님의 계정은 본 서비스에 1년 이상 로그인하지 않아<br className="hidden sm:block" />
                                관련 법령에 따라 휴면상태로 전환되었습니다.
                            </p>

                            <div className="bg-muted/50 rounded-2xl p-6 mb-8">
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center justify-between py-3 border-b border-border">
                                        <span className="text-sm font-medium text-muted-foreground">마지막 접속일</span>
                                        <span className="text-sm font-semibold text-foreground">
                                            {profile?.logInDate
                                                ? DateUtil.formattedDate(profile.logInDate.toLocaleString(), true)
                                                : "-"}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between py-3">
                                        <span className="text-sm font-medium text-muted-foreground">���면 계정 처리일</span>
                                        <span className="text-sm font-semibold text-foreground">
                                            {profile?.dormantDate
                                                ? DateUtil.formattedDate(profile.dormantDate.toLocaleString(), true)
                                                : "-"}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <p className="text-center text-muted-foreground mb-8">
                                서비스를 계속 이용하시려면 <span className="text-primary font-semibold">[휴면해제]</span> 버튼을 클릭해주세요.
                            </p>

                            <div className="flex flex-col sm:flex-row justify-center gap-3">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="rounded-xl px-8"
                                    onClick={() => router.push("/")}
                                >
                                    취소
                                </Button>
                                <Button
                                    size="lg"
                                    className="rounded-xl px-8 bg-primary hover:bg-primary/90"
                                    onClick={onWakeupClick}
                                >
                                    휴면해제
                                </Button>
                            </div>
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        );
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
                    {/* 로고 - 헤더와 동일한 이미지 */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 w-fit">
                        <Link href="/">
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
                    <div className="flex-1 flex flex-col justify-center max-w-lg">
                        <h1 className="text-4xl xl:text-5xl font-bold text-white leading-tight mb-6">
                            HR의 모든 것,<br />
                            <span className="bg-gradient-to-r from-[#00cc99] to-[#4b6bf5] bg-clip-text text-transparent">
                                에버人과 함께
                            </span>
                        </h1>
                        <p className="text-lg text-gray-400 leading-relaxed">
                            급여, 근태, 평가, 온보딩까지<br />
                            하나의 플랫폼에서 모든 HR 업무를 관리하세요.
                        </p>
                        {/* 통계 */}
                        <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/10">
                            <div>
                                <p className="text-3xl font-bold text-[#00cc99]">33+</p>
                                <p className="text-sm text-gray-500 mt-1">Years</p>
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-[#4b6bf5]">3,000+</p>
                                <p className="text-sm text-gray-500 mt-1">고객사</p>
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-white">No.1</p>
                                <p className="text-sm text-gray-500 mt-1">품질</p>
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

            {/* 오른쪽: 로그인 폼 */}
            <div className="flex-1 lg:w-1/2 xl:w-[45%] flex flex-col bg-background">
                {/* 모바일 헤더 */}
                <div className="lg:hidden">
                    <Header />
                </div>

                {/* 데스크탑 상단 회원가입 안내 */}
                <div className="hidden lg:flex justify-end items-center p-6 xl:p-8">
                    <p className="text-sm text-muted-foreground">
                        계정이 없으신가요?{' '}
                        <Link href={ROUTES.SIGNUP} className="text-primary font-semibold hover:underline">
                            무료로 시작하기
                        </Link>
                    </p>
                </div>

                <main className="flex-1 flex items-center justify-center px-6 py-8 lg:px-12 xl:px-16">
                    <div className="w-full max-w-md">
                        {/* Title */}
                        <div className="mb-8">
                            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">다시 만나서 반가워요!</h1>
                            <p className="text-muted-foreground">에버人 서비스에 로그인하세요</p>
                        </div>

                        {/* 폼 영역 */}
                        <div className="space-y-5">
                            {/* Email Field */}
                            <div className="space-y-2">
                                <Label htmlFor="loginId" className="text-sm font-medium text-foreground">
                                    이메일
                                </Label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                    <Input
                                        type="email"
                                        id="loginId"
                                        name="loginId"
                                        value={loginInfo.loginId}
                                        onChange={onChangeTextBox}
                                        onKeyDown={onTextKeyDown}
                                        autoComplete="off"
                                        className={`h-12 pl-12 pr-4 rounded-xl border-2 transition-all ${
                                            isEmailInvalid
                                                ? "border-destructive focus:border-destructive focus:ring-destructive/20"
                                                : "border-input focus:border-primary focus:ring-primary/20"
                                        }`}
                                        placeholder="name@example.com"
                                    />
                                </div>
                                {emailErrorText && (
                                    <p className="text-sm text-destructive flex items-center gap-1.5">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        {emailErrorText}
                                    </p>
                                )}
                            </div>

                            {/* Password Field */}
                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-sm font-medium text-foreground">
                                    비밀번호
                                </Label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        name="password"
                                        value={loginInfo.password}
                                        onChange={onChangeTextBox}
                                        onKeyDown={onTextKeyDown}
                                        autoComplete="new-password"
                                        className={`h-12 pl-12 pr-12 rounded-xl border-2 transition-all ${
                                            passwordNotMatch
                                                ? "border-destructive focus:border-destructive focus:ring-destructive/20"
                                                : "border-input focus:border-primary focus:ring-primary/20"
                                        }`}
                                        placeholder="비밀번호 입력"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                                {passwordErrorText && passwordNotMatch && (
                                    <p className="text-sm text-destructive flex items-center gap-1.5">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                        {passwordErrorText}
                                    </p>
                                )}
                            </div>

                            {/* Remember Me & Forgot Password */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Checkbox
                                        id="saveId"
                                        checked={saveId}
                                        onCheckedChange={onChangeSaveID}
                                        className="rounded"
                                    />
                                    <Label htmlFor="saveId" className="text-sm text-muted-foreground cursor-pointer">
                                        아이디 저장
                                    </Label>
                                </div>
                                <Link
                                    href={ROUTES.FIND}
                                    className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
                                >
                                    아이디/비밀번호 찾기
                                </Link>
                            </div>

                            {/* Login Button */}
                            <Button
                                type="button"
                                onClick={onClickLogin}
                                disabled={!canLogin || isLoading}
                                className={`w-full h-12 rounded-xl text-base font-semibold transition-all ${
                                    canLogin
                                        ? "bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30"
                                        : "bg-muted text-muted-foreground"
                                }`}
                            >
                                {isLoading ? (
                                    <div className="flex items-center gap-2">
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        로그인 중...
                                    </div>
                                ) : (
                                    <span className="flex items-center justify-center gap-2">
                                        로그인
                                        <ArrowRight className="h-5 w-5" />
                                    </span>
                                )}
                            </Button>
                        </div>

                        {/* Divider */}
                        <div className="relative my-8">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-border" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-background text-muted-foreground">또는</span>
                            </div>
                        </div>

                        {/* Sign Up CTA */}
                        <div className="text-center">
                            <p className="text-muted-foreground mb-4">아직 회원이 아니신가요?</p>
                            <Button
                                variant="outline"
                                asChild
                                className="w-full h-12 rounded-xl text-base font-medium border-2 hover:bg-muted/50"
                            >
                                <Link href={ROUTES.SIGNUP} className="flex items-center justify-center gap-2">
                                    <CheckCircle2 className="h-5 w-5" />
                                    무료로 시작하기
                                </Link>
                            </Button>
                        </div>

                        {/* 보안/속도/지원 */}
                        <div className="mt-8 pt-6 border-t border-border flex items-center justify-center gap-8">
                            <div className="flex items-center gap-1.5 text-muted-foreground">
                                <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                <span className="text-xs">안전한 보안</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-muted-foreground">
                                <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                <span className="text-xs">빠른 속도</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-muted-foreground">
                                <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                                <span className="text-xs">24/7 지원</span>
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
    );
}
