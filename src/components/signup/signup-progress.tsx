"use client";

import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

const SIGNUP_STEPS = [
    { value: 1, label: "이메일등록" },
    { value: 2, label: "이메일인증" },
    { value: 3, label: "개인정보등록 및 핸드폰인증" },
    { value: 4, label: "가입완료" },
] as const;

type SignupStep = (typeof SIGNUP_STEPS)[number]["value"];

interface SignupProgressProps {
    currentStep: SignupStep;
}

export function SignupProgress({ currentStep }: SignupProgressProps) {
    return (
        <nav
            aria-label="회원가입 진행 단계"
            className="mb-8 rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur"
        >
            <ol className="grid grid-cols-4 gap-2">
                {SIGNUP_STEPS.map((step) => {
                    const isComplete = step.value < currentStep;
                    const isActive = step.value === currentStep;

                    return (
                        <li
                            key={step.value}
                            className={cn(
                                "relative flex min-h-[76px] flex-col items-center justify-center rounded-xl px-2 py-3 text-center transition-colors",
                                isActive
                                    ? "bg-primary/10 text-primary"
                                    : isComplete
                                        ? "bg-emerald-50 text-emerald-700"
                                        : "bg-slate-50 text-slate-500"
                            )}
                        >
                            <span
                                className={cn(
                                    "mb-2 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold",
                                    isActive
                                        ? "bg-primary text-white shadow-lg shadow-primary/20"
                                        : isComplete
                                            ? "bg-emerald-500 text-white"
                                            : "bg-white text-slate-400 ring-1 ring-slate-200"
                                )}
                            >
                                {isComplete ? <Check className="h-4 w-4" /> : step.value}
                            </span>
                            <span
                                className={cn(
                                    "break-keep text-[11px] font-semibold leading-snug sm:text-xs",
                                    isActive ? "text-primary" : isComplete ? "text-emerald-700" : "text-slate-500"
                                )}
                            >
                                {step.label}
                            </span>
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
