"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { User, Mail, Lock, Phone, CreditCard, Plus, Edit2, Trash2, ChevronRight, Shield, UserMinus, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Api } from "@/api";
import { checkApiResult } from "@/utils/apiUtil";
import { useLoginStatus, useUserProfile, useUserCards, useUserSubscriptions } from "@/redux/selectors/Users";
import { usePlans } from "@/redux/selectors/Plans";
import { UserActions } from "@/redux/actions/Users";
import { CreditCardDto, UserStatusType } from "@/types/Users";
import { PlanPriceType } from "@/types/Plans";
import { alertMessage, confirmMessage } from "@/utils/messageBox";
import CommonUtil from "@/utils/commonUtil";

function AccountContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  const dispatch = useDispatch();
  const isLoggedIn = useLoginStatus();
  const profile = useUserProfile();
  const cards = useUserCards();
  const subscriptions = useUserSubscriptions();
  const plans = usePlans();
  
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(tab === "1" ? "payment" : "account");
  const [freeSubscription, setFreeSubscription] = useState<any>(null);

  const loadMyCards = async () => {
    const result = await Api.Users.getMyCreditCards(window.location.pathname);
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
        await loadMyCards();
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [isLoggedIn]);

  useEffect(() => {
    if (subscriptions && subscriptions.length > 0 && plans) {
      const index = subscriptions.findIndex((subscription) => {
        return plans.findIndex((plan) => plan.id === subscription.planId && PlanPriceType.Free === plan.priceType) >= 0;
      });
      if (index >= 0) {
        setFreeSubscription(subscriptions[index]);
      }
    }
  }, [subscriptions, plans]);

  const formatCardInfo = (card: CreditCardDto) => {
    if (!card.number) return "카드정보 오류";
    return CommonUtil.formatCreditCardNumber(card.number, true) + ` [${card.companyName}]`;
  };

  const onPlanUpgrade = () => {
    if (freeSubscription && plans) {
      const plan = plans.find((p) => p.id === freeSubscription.planId);
      if (plan) {
        router.push(`/subscribe?subscriptionId=${freeSubscription.id}&upgradePlanId=${plan.upgradePlanId}`);
        return;
      }
    }
    router.replace("/login");
  };

  const onWithdrawalClick = () => {
    router.push("/mypage/withdrawal");
  };

  const onCancelDelegationRequest = async () => {
    const answer = await confirmMessage("권한위임 요청을 취소하시겠습니까?");
    if (!answer.isConfirmed) return;

    const result = await Api.Users.cancelDelegationRequest();
    if (!checkApiResult(result)) return;

    await alertMessage("권한위임 요청이 취소되었습니다.");
    const newProfile = { ...profile, status: UserStatusType.Normal };
    dispatch(UserActions.setUserProfile(newProfile));
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
    <div className="px-4 py-8 md:px-8 md:py-12 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">계정정보</h1>
        <p className="text-muted-foreground">
          현재 사용중인 서비스의 계정, 플랜 및 결제수단 등을 변경하실 수 있습니다.
        </p>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="account" className="gap-2">
            <User className="w-4 h-4" />
            계정
          </TabsTrigger>
          <TabsTrigger value="payment" className="gap-2">
            <CreditCard className="w-4 h-4" />
            결제수단
          </TabsTrigger>
        </TabsList>

        {/* Account Tab */}
        <TabsContent value="account">
          <Card>
            <CardContent className="pt-6 space-y-4">
              {/* 사용자 */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-3 mb-2 md:mb-0">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">사용자</p>
                    <p className="font-semibold">{profile?.name}</p>
                  </div>
                </div>
              </div>

              {/* 이메일 */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-3 mb-2 md:mb-0">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">이메일</p>
                    <p className="font-semibold">{profile?.loginId}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {UserStatusType.Normal === profile?.status && (
                    <Button variant="outline" size="sm">
                      <Shield className="w-4 h-4 mr-1" />
                      권한위임
                    </Button>
                  )}
                  {UserStatusType.DelegationRequest === profile?.status && (
                    <>
                      <Button variant="outline" size="sm">
                        권한위임이력 보기
                      </Button>
                      <Button variant="secondary" size="sm" onClick={onCancelDelegationRequest}>
                        권한위임 요청취소
                      </Button>
                    </>
                  )}
                </div>
              </div>

              {/* 비밀번호 */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-3 mb-2 md:mb-0">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Lock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">비밀번호</p>
                    <p className="font-medium text-muted-foreground">비밀번호 변경 버튼을 클릭 시 변경하실 수 있습니다.</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Edit2 className="w-4 h-4 mr-1" />
                  비밀번호 변경
                </Button>
              </div>

              {/* 휴대전화 */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-3 mb-2 md:mb-0">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">휴대전화</p>
                    <p className="font-semibold">{CommonUtil.formatPhoneNumber(profile?.phone)}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Edit2 className="w-4 h-4 mr-1" />
                  연락처 변경
                </Button>
              </div>

              {/* 회원 탈퇴 */}
              <div className="pt-4 border-t">
                <Button 
                  variant="ghost" 
                  className="text-muted-foreground hover:text-destructive"
                  onClick={onWithdrawalClick}
                >
                  <UserMinus className="w-4 h-4 mr-2" />
                  회원탈퇴
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payment Tab */}
        <TabsContent value="payment">
          {/* 무료 플랜 업그레이드 배너 */}
          {freeSubscription && (
            <Card className="mb-6 border-primary/20 bg-primary/5">
              <CardContent className="py-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      현재 무료체험 중인 플랜이 있으며, 무료체험 기간 종료 후에 결제되지 않습니다.
                      <br />
                      무료버전은 최대 10명까지 사용하실 수 있으며 그 이상 사용하실 경우에는 유료 플랜으로 업그레이드 하시기 바랍니다.
                    </p>
                  </div>
                  <Button onClick={onPlanUpgrade}>
                    플랜 업그레이드
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">결제 수단 관리</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 기본 결제 수단 */}
              <div className="p-4 bg-muted/30 rounded-lg">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">결제수단</p>
                      <p className="font-semibold">
                        {!cards || cards.length === 0 ? "등록되지 않음" : formatCardInfo(cards[0])}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    {!cards || cards.length === 0 ? (
                      <>
                        <Plus className="w-4 h-4 mr-1" />
                        등록하기
                      </>
                    ) : (
                      <>
                        <RefreshCw className="w-4 h-4 mr-1" />
                        변경하기
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* 예비 결제 수단 */}
              <div className="p-4 bg-muted/30 rounded-lg">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">예비 결제수단</p>
                      <p className="font-semibold">
                        {!cards || cards.length < 2 ? "등록되지 않음" : formatCardInfo(cards[1])}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    {cards && cards.length >= 2 ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-1" />
                        변경하기
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 mr-1" />
                        등록하기
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* 안내 문구 */}
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>안내:</strong> 예비 결제수단은 기본 결제수단으로 결제가 실패할 경우 자동으로 시도됩니다. 
                  원활한 서비스 이용을 위해 예비 결제수단도 등록해 주세요.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Help Banner */}
      <div className="mt-8 grid md:grid-cols-2 gap-4">
        <Card className="hover:border-primary/50 transition-colors cursor-pointer" onClick={() => router.push("/support/video")}>
          <CardContent className="py-4 flex items-center justify-between">
            <div>
              <h3 className="font-semibold">도움이 필요하신가요?</h3>
              <p className="text-sm text-muted-foreground">영상 가이드를 확인하세요.</p>
            </div>
            <ChevronRight className="w-5 h-5 text-primary" />
          </CardContent>
        </Card>
        <Card className="hover:border-primary/50 transition-colors cursor-pointer" onClick={() => router.push("/support/contact")}>
          <CardContent className="py-4 flex items-center justify-between">
            <div>
              <h3 className="font-semibold">문의가 있으신가요?</h3>
              <p className="text-sm text-muted-foreground">고객센터에 문의하세요.</p>
            </div>
            <ChevronRight className="w-5 h-5 text-primary" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function AccountPage() {
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
      <AccountContent />
    </Suspense>
  );
}
