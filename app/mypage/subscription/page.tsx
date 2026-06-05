"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import {
  AlertCircle,
  Building2,
  Calendar,
  ChevronRight,
  CreditCard,
  FileText,
  LockKeyhole,
  ShieldCheck,
  Users,
  Zap,
} from "lucide-react";
import { Api } from "@/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { checkApiResult } from "@/utils/apiUtil";
import {
  useLoginStatus,
  useUserCards,
  useUserCorporations,
  useUserProfile,
} from "@/redux/selectors/Users";
import { usePlans } from "@/redux/selectors/Plans";
import { UserActions } from "@/redux/actions/Users";
import { PlanActions } from "@/redux/actions/Plans";
import {
  SubscriptionDto,
  SubscriptionItemDto,
  SubscriptionStatusType,
} from "@/types/Subscriptions";
import {
  CorporationDto,
  CreditCardDto,
  UserCorporationCardDto,
} from "@/types/Users";
import { alertMessage, confirmMessage } from "@/utils/messageBox";
import DateUtil from "@/utils/dateUtil";

type CardWithCompany = CreditCardDto & {
  cardCompany?: string;
};

type SubscriptionMap = Record<number, SubscriptionDto[]>;
type LoadingMap = Record<number, boolean>;

function getCorporationId(corporation?: CorporationDto) {
  return corporation?.corporationId || 0;
}

function getCorporationName(corporation?: CorporationDto) {
  return corporation?.name || "회사명 없음";
}

function isCorporationMaster(corporation?: CorporationDto) {
  if (!corporation) return false;

  const role = (
    corporation.role ||
    corporation.authority ||
    corporation.memberRole ||
    ""
  ).toUpperCase();

  return !!corporation.isMaster || !!corporation.master || role === "MASTER";
}

function formatCurrency(value?: number) {
  if (!value) return "무료";
  return `₩${value.toLocaleString()}`;
}

function getItemName(item: SubscriptionItemDto) {
  const planName = item.planName ? ` (${item.planName})` : "";
  return (
    `${item.serviceName || item.planProductName || item.productName || "구독 항목"}${planName}`
  );
}

function getItemAmount(item: SubscriptionItemDto) {
  return item.amount ?? (item.unitPrice ?? item.price ?? 0) * (item.userCount || 0);
}

