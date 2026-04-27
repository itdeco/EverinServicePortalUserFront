"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { AlertCircle, RefreshCw, Calendar, Users, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Api } from "@/api";
import { checkApiResult } from "@/utils/apiUtil";
import { useLoginStatus, useUserProfile, useUserSubscriptions, useUserSubscription } from "@/redux/selectors/Users";
import { UserActions } from "@/redux/actions/Users";
import { SubscriptionDto } from "@/types/Subscriptions";
import { alertMessage, confirmMessage } from "@/utils/messageBox";
import DateUtil from "@/utils/dateUtil";

export default function SubscriptionRecoverPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const subscriptionId = searchParams.get("id") ? parseInt(searchParams.get("id")!) : -1;
  
  const isLoggedIn = useLoginStatus();
  const profile = useUserProfile();
  const subscriptions = useUserSubscriptions();
  const subscription = useUserSubscription(subscriptionId);
  
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  // Redux 구독 정보 업데이트
  const updateSubscriptionRedux = (updatedSubscription: SubscriptionDto) => {
    const newSubscriptions = subscriptions?.map(s => 
      s.id === updatedSubscription.id ? updatedSubscription : s
    ) || [];
    dispatch(UserActions.setSubscriptions(newSubscriptions));
  };

  // 구독 목록 로드
  const loadMySubscriptions = async () => {
    const result = await Api.Subscriptions.getMySubscriptions();
    if (!checkApiResult(result)) return;
    dispatch(UserActions.setSubscriptions(result!.payload));
  };

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/login");
      return;
    }

    const loadData = async () => {
      setIsLoading(true);
      if (!subscriptions || subscriptions.length === 0) {
        await loadMySubscriptions();
      }
      setIsLoading(false);
    };

    loadData();
  }, [isLoggedIn]);

  useEffect(() => {
    if (!isLoading && (subscriptionId < 0 || !subscription)) {
      router.replace("/mypage/subscription");
    }
  }, [isLoading, subscriptionId, subscription]);

  // 구독 복구
  const handleRecover = async () => {
    const answer = await confirmMessage(`${subscription?.planName} 멤버십을 복구하시겠습니까?`);
    
    if (!answer.isConfirmed) return;

    setIsProcessing(true);
    try {
      const result = await Api.Subscriptions.recoverSubscription(subscription!.id!);
      if (!checkApiResult(result)) {
        setIsProcessing(false);
        return;
      }

      updateSubscriptionRedux(result?.payload);
      await alertMessage("멤버십이 복구되었습니다.");
      router.push("/mypage/subscription");
    } catch (error) {
      console.error("복구 실패:", error);
      await alertMessage("복구 중 오류가 발생했습니다.");
    } finally {
      setIsProcessing(false);
    }
  };

  // 구독 재시작 (만료된 경우)
  const handleResume = async () => {
    const answer = await confirmMessage(`${subscription?.planName} 멤버십을 다시 시작하시겠습니까?`);
    
    if (!answer.isConfirmed) return;

    setIsProcessing(true);
    try {
      const result = await Api.Subscriptions.resumeSubscribing(subscription!.id!);
      if (!checkApiResult(result)) {
        setIsProcessing(false);
        return;
      }

      updateSubscriptionRedux(result?.payload);
      await alertMessage("멤버십이 다시 시작되었습니다.");
      router.push("/mypage/subscription");
    } catch (error) {
      console.error("재시작 실패:", error);
      await alertMessage("재시작 중 오류가 발생했습니다.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleInquiry = () => {
    router.push("/support/inquiry");
  };

  if (!isLoggedIn) {
    return null;
  }

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

  if (!subscription) {
    return null;
  }

  const isExpireRequested = !!subscription.expireRequestDate;
  const isExpired = !!subscription.expireDate && new Date(subscription.expireDate) < new Date();

  return (
    <div className="px-4 py-8 md:px-8 md:py-12 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">멤버십 복구</h1>
        <p className="text-muted-foreground">
          {isExpireRequested 
            ? "구독해지를 취소하시려면 아래의 내용을 확인해주시기 바랍니다."
            : "구독을 복구하시려면 아래의 내용을 확인해주시기 바랍니다."}
        </p>
      </div>

      {/* 안내 메시지 */}
      <Card className={`mb-6 ${isExpired ? "border-red-200 bg-red-50" : "border-yellow-200 bg-yellow-50"}`}>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row md:items-start gap-4">
            <AlertCircle className={`w-6 h-6 flex-shrink-0 mt-1 ${isExpired ? "text-red-600" : "text-yellow-600"}`} />
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-2">{profile?.name}님</h3>
              {isExpired ? (
                <p className="text-muted-foreground">
                  구독이 만료되었습니다. 서비스 이용을 다시 시작하려면 복구해주세요.
                </p>
              ) : isExpireRequested ? (
                <p className="text-muted-foreground">
                  [{DateUtil.formattedDate(subscription.expireDate, true)}] 구독이 취소될 예정입니다. 해지를 취소하시겠습니까?
                </p>
              ) : (
                <p className="text-muted-foreground">
                  구독을 복구하시면 모든 기능을 다시 이용하실 수 있습니다.
                </p>
              )}
            </div>
            <Button variant="outline" size="sm" onClick={handleInquiry} className="flex-shrink-0">
              1:1문의하기
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 구독 정보 */}
      <Card className="mb-6 border-2">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-xl font-bold">{subscription.planName}</h3>
                {isExpired ? (
                  <Badge className="bg-red-100 text-red-800">만료됨</Badge>
                ) : isExpireRequested ? (
                  <Badge className="bg-yellow-100 text-yellow-800">해지 예정</Badge>
                ) : (
                  <Badge className="bg-gray-100 text-gray-800">비활성</Badge>
                )}
              </div>
              <p className="text-muted-foreground">{subscription.corporationName}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">
                {subscription.payment?.totAmount 
                  ? `₩${subscription.payment.totAmount.toLocaleString()}`
                  : "무료"}
              </div>
              <p className="text-sm text-muted-foreground">월</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <Calendar className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">
                  {isExpired ? "만료일" : isExpireRequested ? "해지 예정일" : "구독 시작일"}
                </p>
                <p className="font-semibold">
                  {isExpired || isExpireRequested 
                    ? DateUtil.formattedDate(subscription.expireDate, true)
                    : DateUtil.formattedDate(subscription.subscribeDate, true)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <Users className="w-5 h-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">사용자 수</p>
                <p className="font-semibold">{subscription.userCount || 0}명</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 복구 혜택 */}
      <Card className="mb-6 bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <h4 className="font-semibold mb-4">복구 시 이용 가능한 기능</h4>
          <ul className="space-y-2">
            {[
              "모든 이전 데이터 복원",
              "무제한 사용자 관리",
              "모든 프리미엄 기능 이용",
              "우선 고객 지원",
            ].map((feature, index) => (
              <li key={index} className="flex items-center gap-3 text-sm">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="w-3 h-3 text-green-600" />
                </span>
                <span className="text-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* 안내사항 */}
      <Card className="mb-6 bg-muted/30">
        <CardContent className="pt-6">
          <h4 className="font-semibold mb-3">안내사항</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              복구 시 이전에 등록된 결제 수단으로 청구됩니다.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              구독이 만료되었을 때 작성한 데이터는 보존되어 있습니다.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              복구 후 즉시 모든 기능을 이용하실 수 있습니다.
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* 버튼 */}
      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={() => router.push("/mypage/subscription")}>
          취소
        </Button>
        {isExpireRequested ? (
          <Button 
            onClick={handleRecover}
            disabled={isProcessing}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isProcessing ? "animate-spin" : ""}`} />
            {isProcessing ? "처리 중..." : "멤버십 해지 취소"}
          </Button>
        ) : (
          <Button 
            onClick={handleResume}
            disabled={isProcessing}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isProcessing ? "animate-spin" : ""}`} />
            {isProcessing ? "처리 중..." : "멤버십 복구하기"}
          </Button>
        )}
      </div>
    </div>
  );
}
