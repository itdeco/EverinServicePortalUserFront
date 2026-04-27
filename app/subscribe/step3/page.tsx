"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckCircle, ArrowRight, Sparkles, Calendar, CreditCard, Users, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLoginStatus, useUserSubscriptions } from "@/redux/selectors/Users";
import { usePlans } from "@/redux/selectors/Plans";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import DateUtil from "@/utils/dateUtil";

function SubscribeStep3Content() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isLoggedIn = useLoginStatus();
  const subscriptions = useUserSubscriptions();
  const plans = usePlans();

  const subscriptionId = parseInt(searchParams.get("subscriptionId") || "0");
  const isUpgrade = searchParams.get("upgrade") === "1";

  const subscription = subscriptions?.find(s => s.id === subscriptionId);
  const plan = plans?.find(p => p.id === subscription?.planId);

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/login");
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) return null;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="px-4 py-12 md:px-8 md:py-20 max-w-3xl mx-auto">
          {/* Success Animation */}
          <div className="text-center mb-12">
            <div className="relative inline-flex items-center justify-center mb-6">
              <div className="absolute w-24 h-24 bg-green-500/20 rounded-full animate-ping" />
              <div className="relative w-20 h-20 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl font-bold mb-4">
              {isUpgrade ? "업그레이드 완료!" : "구독이 완료되었습니다!"}
            </h1>
            <p className="text-muted-foreground text-lg max-w-md mx-auto">
              {subscription?.corporationName || "회사"}님, 에버타임 서비스를 선택해 주셔서 감사합니다.
              {!isUpgrade && " 이제 모든 기능을 이용하실 수 있습니다."}
            </p>
          </div>

          {/* Subscription Summary */}
          <Card className="mb-8 overflow-hidden">
            <div className="bg-primary p-4 text-primary-foreground">
              <div className="flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5" />
                <span className="font-semibold">구독 정보</span>
              </div>
            </div>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">플랜</p>
                    <p className="font-semibold">{plan?.name || subscription?.planName}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">사용자 수</p>
                    <p className="font-semibold">{subscription?.userCount || 0}명</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">구독 시작일</p>
                    <p className="font-semibold">
                      {subscription?.subscribeDate 
                        ? DateUtil.formattedDate(subscription.subscribeDate, true)
                        : new Date().toLocaleDateString("ko-KR")}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">월 이용료</p>
                    <p className="font-semibold">
                      {subscription?.payment?.totAmount
                        ? `₩${subscription.payment.totAmount.toLocaleString()}`
                        : "무료"}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-sm">
                <CheckCircle className="w-4 h-4" />
              </div>
              <span className="text-sm text-muted-foreground">플랜 선택</span>
            </div>
            <div className="w-8 h-px bg-green-500" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-sm">
                <CheckCircle className="w-4 h-4" />
              </div>
              <span className="text-sm text-muted-foreground">정보 입력</span>
            </div>
            <div className="w-8 h-px bg-green-500" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-medium">
                <CheckCircle className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium text-green-600">완료</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg"
              onClick={() => router.push("/mypage/subscription")}
            >
              구독 관리로 이동
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => {
                const everTimeUrl = process.env.NEXT_PUBLIC_EVERTIME_APP_URL || "https://evertimewtest.web.flextudio.com";
                window.open(everTimeUrl, "_blank");
              }}
            >
              에버타임 바로가기
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Help Section */}
          <Card className="bg-muted/30 border-dashed">
            <CardContent className="py-6 text-center">
              <h3 className="font-semibold mb-2">시작하는 방법이 궁금하신가요?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                영상 가이드와 도움말을 통해 빠르게 시작하실 수 있습니다.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => router.push("/support/video")}
                >
                  영상 가이드 보기
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.open("https://help.evertime.co.kr", "_blank")}
                >
                  도움말 센터
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function SubscribeStep3Page() {
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
      <SubscribeStep3Content />
    </Suspense>
  );
}
