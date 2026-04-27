"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { CreditCard, Calendar, Receipt, ArrowLeft, Building2, Users, TrendingUp, Download, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Api } from "@/api";
import { checkApiResult } from "@/utils/apiUtil";
import { useLoginStatus, useUserSubscriptions, useUserCards } from "@/redux/selectors/Users";
import { usePlans } from "@/redux/selectors/Plans";
import { UserActions } from "@/redux/actions/Users";
import { PaymentLogDto, PaymentLogStatusType } from "@/types/Payments";
import { SubscriptionDto, SubscriptionChartDataDto, SubscriptionLogDto } from "@/types/Subscriptions";
import { PlanDetailDto } from "@/types/Plans";
import DateUtil from "@/utils/dateUtil";

const DEFAULT_PAY_DAY = 5;

function InvoiceContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("id");
  const dispatch = useDispatch();
  const isLoggedIn = useLoginStatus();
  const subscriptions = useUserSubscriptions();
  const plans = usePlans();
  const cards = useUserCards();

  const [isLoading, setIsLoading] = useState(true);
  const [paymentLog, setPaymentLog] = useState<PaymentLogDto | null>(null);
  const [subscription, setSubscription] = useState<SubscriptionDto | undefined>(undefined);
  const [plan, setPlan] = useState<PlanDetailDto | undefined>(undefined);
  const [chartData, setChartData] = useState<SubscriptionChartDataDto | null>(null);
  const [subscriptionLogs, setSubscriptionLogs] = useState<SubscriptionLogDto[]>([]);

  const card = cards?.find((c) => c.cardId === subscription?.cardId);
  const amount = paymentLog?.amount || 0;
  const vat = paymentLog?.vat || 0;
  const amountWithVat = Math.round(amount + vat);

  const loadPaymentDetail = async () => {
    if (!paymentId) return;
    // In a real app, you'd fetch the payment detail by ID
    // For now, we'll get all payments and find the matching one
    const result = await Api.Payments.getPagedPaymentList({ pageNumber: 0, pageSize: 100 });
    if (!checkApiResult(result)) return;
    const found = result!.payload.list?.find((p: PaymentLogDto) => p.id?.toString() === paymentId);
    if (found) setPaymentLog(found);
  };

  const loadChartData = async () => {
    if (!subscription?.id) return;
    const result = await Api.Subscriptions.getRecentChartData(subscription.id);
    if (!checkApiResult(result)) return;
    setChartData(result!.payload);
  };

  const loadUserChangeLogs = async () => {
    if (!subscription?.id || !paymentLog?.year || !paymentLog?.month) return;
    const result = await Api.Subscriptions.getUserChangeLogsForDate(subscription.id, paymentLog.year, paymentLog.month);
    if (!checkApiResult(result)) return;
    setSubscriptionLogs(result!.payload || []);
  };

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/login");
      return;
    }
    loadPaymentDetail();
  }, [isLoggedIn, paymentId]);

  useEffect(() => {
    if (paymentLog && subscriptions) {
      const sub = subscriptions.find((s) => s.id === paymentLog.subscriptionId);
      setSubscription(sub);
    }
  }, [paymentLog, subscriptions]);

  useEffect(() => {
    if (subscription && plans) {
      const p = plans.find((pl) => pl.id === subscription.planId);
      setPlan(p);
      loadChartData();
      loadUserChangeLogs();
      setIsLoading(false);
    }
  }, [subscription, plans]);

  const getStatusInfo = () => {
    if (!paymentLog) return { text: "", variant: "" };
    const payMonth = paymentLog.month || new Date().getMonth() + 1;

    if (paymentLog.status === PaymentLogStatusType.Error) {
      return {
        text: `${payMonth}월 5일 납부오류`,
        variant: "destructive",
        message: `${paymentLog.year}년 ${paymentLog.month}월 요금이 결제 오류가 발생했습니다.`,
      };
    } else if (paymentLog.status === PaymentLogStatusType.NotPaid) {
      return {
        text: `${payMonth}월 5일 결제 예정`,
        variant: "secondary",
        message: `${paymentLog.year}년 ${paymentLog.month}월 요금이 곧 결제될 예정입니다.`,
      };
    } else {
      const payDate = paymentLog.payDate ? new Date(paymentLog.payDate) : new Date();
      return {
        text: `${payDate.getMonth() + 1}월 ${payDate.getDate()}일 납부완료`,
        variant: "default",
        message: `${paymentLog.year}년 ${paymentLog.month}월 요금이 정상적으로 결제되었습니다.`,
      };
    }
  };

  if (!isLoggedIn) return null;

  if (isLoading || !paymentLog) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
          <p className="text-muted-foreground">로딩 중...</p>
        </div>
      </div>
    );
  }

  let startDate = paymentLog.useStartDate || new Date(paymentLog.year!, paymentLog.month! - 1, 1);
  if (!paymentLog.useStartDate && subscription?.subscribeDate && startDate < subscription.subscribeDate) {
    startDate = subscription.subscribeDate;
  }
  const endDate = paymentLog.useEndDate || DateUtil.getLastDateOfMonth(startDate);
  const statusInfo = getStatusInfo();

  return (
    <div className="px-4 py-8 md:px-8 md:py-12 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="icon" onClick={() => router.push("/mypage/payment")}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">청구 내역 상세</h1>
          <p className="text-muted-foreground">
            {paymentLog.year}년 {paymentLog.month}월 청구 내역
          </p>
        </div>
      </div>

      {/* 요금 안내 배너 */}
      <Card className="mb-6 border-primary/20 bg-primary/5">
        <CardContent className="py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                {paymentLog.month}월 요금은 {DateUtil.formattedDate(startDate, true)}부터{" "}
                {DateUtil.formattedDate(endDate, true)}까지 사용하신 내역입니다.
              </p>
              <p className="text-lg font-medium">
                {paymentLog.year}년 {paymentLog.month}월 요금{" "}
                <span className="text-xl font-bold text-primary">₩{amountWithVat.toLocaleString()}</span>
                {card && <span className="text-muted-foreground ml-2">({card.companyName})</span>}
                <Badge variant={statusInfo.variant as any} className="ml-3">
                  {statusInfo.text}
                </Badge>
              </p>
            </div>
            {paymentLog.status !== PaymentLogStatusType.Paid && (
              <Button onClick={() => router.push("/mypage/account?tab=1")}>결제카드 변경</Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 청구 내역 상세 */}
      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Receipt className="w-5 h-5 text-primary" />
            청구 내역 상세
          </CardTitle>
          <Button variant="outline" size="sm" onClick={() => router.push("/mypage/payment")}>
            목록으로 가기
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {/* 기업 정보 */}
            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Building2 className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">기업 정보</span>
              </div>
              <p className="font-semibold">{subscription?.corporationName}</p>
              <p className="text-sm text-muted-foreground">
                {DateUtil.formattedDate(startDate)} ~ {DateUtil.formattedDate(endDate)}
              </p>
              <Badge className="mt-2 bg-primary text-primary-foreground">{paymentLog.planName}</Badge>
            </div>

            {/* 사용자 정보 */}
            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">사용자 정보</span>
              </div>
              <p className="font-semibold">{paymentLog.userCount?.toLocaleString()}명</p>
              <p className="text-sm text-muted-foreground">현재 사용자 계정 수</p>
            </div>

            {/* 결제 정보 */}
            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CreditCard className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">결제 정보</span>
              </div>
              <p className="font-semibold">{card?.companyName || "등록 없음"}</p>
              <p className="text-sm text-muted-foreground">
                {paymentLog.payDate ? DateUtil.formattedDate(paymentLog.payDate) : "결제 예정"}
              </p>
            </div>
          </div>

          {/* 요금 상세 */}
          <div className="border rounded-lg overflow-hidden">
            <div className="p-4 space-y-3">
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-muted-foreground">기본가격 (사용자당/월)</span>
                <span>₩{plan?.price?.toLocaleString() || 0}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-muted-foreground">현재 사용자 계정 수</span>
                <span>{paymentLog.userCount?.toLocaleString()}명</span>
              </div>
              {subscriptionLogs.length > 0 && (
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-muted-foreground">사용자 계정 수 변동</span>
                  <Button variant="outline" size="sm">
                    상세보기
                  </Button>
                </div>
              )}
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-muted-foreground">VAT (부가세)</span>
                <span>₩{vat.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center py-3 bg-primary/5 rounded-lg px-4 -mx-4">
                <span className="font-semibold">청구 금액</span>
                <span className="text-xl font-bold text-primary">₩{amountWithVat.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 서비스 이용 현황 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            서비스 이용 현황
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {/* 요금 현황 차트 */}
            <div className="p-4 border rounded-lg">
              <h4 className="text-sm font-medium text-center mb-4">최근 4개월 요금 현황</h4>
              {chartData?.amounts && chartData.amounts.length > 0 ? (
                <div className="h-48 flex items-end justify-around gap-2">
                  {chartData.amounts.map((item: any, index: number) => (
                    <div key={index} className="flex flex-col items-center gap-2">
                      <div
                        className="w-12 bg-primary rounded-t"
                        style={{
                          height: `${Math.max((item.value / Math.max(...chartData.amounts.map((a: any) => a.value))) * 150, 20)}px`,
                        }}
                      />
                      <span className="text-xs text-muted-foreground">{item.month}월</span>
                      <span className="text-xs font-medium">₩{(item.value / 1000).toFixed(0)}K</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-48 flex items-center justify-center text-muted-foreground">
                  <p>데이터가 없습니다</p>
                </div>
              )}
            </div>

            {/* 사용자 수 추이 차트 */}
            <div className="p-4 border rounded-lg">
              <h4 className="text-sm font-medium text-center mb-4">최근 4개월 사용자 계정 수 추이</h4>
              {chartData?.userCounts && chartData.userCounts.length > 0 ? (
                <div className="h-48 flex items-end justify-around gap-2">
                  {chartData.userCounts.map((item: any, index: number) => (
                    <div key={index} className="flex flex-col items-center gap-2">
                      <div
                        className="w-12 bg-primary rounded-t"
                        style={{
                          height: `${Math.max((item.value / Math.max(...chartData.userCounts.map((a: any) => a.value))) * 150, 20)}px`,
                        }}
                      />
                      <span className="text-xs text-muted-foreground">{item.month}월</span>
                      <span className="text-xs font-medium">{item.value}명</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-48 flex items-center justify-center text-muted-foreground">
                  <p>데이터가 없습니다</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function PaymentInvoicePage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
          <p className="text-muted-foreground">로딩 중...</p>
        </div>
      </div>
    }>
      <InvoiceContent />
    </Suspense>
  );
}
