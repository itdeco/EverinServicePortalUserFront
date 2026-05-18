"use client";

import { useEffect, useMemo, useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronRight,
  Sparkles,
  Calculator,
  Building2,
  ArrowRight,
  Zap,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ApiSubscribe from "@/api/Subscribe";
import { ApiResponse } from "@/types/Common";
import {
  Category,
  Service,
  Plan as PlanItem,
} from "@/types/subscribe";

type SelectedState = Record<string, boolean>;
type PlanState = Record<string, string>;
type HeadcountState = Record<string, number>;
type OpenState = Record<string, boolean>;

const fallbackServiceConfig: Category[] = [
  {
    categoryId: "smartcare",
    categoryName: "스마트케어",
    sortOrder: 1,
    services: [
      {
        serviceId: "welcoming",
        serviceName: "에버웰커밍",
        description: "신규 입사자 온보딩 자동화",
        price: 1500,
        defaultUsercount: 30,
        sortOrder: 1,
      },
      {
        serviceId: "evertime",
        serviceName: "에버타임",
        description: "근태관리 통합 솔루션",
        defaultUsercount: 30,
        sortOrder: 2,
        plans: [
          {
            planId: "standard",
            planName: "스탠다드",
            price: 2500,
            sortOrder: 1,
            allowedChildren: ["pcoff"],
          },
          {
            planId: "enterprise",
            planName: "엔터프라이즈",
            price: 0,
            quoteOnly: true,
            sortOrder: 2,
            allowedChildren: ["pcoff", "access", "setup"],
          },
        ],
        subServices: [
          {
            serviceId: "pcoff",
            serviceName: "PC-OFF",
            description: "퇴근 시 PC 자동 종료",
            price: 1000,
            defaultUsercount: 30,
            sortOrder: 1,
          },
          {
            serviceId: "access",
            serviceName: "출입시스템",
            description: "출입게이트/보안장비 연동",
            price: 1200,
            defaultUsercount: 30,
            sortOrder: 2,
          },
          {
            serviceId: "setup",
            serviceName: "근태셋업",
            description: "교대근무/탄력근무 초기 구축",
            price: 800,
            defaultUsercount: 30,
            sortOrder: 3,
          },
        ],
      },
      {
        serviceId: "hr",
        serviceName: "인사관리",
        description: "인사정보 통합 관리",
        price: 1800,
        defaultUsercount: 30,
        sortOrder: 3,
      },
      {
        serviceId: "benefit",
        serviceName: "복리후생",
        description: "복리후생 포인트 관리",
        price: 1200,
        defaultUsercount: 30,
        sortOrder: 4,
      },
    ],
  },
  {
    categoryId: "payroll-category",
    categoryName: "급여",
    sortOrder: 2,
    services: [
      {
        serviceId: "payroll",
        serviceName: "에버페이롤",
        description: "급여 계산 및 지급 관리",
        defaultUsercount: 30,
        sortOrder: 1,
        plans: [
          {
            planId: "self",
            planName: "자체운영",
            price: 4500,
            sortOrder: 1,
            allowedChildren: ["payroll-setup-self"],
          },
          {
            planId: "outsourcing",
            planName: "아웃소싱",
            price: 6000,
            sortOrder: 2,
            allowedChildren: [
              "payroll-report",
              "payroll-yearend",
              "payroll-setup-out",
            ],
          },
          {
            planId: "erp-outsourcing",
            planName: "ERP아웃소싱",
            price: 6000,
            sortOrder: 3,
            allowedChildren: [
              "payroll-report-erp",
              "payroll-yearend-erp",
              "payroll-setup-erp",
            ],
          },
        ],
        subServices: [
          {
            serviceId: "payroll-setup-self",
            serviceName: "급여셋업",
            description: "급여 규칙/수당/공제 설정",
            price: 1000,
            defaultUsercount: 30,
            sortOrder: 1,
          },
          {
            serviceId: "payroll-report",
            serviceName: "신고서비스",
            description: "급여 신고 대행",
            price: 0,
            quoteOnly: true,
            sortOrder: 2,
          },
          {
            serviceId: "payroll-yearend",
            serviceName: "연말정산서비스",
            description: "연말정산 대행",
            price: 0,
            quoteOnly: true,
            sortOrder: 3,
          },
          {
            serviceId: "payroll-setup-out",
            serviceName: "급여셋업",
            description: "아웃소싱 급여셋업",
            price: 0,
            quoteOnly: true,
            sortOrder: 4,
          },
          {
            serviceId: "payroll-report-erp",
            serviceName: "신고서비스",
            description: "ERP 급여 신고",
            price: 0,
            quoteOnly: true,
            sortOrder: 5,
          },
          {
            serviceId: "payroll-yearend-erp",
            serviceName: "연말정산서비스",
            description: "ERP 연말정산",
            price: 0,
            quoteOnly: true,
            sortOrder: 6,
          },
          {
            serviceId: "payroll-setup-erp",
            serviceName: "급여셋업",
            description: "ERP 급여셋업",
            price: 0,
            quoteOnly: true,
            sortOrder: 7,
          },
        ],
      },
    ],
  },
  {
    categoryId: "evaluation-category",
    categoryName: "평가",
    sortOrder: 3,
    services: [
      {
        serviceId: "evaluation",
        serviceName: "에버평가",
        description: "성과 평가 및 목표 관리",
        price: 2200,
        defaultUsercount: 30,
        sortOrder: 1,
      },
    ],
  },
  {
    categoryId: "addons",
    categoryName: "부가서비스",
    sortOrder: 4,
    services: [
      {
        serviceId: "contract",
        serviceName: "전자계약서",
        description: "전자서명 기반 계약 관리",
        price: 900,
        defaultUsercount: 30,
        sortOrder: 1,
      },
      {
        serviceId: "custom",
        serviceName: "추가개발",
        description: "고객사 맞춤 기능 개발",
        price: 0,
        quoteOnly: true,
        sortOrder: 2,
      },
    ],
  },
];

const currency = (n: number) => `${Math.round(n).toLocaleString("ko-KR")}원`;

const perPerson = (n: number) =>
    `${Math.round(n).toLocaleString("ko-KR")}원/인`;

const getServiceUnitPrice = (service: Service, plan?: PlanItem) => {
  if (service.quoteOnly) return 0;
  return plan?.price ?? service.price ?? 0;
};

const sortServiceConfig = (data: Category[]): Category[] => {
  return [...data]
      .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
      .map((category) => ({
        ...category,
        services: [...(category.services ?? [])]
            .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
            .map((service) => ({
              ...service,
              plans: [...(service.plans ?? [])].sort(
                  (a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)
              ),
              subServices: [...(service.subServices ?? [])].sort(
                  (a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)
              ),
            })),
      }));
};

function buildInitialSelected(config: Category[]): SelectedState {
  const acc: SelectedState = {};

  config.forEach((cat) => {
    cat.services.forEach((svc) => {
      acc[svc.serviceId] = false;

      svc.subServices?.forEach((sub) => {
        acc[sub.serviceId] = false;
      });
    });
  });

  return acc;
}

function buildInitialPlans(config: Category[]): PlanState {
  const acc: PlanState = {};

  config.forEach((cat) => {
    cat.services.forEach((svc) => {
      if (svc.plans?.length) {
        acc[svc.serviceId] = svc.plans[0].planId;
      }
    });
  });

  return acc;
}

function buildInitialHeadcount(config: Category[]): HeadcountState {
  const acc: HeadcountState = {};

  config.forEach((cat) => {
    cat.services.forEach((svc) => {
      acc[svc.serviceId] = svc.defaultUsercount ?? 30;

      svc.subServices?.forEach((sub) => {
        acc[sub.serviceId] = sub.defaultUsercount ?? svc.defaultUsercount ?? 30;
      });
    });
  });

  return acc;
}

function buildInitialOpen(config: Category[]): OpenState {
  const acc: OpenState = {};

  config.forEach((cat) => {
    acc[cat.categoryId] = true;

    cat.services.forEach((svc) => {
      acc[svc.serviceId] = true;
    });
  });

  return acc;
}

function NativeCheckbox({
                          checked,
                          disabled,
                          onChange,
                          ariaLabel,
                        }: {
  checked: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
  ariaLabel: string;
}) {
  return (
      <input
          type="checkbox"
          aria-label={ariaLabel}
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange(e.target.checked)}
          className="h-5 w-5 cursor-pointer rounded border-2 border-border accent-primary disabled:cursor-not-allowed disabled:opacity-50"
      />
  );
}

