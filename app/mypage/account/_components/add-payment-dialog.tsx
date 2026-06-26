"use client";

import { useState } from "react";
import { CreditCard, Landmark, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Api } from "@/api";
import { checkApiResult } from "@/utils/apiUtil";
import { alertMessage } from "@/utils/messageBox";
import {
  CompanyManagementDto,
  CompanyPaymentMethodType,
} from "@/types/Users";

export function AddPaymentDialog({
  company,
  open,
  onOpenChange,
  onAdded,
}: {
  company: CompanyManagementDto;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdded: () => void;
}) {
  const [type, setType] = useState<CompanyPaymentMethodType>(CompanyPaymentMethodType.Card);
  const [submitting, setSubmitting] = useState(false);

  // 카드
  const [cardCompany, setCardCompany] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expMonth, setExpMonth] = useState("");
  const [expYear, setExpYear] = useState("");
  // CMS
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountHolder, setAccountHolder] = useState("");

  const reset = () => {
    setType(CompanyPaymentMethodType.Card);
    setCardCompany("");
    setCardNumber("");
    setExpMonth("");
    setExpYear("");
    setBankName("");
    setAccountNumber("");
    setAccountHolder("");
  };

  const resetAndClose = () => {
    reset();
    onOpenChange(false);
  };

  const onSubmit = async () => {
    if (type === CompanyPaymentMethodType.Card) {
      if (!cardCompany.trim() || !cardNumber.trim()) {
        await alertMessage("카드사와 카드번호를 입력해주세요.");
        return;
      }
    } else {
      if (!bankName.trim() || !accountNumber.trim() || !accountHolder.trim()) {
        await alertMessage("은행, 계좌번호, 예금주를 입력해주세요.");
        return;
      }
    }

    setSubmitting(true);
    try {
      const result = await Api.Users.addCompanyPaymentMethod({
        corporationId: company.corporationId!,
        type,
        ...(type === CompanyPaymentMethodType.Card
          ? {
              cardCompany: cardCompany.trim(),
              cardNumber: cardNumber.trim(),
              expirationMonth: expMonth.trim(),
              expirationYear: expYear.trim(),
            }
          : {
              bankName: bankName.trim(),
              accountNumber: accountNumber.trim(),
              accountHolder: accountHolder.trim(),
            }),
      });

      if (!checkApiResult(result)) return;

      await alertMessage("결제수단이 등록되었습니다.");
      resetAndClose();
      onAdded();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(value) => (value ? onOpenChange(true) : resetAndClose())}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-primary" />
            결제수단 등록
          </DialogTitle>
          <DialogDescription>
            {company.name} 회사에서 사용할 결제수단을 등록하세요.
          </DialogDescription>
        </DialogHeader>

        {/* 결제수단 종류 선택 */}
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setType(CompanyPaymentMethodType.Card)}
            className={`flex items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium transition-colors ${
              type === CompanyPaymentMethodType.Card
                ? "border-primary bg-primary/5 text-primary"
                : "border-border text-muted-foreground hover:bg-muted/40"
            }`}
          >
            <CreditCard className="h-4 w-4" />
            신용카드
          </button>
          <button
            type="button"
            onClick={() => setType(CompanyPaymentMethodType.Cms)}
            className={`flex items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium transition-colors ${
              type === CompanyPaymentMethodType.Cms
                ? "border-primary bg-primary/5 text-primary"
                : "border-border text-muted-foreground hover:bg-muted/40"
            }`}
          >
            <Landmark className="h-4 w-4" />
            CMS(계좌이체)
          </button>
        </div>

        {/* 입력 폼 */}
        {type === CompanyPaymentMethodType.Card ? (
          <div className="flex flex-col gap-3 py-1">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="cardCompany">카드사</Label>
              <Input id="cardCompany" placeholder="신한카드" value={cardCompany} onChange={(e) => setCardCompany(e.target.value)} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="cardNumber">카드번호</Label>
              <Input id="cardNumber" placeholder="0000-0000-0000-0000" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="expMonth">유효월(MM)</Label>
                <Input id="expMonth" placeholder="12" maxLength={2} value={expMonth} onChange={(e) => setExpMonth(e.target.value)} />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="expYear">유효년(YY)</Label>
                <Input id="expYear" placeholder="28" maxLength={2} value={expYear} onChange={(e) => setExpYear(e.target.value)} />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3 py-1">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="bankName">은행</Label>
              <Input id="bankName" placeholder="국민은행" value={bankName} onChange={(e) => setBankName(e.target.value)} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="accountNumber">계좌번호</Label>
              <Input id="accountNumber" placeholder="123456-78-901234" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="accountHolder">예금주</Label>
              <Input id="accountHolder" placeholder="홍길동" value={accountHolder} onChange={(e) => setAccountHolder(e.target.value)} />
            </div>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={resetAndClose} disabled={submitting}>
            취소
          </Button>
          <Button onClick={onSubmit} disabled={submitting}>
            <Plus className="mr-1 h-4 w-4" />
            등록
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
