"use client";

import { useEffect, useMemo, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { Building2, CreditCard, CheckCircle, FileText, Lock, ArrowLeft, Plus, Trash2, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Api } from "@/api";
import { checkApiResult } from "@/utils/apiUtil";
import { useLoginStatus, useUserCorporations, useUserCards, useUserSubscriptions, useUserProfile } from "@/redux/selectors/Users";
import { usePlans } from "@/redux/selectors/Plans";
import { UserActions } from "@/redux/actions/Users";
import { PlanDetailDto, PlanPriceType } from "@/types/subscribe";
import { CorporationDto, CorporationType, CreditCardDto, UserCorporationCardDto, UserStatusType } from "@/types/Users";
import { SubscriptionDto, SubscriptionType, SubscriptionWithCorporationDto } from "@/types/Subscriptions";
import { CommonCodeDto } from "@/types/CommonCode";
import { readSubscribeSelectionSnapshot, SubscribeSelectionSnapshot } from "@/utils/subscribeSelection";
import { alertMessage, confirmMessage } from "@/utils/messageBox";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

const FREE_MONTHS_CODE_CATEGORY = "subscription.free-months";
const DEFAULT_FREE_MONTHS_WITH_PAYMENT_METHOD = 6;
const DEFAULT_FREE_MONTHS_WITHOUT_PAYMENT_METHOD = 1;

const getCardCorporationId = (card: CreditCardDto) => {
  const c = card as CreditCardDto & {
    corporationId?: number;
    corporationID?: number;
    companyId?: number;
    companyID?: number;
  };

  return c.corporationId ?? c.corporationID ?? c.companyId ?? c.companyID;
};

const getCodeValue = (code: CommonCodeDto, aliases: string[], fallback: number) => {
  const rawCode = String((code as any).code ?? (code as any).Code ?? code.name ?? "").toLowerCase();
  const matched = aliases.some((alias) => rawCode === alias.toLowerCase());

  if (!matched) return fallback;

  const rawValue = (code as any).value ?? (code as any).Value ?? code.description ?? code.name;
  const numeric = Number(rawValue);

  return Number.isFinite(numeric) ? numeric : fallback;
};

function SubscribeStep2Content() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const isLoggedIn = useLoginStatus();
  const profile = useUserProfile();
  const corporations = useUserCorporations();
  const cards = useUserCards();
  const subscriptions = useUserSubscriptions();
  const plans = usePlans();

  // URL 파라미터
  const planId = parseInt(searchParams.get("planId") || "0");
  const userCount = parseInt(searchParams.get("userCount") || "10");
  const subscriptionId = searchParams.get("subscriptionId");
  const upgradePlanId = searchParams.get("upgradePlanId");
  const isTrialUpgrade = searchParams.get("isTrialUpgrade") === "1";
  const trialSubscriptionId = parseInt(searchParams.get("trialSubscriptionId") || "0");
  const corporationName = searchParams.get("corporationName");

  const isUpgrade = !!subscriptionId;

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [plan, setPlan] = useState<PlanDetailDto | undefined>(undefined);
  const [selectedCorporationId, setSelectedCorporationId] = useState<number | undefined>(undefined);
  const [selectedCardId, setSelectedCardId] = useState<number | undefined>(undefined);
  const [newCorporationName, setNewCorporationName] = useState(corporationName || "");
  const [newBusinessNo, setNewBusinessNo] = useState("");
  const [corporationType, setCorporationType] = useState<CorporationType>(CorporationType.Normal);
  const [agreeTerms1, setAgreeTerms1] = useState(false);
  const [agreeTerms2, setAgreeTerms2] = useState(false);
  const [showNewCorporation, setShowNewCorporation] = useState(false);
  const [selectionSnapshot, setSelectionSnapshot] = useState<SubscribeSelectionSnapshot | null>(null);
  const [freeMonths, setFreeMonths] = useState({
    withPaymentMethod: DEFAULT_FREE_MONTHS_WITH_PAYMENT_METHOD,
    withoutPaymentMethod: DEFAULT_FREE_MONTHS_WITHOUT_PAYMENT_METHOD,
  });

  const isBmsCheckout = !!selectionSnapshot;
  const snapshotTotal = selectionSnapshot?.total ?? 0;
  const totalPrice = isBmsCheckout ? snapshotTotal : userCount * (plan?.price || 0);
  const vat = plan?.useVAT ? totalPrice * 0.1 : 0;
  const selectedCorporation = corporations?.find(c => c.corporationId === selectedCorporationId);
  const filteredCards = useMemo(() => {
    if (!cards?.length) return [];

    return cards.filter((card) => {
      const cardCorporationId = getCardCorporationId(card);

      return !selectedCorporationId || !cardCorporationId || Number(cardCorporationId) === Number(selectedCorporationId);
    });
  }, [cards, selectedCorporationId]);
  const shouldShowPaymentSection = isBmsCheckout || PlanPriceType.Paid === plan?.priceType;
  const selectedCard = filteredCards.find(c => c.cardId === selectedCardId);
  const appliedFreeMonths = selectedCardId ? freeMonths.withPaymentMethod : freeMonths.withoutPaymentMethod;

  const loadUserCorporationAndCards = async () => {
    const result = await Api.Users.getMyCorporationsAndCards();
    if (!checkApiResult(result)) return;
    const payload: UserCorporationCardDto = result!.payload;
    dispatch(UserActions.setCorporations(payload!.corporations! || []));
    dispatch(UserActions.setCards(payload!.creditCards! || []));
  };

  const loadFreeMonths = async () => {
    const result = await Api.CommonCodes.getCommonCodesByCategoryCode(FREE_MONTHS_CODE_CATEGORY);
    if (!checkApiResult(result)) return;

    const codes = (result?.payload || []) as CommonCodeDto[];

    setFreeMonths({
      withPaymentMethod: codes.reduce(
        (value, code) => getCodeValue(code, ["withPaymentMethod", "WITH_PAYMENT_METHOD", "payment", "card", "cms"], value),
        DEFAULT_FREE_MONTHS_WITH_PAYMENT_METHOD
      ),
      withoutPaymentMethod: codes.reduce(
        (value, code) => getCodeValue(code, ["withoutPaymentMethod", "WITHOUT_PAYMENT_METHOD", "noPayment", "none"], value),
        DEFAULT_FREE_MONTHS_WITHOUT_PAYMENT_METHOD
      ),
    });
  };

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace(`/login?url=${encodeURIComponent("/subscribe/step2?source=bms")}`);
      return;
    }

    const loadData = async () => {
      setIsLoading(true);
      try {
        setSelectionSnapshot(readSubscribeSelectionSnapshot());
        await loadUserCorporationAndCards();
        await loadFreeMonths();
        
        // 플랜 찾기
        const targetPlanId = upgradePlanId ? parseInt(upgradePlanId) : planId;
        const foundPlan = plans?.find(p => p.id === targetPlanId);
        setPlan(foundPlan);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [isLoggedIn, plans]);

  // 기업 선택 시
  useEffect(() => {
    if (corporations && corporations.length > 0 && !selectedCorporationId && !showNewCorporation) {
      setSelectedCorporationId(corporations[0].corporationId);
      return;
    }

    if (corporations && corporations.length === 0) {
      setShowNewCorporation(true);
    }
  }, [corporations]);

  // 카드 선택 시
  useEffect(() => {
    if (filteredCards.length === 0) {
      setSelectedCardId(undefined);
      return;
    }

    if (!selectedCardId || !filteredCards.some((card) => card.cardId === selectedCardId)) {
      setSelectedCardId(filteredCards[0].cardId);
    }
  }, [filteredCards, selectedCardId]);

  const canSubscribe = () => {
    // 기업 정보 확인
    if (showNewCorporation || !selectedCorporationId) {
      if (!newCorporationName || !newBusinessNo) return false;
    }
    // 유료 플랜인 경우 카드 확인
    if (!isBmsCheckout && PlanPriceType.Paid === plan?.priceType && !selectedCardId) return false;
    // 약관 동의 확인
    return agreeTerms1 && agreeTerms2;
  };

  const handleSubscribe = async () => {
    if (!canSubscribe()) return;
    setIsSubmitting(true);

    try {
      const subscription: SubscriptionDto = {
        corporationId: showNewCorporation ? -1 : selectedCorporationId,
        corporationName: showNewCorporation ? newCorporationName : selectedCorporation?.name,
        corporationType: showNewCorporation ? corporationType : selectedCorporation?.type,
        planId: plan?.id,
        planName: isBmsCheckout ? selectionSnapshot?.items.map((item) => item.name).join(", ") : plan?.name,
        cardId: selectedCardId,
        cardCompany: selectedCard?.companyName,
        type: isBmsCheckout || PlanPriceType.Free !== plan?.priceType ? SubscriptionType.Monthly : SubscriptionType.Free,
        price: isBmsCheckout ? totalPrice : plan?.price,
        userCount: isBmsCheckout ? Math.max(...(selectionSnapshot?.items.map((item) => item.userCount || 0) || [userCount])) : userCount,
        firstUserCount: isBmsCheckout ? Math.max(...(selectionSnapshot?.items.map((item) => item.userCount || 0) || [userCount])) : userCount,
        useVAT: isBmsCheckout ? 1 : plan?.useVAT ? 1 : 0,
        items: selectionSnapshot?.items,
      };

      const subscriptionPayload = isBmsCheckout
        ? ({
            ...subscription,
            freeMonths: appliedFreeMonths,
            bmsPortalId: selectionSnapshot?.portalId,
            bmsContractItems: selectionSnapshot?.items.map((item) => ({
              modelSeq: item.modelSeq,
              serviceItemSeq: item.serviceItemSeq,
              subServiceItemSeq: item.subServiceItemSeq ?? -1,
              currSeq: item.currSeq,
              qty: item.userCount,
              price: item.unitPrice,
              amt: item.amount,
              policySeq: item.policySeq,
              priceAppYm: item.appYm,
            })),
          } as SubscriptionDto)
        : subscription;

      let result;
      
      if (isTrialUpgrade) {
        const subscriptionWithCorporation: SubscriptionWithCorporationDto = {
          subscription: subscriptionPayload,
          corporation: {
            corporationId: subscriptionPayload.corporationId,
            name: subscriptionPayload.corporationName,
            type: subscriptionPayload.corporationType,
            businessNo: showNewCorporation ? newBusinessNo : undefined,
          },
        };
        result = await Api.Subscriptions.upgradeTrialSubscription(subscriptionWithCorporation, trialSubscriptionId);
      } else if (isUpgrade) {
        result = await Api.Subscriptions.upgradeSubscription(subscriptionPayload);
      } else if (showNewCorporation) {
        const subscriptionWithCorporation: SubscriptionWithCorporationDto = {
          subscription: subscriptionPayload,
          corporation: {
            name: newCorporationName,
            type: corporationType,
            businessNo: newBusinessNo,
          },
        };
        result = await Api.Subscriptions.subscribeWithCorporation(subscriptionWithCorporation);
      } else {
        result = await Api.Subscriptions.subscribe(subscriptionPayload);
      }

      if (!checkApiResult(result)) {
        setIsSubmitting(false);
        return;
      }

      const newSubscription: SubscriptionDto = result!.payload?.subscription || result!.payload;
      
      // Redux 업데이트
      const newSubscriptions = subscriptions ? [...subscriptions, newSubscription] : [newSubscription];
      dispatch(UserActions.setSubscriptions(newSubscriptions));
      
      if (isFromTrial) {
        const newProfile = { ...profile, status: UserStatusType.Normal };
        dispatch(UserActions.setUserProfile(newProfile));
      }

      // 다음 단계로 이동
      router.push(`/subscribe/step3?subscriptionId=${newSubscription.id}&cardId=${newSubscription.cardId}${isUpgrade ? "&upgrade=1" : ""}`);
    } catch (error) {
      await alertMessage("구독 처리 중 오류가 발생했습니다");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFromTrial = profile && UserStatusType.Upgrading === profile.status;

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
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="px-4 py-8 md:px-8 md:py-12 max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Button variant="ghost" size="sm" className="mb-4" onClick={() => router.back()}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              이전으로
            </Button>
            <h1 className="text-3xl font-bold mb-2">기업 및 결제정보 등록하기</h1>
            <p className="text-muted-foreground">구독에 필요한 기업정보, 결제수단 등의 정보를 입력하시기 바랍니다.</p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-2 mb-12">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-medium">
                <CheckCircle className="w-4 h-4" />
              </div>
              <span className="text-sm text-muted-foreground">플랜 선택</span>
            </div>
            <div className="w-8 h-px bg-primary" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
                2
              </div>
              <span className="text-sm font-medium">정보 입력</span>
            </div>
            <div className="w-8 h-px bg-border" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-sm font-medium">
                3
              </div>
              <span className="text-sm text-muted-foreground">완료</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Forms */}
            <div className="space-y-6">
              {/* 기업 정보 */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-primary" />
                    1. 기업정보
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isUpgrade || (isTrialUpgrade && corporationName) ? (
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <p className="font-medium">{corporationName || corporations?.find(c => c.corporationId === selectedCorporationId)?.name}</p>
                    </div>
                  ) : (
                    <>
                      {corporations && corporations.length > 0 && !showNewCorporation && (
                        <RadioGroup
                          value={selectedCorporationId?.toString()}
                          onValueChange={(value) => setSelectedCorporationId(parseInt(value))}
                        >
                          {corporations.map((corp) => (
                            <div key={corp.corporationId} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50">
                              <RadioGroupItem value={corp.corporationId!.toString()} id={`corp-${corp.corporationId}`} />
                              <Label htmlFor={`corp-${corp.corporationId}`} className="flex-1 cursor-pointer">
                                <p className="font-medium">{corp.name}</p>
                                <p className="text-sm text-muted-foreground">{corp.businessNo}</p>
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      )}

                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => {
                          setShowNewCorporation(!showNewCorporation);
                          if (!showNewCorporation) setSelectedCorporationId(undefined);
                        }}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        {showNewCorporation ? "기존 기업 선택" : "새 기업 추가"}
                      </Button>

                      {showNewCorporation && (
                        <div className="space-y-4 p-4 border rounded-lg">
                          <div className="space-y-2">
                            <Label>회사명</Label>
                            <Input
                              placeholder="회사명을 입력하세요"
                              value={newCorporationName}
                              onChange={(e) => setNewCorporationName(e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>사업자등록번호</Label>
                            <Input
                              placeholder="000-00-00000"
                              value={newBusinessNo}
                              onChange={(e) => setNewBusinessNo(e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>기업 유형</Label>
                            <RadioGroup
                              value={corporationType.toString()}
                              onValueChange={(value) => setCorporationType(parseInt(value))}
                              className="flex gap-4"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value={CorporationType.Normal.toString()} id="type-normal" />
                                <Label htmlFor="type-normal">일반 기업</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value={CorporationType.NonProfit.toString()} id="type-nonprofit" />
                                <Label htmlFor="type-nonprofit">비영리 단체</Label>
                              </div>
                            </RadioGroup>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </CardContent>
              </Card>

              {/* 결제 수단 */}
              {shouldShowPaymentSection && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-primary" />
                      2. 결제수단
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {filteredCards.length > 0 ? (
                      <RadioGroup
                        value={selectedCardId?.toString()}
                        onValueChange={(value) => setSelectedCardId(parseInt(value))}
                      >
                        {filteredCards.map((card) => (
                          <div key={card.cardId} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50">
                            <RadioGroupItem value={card.cardId!.toString()} id={`card-${card.cardId}`} />
                            <Label htmlFor={`card-${card.cardId}`} className="flex-1 cursor-pointer">
                              <p className="font-medium">{card.companyName}</p>
                              <p className="text-sm text-muted-foreground">
                                •••• •••• •••• {card.number?.slice(-4)}
                              </p>
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    ) : (
                      <p className="text-muted-foreground text-center py-4">등록된 카드가 없습니다.</p>
                    )}

                    {isBmsCheckout && !selectedCardId && (
                      <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
                        결제수단 없이 진행하면 {freeMonths.withoutPaymentMethod}개월 무료가 적용됩니다. 결제수단 등록 시 {freeMonths.withPaymentMethod}개월 무료가 추가 적용됩니다.
                      </div>
                    )}

                    <Button variant="outline" className="w-full" onClick={() => router.push(`/mypage/account?tab=1${selectedCorporationId ? `&corporationId=${selectedCorporationId}` : ""}`)}>
                      <Plus className="w-4 h-4 mr-2" />
                      카드 등록/변경
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Right Column - Summary */}
            <div>
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="text-lg">결제 정보</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Plan Info */}
                  {isBmsCheckout && (
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <Badge className="mb-3">선택 서비스</Badge>
                      <div className="space-y-2">
                        {selectionSnapshot?.items.map((item, index) => (
                          <div key={`${item.serviceId}-${index}`} className="flex items-start justify-between gap-3 text-sm">
                            <span className="min-w-0 flex-1 truncate text-slate-700">{item.name}</span>
                            <span className="shrink-0 font-semibold text-slate-900">
                              {(item.amount || 0).toLocaleString()}원
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 border-t pt-4">
                        <p className="text-sm text-muted-foreground">예상 월 과금</p>
                        <p className="mt-1 text-2xl font-bold">{totalPrice.toLocaleString()}원</p>
                        <p className="mt-2 text-sm font-semibold text-primary">
                          무료 적용: {appliedFreeMonths}개월
                        </p>
                      </div>
                    </div>
                  )}

                  <div className={isBmsCheckout ? "hidden" : "p-4 bg-muted/50 rounded-lg"}>
                    <Badge className="mb-2">{plan?.name}</Badge>
                    {PlanPriceType.Free === plan?.priceType ? (
                      <p className="text-3xl font-bold">무료</p>
                    ) : (
                      <>
                        <p className="text-sm text-muted-foreground">
                          ₩{plan?.price?.toLocaleString()} × {userCount}명 × 1개월
                        </p>
                        <p className="text-2xl font-bold mt-2">₩{totalPrice.toLocaleString()}</p>
                      </>
                    )}
                  </div>

                  {!isBmsCheckout && PlanPriceType.Paid === plan?.priceType && (
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">VAT (10%)</span>
                        <span>₩{vat.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between font-semibold text-base pt-2 border-t">
                        <span>매월 구독료 합계</span>
                        <span className="text-primary">₩{(totalPrice + vat).toLocaleString()}</span>
                      </div>
                    </div>
                  )}

                  {/* Terms */}
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <Checkbox 
                        id="terms1" 
                        checked={agreeTerms1}
                        onCheckedChange={(checked) => setAgreeTerms1(checked === true)}
                      />
                      <div className="flex-1 flex items-center justify-between">
                        <Label htmlFor="terms1" className="text-sm cursor-pointer">
                          정기과금 이용약관 동의
                        </Label>
                        <Button variant="link" size="sm" className="text-xs p-0 h-auto">
                          내용보기
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Checkbox 
                        id="terms2"
                        checked={agreeTerms2}
                        onCheckedChange={(checked) => setAgreeTerms2(checked === true)}
                      />
                      <div className="flex-1 flex items-center justify-between">
                        <Label htmlFor="terms2" className="text-sm cursor-pointer">
                          서비스 이용계약서 동의
                        </Label>
                        <Button variant="link" size="sm" className="text-xs p-0 h-auto">
                          내용보기
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Button 
                    className="w-full" 
                    size="lg"
                    disabled={!canSubscribe() || isSubmitting}
                    onClick={handleSubscribe}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                        처리 중...
                      </>
                    ) : (
                      <>
                        {isUpgrade ? "업그레이드하기" : "구독하기"}
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    구독하시는 것은 <span className="text-primary">정기과금 이용약관</span> 및{" "}
                    <span className="text-primary">서비스 이용계약서</span>에 동의하였음을 의미합니다.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function SubscribeStep2Page() {
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
      <SubscribeStep2Content />
    </Suspense>
  );
}
