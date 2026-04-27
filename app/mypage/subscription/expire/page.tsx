"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { AlertTriangle, Calendar, Users } from "lucide-react";
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

export default function SubscriptionExpirePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const subscriptionId = searchParams.get("id") ? parseInt(searchParams.get("id")!) : -1;
  
  const isLoggedIn = useLoginStatus();
  const profile = useUserProfile();
  const subscriptions = useUserSubscriptions();
  const subscription = useUserSubscription(subscriptionId);
  
  const [isLoading, setIsLoading] = useState(true);
  const [expireDate, setExpireDate] = useState<Date | null>(null);

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

  // 해지 취소
  const handleCancelUnsubscribing = async () => {
    const answer = await confirmMessage(`${subscription?.planName} 멤버십 해지 요청을 취소하시겠습니까?`);
    
    if (answer.isConfirmed) {
      const result = await Api.Subscriptions.recoverSubscription(subscription!.id!);
      if (!checkApiResult(result)) return;

      updateSubscriptionRedux(result?.payload);
      await alertMessage("멤버십(구독) 해지가 취소되었습니다.");
      router.push("/mypage/subscription");
    }
  };

  // 해지 요청
  const handleUnsubscribe = async () => {
    if (!expireDate) {
      await alertMessage("해지 날짜를 선택해주세요.");
      return;
    }

    const answer = await confirmMessage(
      `${subscription?.planName} 멤버십을 ${DateUtil.formattedDate(expireDate, true)}에 해지하시겠습니까?`
    );
    
    if (answer.isConfirmed) {
      const result = await Api.Subscriptions.setSubscriptionExpireDate(subscription!.id!, expireDate);
      if (!checkApiResult(result)) return;

      updateSubscriptionRedux(result?.payload);
      await alertMessage("멤버십 해지가 예약되었습니다.");
      router.push("/mypage/subscription");
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

  return (
    <div className="px-4 py-8 md:px-8 md:py-12 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          {isExpireRequested ? "멤버십 해지 예정" : "멤버십 해지"}
        </h1>
        <p className="text-muted-foreground">
          {isExpireRequested 
            ? "구독해지를 취소하시려면 아래의 내용을 확인해주시기 바랍니다."
            : "구독을 해지하시려면 아래의 내용을 확인해주시기 바랍니다."}
        </p>
      </div>

      {/* 안내 메시지 */}
      <Card className="mb-6 border-yellow-200 bg-yellow-50">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row md:items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
            <div className="flex-1">
              {isExpireRequested ? (
                <>
                  <h3 className="font-semibold text-foreground mb-2">{profile?.name}님</h3>
                  <p className="text-muted-foreground">
                    [{DateUtil.formattedDate(subscription.expireDate, true)}] 구독이 취소되고 에버타임 DB가 완전히 삭제됩니다.
                  </p>
                </>
              ) : (
                <>
                  <h3 className="font-semibold text-foreground mb-2">{profile?.name}님 불편한 점이 있으셨나요?</h3>
                  <p className="text-muted-foreground">
                    아래의 서비스를 해지하시겠습니까? 지정한 서비스 해지 날짜 5일 이후 에버타임 DB가 완전히 삭제됩니다.
                  </p>
                </>
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
                {isExpireRequested && (
                  <Badge className="bg-yellow-100 text-yellow-800">해지 예정</Badge>
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
                <p className="text-xs text-muted-foreground">구독 시작일</p>
                <p className="font-semibold">{DateUtil.formattedDate(subscription.subscribeDate, true)}</p>
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

      {/* 해지 안내 */}
      <Card className="mb-6 bg-muted/30">
        <CardContent className="pt-6">
          <h4 className="font-semibold mb-3">서비스를 해지하려면 아래를 확인해주세요.</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              이 날짜 이전에 언제든지 구독을 재활성화 할 수 있습니다.
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              취소된 이후 더 이상 요금이 청구되지 않으며 멤버십 취소 후에는 에버타임에 있는 데이터가 파기되어 복구할 수 없습니다.
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* 해지 날짜 선택 (해지 요청 전인 경우에만) */}
      {!isExpireRequested && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">해지 날짜 선택</CardTitle>
          </CardHeader>
          <CardContent>
            <input
              type="date"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => setExpireDate(new Date(e.target.value))}
            />
          </CardContent>
        </Card>
      )}

      {/* 버튼 */}
      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={() => router.push("/mypage/subscription")}>
          취소
        </Button>
        {isExpireRequested ? (
          <Button onClick={handleCancelUnsubscribing}>
            멤버십 (구독) 해지 취소
          </Button>
        ) : (
          <Button 
            variant="destructive" 
            onClick={handleUnsubscribe}
            disabled={!expireDate}
          >
            멤버십 (구독) 해지
          </Button>
        )}
      </div>
    </div>
  );
}
