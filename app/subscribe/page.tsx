"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { CheckCircle, Star, Users, Zap, Shield, ArrowRight, Building2, Sparkles, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Api } from "@/api";
import { checkApiResult } from "@/utils/apiUtil";
import { useLoginStatus, useUserProfile } from "@/redux/selectors/Users";
import { usePlans } from "@/redux/selectors/Plans";
import { PlanActions } from "@/redux/actions/Plans";
import { PlanDetailDto, PlanPriceType } from "@/types/Plans";
import { UserStatusType } from "@/types/Users";
import { TrialDto } from "@/types/Trials";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

function SubscribeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const isLoggedIn = useLoginStatus();
  const profile = useUserProfile();
  const plans = usePlans();
  
  const subscriptionId = searchParams.get("subscriptionId");
  const upgradePlanId = searchParams.get("upgradePlanId");
  
  const [isLoading, setIsLoading] = useState(true);
  const [trialInfo, setTrialInfo] = useState<TrialDto | undefined>(undefined);
  const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);
  const [userCount, setUserCount] = useState(10);

  const isFromTrial = profile && UserStatusType.Upgrading === profile.status;

  const loadAllPlans = async () => {
    if (plans && plans.length > 0) return;
    const result = await Api.Plans.getAllPlans();
    if (!checkApiResult(result)) return;
    dispatch(PlanActions.setPlans(result!.payload));
  };

  const loadUserTrialInfo = async () => {
    const result = await Api.Trials.getUserTrialInfo();
    if (!checkApiResult(result)) return;
    setTrialInfo(result!.payload);
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        await loadAllPlans();
        if (isLoggedIn && isFromTrial) {
          await loadUserTrialInfo();
        }
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [isLoggedIn]);

  const handlePlanSelect = (plan: PlanDetailDto) => {
    setSelectedPlanId(plan.id);
    
    if (subscriptionId && upgradePlanId) {
      // 업그레이드 케이스
      router.push(`/subscribe/step2?subscriptionId=${subscriptionId}&upgradePlanId=${upgradePlanId}&userCount=${userCount}`);
    } else if (isFromTrial && trialInfo) {
      // 트라이얼 업그레이드 케이스
      router.push(`/subscribe/step2?planId=${plan.id}&userCount=${trialInfo.userCount}&isTrialUpgrade=1&trialSubscriptionId=${trialInfo.trialSubscriptionId}&corporationName=${encodeURIComponent(trialInfo.corporationName || "")}`);
    } else {
      // 새 구독 케이스
      router.push(`/subscribe/step2?planId=${plan.id}&userCount=${userCount}`);
    }
  };

  const getFeatureIcon = (index: number) => {
    const icons = [CheckCircle, Users, Shield, Zap];
    const Icon = icons[index % icons.length];
    return <Icon className="w-4 h-4 text-primary" />;
  };

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

  // 트라이얼 업그레이드 페이지
  if (isFromTrial && trialInfo) {
    const upgradePlan = plans?.find(p => p.upgradePlanId && upgradePlanId ? p.upgradePlanId.toString() === upgradePlanId : false) 
      || plans?.find(p => PlanPriceType.Paid === p.priceType);

    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1">
          <div className="px-4 py-12 md:px-8 md:py-20 max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-primary/10 text-primary">체험판 업그레이드</Badge>
              <h1 className="text-4xl font-bold mb-4">
                <span className="text-primary">{trialInfo.corporationName}</span>님,
                <br />정식 서비스로 업그레이드하세요!
              </h1>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                체험 기간이 종료되었습니다. 계속해서 서비스를 이용하시려면 유료 플랜으로 업그레이드해주세요.
              </p>
            </div>

            <Card className="border-2 border-primary/20">
              <CardHeader className="text-center pb-2">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  <Badge variant="secondary">추천</Badge>
                </div>
                <CardTitle className="text-2xl">{upgradePlan?.name}</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-primary">
                    ₩{upgradePlan?.price?.toLocaleString() || 0}
                    <span className="text-base font-normal text-muted-foreground"> / 사용자당 월</span>
                  </div>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg mb-6">
                  <div className="flex justify-between items-center">
                    <span>현재 사용자 수</span>
                    <span className="font-bold text-lg">{trialInfo.userCount}명</span>
                  </div>
                  <div className="flex justify-between items-center mt-2 pt-2 border-t">
                    <span>예상 월 이용료</span>
                    <span className="font-bold text-lg text-primary">
                      ₩{((upgradePlan?.price || 0) * trialInfo.userCount).toLocaleString()}
                    </span>
                  </div>
                </div>

                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={() => upgradePlan && handlePlanSelect(upgradePlan)}
                >
                  업그레이드 진행하기
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // 일반 구독 페이지
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="px-4 py-12 md:px-8 md:py-20 max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/10 text-primary">요금제 선택</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              비즈니스에 맞는 플랜을 선택하세요
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              모든 플랜은 언제든지 업그레이드하거나 다운그레이드할 수 있습니다.
            </p>
          </div>

          {/* User Count Selector */}
          <div className="max-w-md mx-auto mb-12">
            <Card>
              <CardContent className="py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    <span className="font-medium">사용자 수</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={() => setUserCount(Math.max(1, userCount - 1))}
                    >
                      -
                    </Button>
                    <span className="w-12 text-center font-bold text-lg">{userCount}</span>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={() => setUserCount(userCount + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Plans Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {plans?.map((plan) => (
              <Card 
                key={plan.id} 
                className={`relative transition-all cursor-pointer hover:border-primary/50 ${
                  selectedPlanId === plan.id ? "border-primary border-2" : ""
                } ${PlanPriceType.Paid === plan.priceType ? "lg:scale-105 lg:z-10 shadow-lg" : ""}`}
                onClick={() => setSelectedPlanId(plan.id)}
              >
                {PlanPriceType.Paid === plan.priceType && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary">
                      <Sparkles className="w-3 h-3 mr-1" />
                      인기
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-2">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </CardHeader>
                
                <CardContent>
                  <div className="text-center mb-6">
                    {PlanPriceType.Free === plan.priceType ? (
                      <div className="text-4xl font-bold">무료</div>
                    ) : (
                      <div className="text-4xl font-bold text-primary">
                        ₩{plan.price?.toLocaleString()}
                        <span className="text-base font-normal text-muted-foreground"> / 월</span>
                      </div>
                    )}
                    {PlanPriceType.Paid === plan.priceType && (
                      <p className="text-sm text-muted-foreground mt-1">
                        사용자당 요금
                      </p>
                    )}
                  </div>

                  {/* Features */}
                  <div className="space-y-3 mb-6">
                    {plan.features?.slice(0, 5).map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        {getFeatureIcon(index)}
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button 
                    className="w-full" 
                    variant={PlanPriceType.Paid === plan.priceType ? "default" : "outline"}
                    onClick={() => handlePlanSelect(plan)}
                  >
                    {PlanPriceType.Free === plan.priceType ? "무료로 시작하기" : "시작하기"}
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Features Comparison */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-center">모든 플랜에 포함된 기능</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">보안 및 인증</h4>
                    <p className="text-sm text-muted-foreground">SSL 암호화, 2단계 인증, 데이터 백업</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">사용자 관리</h4>
                    <p className="text-sm text-muted-foreground">역할 기반 권한, 부서별 관리, 조직도</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <Zap className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">기술 지원</h4>
                    <p className="text-sm text-muted-foreground">이메일 지원, 헬프 센터, 가이드 문서</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              어떤 플랜이 맞는지 모르시겠나요?
            </p>
            <Button variant="outline" onClick={() => router.push("/support/contact")}>
              <Building2 className="w-4 h-4 mr-2" />
              도입 상담 요청
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function SubscribePage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
          <p className="text-muted-foreground">로딩 중...</p>
        </div>
      </div>
    }>
      <SubscribeContent />
    </Suspense>
  );
}
