"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, CreditCard, AlertCircle, HelpCircle, ArrowRight, RefreshCw, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLoginStatus, useUserProfile, useUserPaymentStatuses } from "@/redux/selectors/Users";
import { PaymentLogStatusType } from "@/types/Payments";
import DateUtil from "@/utils/dateUtil";

export default function PaymentErrorPage() {
  const router = useRouter();
  const profile = useUserProfile();
  const isLoggedIn = useLoginStatus();
  const paymentStatuses = useUserPaymentStatuses();
  
  const [prevMonthDate] = useState<Date>(DateUtil.getPrevMonthDate());
  const [message, setMessage] = useState("");
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/login");
      return;
    }

    if (paymentStatuses && paymentStatuses.length > 0) {
      const paymentStatus = paymentStatuses[paymentStatuses.length - 1];
      if (paymentStatus.status === PaymentLogStatusType.Error) {
        const lockDays = profile?.preference?.paymentErrorLockDays || 5;
        const passedDays = DateUtil.calcIntervalDays(paymentStatus.errorDate, new Date());
        setMessage(paymentStatus.errorMessage || "결제 처리 중 오류가 발생했습니다.");

        if (passedDays > lockDays) {
          setIsPaused(true);
        }
      }
    }
  }, [isLoggedIn, paymentStatuses, profile]);

  const onMoveToUpdatePayment = () => {
    router.replace("/mypage/account?tab=1");
  };

  if (!isLoggedIn) return null;

  return (
    <div className="px-4 py-8 md:px-8 md:py-12 max-w-4xl mx-auto">
      {/* Status Banner */}
      <div className={`mb-8 p-6 rounded-2xl text-center ${isPaused ? "bg-red-600" : "bg-primary"} text-white`}>
        <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
          {isPaused ? (
            <XCircle className="w-8 h-8" />
          ) : (
            <AlertTriangle className="w-8 h-8" />
          )}
        </div>
        <h1 className="text-3xl font-bold mb-2">
          {isPaused ? "멤버십 일시중지" : "결제문제 확인"}
        </h1>
        <p className="text-white/90 max-w-lg mx-auto">
          고객님의 {prevMonthDate.getFullYear()}년 {prevMonthDate.getMonth() + 1}월에 대한 결제 문제가 발생
          {isPaused 
            ? "되었으며, 멤버십이 일시 중지되었습니다." 
            : "되었습니다."}
        </p>
      </div>

      {/* Error Message */}
      {message && !isPaused && (
        <Card className="mb-8 border-primary/30">
          <CardContent className="py-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                <AlertCircle className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">결제 오류 메시지</h3>
                <p className="text-muted-foreground">{message}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Help Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-primary" />
            다음의 문제가 아닌지 확인하시기 바랍니다
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Issue 1 */}
          <div className="p-4 bg-muted/50 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                <CreditCard className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold mb-2">결제 수단이 만료되었거나 유효하지 않은 상태</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <span className="text-primary font-medium">My Page &gt; 계정정보 &gt; 계약정보</span>의 
                  <span className="text-primary font-medium"> [결제수단]</span>을 업데이트해주십시오.
                </p>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                  에버타임에서는 고객사의 서비스 이용을 돕기 위해 결제 주기 동안 실패한 결제를 자동으로 재시도합니다.
                </p>
              </div>
            </div>
          </div>

          {/* Issue 2 */}
          <div className="p-4 bg-muted/50 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                <AlertCircle className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold mb-2">해당 금융기관(결제수단)에서 월별 청구를 승인하지 않은 상태</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  결제 수단을 업데이트 한 후에도 문제가 지속된다면 현재 이용 중인 금융기관에 문의하시기 바랍니다.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button 
          size="lg" 
          onClick={onMoveToUpdatePayment}
          className="gap-2"
        >
          <CreditCard className="w-5 h-5" />
          결제수단 업데이트
          <ArrowRight className="w-4 h-4" />
        </Button>
        
        <Button 
          variant="outline" 
          size="lg" 
          onClick={() => window.location.reload()}
          className="gap-2"
        >
          <RefreshCw className="w-5 h-5" />
          새로고침
        </Button>
      </div>

      {/* Additional Help */}
      <div className="mt-12 text-center">
        <p className="text-sm text-muted-foreground mb-2">문제가 계속되시나요?</p>
        <Button variant="link" onClick={() => router.push("/support/contact")}>
          고객센터 문의하기
        </Button>
      </div>
    </div>
  );
}