export default function SubscriptionPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const isLoggedIn = useLoginStatus();
  const profile = useUserProfile();
  const corporations = useUserCorporations();
  const cards = useUserCards();
  const plans = usePlans();

  const [selectedCorporationId, setSelectedCorporationId] = useState<number | null>(null);
  const [subscriptionsByCorporation, setSubscriptionsByCorporation] = useState<SubscriptionMap>({});
  const [loadingByCorporation, setLoadingByCorporation] = useState<LoadingMap>({});
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const selectedCorporation = useMemo(
    () => corporations?.find((corp) => getCorporationId(corp) === selectedCorporationId),
    [corporations, selectedCorporationId],
  );
  const isMaster = isCorporationMaster(selectedCorporation);
  const currentSubscriptions =
    selectedCorporationId ? subscriptionsByCorporation[selectedCorporationId] || [] : [];
  const isSubscriptionLoading =
    !!selectedCorporationId && !!loadingByCorporation[selectedCorporationId];

  const loadUserCorporationsAndCards = async () => {
    const result = await Api.Users.getMyCorporationsAndCards();
    if (!checkApiResult(result)) return [];

    const payload: UserCorporationCardDto = result!.payload;
    const nextCorporations = payload?.corporations || [];

    dispatch(UserActions.setCorporations(nextCorporations));
    dispatch(UserActions.setCards(payload?.creditCards || []));

    return nextCorporations;
  };

  const loadAllPlans = async () => {
    if (plans && plans.length > 0) return;

    const result = await Api.Plans.getAllPlans();
    if (!checkApiResult(result)) return;
    dispatch(PlanActions.setPlans(result!.payload));
  };

  const loadCorporationSubscriptions = async (corporationId: number, force = false) => {
    if (!force && subscriptionsByCorporation[corporationId]) return;

    setLoadingByCorporation((prev) => ({ ...prev, [corporationId]: true }));

    try {
      const result = await Api.Subscriptions.getCorporationSubscriptions(corporationId);
      if (!checkApiResult(result)) return;

      setSubscriptionsByCorporation((prev) => ({
        ...prev,
        [corporationId]: (result!.payload || []) as SubscriptionDto[],
      }));
    } finally {
      setLoadingByCorporation((prev) => ({ ...prev, [corporationId]: false }));
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/login");
      return;
    }

    const loadData = async () => {
      setIsInitialLoading(true);
      try {
        const nextCorporations = await loadUserCorporationsAndCards();
        await loadAllPlans();

        const firstCorporationId = getCorporationId(nextCorporations[0]);
        if (firstCorporationId) {
          setSelectedCorporationId(firstCorporationId);
          await loadCorporationSubscriptions(firstCorporationId, true);
        }
      } finally {
        setIsInitialLoading(false);
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
        return <Badge className="bg-gray-100 text-gray-800">만료</Badge>;
      default:
        return <Badge className="bg-green-100 text-green-800">활성</Badge>;
    }
  };

  const handleSelectCorporation = async (value: string) => {
    const corporationId = Number(value);

    setSelectedCorporationId(corporationId);
    await loadCorporationSubscriptions(corporationId);
  };

  const handleCancelQuitSubscribing = async (subscriptionId: number) => {
    if (!isMaster || !selectedCorporationId) return;

    const subscription = currentSubscriptions.find((item) => item.id === subscriptionId);
    if (!subscription) return;

    const plan = plans?.find((item) => item.id === subscription.planId);
    const answer = await confirmMessage(
      `${plan?.name || subscription.planName} 멤버십 해지 요청을 취소하시겠습니까?`,
    );

    if (answer.isConfirmed) {
      const result = await Api.Subscriptions.recoverSubscription(subscriptionId);
      if (!checkApiResult(result)) return;

      const newSubscription: SubscriptionDto = result?.payload;
      setSubscriptionsByCorporation((prev) => ({
        ...prev,
        [selectedCorporationId]: (prev[selectedCorporationId] || []).map((item) =>
          item.id === newSubscription.id ? newSubscription : item,
        ),
      }));

      await alertMessage("멤버십 구독 해지 요청이 취소되었습니다.");
    }
  };

  const handleSubscriptionExpire = (subscriptionId: number) => {
    if (!isMaster) return;
    router.push(`/mypage/subscription/expire?id=${subscriptionId}`);
  };

  const handlePaymentList = (subscriptionId: number) => {
    router.push(`/mypage/payment?id=${subscriptionId}`);
  };

  const handleAddSubscription = () => {
    if (!isMaster || !selectedCorporationId) return;
    router.push(`/subscribe?corporationId=${selectedCorporationId}`);
  };

  if (!isLoggedIn) {
    return null;
  }

  if (isInitialLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <div className="h-8 w-8 animate-spin rounded-full border-3 border-primary border-t-transparent" />
          </div>
          <p className="text-muted-foreground">구독 정보를 불러오는 중입니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-8 md:py-12">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-foreground">구독 관리</h1>
        <p className="text-muted-foreground">
          소속 회사별 구독 현황을 확인하고, MASTER 권한이 있는 회사의 구독만 변경할 수 있습니다.
        </p>
      </div>

      {profile && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg">회원 정보</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-center gap-4 rounded-lg bg-muted/50 p-3">
                <span className="min-w-[60px] text-sm text-muted-foreground">이름</span>
                <span className="font-medium">{profile.name}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
                <div className="flex items-center gap-4">
                  <span className="min-w-[60px] text-sm text-muted-foreground">이메일</span>
                  <span className="font-medium">{profile.loginId}</span>
                </div>
                <Button
                  variant="link"
                  className="h-auto p-0 text-sm text-muted-foreground underline"
                  onClick={() => router.push("/mypage/account")}
                >
                  계정정보변경
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {!corporations || corporations.length === 0 ? (
        <Card className="mb-8 border-2">
          <CardContent className="py-12 text-center">
            <AlertCircle className="mx-auto mb-4 h-12 w-12 text-muted-foreground opacity-50" />
            <h3 className="mb-2 text-lg font-semibold">소속된 회사가 없습니다.</h3>
            <p className="text-muted-foreground">
              회사에 등록된 뒤 회사별 구독 정보를 확인할 수 있습니다.
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <CardTitle className="text-lg">회사 선택</CardTitle>
                  <p className="mt-1 text-sm text-muted-foreground">
                    회사 탭을 선택하면 해당 회사의 구독 정보만 조회합니다.
                  </p>
                </div>
                {selectedCorporation && (
                  <Badge
                    className={
                      isMaster
                        ? "w-fit bg-primary/10 text-primary"
                        : "w-fit bg-slate-100 text-slate-600"
                    }
                  >
                    {isMaster ? (
                      <ShieldCheck className="mr-1 h-3.5 w-3.5" />
                    ) : (
                      <LockKeyhole className="mr-1 h-3.5 w-3.5" />
                    )}
                    {isMaster ? "MASTER" : "조회 전용"}
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <Tabs
                value={selectedCorporationId?.toString()}
                onValueChange={handleSelectCorporation}
              >
                <TabsList className="h-auto w-full justify-start overflow-x-auto rounded-2xl bg-slate-100 p-1">
                  {corporations.map((corporation) => {
                    const corporationId = getCorporationId(corporation);
                    const master = isCorporationMaster(corporation);

                    return (
                      <TabsTrigger
                        key={corporationId}
                        value={corporationId.toString()}
                        className="h-11 flex-none rounded-xl px-4 text-sm data-[state=active]:bg-white"
                      >
                        <Building2 className="h-4 w-4" />
                        {getCorporationName(corporation)}
                        {master && (
                          <Badge className="ml-1 bg-primary/10 px-1.5 py-0 text-[10px] text-primary">
                            MASTER
                          </Badge>
                        )}
                      </TabsTrigger>
                    );
                  })}
                </TabsList>
              </Tabs>
            </CardContent>
          </Card>

          <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-bold">
                {getCorporationName(selectedCorporation)} 구독 정보
              </h2>
              <p className="text-sm text-muted-foreground">
                {isMaster
                  ? "이 회사의 구독 추가, 변경, 해지 요청을 진행할 수 있습니다."
                  : "이 회사에서는 구독 조회만 가능합니다."}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" onClick={() => window.open("/quotation", "_blank")}>
                <FileText className="mr-2 h-4 w-4" />
                견적 받기
              </Button>
              {isMaster && (
                <Button onClick={handleAddSubscription}>
                  <ChevronRight className="mr-1 h-4 w-4" />
                  구독 추가
                </Button>
              )}
            </div>
          </div>

          {!isMaster && (
            <Card className="mb-4 border-slate-200 bg-slate-50">
              <CardContent className="flex gap-3 py-4 text-sm text-slate-600">
                <LockKeyhole className="mt-0.5 h-4 w-4 shrink-0" />
                <p>
                  이 회사의 MASTER가 아니므로 구독 변경 버튼은 표시되지 않습니다. 구독 및
                  카드 관리는 회사별 MASTER만 진행할 수 있습니다.
                </p>
              </CardContent>
            </Card>
          )}

          {isSubscriptionLoading ? (
            <Card className="mb-8 border-2">
              <CardContent className="py-12 text-center text-muted-foreground">
                선택한 회사의 구독 정보를 불러오는 중입니다.
              </CardContent>
            </Card>
          ) : currentSubscriptions.length > 0 ? (
            <div className="mb-8 space-y-4">
              {currentSubscriptions.map((subscription, index) => {
                const plan = plans?.find((item) => item.id === subscription.planId);
                const card = cards?.find((item) => item.cardId === subscription.cardId) as
                  | CardWithCompany
                  | undefined;
                const subscriptionItems = subscription.items || [];

                return (
                  <Card key={subscription.id || index} className="border-2">
                    <CardContent className="pt-6">
                      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                        <div>
                          <div className="mb-2 flex flex-wrap items-center gap-3">
                            <h3 className="text-xl font-bold">
                              {subscription.planName || plan?.name || "구독 서비스"}
                            </h3>
                            {getStatusBadge(subscription)}
                          </div>
                          <p className="text-muted-foreground">
                            {subscription.corporationName || getCorporationName(selectedCorporation)}
                          </p>
                        </div>
                        <div className="text-left md:text-right">
                          <div className="text-2xl font-bold">
                            {formatCurrency(subscription.payment?.totAmount)}
                          </div>
                          <p className="text-sm text-muted-foreground">월 예상 결제금액</p>
                        </div>
                      </div>

                      <div className="mb-6 grid gap-4 md:grid-cols-3">
                        <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
                          <Users className="h-5 w-5 text-primary" />
                          <div>
                            <p className="text-xs text-muted-foreground">사용자 수</p>
                            <p className="font-semibold">{subscription.userCount || 0}명</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
                          <Calendar className="h-5 w-5 text-primary" />
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
                        <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
                          <CreditCard className="h-5 w-5 text-primary" />
                          <div>
                            <p className="text-xs text-muted-foreground">결제 수단</p>
                            <p className="font-semibold">
                              {subscription.cardCompany ||
                                card?.cardCompany ||
                                card?.companyName ||
                                "등록된 카드 없음"}
                            </p>
                          </div>
                        </div>
                      </div>

                      {subscriptionItems.length > 0 && (
                        <div className="mb-6 rounded-2xl border bg-slate-50/60 p-4">
                          <h4 className="mb-3 text-sm font-bold text-slate-900">구독 항목</h4>
                          <div className="space-y-2">
                            {subscriptionItems.map((item, itemIndex) => (
                              <div
                                key={item.id || itemIndex}
                                className="grid gap-2 rounded-xl bg-white px-4 py-3 text-sm md:grid-cols-[1fr_auto_auto]"
                              >
                                <div>
                                  <p className="font-semibold text-slate-900">
                                    {item.isSubService && "└ "}
                                    {getItemName(item)}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {item.quoteOnly ? "견적 문의 항목" : `${item.userCount || 0}명`}
                                  </p>
                                </div>
                                <div className="text-muted-foreground md:text-right">
                                  {item.quoteOnly
                                    ? "견적 문의"
                                    : `${formatCurrency(item.unitPrice ?? item.price)}/인`}
                                </div>
                                <div className="font-semibold md:text-right">
                                  {item.quoteOnly ? "별도 문의" : formatCurrency(getItemAmount(item))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2 border-t pt-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handlePaymentList(subscription.id!)}
                        >
                          결제 내역
                        </Button>
                        {isMaster && !subscription.expireRequestDate && plan?.upgradePlanId && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              router.push(
                                `/subscribe?corporationId=${selectedCorporationId}&subscriptionId=${subscription.id}&upgradePlanId=${plan.upgradePlanId}`,
                              )
                            }
                          >
                            <Zap className="mr-1 h-4 w-4" />
                            플랜 업그레이드
                          </Button>
                        )}
                        {isMaster && !subscription.expireRequestDate && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-destructive hover:bg-destructive/10"
                            onClick={() => handleSubscriptionExpire(subscription.id!)}
                          >
                            멤버십 해지
                          </Button>
                        )}
                        {isMaster && subscription.expireRequestDate && (
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
          ) : (
            <Card className="mb-8 border-2">
              <CardContent className="py-12 text-center">
                <AlertCircle className="mx-auto mb-4 h-12 w-12 text-muted-foreground opacity-50" />
                <h3 className="mb-2 text-lg font-semibold">현재 구독 정보가 없습니다.</h3>
                <p className="mb-6 text-muted-foreground">
                  {isMaster
                    ? "선택한 회사의 서비스를 구독하고 다양한 기능을 이용해보세요."
                    : "선택한 회사에 등록된 구독이 없습니다."}
                </p>
                {isMaster && <Button onClick={handleAddSubscription}>구독하기</Button>}
              </CardContent>
            </Card>
          )}
        </>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <Card
          className="cursor-pointer transition-colors hover:border-primary/50"
          onClick={() => router.push("/support/video")}
        >
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="mb-1 text-lg font-bold">근태관리의 모든 것</h3>
                <p className="text-sm text-muted-foreground">영상으로 쉽게 시작하세요.</p>
              </div>
              <ChevronRight className="h-5 w-5 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card
          className="cursor-pointer transition-colors hover:border-primary/50"
          onClick={() => window.open("https://help.evertime.co.kr", "_blank")}
        >
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="mb-1 text-lg font-bold">도움이 필요하신가요?</h3>
                <p className="text-sm text-muted-foreground">자주 묻는 질문을 확인해보세요.</p>
              </div>
              <ChevronRight className="h-5 w-5 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
