"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { CreditCard, Calendar, AlertCircle, CheckCircle, ChevronRight, Settings, Users, FileText, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Api } from "@/api";
import { checkApiResult } from "@/utils/apiUtil";
import { useLoginStatus, useUserProfile, useUserSubscriptions, useUserCards, useUserCorporations } from "@/redux/selectors/Users";
import { usePlans } from "@/redux/selectors/Plans";
import { UserActions } from "@/redux/actions/Users";
import { PlanActions } from "@/redux/actions/Plans";
import { SubscriptionDto, SubscriptionStatusType } from "@/types/Subscriptions";
import { UserCorporationCardDto } from "@/types/Users";
import { alertMessage, confirmMessage } from "@/utils/messageBox";
import DateUtil from "@/utils/dateUtil";

export default function SubscriptionPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const isLoggedIn = useLoginStatus();
  const profile = useUserProfile();
  const subscriptions = useUserSubscriptions();
  const corporations = useUserCorporations();
  const cards = useUserCards();
  const plans = usePlans();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // 구독 목록 로드
  const loadMySubscriptions = async () => {
    const result = await Api.Subscriptions.getMySubscriptions();
    if (!checkApiResult(result)) return;
    dispatch(UserActions.setSubscriptions(result!.payload));
  };

  // 회사 및 카드 정보 로드
  const loadUserCorporationAndCards = async () => {
    if (corporations && corporations.length > 0 && cards && cards.length > 0) return;
    
    const result = await Api.Users.getMyCorporationsAndCards();
    if (!checkApiResult(result)) return;
    
    const payload: UserCorporationCardDto = result!.payload;
    dispatch(UserActions.setCorporations(payload!.corporations! || []));
    dispatch(UserActions.setCards(payload!.creditCards! || []));
  };

  // 플랜 목록 로드
  const loadAllPlans = async () => {
    if (plans && plans.length > 0) return;
    
    const result = await Api.Plans.getAllPlans();
    if (!checkApiResult(result)) return;
    dispatch(PlanActions.setPlans(result!.payload));
  };

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/login");
      return;
    }

    const loadData = async () => {
      setIsLoading(true);
      try {
        await Promise.all([
          loadMySubscriptions(),
          loadUserCorporationAndCards(),
          loadAllPlans(),
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [isLoggedIn]);

  const getStatusBadge = (subscription: SubscriptionDto) => {
    if (subscription.expireRequestDate) {
      return <Badge className="bg-yellow-100 text-yellow-800">해지 예정</Badge>;
    }
    
    switch (subscription.status) {
      case SubscriptionStatusType.Available:
        return <Badge className="bg-green-100 text-green-800">활성</Badge>;
      case SubscriptionStatusType.PaymentError:
        return <Badge className="bg-red-100 text-red-800">결제 오류</Badge>;
      case SubscriptionStatusType.Pause:
        return <Badge className="bg-red-100 text-red-800">일시 중지</Badge>;
      case SubscriptionStatusType.Expire:
        return <Badge className="bg-gray-100 text-gray-800">만료됨</Badge>;
      default:
        return <Badge className="bg-green-100 text-green-800">활성</Badge>;
    }
  };

  const handleCancelQuitSubscribing = async (subscriptionId: number) => {
    const subscription = subscriptions?.find(s => s.id === subscriptionId);
    if (!subscription) return;

    const plan = plans?.find(p => p.id === subscription.planId);
    const answer = await confirmMessage(`${plan?.name || subscription.planName} 멤버십 해지 요청을 취소하시겠습니까?`);
    
    if (answer.isConfirmed) {
      const result = await Api.Subscriptions.recoverSubscription(subscriptionId);
      if (!checkApiResult(result)) return;

      const newSubscription: SubscriptionDto = result?.payload;
      const newSubscriptions = subscriptions?.map(s => 
        s.id === newSubscription.id ? newSubscription : s
      ) || [];
      
      dispatch(UserActions.setSubscriptions(newSubscriptions));
      await alertMessage("멤버십(구독) 해지가 취소되었습니다.");
    }
  };

  const handleSubscriptionExpire = (subscriptionId: number) => {
    router.push(`/mypage/subscription/expire?id=${subscriptionId}`);
  };

  const handlePaymentList = (subscriptionId: number) => {
    router.push(`/mypage/payment?id=${subscriptionId}`);
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

  return (
    <div className="px-4 py-8 md:px-8 md:py-12 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">멤버십(구독) 관리</h1>
        <p className="text-muted-foreground">
          서비스 요금은 사용자 계정 수를 기준으로 계산됩니다. 담당자는 필요에 따라 언제든지 사용자를 추가하거나 삭제할 수 있습니다.
        </p>
      </div>

      {/* 기본 정보 */}
      {profile && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg">기본정보</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                <span className="text-sm text-muted-foreground min-w-[60px]">이름</span>
                <span className="font-medium">{profile.name}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground min-w-[60px]">이메일</span>
                  <span className="font-medium">{profile.loginId}</span>
                </div>
                <Button 
                  variant="link" 
                  className="text-sm text-muted-foreground underline p-0 h-auto"
                  onClick={() => router.push("/mypage/account")}
                >
                  계정정보변경
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 구독 정보 */}
      {subscriptions && subscriptions.length > 0 ? (
        <>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">멤버십(구독)정보</h2>
            <Button 
              variant="outline"
              onClick={() => window.open("/quotation", "_blank")}
            >
              <FileText className="w-4 h-4 mr-2" />
              견적내기
            </Button>
          </div>

          <div className="space-y-4 mb-8">
            {subscriptions.map((subscription, index) => {
              const plan = plans?.find(p => p.id === subscription.planId);
              const card = cards?.find(c => c.cardId === subscription.cardId);
              
              return (
                <Card key={subscription.id || index} className="border-2">
                  <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold">{subscription.planName || plan?.name}</h3>
                          {getStatusBadge(subscription)}
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

                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                      <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                        <Users className="w-5 h-5 text-primary" />
                        <div>
                          <p className="text-xs text-muted-foreground">사용자 수</p>
                          <p className="font-semibold">{subscription.userCount || 0}명</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                        <Calendar className="w-5 h-5 text-primary" />
                        <div>
                          <p className="text-xs text-muted-foreground">
                            {subscription.expireRequestDate ? "해지 예정일" : "구독 시작일"}
                          </p>
                          <p className="font-semibold">
                            {subscription.expireRequestDate 
                              ? DateUtil.formattedDate(subscription.expireDate, true)
                              : DateUtil.formattedDate(subscription.subscribeDate, true)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                        <CreditCard className="w-5 h-5 text-primary" />
                        <div>
                          <p className="text-xs text-muted-foreground">결제 수단</p>
                          <p className="font-semibold">{card?.cardCompany || "등록된 카드 없음"}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-4 border-t">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handlePaymentList(subscription.id!)}
                      >
                        결제 내역
                      </Button>
                      {!subscription.expireRequestDate ? (
                        <>
                          {plan?.upgradePlanId && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => router.push(`/subscribe?subscriptionId=${subscription.id}&upgradePlanId=${plan.upgradePlanId}`)}
                            >
                              <Zap className="w-4 h-4 mr-1" />
                              플랜 업그레이드
                            </Button>
                          )}
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-destructive hover:bg-destructive/10"
                            onClick={() => handleSubscriptionExpire(subscription.id!)}
                          >
                            멤버십 해지
                          </Button>
                        </>
                      ) : (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleCancelQuitSubscribing(subscription.id!)}
                        >
                          해지 취소
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* 플랜 추가 유도 */}
          <Card className="mb-8 border-dashed border-2">
            <CardContent className="py-6 flex items-center justify-between">
              <span className="text-lg font-semibold text-primary">다른 사업장도 사용 하시겠습니까?</span>
              <Button onClick={() => router.push("/subscribe")}>
                <ChevronRight className="w-4 h-4 mr-1" />
                플랜 추가
              </Button>
            </CardContent>
          </Card>
        </>
      ) : (
        <Card className="mb-8 border-2">
          <CardContent className="py-12 text-center">
            <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold mb-2">현재 활성 구독이 없습니다</h3>
            <p className="text-muted-foreground mb-6">에버타임 서비스를 구독하고 다양한 기능을 이용해보세요.</p>
            <Button onClick={() => router.push("/subscribe")}>구독하기</Button>
          </CardContent>
        </Card>
      )}

      {/* 도움말 및 지원 */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="hover:border-primary/50 transition-colors cursor-pointer" onClick={() => router.push("/support/video")}>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold mb-1">근태관리의 모든것!</h3>
                <p className="text-sm text-muted-foreground">영상으로 쉽게 시작하세요.</p>
              </div>
              <ChevronRight className="w-5 h-5 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="hover:border-primary/50 transition-colors cursor-pointer" onClick={() => window.open("https://help.evertime.co.kr", "_blank")}>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold mb-1">어려우신가요?</h3>
                <p className="text-sm text-muted-foreground">도움말을 찾아보세요.</p>
              </div>
              <ChevronRight className="w-5 h-5 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
