"use client";

import { useEffect, useMemo, useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronRight,
  Sparkles,
  Calculator,
  Building2,
  ArrowRight,
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

type Plan = {
  id: string;
  label: string;
  price: number;
  allowedChildren?: string[];
  quoteOnly?: boolean;
};

type SubService = {
  id: string;
  name: string;
  description?: string;
  price: number;
  quoteOnly?: boolean;
};

type Service = {
  id: string;
  name: string;
  description?: string;
  price?: number;
  defaultHeadcount?: number;
  plans?: Plan[];
  subServices?: SubService[];
  quoteOnly?: boolean;
};

type Category = {
  id: string;
  name: string;
  services: Service[];
};

type SelectedState = Record<string, boolean>;
type PlanState = Record<string, string>;
type HeadcountState = Record<string, number>;
type OpenState = Record<string, boolean>;

const serviceConfig: Category[] = [
  {
    id: "smartcare",
    name: "스마트케어",
    services: [
      {
        id: "welcoming",
        name: "에버웰커밍",
        description: "신규 입사자 온보딩 자동화",
        price: 1500,
        defaultHeadcount: 30,
      },
      {
        id: "evertime",
        name: "에버타임",
        description: "근태관리 통합 솔루션",
        defaultHeadcount: 30,
        plans: [
          {
            id: "standard",
            label: "스탠다드",
            price: 2500,
            allowedChildren: ["pcoff"],
          },
          {
            id: "enterprise",
            label: "엔터프라이즈",
            price: 0,
            quoteOnly: true,
            allowedChildren: ["pcoff", "access", "setup"],
          },
        ],
        subServices: [
          {
            id: "pcoff",
            name: "PC-OFF",
            description: "퇴근 시 PC 자동 종료",
            price: 1000,
          },
          {
            id: "access",
            name: "출입시스템",
            description: "출입게이트/보안장비 연동",
            price: 1200,
          },
          {
            id: "setup",
            name: "근태셋업",
            description: "교대근무/탄력근무 초기 구축",
            price: 800,
          },
        ],
      },
      {
        id: "hr",
        name: "인사관리",
        description: "인사정보 통합 관리",
        price: 1800,
        defaultHeadcount: 30,
      },
      {
        id: "benefit",
        name: "복리후생",
        description: "복리후생 포인트 관리",
        price: 1200,
        defaultHeadcount: 30,
      },
    ],
  },
  {
    id: "payroll-category",
    name: "급여",
    services: [
      {
        id: "payroll",
        name: "에버페이롤",
        description: "급여 계산 및 지급 관리",
        defaultHeadcount: 30,
        plans: [
          {
            id: "self",
            label: "자체운영",
            price: 4500,
            allowedChildren: ["payroll-setup-self"],
          },
          {
            id: "outsourcing",
            label: "아웃소싱",
            price: 6000,
            allowedChildren: [
              "payroll-report",
              "payroll-yearend",
              "payroll-setup-out",
            ],
          },
          {
            id: "erp-outsourcing",
            label: "ERP아웃소싱",
            price: 6000,
            allowedChildren: [
              "payroll-report-erp",
              "payroll-yearend-erp",
              "payroll-setup-erp",
            ],
          },
        ],
        subServices: [
          {
            id: "payroll-setup-self",
            name: "급여셋업",
            description: "급여 규칙/수당/공제 설정",
            price: 1000,
          },
          {
            id: "payroll-report",
            name: "신고서비스",
            description: "급여 신고 대행",
            price: 0,
            quoteOnly: true,
          },
          {
            id: "payroll-yearend",
            name: "연말정산서비스",
            description: "연말정산 대행",
            price: 0,
            quoteOnly: true,
          },
          {
            id: "payroll-setup-out",
            name: "급여셋업",
            description: "아웃소싱 급여셋업",
            price: 0,
            quoteOnly: true,
          },
          {
            id: "payroll-report-erp",
            name: "신고서비스",
            description: "ERP 급여 신고",
            price: 0,
            quoteOnly: true,
          },
          {
            id: "payroll-yearend-erp",
            name: "연말정산서비스",
            description: "ERP 연말정산",
            price: 0,
            quoteOnly: true,
          },
          {
            id: "payroll-setup-erp",
            name: "급여셋업",
            description: "ERP 급여셋업",
            price: 0,
            quoteOnly: true,
          },
        ],
      },
    ],
  },
  {
    id: "evaluation-category",
    name: "평가",
    services: [
      {
        id: "evaluation",
        name: "에버평가",
        description: "성과 평가 및 목표 관리",
        price: 2200,
        defaultHeadcount: 30,
      },
    ],
  },
  {
    id: "addons",
    name: "부가서비스",
    services: [
      {
        id: "contract",
        name: "전자계약서",
        description: "전자서명 기반 계약 관리",
        price: 900,
        defaultHeadcount: 30,
      },
      {
        id: "custom",
        name: "추가개발",
        description: "고객사 맞춤 기능 개발",
        price: 0,
        quoteOnly: true,
      },
    ],
  },
];

const currency = (n: number) => `${Math.round(n).toLocaleString("ko-KR")}원`;
const perPerson = (n: number) => `${Math.round(n).toLocaleString("ko-KR")}원/인`;

const getServiceUnitPrice = (service: Service, plan?: Plan) => {
  if (service.quoteOnly) return 0;
  return plan?.price ?? service.price ?? 0;
};

function buildInitialSelected(): SelectedState {
  const acc: SelectedState = {};
  serviceConfig.forEach((cat) => {
    cat.services.forEach((svc) => {
      acc[svc.id] = false;
      svc.subServices?.forEach((sub) => {
        acc[sub.id] = false;
      });
    });
  });
  return acc;
}

function buildInitialPlans(): PlanState {
  const acc: PlanState = {};
  serviceConfig.forEach((cat) => {
    cat.services.forEach((svc) => {
      if (svc.plans?.length) acc[svc.id] = svc.plans[0].id;
    });
  });
  return acc;
}

function buildInitialHeadcount(): HeadcountState {
  const acc: HeadcountState = {};
  serviceConfig.forEach((cat) => {
    cat.services.forEach((svc) => {
      acc[svc.id] = svc.defaultHeadcount ?? 30;
      svc.subServices?.forEach((sub) => {
        acc[sub.id] = svc.defaultHeadcount ?? 30;
      });
    });
  });
  return acc;
}

function buildInitialOpen(): OpenState {
  const acc: OpenState = {};
  serviceConfig.forEach((cat) => {
    acc[cat.id] = true;
    cat.services.forEach((svc) => {
      acc[svc.id] = true;
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
            <span key={value} className="h-[1.05em] leading-[1.05em] text-center">
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
      <span className="inline-flex items-center gap-0.5 text-3xl font-bold tracking-tight text-foreground">
      {formatted.split("").map((digit, index) => (
          <RollingDigit key={`${digit}-${index}`} digit={digit} />
      ))}
        <span className="ml-1 text-lg font-semibold text-muted-foreground">원</span>
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
  const isSelected = selected[service.id];
  const currentPlanId = plans[service.id];
  const currentPlan = service.plans?.find((p) => p.id === currentPlanId);
  const allowedSubServices = currentPlan?.allowedChildren || [];
  const visibleSubServices =
      service.subServices?.filter((sub) => allowedSubServices.includes(sub.id)) || [];

  const hasSubServices = visibleSubServices.length > 0;
  const unitPrice = getServiceUnitPrice(service, currentPlan);
  const headcount = headcounts[service.id] || 0;

  const isQuoteOnlyPlan = !!currentPlan?.quoteOnly;
  const isQuoteOnlyService = !!service.quoteOnly || isQuoteOnlyPlan;

  let serviceTotal = 0;

  if (isSelected && !isQuoteOnlyService) {
    serviceTotal = unitPrice * headcount;

    visibleSubServices.forEach((sub) => {
      if (selected[sub.id] && !sub.quoteOnly) {
        serviceTotal += sub.price * (headcounts[sub.id] || headcount);
      }
    });
  }

  return (
      <motion.div
          layout
          className={`rounded-2xl border transition-all ${
              isSelected
                  ? "border-primary/30 bg-primary/5 shadow-sm"
                  : "border-border bg-card hover:border-primary/20"
          }`}
      >
        <div className="p-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="flex min-w-0 flex-1 gap-3">
              <div className="pt-0.5">
                <NativeCheckbox
                    checked={isSelected}
                    onChange={(checked) => onToggleSelected(service.id, checked)}
                    ariaLabel={`${service.name} 선택`}
                />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-bold text-lg">{service.name}</span>

                  {service.quoteOnly && (
                      <Badge variant="outline" className="text-muted-foreground">
                        별도견적
                      </Badge>
                  )}

                  {isSelected && !isQuoteOnlyService && (
                      <Badge className="bg-primary text-primary-foreground">선택됨</Badge>
                  )}
                </div>

                {service.description && (
                    <p className="mt-1 text-sm text-muted-foreground">
                      {service.description}
                    </p>
                )}

                {service.plans && service.plans.length > 0 && (
                    <div className="mt-4">
                      <Label className="text-xs text-muted-foreground mb-2 block">
                        플랜 선택
                      </Label>

                      <div className="flex flex-wrap gap-2">
                        {service.plans.map((plan) => {
                          const isCurrentPlan = currentPlanId === plan.id;

                          return (
                              <Label
                                  key={plan.id}
                                  htmlFor={`${service.id}-${plan.id}`}
                                  className={`flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm transition ${
                                      isCurrentPlan
                                          ? "border-primary bg-primary/10 text-primary"
                                          : "border-border bg-background text-foreground hover:border-primary/30"
                                  } ${!isSelected ? "cursor-not-allowed opacity-50" : ""}`}
                              >
                                <NativeRadio
                                    id={`${service.id}-${plan.id}`}
                                    name={`plan-${service.id}`}
                                    value={plan.id}
                                    checked={isCurrentPlan}
                                    disabled={!isSelected}
                                    onChange={(value) => onChangePlan(service.id, value)}
                                />
                                <span className="font-medium">{plan.label}</span>
                                <span className="text-muted-foreground">
                                  {plan.quoteOnly ? "별도견적" : perPerson(plan.price)}
                                </span>
                              </Label>
                          );
                        })}
                      </div>
                    </div>
                )}

                {!isQuoteOnlyService && (
                    <div className="mt-3 grid gap-3 md:grid-cols-2">
                      <div className="rounded-xl border border-border bg-background p-3">
                        <div className="text-xs font-medium text-muted-foreground">
                          요금 기준
                        </div>
                        <div className="mt-1 text-sm font-semibold">
                          {perPerson(unitPrice)}
                        </div>
                      </div>

                      <div className="rounded-xl border border-border bg-background p-3">
                        <div className="text-xs font-medium text-muted-foreground">
                          인원
                        </div>
                        <Input
                            type="number"
                            min={0}
                            value={headcount}
                            disabled={!isSelected}
                            onChange={(e) =>
                                onChangeHeadcount(service.id, Number(e.target.value || 0))
                            }
                            className="mt-1 h-9"
                        />
                      </div>
                    </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 md:pl-4">
              <div className="text-right">
                <div className="text-xl font-bold">
                  {isQuoteOnlyService ? (
                      <span className="text-primary font-bold">견적요청</span>
                  ) : (
                      currency(serviceTotal)
                  )}
                </div>

                {isSelected && hasSubServices && !isQuoteOnlyService && (
                    <div className="text-xs text-muted-foreground mt-1">
                      하위 서비스 포함
                    </div>
                )}
              </div>

              {hasSubServices && (
                  <button
                      type="button"
                      onClick={() => onToggleOpen(service.id)}
                      className="rounded-full p-2 hover:bg-muted transition"
                      aria-label="하위 서비스 열기"
                  >
                    {open[service.id] ? (
                        <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    ) : (
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    )}
                  </button>
              )}
            </div>
          </div>
        </div>

        {hasSubServices && (
            <AnimatePresence initial={false}>
              {open[service.id] && (
                  <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                  >
                    <div className="border-t border-border bg-muted/30 p-4 space-y-3">
                      <div className="text-xs font-medium text-muted-foreground mb-2">
                        선택 가능한 하위 서비스
                      </div>

                      {visibleSubServices.map((sub) => {
                        const isSubSelected = selected[sub.id];
                        const subHeadcount = headcounts[sub.id] || headcount;
                        const subTotal = sub.quoteOnly ? 0 : sub.price * subHeadcount;

                        return (
                            <div
                                key={sub.id}
                                className={`rounded-xl border p-3 transition ${
                                    isSubSelected
                                        ? "border-primary/30 bg-primary/5"
                                        : "border-border bg-background"
                                }`}
                            >
                              <div className="flex items-start justify-between gap-3">
                                <div className="flex gap-3">
                                  <NativeCheckbox
                                      checked={isSubSelected}
                                      onChange={(checked) =>
                                          onToggleSelected(sub.id, checked)
                                      }
                                      ariaLabel={`${sub.name} 선택`}
                                      disabled={!isSelected}
                                  />

                                  <div>
                                    <div className="flex items-center gap-2">
                                      <span className="font-medium">{sub.name}</span>

                                      {sub.quoteOnly && (
                                          <Badge variant="outline" className="text-xs">
                                            견적요청
                                          </Badge>
                                      )}

                                      {isSubSelected && !sub.quoteOnly && (
                                          <Badge className="bg-primary/80 text-primary-foreground text-xs">
                                            선택됨
                                          </Badge>
                                      )}
                                    </div>

                                    {sub.description && (
                                        <p className="text-xs text-muted-foreground mt-0.5">
                                          {sub.description}
                                        </p>
                                    )}

                                    {!sub.quoteOnly && (
                                        <div className="text-xs text-muted-foreground mt-1">
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
                                                    sub.id,
                                                    Number(e.target.value || 0)
                                                )
                                            }
                                            className="h-8 w-20 text-sm"
                                        />
                                        <span className="text-sm font-medium min-w-[80px] text-right">
                                {currency(subTotal)}
                              </span>
                                      </div>
                                  ) : (
                                      <span className="text-sm text-muted-foreground">
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

  const [selected, setSelected] = useState<SelectedState>(buildInitialSelected);
  const [plans, setPlans] = useState<PlanState>(buildInitialPlans);
  const [headcounts, setHeadcounts] =
      useState<HeadcountState>(buildInitialHeadcount);
  const [open, setOpen] = useState<OpenState>(buildInitialOpen);
  const [displayTotal, setDisplayTotal] = useState(0);
  const [activeCategoryId, setActiveCategoryId] = useState(serviceConfig[0].id);

  const activeCategory =
      serviceConfig.find((cat) => cat.id === activeCategoryId) ?? serviceConfig[0];

  const total = useMemo(() => {
    let sum = 0;

    serviceConfig.forEach((cat) => {
      cat.services.forEach((svc) => {
        if (selected[svc.id] && !svc.quoteOnly) {
          const plan = svc.plans?.find((p) => p.id === plans[svc.id]);
          const unitPrice = getServiceUnitPrice(svc, plan);
          const headcount = headcounts[svc.id] || 0;

          sum += unitPrice * headcount;

          const allowedSubs = plan?.allowedChildren || [];

          svc.subServices?.forEach((sub) => {
            if (
                allowedSubs.includes(sub.id) &&
                selected[sub.id] &&
                !sub.quoteOnly
            ) {
              sum += sub.price * (headcounts[sub.id] || headcount);
            }
          });
        }
      });
    });

    return sum;
  }, [selected, plans, headcounts]);

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
      if (progress < 1) frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [total]);

  const selectedItems = useMemo(() => {
    const items: { name: string; price: number; quoteOnly?: boolean }[] = [];

    serviceConfig.forEach((cat) => {
      cat.services.forEach((svc) => {
        if (selected[svc.id]) {
          const plan = svc.plans?.find((p) => p.id === plans[svc.id]);
          const unitPrice = getServiceUnitPrice(svc, plan);
          const headcount = headcounts[svc.id] || 0;

          items.push({
            name: plan ? `${svc.name} (${plan.label})` : svc.name,
            price: svc.quoteOnly || plan?.quoteOnly ? 0 : unitPrice * headcount,
            quoteOnly: svc.quoteOnly || plan?.quoteOnly,
          });

          const allowedSubs = plan?.allowedChildren || [];

          svc.subServices?.forEach((sub) => {
            if (allowedSubs.includes(sub.id) && selected[sub.id]) {
              items.push({
                name: `└ ${sub.name}`,
                price: sub.quoteOnly
                    ? 0
                    : sub.price * (headcounts[sub.id] || headcount),
                quoteOnly: sub.quoteOnly,
              });
            }
          });
        }
      });
    });

    return items;
  }, [selected, plans, headcounts]);

  const hasQuoteOnly = selectedItems.some((item) => item.quoteOnly);

  const toggleSelected = (id: string, checked: boolean) => {
    setSelected((prev) => ({ ...prev, [id]: checked }));
  };

  const changePlan = (serviceId: string, planId: string) => {
    setPlans((prev) => ({ ...prev, [serviceId]: planId }));

    const service = serviceConfig
        .flatMap((category) => category.services)
        .find((svc) => svc.id === serviceId);

    if (!service?.subServices) return;

    const nextPlan = service.plans?.find((plan) => plan.id === planId);
    const allowedSubs = nextPlan?.allowedChildren || [];

    setSelected((prev) => {
      const updated = { ...prev };

      service.subServices?.forEach((sub) => {
        if (!allowedSubs.includes(sub.id)) {
          updated[sub.id] = false;
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

  const handleSubmit = () => {
    const params = new URLSearchParams();
    params.set("total", total.toString());
    params.set("hasQuoteOnly", hasQuoteOnly.toString());
    router.push(`/subscribe/step2?${params.toString()}`);
  };

  return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />

        <main className="flex-1">
          <div className="px-4 py-6 md:px-8 md:py-8 max-w-[1280px] mx-auto">
            <div className="rounded-2xl border border-primary/20 bg-white p-5 mb-6 shadow-sm">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary mb-2">
                    <Sparkles className="w-4 h-4" />
                    서비스 견적 시뮬레이터
                  </div>

                  <h1 className="text-2xl md:text-3xl font-bold">
                    에버 HR 통합 견적
                  </h1>

                  <p className="text-muted-foreground mt-1">
                    서비스, 플랜, 하위 서비스, 인원을 선택하면 총 견적이 실시간으로 반영됩니다.
                  </p>
                </div>

                <div className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
                  실시간 금액 계산중
                </div>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
              <div className="space-y-5">
                <div className="flex flex-wrap gap-2 rounded-2xl border border-border bg-white p-2 shadow-sm">
                  {serviceConfig.map((category) => (
                      <button
                          key={category.id}
                          type="button"
                          onClick={() => setActiveCategoryId(category.id)}
                          className={`cursor-pointer rounded-xl px-4 py-2 text-sm font-semibold transition-all ${
                              activeCategoryId === category.id
                                  ? "bg-primary text-primary-foreground shadow-sm"
                                  : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
                          }`}
                      >
                        {category.name}
                      </button>
                  ))}
                </div>

                <div>
                  <div className="mb-4 flex items-center gap-2">
                    <div className="h-8 w-1 rounded-full bg-primary" />
                    <h2 className="text-xl font-bold">{activeCategory.name}</h2>
                    <Badge variant="secondary" className="ml-2">
                      {activeCategory.services.length}개 서비스
                    </Badge>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                        key={activeCategory.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.18 }}
                        className="space-y-3"
                    >
                      {activeCategory.services.map((service) => (
                          <ServiceRow
                              key={service.id}
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

              <div className="lg:sticky lg:top-28 lg:self-start">
                <Card className="overflow-hidden border-0 shadow-lg">
                  <CardHeader className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
                    <CardTitle className="flex items-center justify-between text-xl">
                      <span>총 견적</span>
                      <Badge className="bg-white/20 text-white hover:bg-white/20">
                        실시간
                      </Badge>
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="p-5 space-y-5">
                    <div className="rounded-2xl border border-border p-5 text-center bg-gradient-to-b from-background to-muted/30">
                      <div className="mb-2 text-sm font-medium text-muted-foreground">
                        예상 월 과금
                      </div>

                      <RollingPrice value={displayTotal} />

                      <div className="mt-2 text-xs text-muted-foreground">
                        모든 금액은 매월 인당 기준 × 선택 인원으로 계산됩니다.
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="rounded-xl bg-muted/50 p-4">
                        <div className="text-muted-foreground">선택 서비스</div>
                        <div className="mt-1 text-2xl font-bold">
                          {selectedItems.length}
                        </div>
                      </div>

                      <div className="rounded-xl bg-muted/50 p-4">
                        <div className="text-muted-foreground">견적요청 항목</div>
                        <div className="mt-1 text-2xl font-bold">
                          {selectedItems.filter((item) => item.quoteOnly).length}
                        </div>
                      </div>
                    </div>

                    {hasQuoteOnly && (
                        <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 text-sm text-foreground">
                          견적요청 항목이 포함되어 있습니다. 담당자가 별도로 연락드립니다.
                        </div>
                    )}

                    <Separator />

                    <div>
                      <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
                        <Calculator className="w-4 h-4 text-primary" />
                        선택 상세
                      </div>

                      <ScrollArea className="h-[280px] pr-3">
                        <div className="space-y-2">
                          {selectedItems.length === 0 ? (
                              <div className="rounded-xl border border-dashed p-6 text-center text-sm text-muted-foreground">
                                선택된 서비스가 없습니다.
                              </div>
                          ) : (
                              selectedItems.map((item, idx) => (
                                  <div
                                      key={idx}
                                      className={`flex items-center justify-between rounded-xl border p-3 ${
                                          item.name.startsWith("└")
                                              ? "border-border bg-muted/30 ml-4"
                                              : "border-primary/20 bg-primary/5"
                                      }`}
                                  >
                              <span className="text-sm font-medium">
                                {item.name}
                              </span>
                                    <span className="text-sm font-semibold">
                                {item.quoteOnly ? "견적요청" : currency(item.price)}
                              </span>
                                  </div>
                              ))
                          )}
                        </div>
                      </ScrollArea>
                    </div>

                    <Separator />

                    <div className="space-y-3">
                      <Button
                          className="w-full"
                          size="lg"
                          disabled={selectedItems.length === 0 || hasQuoteOnly}
                          onClick={() => router.push(`/subscribe/checkout?total=${total}`)}
                      >
                        구독하기
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>

                      {hasQuoteOnly && (
                          <p className="text-xs text-center text-muted-foreground">
                            견적요청 항목이 포함되어 구독하기를 바로 진행할 수 없습니다.
                          </p>
                      )}

                      <Button
                          variant="outline"
                          className="w-full"
                          size="lg"
                          onClick={handleSubmit}
                          disabled={selectedItems.length === 0}
                      >
                        견적 요청하기
                      </Button>

                      <Button
                          variant="ghost"
                          className="w-full"
                          onClick={() => router.push("/support/contact")}
                      >
                        <Building2 className="w-4 h-4 mr-2" />
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
            <div className="flex items-center justify-center min-h-screen">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
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