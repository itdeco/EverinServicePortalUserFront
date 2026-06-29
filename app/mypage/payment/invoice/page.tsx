"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Receipt,
  ArrowLeft,
  Building2,
  Users,
  TrendingUp,
  Printer,
  CheckCircle,
  Clock,
  XCircle,
  CalendarDays,
  CreditCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Api } from "@/api";
import { checkApiResult } from "@/utils/apiUtil";
import { useLoginStatus, useUserSubscriptions, useUserCards } from "@/redux/selectors/Users";
import { usePlans } from "@/redux/selectors/Plans";
import { PaymentLogDto, PaymentLogStatusType } from "@/types/Payments";
import { SubscriptionDto, SubscriptionChartDataDto } from "@/types/Subscriptions";
import { PlanDetailDto } from "@/types/subscribe";
import DateUtil from "@/utils/dateUtil";

type ServiceLine = {
  name: string;
  userCount: number;
  unitPrice: number;
  amount: number;
};

type InvoiceModel = {
  invoiceNo: string;
  companyName: string;
  bizNo?: string;
  periodStart: Date;
  periodEnd: Date;
  status: PaymentLogStatusType;
  payDate?: Date | null;
  payMethod?: string;
  year: number;
  month: number;
  serviceLines: ServiceLine[];
  memberChangeAmt: number;
  vat: number;
  total: number;
  amounts: { month: number; value: number }[];
  userCounts: { month: number; value: number }[];
};

const won = (value?: number | null) => `₩${Number(value || 0).toLocaleString()}`;

const STATUS_INFO: Record<
  number,
  { text: string; icon: React.ReactNode; className: string }
> = {
  [PaymentLogStatusType.NotPaid]: {
    text: "결제 예정",
    icon: <Clock className="h-4 w-4" />,
    className: "bg-amber-500/10 text-amber-600",
  },
  [PaymentLogStatusType.Paid]: {
    text: "납부완료",
    icon: <CheckCircle className="h-4 w-4" />,
    className: "bg-primary/10 text-primary",
  },
  [PaymentLogStatusType.ManualPaid]: {
    text: "수동납부완료",
    icon: <CheckCircle className="h-4 w-4" />,
    className: "bg-primary/10 text-primary",
  },
  [PaymentLogStatusType.Error]: {
    text: "납부오류",
    icon: <XCircle className="h-4 w-4" />,
    className: "bg-destructive/10 text-destructive",
  },
};

// 백엔드 미구현 시 데모 인보이스 (청구 목록의 PaymentLogId 와 매칭)
const DEMO_INVOICES: Record<string, InvoiceModel> = {
  "9001": {
    invoiceNo: "BILL-202606-001",
    companyName: "참존(주)",
    bizNo: "212-12-12222",
    periodStart: new Date(2026, 5, 1),
    periodEnd: new Date(2026, 5, 30),
    status: PaymentLogStatusType.Paid,
    payDate: new Date(2026, 5, 5),
    payMethod: "신한카드 1234",
    year: 2026,
    month: 6,
    serviceLines: [
      { name: "에버웰커밍", userCount: 30, unitPrice: 2000, amount: 60000 },
      { name: "에버타임", userCount: 30, unitPrice: 1000, amount: 30000 },
    ],
    memberChangeAmt: 0,
    vat: 9000,
    total: 99000,
    amounts: [
      { month: 3, value: 66000 },
      { month: 4, value: 90000 },
      { month: 5, value: 90000 },
      { month: 6, value: 99000 },
    ],
    userCounts: [
      { month: 3, value: 10 },
      { month: 4, value: 20 },
      { month: 5, value: 30 },
      { month: 6, value: 45 },
    ],
  },
  "9002": {
    invoiceNo: "BILL-202607-001",
    companyName: "참존(주)",
    bizNo: "212-12-12222",
    periodStart: new Date(2026, 6, 1),
    periodEnd: new Date(2026, 6, 31),
    status: PaymentLogStatusType.NotPaid,
    payDate: null,
    payMethod: "신한카드 1234",
    year: 2026,
    month: 7,
    serviceLines: [
      { name: "에버웰커밍", userCount: 30, unitPrice: 2000, amount: 60000 },
      { name: "에버타임", userCount: 30, unitPrice: 1000, amount: 30000 },
    ],
    memberChangeAmt: 0,
    vat: 9000,
    total: 99000,
    amounts: [
      { month: 4, value: 90000 },
      { month: 5, value: 90000 },
      { month: 6, value: 99000 },
      { month: 7, value: 99000 },
    ],
    userCounts: [
      { month: 4, value: 20 },
      { month: 5, value: 30 },
      { month: 6, value: 45 },
      { month: 7, value: 45 },
    ],
  },
  "9003": {
    invoiceNo: "BILL-202606-002",
    companyName: "에버인테스트 법인",
    bizNo: "212-12-33333",
    periodStart: new Date(2026, 5, 1),
    periodEnd: new Date(2026, 5, 30),
    status: PaymentLogStatusType.Error,
    payDate: null,
    payMethod: "국민카드 5678",
    year: 2026,
    month: 6,
    serviceLines: [{ name: "급여관리", userCount: 25, unitPrice: 4500, amount: 112500 }],
    memberChangeAmt: 0,
    vat: 11250,
    total: 123750,
    amounts: [
      { month: 3, value: 90000 },
      { month: 4, value: 99000 },
      { month: 5, value: 112500 },
      { month: 6, value: 123750 },
    ],
    userCounts: [
      { month: 3, value: 15 },
      { month: 4, value: 18 },
      { month: 5, value: 22 },
      { month: 6, value: 25 },
    ],
  },
};