function NativeRadio({
                       id,
                       name,
                       value,
                       checked,
                       disabled,
                       onChange,
                     }: {
  id: string;
  name: string;
  value: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (value: string) => void;
}) {
  return (
      <input
          id={id}
          name={name}
          type="radio"
          value={value}
          checked={checked}
          disabled={disabled}
          onChange={(e) => e.target.checked && onChange(e.target.value)}
          className="h-4 w-4 cursor-pointer accent-primary disabled:cursor-not-allowed"
      />
  );
}

function RollingDigit({ digit }: { digit: string }) {
  const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const target = Number.isNaN(Number(digit)) ? -1 : Number(digit);

  if (target < 0) {
    return <span className="inline-block w-[0.5em] text-center">{digit}</span>;
  }

  return (
      <span className="relative inline-flex h-[1.05em] w-[0.72em] overflow-hidden align-middle">
      <motion.span
          className="absolute left-0 top-0 flex flex-col"
          animate={{ y: `-${target * 1.05}em` }}
          transition={{ type: "spring", stiffness: 200, damping: 22 }}
      >
        {digits.map((value) => (
            <span
                key={value}
                className="h-[1.05em] leading-[1.05em] text-center"
            >
            {value}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

function RollingPrice({ value }: { value: number }) {
  const formatted = Math.max(0, Math.round(value)).toLocaleString("ko-KR");

  return (
      <span className="inline-flex items-center gap-0.5 text-3xl font-bold tracking-tight text-slate-900">
      {formatted.split("").map((digit, index) => (
          <RollingDigit key={`${digit}-${index}`} digit={digit} />
      ))}
        <span className="ml-1 text-lg font-semibold text-slate-500">
        원
      </span>
    </span>
  );
}

function ServiceRow({
                      service,
                      selected,
                      plans,
                      headcounts,
                      open,
                      onToggleSelected,
                      onChangePlan,
                      onChangeHeadcount,
                      onToggleOpen,
                    }: {
  service: Service;
  selected: SelectedState;
  plans: PlanState;
  headcounts: HeadcountState;
  open: OpenState;
  onToggleSelected: (id: string, checked: boolean) => void;
  onChangePlan: (id: string, planId: string) => void;
  onChangeHeadcount: (id: string, value: number) => void;
  onToggleOpen: (id: string) => void;
}) {
  const serviceId = service.serviceId;
  const isSelected = !!selected[serviceId];

  const currentPlanId = plans[serviceId];
  const currentPlan = service.plans?.find((p) => p.planId === currentPlanId);

  const allowedSubServices = currentPlan?.allowedChildren || [];
  const visibleSubServices =
      service.subServices?.filter((sub) =>
          allowedSubServices.includes(sub.serviceId)
      ) || [];

  const hasSubServices = visibleSubServices.length > 0;
  const unitPrice = getServiceUnitPrice(service, currentPlan);
  const headcount = headcounts[serviceId] || 0;

  const isQuoteOnlyPlan = !!currentPlan?.quoteOnly;
  const isQuoteOnlyService = !!service.quoteOnly || isQuoteOnlyPlan;

  let serviceTotal = 0;

  if (isSelected && !isQuoteOnlyService) {
    serviceTotal = unitPrice * headcount;

    visibleSubServices.forEach((sub) => {
      if (selected[sub.serviceId] && !sub.quoteOnly) {
        serviceTotal += sub.price * (headcounts[sub.serviceId] || headcount);
      }
    });
  }

  return (
      <motion.div
          layout
          className={`rounded-2xl border-2 transition-all ${
              isSelected
                  ? "border-primary/50 bg-white shadow-lg shadow-primary/10"
                  : "border-slate-200 bg-white hover:border-primary/30 hover:shadow-md"
          }`}
      >
        <div className="p-4 space-y-3">
          {/* Main Row */}
          <div className="flex items-center gap-4 justify-between">
            {/* Left: Checkbox + Service Info */}
            <div className="flex min-w-0 flex-1 gap-3 items-center">
              <div className="pt-0.5 flex-shrink-0">
                <NativeCheckbox
                    checked={isSelected}
                    onChange={(checked) => onToggleSelected(serviceId, checked)}
                    ariaLabel={`${service.serviceName} 선택`}
                />
              </div>

              {/* Service Name + Badge */}
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold text-slate-900">{service.serviceName}</span>

                  {service.quoteOnly && (
                      <Badge variant="outline" className="text-slate-500 border-slate-300 text-xs">
                        별도견적
                      </Badge>
                  )}

                  {isSelected && !isQuoteOnlyService && (
                      <Badge className="text-white border-0 text-xs" style={{background: "linear-gradient(135deg, rgb(75, 107, 245) 0%, rgb(0, 204, 153) 100%)"}}>
                        선택됨
                      </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Middle: Pricing Info */}
            {!isQuoteOnlyService && (
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-xs font-medium text-slate-500 whitespace-nowrap">요금 기준</span>
                  <span className="text-xs font-semibold text-slate-900 whitespace-nowrap">{perPerson(unitPrice)}</span>
                  <div className="h-3 w-px bg-slate-300" />
                  <span className="text-xs font-medium text-slate-500 whitespace-nowrap">인원</span>
                  <Input
                      type="number"
                      min={0}
                      value={headcount}
                      disabled={!isSelected}
                      onChange={(e) =>
                          onChangeHeadcount(
                              serviceId,
                              Number(e.target.value || 0)
                          )
                      }
                      className="h-7 w-16 border-slate-200 bg-white text-xs"
                  />
                  <span className="text-xs text-slate-500 whitespace-nowrap">명</span>
                </div>
            )}

            {/* Right: Total Price + Chevron */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="text-right min-w-24">
                <div className="text-lg font-bold text-slate-900">
                  {isQuoteOnlyService ? (
                      <span className="font-bold text-sm" style={{background: "linear-gradient(135deg, rgb(75, 107, 245) 0%, rgb(0, 204, 153) 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"}}>견적요청</span>
                  ) : (
                      currency(serviceTotal)
                  )}
                </div>
              </div>

        {hasSubServices && isSelected && (
                  <button
                      type="button"
                      onClick={() => onToggleOpen(serviceId)}
                      className="rounded-full p-1.5 transition hover:bg-slate-100 flex-shrink-0"
                      aria-label="하위 서비스 열기"
                  >
                    {open[serviceId] ? (
                        <ChevronDown className="h-5 w-5 text-slate-500" />
                    ) : (
                        <ChevronRight className="h-5 w-5 text-slate-500" />
                    )}
                  </button>
              )}
            </div>
          </div>

          {/* Plans Row - Shows below when selected */}
          {isSelected && service.plans && service.plans.length > 0 && (
              <div className="flex items-center gap-3 pl-10 pt-1">
                <span className="text-xs font-medium text-slate-500 whitespace-nowrap">플랜</span>
                <div className="flex flex-wrap gap-2">
                  {service.plans.map((plan) => {
                    const isCurrentPlan = currentPlanId === plan.planId;

                    return (
                        <Label
                            key={plan.planId}
                            htmlFor={`${serviceId}-${plan.planId}`}
                            className={`flex cursor-pointer items-center gap-1 rounded-full border-2 px-3 py-1.5 text-xs transition flex-shrink-0 ${
                                isCurrentPlan
                                    ? "border-primary bg-primary/10 text-primary"
                                    : "border-slate-200 bg-slate-50 text-slate-700 hover:border-primary/40"
                            }`}
                        >
                          <NativeRadio
                              id={`${serviceId}-${plan.planId}`}
                              name={`plan-${serviceId}`}
                              value={plan.planId}
                              checked={isCurrentPlan}
                              disabled={!isSelected}
                              onChange={(value) => onChangePlan(serviceId, value)}
                          />
                          <span className="font-medium">{plan.planName}</span>
                          <span className="text-slate-500">
                          {plan.quoteOnly
                              ? "별도견적"
                              : perPerson(plan.price)}
                        </span>
                        </Label>
                    );
                  })}
                </div>
              </div>
          )}
        </div>

        {hasSubServices && (
            <AnimatePresence initial={false}>
              {open[serviceId] && (
                  <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                  >
                    <div className="space-y-3 border-t border-slate-200 bg-slate-50 p-4">
                      <div className="mb-2 text-xs font-medium text-slate-500">
                        선택 가능한 하위 서비스
                      </div>

                      {visibleSubServices.map((sub) => {
                        const subId = sub.serviceId;
                        const isSubSelected = !!selected[subId];
                        const subHeadcount = headcounts[subId] || headcount;
                        const subTotal = sub.quoteOnly
                            ? 0
                            : sub.price * subHeadcount;

                        return (
                            <div
                                key={subId}
                                className={`rounded-xl border-2 p-3 transition ${
                                    isSubSelected
                                        ? "border-primary/40 bg-white shadow-sm"
                                        : "border-slate-200 bg-white"
                                }`}
                            >
                              <div className="flex items-start justify-between gap-3">
                                <div className="flex gap-3">
                                  <NativeCheckbox
                                      checked={isSubSelected}
                                      onChange={(checked) =>
                                          onToggleSelected(subId, checked)
                                      }
                                      ariaLabel={`${sub.serviceName} 선택`}
                                      disabled={!isSelected}
                                  />

                                  <div>
                                    <div className="flex items-center gap-2">
                              <span className="font-medium">
                                {sub.serviceName}
                              </span>

                                      {sub.quoteOnly && (
                                          <Badge variant="outline" className="text-xs">
                                            견적요청
                                          </Badge>
                                      )}

                                      {isSubSelected && !sub.quoteOnly && (
                                          <Badge className="text-white text-xs border-0" style={{background: "linear-gradient(135deg, rgb(75, 107, 245) 0%, rgb(0, 204, 153) 100%)"}}>
                                            선택됨
                                          </Badge>
                                      )}
                                    </div>

                                    {sub.description && (
                                        <p className="mt-0.5 text-xs text-slate-500">
                                          {sub.description}
                                        </p>
                                    )}

                                    {!sub.quoteOnly && (
                                        <div className="mt-1 text-xs text-slate-500">
                                          {perPerson(sub.price)}
                                        </div>
                                    )}
                                  </div>
                                </div>

                                <div className="text-right">
                                  {!sub.quoteOnly ? (
                                      <div className="flex items-center gap-2">
                                        <Input
                                            type="number"
                                            min={0}
                                            value={subHeadcount}
                                            disabled={!isSelected || !isSubSelected}
                                            onChange={(e) =>
                                                onChangeHeadcount(
                                                    subId,
                                                    Number(e.target.value || 0)
                                                )
                                            }
                                            className="h-8 w-20 text-sm border-slate-200 bg-white"
                                        />
                                        <span className="min-w-[80px] text-right text-sm font-medium text-slate-900">
                                {currency(subTotal)}
                              </span>
                                      </div>
                                  ) : (
                                      <span className="text-sm text-slate-500">
                              견적요청
                            </span>
                                  )}
                                </div>
                              </div>
                            </div>
                        );
                      })}
                    </div>
                  </motion.div>
              )}
            </AnimatePresence>
        )}
      </motion.div>
  );
}

function SubscribeContent() {
  const router = useRouter();

  const initialConfig = sortServiceConfig(fallbackServiceConfig);

  const [serviceConfig, setserviceConfig] = useState<Category[]>(initialConfig);

  const [selected, setSelected] = useState<SelectedState>(() =>
      buildInitialSelected(initialConfig)
  );

  const [plans, setPlans] = useState<PlanState>(() =>
      buildInitialPlans(initialConfig)
  );

  const [headcounts, setHeadcounts] = useState<HeadcountState>(() =>
      buildInitialHeadcount(initialConfig)
  );

  const [open, setOpen] = useState<OpenState>(() =>
      buildInitialOpen(initialConfig)
  );

  const [displayTotal, setDisplayTotal] = useState(0);
  const [activeCategoryId, setActiveCategoryId] = useState(
      initialConfig[0].categoryId
  );

  useEffect(() => {
    const loadServices = async () => {
      try {
        const api = new ApiSubscribe();
        const json = await api.getSubscribeServices();

        if (!json.data || json.data.length === 0) {
          return;
        }

        const nextConfig = sortServiceConfig(json.data);

        setserviceConfig(nextConfig);
        setSelected(buildInitialSelected(nextConfig));
        setPlans(buildInitialPlans(nextConfig));
        setHeadcounts(buildInitialHeadcount(nextConfig));
        setOpen(buildInitialOpen(nextConfig));
        setActiveCategoryId(nextConfig[0].categoryId);
      } catch (error) {
        console.error("서비스 견적 API 호출 실패", error);
      }
    };

    loadServices();
  }, []);

  const activeCategory =
      serviceConfig.find((cat) => cat.categoryId === activeCategoryId) ??
      serviceConfig[0];

  const total = useMemo(() => {
    let sum = 0;

    serviceConfig.forEach((cat) => {
      cat.services.forEach((svc) => {
        if (selected[svc.serviceId] && !svc.quoteOnly) {
          const plan = svc.plans?.find(
              (p) => p.planId === plans[svc.serviceId]
          );

          const unitPrice = getServiceUnitPrice(svc, plan);
          const headcount = headcounts[svc.serviceId] || 0;
          const isQuoteOnlyService = svc.quoteOnly || plan?.quoteOnly;

          if (!isQuoteOnlyService) {
            sum += unitPrice * headcount;
          }

          const allowedSubs = plan?.allowedChildren || [];

          svc.subServices?.forEach((sub) => {
            if (
                allowedSubs.includes(sub.serviceId) &&
                selected[sub.serviceId] &&
                !sub.quoteOnly
            ) {
              sum += sub.price * (headcounts[sub.serviceId] || headcount);
            }
          });
        }
      });
    });

    return sum;
  }, [serviceConfig, selected, plans, headcounts]);

  useEffect(() => {
    let frame = 0;
    const start = displayTotal;
    const end = total;
    const duration = 400;
    const startAt = performance.now();

    const animate = (time: number) => {
      const progress = Math.min(1, (time - startAt) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);

      setDisplayTotal(Math.round(start + (end - start) * eased));

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frame);
  }, [total]);

  const selectedItems = useMemo(() => {
    const items: { name: string; price: number; quoteOnly?: boolean }[] = [];

    serviceConfig.forEach((cat) => {
      cat.services.forEach((svc) => {
        if (selected[svc.serviceId]) {
          const plan = svc.plans?.find(
              (p) => p.planId === plans[svc.serviceId]
          );

          const unitPrice = getServiceUnitPrice(svc, plan);
          const headcount = headcounts[svc.serviceId] || 0;

          items.push({
            name: plan
                ? `${svc.serviceName} (${plan.planName})`
                : svc.serviceName,
            price:
                svc.quoteOnly || plan?.quoteOnly ? 0 : unitPrice * headcount,
            quoteOnly: svc.quoteOnly || plan?.quoteOnly,
          });

          const allowedSubs = plan?.allowedChildren || [];

          svc.subServices?.forEach((sub) => {
            if (allowedSubs.includes(sub.serviceId) && selected[sub.serviceId]) {
              items.push({
                name: `└ ${sub.serviceName}`,
                price: sub.quoteOnly
                    ? 0
                    : sub.price * (headcounts[sub.serviceId] || headcount),
                quoteOnly: sub.quoteOnly,
              });
            }
          });
        }
      });
    });

    return items;
  }, [serviceConfig, selected, plans, headcounts]);

  const hasQuoteOnly = selectedItems.some((item) => item.quoteOnly);

  const toggleSelected = (id: string, checked: boolean) => {
    setSelected((prev) => ({ ...prev, [id]: checked }));
  };

  const changePlan = (serviceId: string, planId: string) => {
    setPlans((prev) => ({ ...prev, [serviceId]: planId }));

    const service = serviceConfig
        .flatMap((category) => category.services)
        .find((svc) => svc.serviceId === serviceId);

    if (!service?.subServices) return;

    const nextPlan = service.plans?.find((plan) => plan.planId === planId);
    const allowedSubs = nextPlan?.allowedChildren || [];

    setSelected((prev) => {
      const updated = { ...prev };

      service.subServices?.forEach((sub) => {
        if (!allowedSubs.includes(sub.serviceId)) {
          updated[sub.serviceId] = false;
        }
      });

      return updated;
    });
  };

  const changeHeadcount = (id: string, value: number) => {
    const safeValue = Math.max(0, Math.floor(value || 0));
    setHeadcounts((prev) => ({ ...prev, [id]: safeValue }));
  };

  const toggleOpen = (id: string) => {
    setOpen((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleEstimateRequest = () => {
    const params = new URLSearchParams();

    params.set("total", total.toString());
    params.set("hasQuoteOnly", hasQuoteOnly.toString());

    router.push(`/subscribe/step2?${params.toString()}`);
  };

  return (
      <div className="flex min-h-screen flex-col bg-slate-50">
        <Header />

        <main className="flex-1">
          {/* Hero Section */}
          <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700/50 py-16 overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-20 left-20 w-96 h-96 bg-primary rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
              <div className="absolute top-40 right-20 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
              <div className="absolute -bottom-20 left-1/2 w-96 h-96 bg-primary/50 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
            </div>

            {/* Grid Pattern */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                backgroundSize: '50px 50px'
              }}
            />

            <div className="container max-w-7xl mx-auto px-4 relative">
              <div className="text-center max-w-3xl mx-auto">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <Zap className="h-8 w-8 text-cyan-400"/>
                  <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 px-4 py-1.5">
                    Service Pricing Simulator
                  </Badge>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  에버 HR
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-primary bg-clip-text text-transparent">
                    {" "}통합 서비스
                  </span>
                </h1>
                <p className="text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto mb-8">
                  서비스, 플랜, 하위 서비스, 인원을 선택하면 총 견적이 실시간으로 반영됩니다.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <div className="flex items-center gap-2 text-slate-400">
                    <CheckCircle className="h-5 w-5 text-cyan-400" />
                    <span className="text-sm">실시간 견적 계산</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <CheckCircle className="h-5 w-5 text-cyan-400" />
                    <span className="text-sm">맞춤형 서비스 구성</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <CheckCircle className="h-5 w-5 text-cyan-400" />
                    <span className="text-sm">즉시 구독 가능</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto max-w-[1280px] px-4 py-8 md:px-8 md:py-12">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
              <div className="space-y-5">
                {/* Category Tabs */}
                <div className="flex flex-wrap gap-2 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
                  {serviceConfig.map((category) => (
                      <button
                          key={category.categoryId}
                          type="button"
                          onClick={() => setActiveCategoryId(category.categoryId)}
                          className={`cursor-pointer rounded-xl px-5 py-2.5 text-sm font-semibold transition-all ${
                              activeCategoryId === category.categoryId
                                  ? "text-white shadow-md"
                                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                          }`}
                          style={activeCategoryId === category.categoryId ? {
                            background: "linear-gradient(135deg, rgb(75, 107, 245) 0%, rgb(0, 204, 153) 100%)"
                          } : {}}
                      >
                        {category.categoryName}
                      </button>
                  ))}
                </div>

                {/* Category Header */}
                <div>
                  <div className="mb-4 flex items-center gap-3">
                    <div className="h-10 w-1.5 rounded-full" style={{background: "linear-gradient(135deg, rgb(75, 107, 245) 0%, rgb(0, 204, 153) 100%)"}} />
                    <h2 className="text-2xl font-bold text-slate-900">
                      {activeCategory.categoryName}
                    </h2>
                    <Badge className="ml-2 bg-slate-100 text-slate-700 border-slate-200">
                      {activeCategory.services.length}개 서비스
                    </Badge>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                        key={activeCategory.categoryId}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.18 }}
                        className="space-y-4"
                    >
                      {activeCategory.services.map((service) => (
                          <ServiceRow
                              key={service.serviceId}
                              service={service}
                              selected={selected}
                              plans={plans}
                              headcounts={headcounts}
                              open={open}
                              onToggleSelected={toggleSelected}
                              onChangePlan={changePlan}
                              onChangeHeadcount={changeHeadcount}
                              onToggleOpen={toggleOpen}
                          />
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Summary Card */}
              <div className="lg:sticky lg:top-28 lg:self-start">
                <Card className="overflow-hidden border-0 shadow-xl">
                  <CardHeader className="text-white py-6" style={{background: "linear-gradient(135deg, rgb(75, 107, 245) 0%, rgb(0, 204, 153) 100%)"}}>
                    <CardTitle className="flex items-center justify-between text-xl">
                      <span className="flex items-center gap-2">
                        <Calculator className="h-5 w-5" />
                        총 견적
                      </span>
                      <Badge className="bg-white/20 text-white hover:bg-white/20 border-white/30">
                        실시간
                      </Badge>
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-5 p-6 bg-white">
                    <div className="rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50 to-white p-6 text-center">
                      <div className="mb-2 text-sm font-medium text-slate-500">
                        예상 월 과금
                      </div>

                      <RollingPrice value={displayTotal} />

                      <div className="mt-3 text-xs text-slate-400">
                        모든 금액은 매월 인당 기준 x 선택 인원으로 계산됩니다.
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="rounded-xl bg-slate-50 border border-slate-100 p-4">
                        <div className="text-slate-500">선택 서비스</div>
                        <div className="mt-1 text-2xl font-bold text-slate-900">
                          {selectedItems.length}
                        </div>
                      </div>

                      <div className="rounded-xl bg-slate-50 border border-slate-100 p-4">
                        <div className="text-slate-500">견적요청 항목</div>
                        <div className="mt-1 text-2xl font-bold text-slate-900">
                          {selectedItems.filter((item) => item.quoteOnly).length}
                        </div>
                      </div>
                    </div>

                    {hasQuoteOnly && (
                        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
                          견적요청 항목이 포함되어 있습니다. 담당자가 별도로
                          연락드립니다.
                        </div>
                    )}

                    <Separator className="bg-slate-200" />

                    <div>
                      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
                        <Calculator className="h-4 w-4 text-primary" />
                        선택 상세
                      </div>

                      <ScrollArea className="h-[280px] pr-3">
                        <div className="space-y-2">
                          {selectedItems.length === 0 ? (
                              <div className="rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-400">
                                선택된 서비스가 없습니다.
                              </div>
                          ) : (
                              selectedItems.map((item, idx) => (
                                  <div
                                      key={idx}
                                      className={`flex items-center justify-between rounded-xl border p-3 ${
                                          item.name.startsWith("└")
                                              ? "ml-4 border-slate-200 bg-slate-50"
                                              : "border-primary/30 bg-primary/5"
                                      }`}
                                  >
                              <span className="text-sm font-medium text-slate-700">
                                {item.name}
                              </span>
                                    <span className="text-sm font-semibold text-slate-900">
                                {item.quoteOnly
                                    ? "견적요청"
                                    : currency(item.price)}
                              </span>
                                  </div>
                              ))
                          )}
                        </div>
                      </ScrollArea>
                    </div>

                    <Separator className="bg-slate-200" />

                    <div className="space-y-3">
                      <Button
                          className="w-full h-12 text-base font-semibold text-white border-0"
                          style={{background: "linear-gradient(135deg, rgb(75, 107, 245) 0%, rgb(0, 204, 153) 100%)"}}
                          disabled={selectedItems.length === 0 || hasQuoteOnly}
                          onClick={() =>
                              router.push(`/subscribe/checkout?total=${total}`)
                          }
                      >
                        구독하기
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>

                      {hasQuoteOnly && (
                          <p className="text-center text-xs text-slate-400">
                            견적요청 항목이 포함되어 구독하기를 바로 진행할 수
                            없습니다.
                          </p>
                      )}

                      <Button
                          variant="outline"
                          className="w-full h-12 text-base font-semibold border-2 border-slate-200 hover:bg-slate-50"
                          onClick={handleEstimateRequest}
                          disabled={selectedItems.length === 0}
                      >
                        견적 요청하기
                      </Button>

                      <Button
                          variant="ghost"
                          className="w-full text-slate-600 hover:text-slate-900"
                          onClick={() => router.push("/support/contact")}
                      >
                        <Building2 className="mr-2 h-4 w-4" />
                        도입 상담 요청
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
  );
}

export default function SubscribePage() {
  return (
      <Suspense
          fallback={
            <div className="flex min-h-screen items-center justify-center">
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <div className="h-8 w-8 animate-spin rounded-full border-3 border-primary border-t-transparent" />
                </div>
                <p className="text-muted-foreground">로딩 중...</p>
              </div>
            </div>
          }
      >
        <SubscribeContent />
      </Suspense>
  );
}
