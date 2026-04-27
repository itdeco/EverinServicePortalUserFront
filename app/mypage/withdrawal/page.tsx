"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AlertTriangle, UserMinus, MessageCircle, ChevronLeft, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Api } from "@/api";
import { checkApiResult } from "@/utils/apiUtil";
import { useLoginStatus, useUserProfile } from "@/redux/selectors/Users";
import { UserActions } from "@/redux/actions/Users";
import { PlanActions } from "@/redux/actions/Plans";
import { WithdrawalLogDto, WithdrawalReason } from "@/types/Users";
import { alertMessage, confirmMessage } from "@/utils/messageBox";
import TokenUtil from "../../../src/utils/tokenUtil";

const withdrawalReasons = [
  { value: WithdrawalReason.ServiceComplain, label: "서비스 품질불만" },
  { value: WithdrawalReason.LowUse, label: "이용빈도 낮음" },
  { value: WithdrawalReason.Privacy, label: "개인정보 유출우려" },
  { value: WithdrawalReason.ASComplain, label: "A/S불만" },
  { value: WithdrawalReason.Etc, label: "기타사유" },
];

export default function WithdrawalPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const isLoggedIn = useLoginStatus();
  const profile = useUserProfile();
  
  const [withdrawal, setWithdrawal] = useState<WithdrawalLogDto>({
    userId: profile?.userId,
    reason: WithdrawalReason.ServiceComplain,
    cancel: 0,
  });
  const [description, setDescription] = useState("");
  const [agree, setAgree] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const logout = () => {
    dispatch(UserActions.setUserProfile({}));
    dispatch(UserActions.setCorporations(null));
    dispatch(UserActions.setSubscriptions(null));
    dispatch(UserActions.setCards(null));
    dispatch(PlanActions.setPlans(null));
    TokenUtil.setToken(null);
    window.location.href = "/";
  };

  const handleReasonChange = (value: string) => {
    setWithdrawal({
      ...withdrawal,
      reason: parseInt(value),
    });
  };

  const handleSubmit = async () => {
    const answer = await confirmMessage("에버타임 서비스 포털을 탈퇴하시겠습니까?");
    if (!answer.isConfirmed) return;

    setIsSubmitting(true);
    
    const result = await Api.Users.withdrawal({
      ...withdrawal,
      description: description,
    });
    
    if (!checkApiResult(result)) {
      setIsSubmitting(false);
      return;
    }

    await alertMessage("탈퇴 처리되었습니다.");
    logout();
  };

  if (!isLoggedIn) {
    router.replace("/login");
    return null;
  }

  return (
    <div className="px-4 py-8 md:px-8 md:py-12 max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Button 
          variant="ghost" 
          size="sm" 
          className="mb-4"
          onClick={() => router.push("/mypage/account")}
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          계정정보로 돌아가기
        </Button>
        <h1 className="text-3xl font-bold text-foreground mb-2">회원탈퇴</h1>
        <p className="text-muted-foreground">
          서비스 포털을 사용하시면서 불편한 점이 있으셨나요?
          <br />
          개선할 점을 말씀해 주시면 적극적으로 검토, 반영할 수 있도록 하겠습니다.
        </p>
      </div>

      {/* Withdrawal Form */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-primary" />
            탈퇴사유 확인 <span className="text-destructive">*</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <RadioGroup
            value={withdrawal.reason?.toString()}
            onValueChange={handleReasonChange}
            className="grid grid-cols-2 md:grid-cols-3 gap-3"
          >
            {withdrawalReasons.map((reason) => (
              <div
                key={reason.value}
                className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <RadioGroupItem value={reason.value.toString()} id={`reason-${reason.value}`} />
                <Label htmlFor={`reason-${reason.value}`} className="cursor-pointer flex-1">
                  {reason.label}
                </Label>
              </div>
            ))}
          </RadioGroup>

          {withdrawal.reason === WithdrawalReason.Etc && (
            <div className="space-y-2">
              <Label htmlFor="description">탈퇴 사유를 간략히 적어주세요</Label>
              <Textarea
                id="description"
                placeholder="탈퇴사유를 간략히 적어주세요"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Warning Section */}
      <Card className="mb-6 border-destructive/30 bg-destructive/5">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2 text-destructive">
            <AlertTriangle className="w-5 h-5" />
            유의사항
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <p className="leading-relaxed">
            탈퇴 시 서비스에 있는 회원정보 데이터는 파기되어 복구할 수 없습니다.
          </p>
          <p className="leading-relaxed">다음의 경우는 회원탈퇴에 주의가 필요합니다:</p>
          <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
            <li>현재 고객님의 결제관련 처리사항이 완료되지 않은 경우, 처리 완료 후 탈퇴 가능합니다.</li>
            <li>진행 중인 구독이 있는 경우, 구독 해지 후 탈퇴 가능합니다.</li>
            <li>미납된 요금이 있는 경우, 결제 완료 후 탈퇴 가능합니다.</li>
          </ul>
        </CardContent>
      </Card>

      {/* Agreement & Submit */}
      <Card>
        <CardContent className="pt-6 space-y-6">
          <div className="flex items-start space-x-3 p-4 bg-muted/30 rounded-lg">
            <Checkbox
              id="agree"
              checked={agree}
              onCheckedChange={(checked) => setAgree(checked === true)}
            />
            <Label htmlFor="agree" className="cursor-pointer text-sm leading-relaxed">
              회원탈퇴에 관한 모든 내용을 숙지하였고, 회원 탈퇴를 신청합니다.
            </Label>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => router.push("/mypage/account")}
            >
              취소
            </Button>
            <Button
              variant="destructive"
              className="flex-1"
              disabled={!agree || isSubmitting}
              onClick={handleSubmit}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                  처리 중...
                </>
              ) : (
                <>
                  <UserMinus className="w-4 h-4 mr-2" />
                  탈퇴신청
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Help Text */}
      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground mb-2">탈퇴 관련 문의가 있으신가요?</p>
        <Button variant="link" onClick={() => router.push("/support/contact")}>
          고객센터 문의하기
        </Button>
      </div>
    </div>
  );
}