function buildModelFromApi(
  paymentLog: PaymentLogDto,
  subscription?: SubscriptionDto,
  plan?: PlanDetailDto,
  chartData?: SubscriptionChartDataDto | null,
  payMethod?: string,
): InvoiceModel {
  let periodStart =
    paymentLog.useStartDate || new Date(paymentLog.year!, (paymentLog.month || 1) - 1, 1);
  if (!paymentLog.useStartDate && subscription?.subscribeDate && periodStart < subscription.subscribeDate) {
    periodStart = subscription.subscribeDate;
  }
  const periodEnd = paymentLog.useEndDate || DateUtil.getLastDateOfMonth(periodStart);

  // 서비스별 라인: subscription.items 우선, 없으면 플랜/요금 단일 라인
  const items = subscription?.items ?? [];
  const userCount = paymentLog.userCount || subscription?.userCount || 0;
  let serviceLines: ServiceLine[] = items
    .filter((item) => !item.quoteOnly)
    .map((item) => {
      const unitPrice = item.unitPrice ?? item.price ?? 0;
      const count = item.userCount ?? userCount;
      return {
        name: item.serviceName || item.productName || item.planProductName || "서비스",
        userCount: count,
        unitPrice,
        amount: item.amount ?? unitPrice * count,
      };
    });

  if (serviceLines.length === 0) {
    const unitPrice = plan?.price ?? subscription?.price ?? 0;
    serviceLines = [
      {
        name: paymentLog.planName || plan?.name || subscription?.planName || "서비스",
        userCount,
        unitPrice,
        amount: paymentLog.amount ?? unitPrice * userCount,
      },
    ];
  }

  const vat = paymentLog.vat ?? subscription?.payment?.vat ?? 0;
  const total = Math.round((paymentLog.amount || 0) + vat);

  return {
    invoiceNo: paymentLog.id ? `INV-${paymentLog.id}` : "INV-DEMO",
    companyName: subscription?.corporationName || "-",
    bizNo: undefined,
    periodStart,
    periodEnd,
    status: paymentLog.status ?? PaymentLogStatusType.NotPaid,
    payDate: paymentLog.payDate,
    payMethod,
    year: paymentLog.year || periodStart.getFullYear(),
    month: paymentLog.month || periodStart.getMonth() + 1,
    serviceLines,
    memberChangeAmt: subscription?.payment?.memberChangeAmt ?? 0,
    vat,
    total: total || serviceLines.reduce((sum, l) => sum + l.amount, 0) + vat,
    amounts: (chartData?.amounts ?? []).map((a) => ({ month: a.month || 0, value: a.value || 0 })),
    userCounts: (chartData?.userCounts ?? []).map((a) => ({ month: a.month || 0, value: a.value || 0 })),
  };
}

