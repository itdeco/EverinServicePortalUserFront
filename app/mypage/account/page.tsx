"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { User, Mail, Lock, Phone, Edit2, ChevronRight, UserMinus, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Api } from "@/api";
import { checkApiResult } from "@/utils/apiUtil";
import { useLoginStatus, useUserProfile } from "@/redux/selectors/Users";
import { UserActions } from "@/redux/actions/Users";
import { CompanyManagementDto, UserStatusType } from "@/types/Users";
import { alertMessage, confirmMessage } from "@/utils/messageBox";
import CommonUtil from "@/utils/commonUtil";
import { CompanyCard } from "./_components/company-card";

function Loading() {
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

function AccountContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  const dispatch = useDispatch();
  const isLoggedIn = useLoginStatus();
  const profile = useUserProfile();

  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(tab === "1" || tab === "company" ? "company" : "account");
  const [companies, setCompanies] = useState<CompanyManagementDto[]>([]);
  const [companiesLoaded, setCompaniesLoaded] = useState(false);

  const loadCompanies = async () => {
    const result = await Api.Users.getMyCompanyManagement();
    if (!checkApiResult(result)) return;
    setCompanies((result?.payload as CompanyManagementDto[]) ?? []);
    setCompaniesLoaded(true);
  };

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/login");
      return;
    }

    const loadData = async () => {
      setIsLoading(true);
      try {
        await loadCompanies();
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [isLoggedIn]);

  const onWithdrawalClick = () => {
    router.push("/mypage/withdrawal");
  };

  const onCancelDelegationRequest = async () => {
    const answer = await confirmMessage("권한위임 요청을 취소하시겠습니까?");
    if (!answer.isConfirmed) return;

    const result = await Api.Users.cancelDelegationRequest();
    if (!checkApiResult(result)) return;

    await alertMessage("권한위임 요청이 취소되었습니다");
    const newProfile = { ...profile, status: UserStatusType.Normal };
    dispatch(UserActions.setUserProfile(newProfile));
  };

  if (!isLoggedIn) return null;
  if (isLoading) return <Loading />;

  return (
    <div className="px-4 py-8 md:px-8 md:py-12 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">계정정보</h1>
        <p className="text-muted-foreground">
          현재 사용중인 서비스의 계정과 회사별 관리자 및 결제수단을 관리하실 수 있습니다.
        </p>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="account" className="gap-2">
            <User className="w-4 h-4" />
            계정
          </TabsTrigger>
          <TabsTrigger value="company" className="gap-2">
            <Building2 className="w-4 h-4" />
            회사
          </TabsTrigger>
        </TabsList>

        {/* 계정 Tab */}
        <TabsContent value="account">
          <Card>
            <CardContent className="pt-6 space-y-4">
              {/* 사용자 */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-3">
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
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">이메일</p>
                    <p className="font-semibold">{profile?.loginId}</p>
                  </div>
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

              {/* 권한위임 요청 취소 (요청 상태일 때만) */}
              {UserStatusType.DelegationRequest === profile?.status && (
                <div className="flex justify-end">
                  <Button variant="secondary" size="sm" onClick={onCancelDelegationRequest}>
                    권한위임 요청취소
                  </Button>
                </div>
              )}

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

        {/* 회사 Tab */}
        <TabsContent value="company">
          {companiesLoaded && companies.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                  <Building2 className="h-6 w-6 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground">소속된 회사가 없습니다.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="flex flex-col gap-5">
              {companies.map((company) => (
                <CompanyCard key={company.corporationId} company={company} onChanged={loadCompanies} />
              ))}
            </div>
          )}
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
    <Suspense fallback={<Loading />}>
      <AccountContent />
    </Suspense>
  );
}
