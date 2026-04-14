"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { Api } from "@/api";
import { LogInRequestDto, UserDto } from "@/types/Users";
import { checkApiResult, getApiErrorMessage } from "@/utils/apiUtil";
import { alertMessage } from "@/utils/messageBox";
import TokenUtil from "@/utils/tokenUtil";
import { TOKEN_EXPIRED, TOKEN_INVALID } from "@/utils/constant";
import { UserActions } from "@/redux/actions/Users";

export default function LoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const dispatch = useDispatch();

    const [loginId, setLoginId] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const onLogin = async () => {
        if (!loginId.trim()) {
            await alertMessage("아이디를 입력해주세요.");
            return;
        }

        if (!password.trim()) {
            await alertMessage("비밀번호를 입력해주세요.");
            return;
        }

        try {
            setLoading(true);

            const params: LogInRequestDto = {
                loginId,
                password,
            };

            const result = await Api.Users.logIn(params);

            if (!checkApiResult(result)) {
                return;
            }

            const errorMessage = getApiErrorMessage(result);
            if (errorMessage) {
                await alertMessage(errorMessage);
                return;
            }

            const user = result?.payload as UserDto;
            const token = user?.token || "";

            const tokenResult = TokenUtil.validateToken(token);

            if (!tokenResult.success) {
                if (tokenResult.code === TOKEN_INVALID) {
                    await alertMessage("유효하지 않은 토큰입니다.");
                    return;
                }

                if (tokenResult.code === TOKEN_EXPIRED) {
                    await alertMessage("토큰이 만료되었습니다.");
                    return;
                }
            }

            TokenUtil.setToken(token);
            dispatch(UserActions.setUserProfile(user));

            const redirectUrl = searchParams.get("url");
            router.replace(redirectUrl || "/");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen flex items-center justify-center px-6">
            <div className="w-full max-w-md rounded-2xl border bg-white p-8 shadow-sm">
                <h1 className="text-2xl font-bold mb-6">로그인</h1>

                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="아이디"
                        value={loginId}
                        onChange={(e) => setLoginId(e.target.value)}
                        className="w-full rounded-xl border px-4 py-3"
                    />

                    <input
                        type="password"
                        placeholder="비밀번호"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-xl border px-4 py-3"
                    />

                    <button
                        onClick={onLogin}
                        disabled={loading}
                        className="w-full rounded-xl bg-black text-white py-3 disabled:opacity-50"
                    >
                        {loading ? "로그인 중..." : "로그인"}
                    </button>
                </div>
            </div>
        </main>
    );
}