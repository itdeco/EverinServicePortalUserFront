"use client";

import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

const SIGNUP_STEPS = [
    { value: 1, label: "이메일등록" },
    { value: 2, label: "이메일인증" },
    { value: 3, label: "정보등록" },
    { value: 4, label: "가입완료" },
] as const;

type SignupStep = (typeof SIGNUP_STEPS)[number]["value"];

interface SignupProgressProps {
    currentStep: SignupStep;
}

export function SignupProgress({ currentStep }: SignupProgressProps) {
    const totalSteps = SIGNUP_STEPS.length;
    const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;

    return (
        <nav aria-label="회원가입 진행 단계" className="mb-8">
            <div className="px-1">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-primary">
                    Step {currentStep}
                    <span className="text-slate-300"> / {totalSteps}</span>
                </span>
            </div>

            <ol className="relative mt-3 flex items-center justify-between">
                {/* 연결선 (배경) */}
                <div className="absolute left-0 right-0 top-[9px] h-[2px] rounded-full bg-slate-100" />
                {/* 연결선 (진행) */}
                <div
                    className="absolute left-0 top-[9px] h-[2px] rounded-full bg-primary transition-all duration-500"
                    style={{ width: `${progress}%` }}
                />

                {SIGNUP_STEPS.map((step) => {
                    const isComplete = step.value < currentStep;
                    const isActive = step.value === currentStep;

                    return (
                        <li key={step.value} className="relative z-10 flex flex-col items-center">
                            <span
                                className={cn(
                                    "flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold transition-colors duration-300",
                                    isActive
                                        ? "bg-primary text-white ring-4 ring-primary/15"
                                        : isComplete
                                            ? "bg-primary text-white"
                                            : "bg-white text-slate-400 ring-1 ring-slate-200"
                                )}
                            >
                                {isComplete ? <Check className="h-3 w-3" /> : step.value}
                            </span>
                            <span
                                className={cn(
                                    "mt-2 whitespace-nowrap break-keep text-[11px] font-medium transition-colors duration-300",
                                    isActive
                                        ? "text-primary"
                                        : isComplete
                                            ? "text-slate-500"
                                            : "text-slate-400"
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
