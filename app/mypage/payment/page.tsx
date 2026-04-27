"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { CreditCard, Calendar, Receipt, ChevronRight, Download, AlertCircle, CheckCircle, Clock, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Api } from "@/api";
import { checkApiResult } from "@/utils/apiUtil";
import { useLoginStatus, useUserSubscriptions, useUserCards } from "@/redux/selectors/Users";
import { UserActions } from "@/redux/actions/Users";
import { PagedPaymentLogDto, PaymentLogDto, PaymentLogStatusType } from "@/types/Payments";
import { SubscriptionDto, SubscriptionType } from "@/types/Subscriptions";
import DateUtil from "@/utils/dateUtil";

const StatusTitle: Record<number, { text: string; icon: React.ReactNode; variant: string }> = {
  [PaymentLogStatusType.NotPaid]: { text: "미납", icon: <Clock className="w-4 h-4" />, variant: "bg-yellow-100 text-yellow-800" },
  [PaymentLogStatusType.Paid]: { text: "결제완료", icon: <CheckCircle className="w-4 h-4" />, variant: "bg-green-100 text-green-800" },
  [PaymentLogStatusType.ManualPaid]: { text: "수동결제", icon: <CheckCircle className="w-4 h-4" />, variant: "bg-blue-100 text-blue-800" },
  [PaymentLogStatusType.Refund]: { text: "환불", icon: <Receipt className="w-4 h-4" />, variant: "bg-gray-100 text-gray-800" },
  [PaymentLogStatusType.Error]: { text: "실패", icon: <XCircle className="w-4 h-4" />, variant: "bg-red-100 text-red-800" },
  [PaymentLogStatusType.Pause]: { text: "중지", icon: <AlertCircle className="w-4 h-4" />, variant: "bg-red-100 text-red-800" },
};

const PAGINATION_PAGE_SIZE = 10;