function BarChart({
  title,
  data,
  format,
}: {
  title: string;
  data: { month: number; value: number }[];
  format: (value: number) => string;
}) {
  const max = data.length ? Math.max(...data.map((d) => d.value)) : 1;

  return (
    <div className="rounded-xl border border-border/70 bg-card p-5">
      <h4 className="mb-5 text-center text-sm font-semibold text-foreground">{title}</h4>
      {data.length > 0 ? (
        <div className="flex h-44 items-end justify-around gap-3">
          {data.map((item, index) => (
            <div key={index} className="flex flex-1 flex-col items-center gap-2">
              <span className="text-xs font-semibold text-foreground tabular-nums">{format(item.value)}</span>
              <div
                className="w-full max-w-[44px] rounded-t-md bg-primary/85 transition-all"
                style={{ height: `${Math.max((item.value / max) * 120, 8)}px` }}
              />
              <span className="text-xs text-muted-foreground">{item.month}월</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex h-44 items-center justify-center text-sm text-muted-foreground">
          데이터가 없습니다
        </div>
      )}
    </div>
  );
}

function InvoiceContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("id");
  const totCompanySeq = Number(searchParams.get("totCompanySeq"));
  const isLoggedIn = useLoginStatus();
  const subscriptions = useUserSubscriptions();
  const plans = usePlans();
  const cards = useUserCards();

  const [isLoading, setIsLoading] = useState(true);
  const [model, setModel] = useState<InvoiceModel | null>(null);

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/login");
      return;
    }

    let cancelled = false;

    const load = async () => {
      setIsLoading(true);

      try {
        const result = await Api.Payments.getPagedPaymentList({
          pageNumber: 0,
          pageSize: 100,
          totCompanySeq: Number.isInteger(totCompanySeq) && totCompanySeq > 0
            ? totCompanySeq
            : undefined,
        });
        const found =
          checkApiResult(result) &&
          result!.payload?.list?.find((p: PaymentLogDto) => p.id?.toString() === paymentId);

        if (found) {
          const subscription = subscriptions?.find((s) => s.id === found.subscriptionId);
          const plan = plans?.find((pl) => pl.id === subscription?.planId);
          const card = cards?.find((c) => c.cardId === subscription?.cardId);

          let chartData: SubscriptionChartDataDto | null = null;
          if (subscription?.id) {
            const chartResult = await Api.Subscriptions.getRecentChartData(subscription.id);
            if (checkApiResult(chartResult)) chartData = chartResult!.payload;
          }

          if (!cancelled) {
            setModel(buildModelFromApi(found, subscription, plan, chartData, card?.companyName));
          }
        } else if (!cancelled) {
          // 데모 폴백
          setModel(DEMO_INVOICES[paymentId || "9001"] || DEMO_INVOICES["9001"]);
        }
      } catch {
        if (!cancelled) setModel(DEMO_INVOICES[paymentId || "9001"] || DEMO_INVOICES["9001"]);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, paymentId, totCompanySeq]);

  const subtotal = useMemo(
    () => (model ? model.serviceLines.reduce((sum, line) => sum + line.amount, 0) : 0),
    [model],
  );

  if (!isLoggedIn) return null;

  if (isLoading || !model) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <div className="h-8 w-8 animate-spin rounded-full border-3 border-primary border-t-transparent" />
          </div>
          <p className="text-muted-foreground">청구 내역을 불러오는 중입니다.</p>
        </div>
      </div>
    );
  }

  const status = STATUS_INFO[model.status] || STATUS_INFO[PaymentLogStatusType.NotPaid];
  const payDayText =
    model.status === PaymentLogStatusType.Paid && model.payDate
      ? `${new Date(model.payDate).getMonth() + 1}월 ${new Date(model.payDate).getDate()}일 납부완료`
      : model.status === PaymentLogStatusType.Error
        ? "납부오류"
        : `${model.month}월 5일 결제 예정`;

  return (
    <>
      {/* 인쇄용 스타일: 인보이스 영역만 출력 */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #invoice-printable,
          #invoice-printable * {
            visibility: visible;
          }
          #invoice-printable {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 24px;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      <div className="mx-auto max-w-5xl px-4 py-8 md:px-8 md:py-12">
        {/* 헤더 (인쇄 제외) */}
        <div className="no-print mb-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push(
                Number.isInteger(totCompanySeq) && totCompanySeq > 0
                  ? `/mypage/payment?totCompanySeq=${totCompanySeq}`
                  : "/mypage/payment",
              )}
              aria-label="목록으로"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-[28px]">청구 내역 상세</h1>
              <p className="text-sm text-muted-foreground">
                {model.year}년 {model.month}월 청구 내역
              </p>
            </div>
          </div>
          <Button onClick={() => window.print()} className="gap-2">
            <Printer className="h-4 w-4" />
            출력
          </Button>
        </div>

        <div id="invoice-printable" className="flex flex-col gap-6">
          {/* 인쇄 전용 제목 */}
          <div className="hidden print:block">
            <h1 className="text-2xl font-bold text-foreground">청구서 (Invoice)</h1>
            <p className="text-sm text-muted-foreground">
              {model.year}년 {model.month}월 · 청구번호 {model.invoiceNo}
            </p>
          </div>

          {/* 납부 안내 배너 */}
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="flex flex-col gap-3 py-5 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="mb-1 text-sm text-muted-foreground">
                  {model.month}월 요금은 {DateUtil.formattedDate(model.periodStart, true)}부터{" "}
                  {DateUtil.formattedDate(model.periodEnd, true)}까지 사용하신 내역입니다.
                </p>
                <p className="text-lg font-semibold text-foreground">
                  {model.year}년 {model.month}월 요금{" "}
                  <span className="text-xl font-bold text-primary">{won(model.total)}</span>
                </p>
              </div>
              <div
                className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold ${status.className}`}
              >
                {status.icon}
                {payDayText}
              </div>
            </CardContent>
          </Card>

          {/* 기본 정보 카드 3개 */}
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-border/70 bg-card p-4">
              <div className="mb-2 flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Building2 className="h-4 w-4 text-primary" />
                기업 정보
              </div>
              <p className="font-semibold text-foreground">{model.companyName}</p>
              {model.bizNo && <p className="text-sm text-muted-foreground tabular-nums">{model.bizNo}</p>}
            </div>
            <div className="rounded-xl border border-border/70 bg-card p-4">
              <div className="mb-2 flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <CalendarDays className="h-4 w-4 text-primary" />
                이용 기간
              </div>
              <p className="font-semibold text-foreground tabular-nums">
                {DateUtil.formattedDate(model.periodStart)} ~ {DateUtil.formattedDate(model.periodEnd)}
              </p>
            </div>
            <div className="rounded-xl border border-border/70 bg-card p-4">
              <div className="mb-2 flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <CreditCard className="h-4 w-4 text-primary" />
                결제 정보
              </div>
              <p className="font-semibold text-foreground">{model.payMethod || "등록 없음"}</p>
              <p className="text-sm text-muted-foreground tabular-nums">
                {model.payDate ? DateUtil.formattedDate(model.payDate) : "결제 예정"}
              </p>
            </div>
          </div>

          {/* 청구 내역 상세 - 서비스별 금액 */}
          <Card className="overflow-hidden gap-0 border-border/70 py-0">
            <div className="border-b bg-muted/40 px-5 py-3">
              <h3 className="flex items-center gap-2 text-base font-bold text-foreground">
                <Receipt className="h-4 w-4 text-primary" />
                청구 내역 상세
              </h3>
            </div>
            <CardContent className="p-0">
              {/* 서비스별 라인 헤더 */}
              <div className="grid grid-cols-12 gap-2 border-b bg-muted/20 px-5 py-2.5 text-xs font-semibold text-muted-foreground">
                <div className="col-span-5">서비스명</div>
                <div className="col-span-2 text-right">단가(인/월)</div>
                <div className="col-span-2 text-center">사용인원</div>
                <div className="col-span-3 text-right">금액</div>
              </div>

              {/* 서비스별 금액 */}
              {model.serviceLines.map((line, index) => (
                <div
                  key={index}
                  className="grid grid-cols-12 items-center gap-2 border-b px-5 py-3 text-sm"
                >
                  <div className="col-span-5 font-medium text-foreground">{line.name}</div>
                  <div className="col-span-2 text-right tabular-nums text-muted-foreground">{won(line.unitPrice)}</div>
                  <div className="col-span-2 text-center tabular-nums text-muted-foreground">
                    {line.userCount.toLocaleString()}명
                  </div>
                  <div className="col-span-3 text-right font-semibold tabular-nums text-foreground">
                    {won(line.amount)}
                  </div>
                </div>
              ))}

              {/* 합계 영역 */}
              <div className="flex flex-col gap-2 px-5 py-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">서비스 요금 합계</span>
                  <span className="tabular-nums text-foreground">{won(subtotal)}</span>
                </div>
                {model.memberChangeAmt !== 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">멤버 변동(추가/삭제) 금액</span>
                    <span className="tabular-nums text-foreground">{won(model.memberChangeAmt)}</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">VAT (부가세)</span>
                  <span className="tabular-nums text-foreground">{won(model.vat)}</span>
                </div>
              </div>

              {/* 총 요금 */}
              <div className="flex items-center justify-between border-t bg-primary/5 px-5 py-4">
                <span className="text-base font-bold text-foreground">총 요금</span>
                <span className="text-2xl font-bold text-primary tabular-nums">{won(model.total)}</span>
              </div>
            </CardContent>
          </Card>

          {/* 서비스 이용 현황 */}
          <Card className="border-border/70">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="h-5 w-5 text-primary" />
                서비스 이용 현황
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-5 md:grid-cols-2">
                <BarChart
                  title="최근 4개월 요금 현황"
                  data={model.amounts}
                  format={(v) => `₩${(v / 1000).toFixed(0)}K`}
                />
                <BarChart
                  title="최근 4개월 사용인원 추이"
                  data={model.userCounts}
                  format={(v) => `${v}명`}
                />
              </div>
            </CardContent>
          </Card>

          {/* 인쇄 전용 안내 */}
          <p className="hidden text-center text-xs text-muted-foreground print:block">
            본 청구서는 에버人(EverIn) 서비스 이용에 따라 발행되었습니다.
          </p>
        </div>
      </div>
    </>
  );
}

export default function PaymentInvoicePage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <div className="h-8 w-8 animate-spin rounded-full border-3 border-primary border-t-transparent" />
            </div>
            <p className="text-muted-foreground">로딩 중...</p>
          </div>
        </div>
      }
    >
      <InvoiceContent />
    </Suspense>
  );
}