export default function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const subscriptionId = searchParams.get("id");
  const dispatch = useDispatch();
  const isLoggedIn = useLoginStatus();
  const subscriptions = useUserSubscriptions();
  const cards = useUserCards();
  
  const [isLoading, setIsLoading] = useState(true);
  const [subscriptionMap, setSubscriptionMap] = useState<Map<number, SubscriptionDto>>(new Map());
  const [paymentData, setPaymentData] = useState<PagedPaymentLogDto>({
    list: [],
    currentPage: 1,
    totalCount: 0,
    totalPage: 0
  });

  const loadPaymentLogs = async (page: number) => {
    const params = {
      pageNumber: Math.max(page, 0),
      pageSize: PAGINATION_PAGE_SIZE,
    };
    const result = await Api.Payments.getPagedPaymentList(params);
    if (!checkApiResult(result)) return;
    setPaymentData(result!.payload);
  };

  const loadMyCards = async () => {
    const result = await Api.Users.getMyCreditCards();
    if (!checkApiResult(result)) return;
    dispatch(UserActions.setCards(result!.payload));
  };

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/login");
      return;
    }

    const loadData = async () => {
      setIsLoading(true);
      try {
        await Promise.all([loadPaymentLogs(0), loadMyCards()]);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [isLoggedIn]);

  useEffect(() => {
    if (subscriptions) {
      const map = new Map<number, SubscriptionDto>();
      subscriptions.forEach((s) => {
        if (s.id) map.set(s.id, s);
      });
      setSubscriptionMap(map);
    }
  }, [subscriptions]);

  const onViewInvoiceClick = (paymentLog: PaymentLogDto) => {
    router.push(`/mypage/payment/invoice?id=${paymentLog.id}`);
  };

  const onPageChange = (page: number) => {
    loadPaymentLogs(page);
  };

  const getStatusBadge = (status: PaymentLogStatusType) => {
    const statusInfo = StatusTitle[status] || StatusTitle[PaymentLogStatusType.NotPaid];
    return (
      <Badge className={`${statusInfo.variant} flex items-center gap-1`}>
        {statusInfo.icon}
        {statusInfo.text}
      </Badge>
    );
  };

  if (!isLoggedIn) return null;

  if (isLoading) {
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

  return (
    <div className="px-4 py-8 md:px-8 md:py-12 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">결제 내역</h1>
        <p className="text-muted-foreground">
          현재 이용하고 계시는 멤버십(구독) 서비스의 청구요금 및 납부내역입니다.
        </p>
      </div>

      {/* 월별 구독정보 */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-primary" />
            멤버십(구독)정보
          </CardTitle>
        </CardHeader>
        <CardContent>
          {subscriptions && subscriptions.filter((s) => SubscriptionType.Monthly === s.type).length > 0 ? (
            <div className="space-y-3">
              {subscriptions.filter((s) => SubscriptionType.Monthly === s.type).map((subscription, index) => {
                const card = cards?.find((c) => c.cardId === subscription.cardId);
                return (
                  <div
                    key={index}
                    className="flex flex-col md:flex-row md:items-center md:justify-between p-4 bg-muted/50 rounded-lg border"
                  >
                    <div className="flex items-center gap-4 mb-2 md:mb-0">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Receipt className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold">{subscription.planName}</p>
                        <p className="text-sm text-muted-foreground">{subscription.corporationName}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">결제 수단</p>
                        <p className="font-medium">{card?.companyName || "등록 없음"}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">사용자</p>
                        <p className="font-medium">{subscription.userCount}명</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <CreditCard className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>활성 구독이 없습니다.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 월별 결제 내역 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            월별 결제 내역
          </CardTitle>
        </CardHeader>
        <CardContent>
          {paymentData.list && paymentData.list.length > 0 ? (
            <>
              {/* Desktop Table */}
              <div className="hidden lg:block overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>청구월</TableHead>
                      <TableHead>플랜 (서비스기간)</TableHead>
                      <TableHead>적용사업장</TableHead>
                      <TableHead className="text-center">사용자 수</TableHead>
                      <TableHead>납부방법</TableHead>
                      <TableHead className="text-right">납부금액</TableHead>
                      <TableHead className="text-center">상태</TableHead>
                      <TableHead className="text-center">결제일</TableHead>
                      <TableHead className="text-center">상세</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paymentData.list.map((log, index) => {
                      const subscription = subscriptionMap.get(log.subscriptionId!);
                      const amount = log.amount || 0;
                      const vat = log.vat || 0;
                      const month = 10 > log.month! ? `0${log.month}` : log.month;

                      let startDate = log.useStartDate || new Date(log.year!, log.month! - 1, 1);
                      if (!log.useStartDate && subscription?.subscribeDate && startDate < subscription.subscribeDate) {
                        startDate = subscription.subscribeDate;
                      }
                      const endDate = log.useEndDate || DateUtil.getLastDateOfMonth(startDate);

                      return (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{`${log.year}-${month}`}</TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{log.planName}</p>
                              <p className="text-xs text-muted-foreground">
                                {DateUtil.formattedDate(startDate)} ~ {DateUtil.formattedDate(endDate)}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>{subscription?.corporationName || "-"}</TableCell>
                          <TableCell className="text-center">{log.userCount?.toLocaleString()}명</TableCell>
                          <TableCell>
                            {log.cardCompany}
                            <span className="text-muted-foreground ml-1">
                              ({log.cardNo?.substring(12, 16)})
                            </span>
                          </TableCell>
                          <TableCell className="text-right font-semibold">
                            ₩{(amount + vat).toLocaleString()}
                          </TableCell>
                          <TableCell className="text-center">{getStatusBadge(log.status!)}</TableCell>
                          <TableCell className="text-center">
                            {log.payDate ? DateUtil.formattedDate(log.payDate) : "-"}
                          </TableCell>
                          <TableCell className="text-center">
                            <Button variant="ghost" size="sm" onClick={() => onViewInvoiceClick(log)}>
                              <ChevronRight className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile Cards */}
              <div className="lg:hidden space-y-3">
                {paymentData.list.map((log, index) => {
                  const subscription = subscriptionMap.get(log.subscriptionId!);
                  const amount = log.amount || 0;
                  const vat = log.vat || 0;
                  const month = 10 > log.month! ? `0${log.month}` : log.month;

                  return (
                    <div
                      key={index}
                      className="p-4 border rounded-lg cursor-pointer hover:border-primary/50 transition-colors"
                      onClick={() => onViewInvoiceClick(log)}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="font-bold">{`${log.year}-${month}`}</p>
                          <p className="text-sm text-muted-foreground">{subscription?.corporationName}</p>
                        </div>
                        {getStatusBadge(log.status!)}
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-sm">{log.planName}</p>
                        <p className="font-bold">₩{(amount + vat).toLocaleString()}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Pagination */}
              {paymentData.totalPage > 1 && (
                <div className="flex justify-center gap-2 mt-6">
                  {Array.from({ length: paymentData.totalPage }, (_, i) => (
                    <Button
                      key={i}
                      variant={paymentData.currentPage === i + 1 ? "default" : "outline"}
                      size="sm"
                      onClick={() => onPageChange(i)}
                    >
                      {i + 1}
                    </Button>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <Receipt className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>결제내역이 없습니다.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
