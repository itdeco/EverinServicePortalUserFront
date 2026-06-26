"use client";

import { useState } from "react";
import { Plus, Trash2, UserPlus, Mail } from "lucide-react";
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
import { CompanyManagementDto } from "@/types/Users";

type Invitee = { name: string; email: string };

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function InviteAdminDialog({
  company,
  open,
  onOpenChange,
  onInvited,
}: {
  company: CompanyManagementDto;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onInvited: () => void;
}) {
  const [invitees, setInvitees] = useState<Invitee[]>([{ name: "", email: "" }]);
  const [submitting, setSubmitting] = useState(false);

  const resetAndClose = () => {
    setInvitees([{ name: "", email: "" }]);
    onOpenChange(false);
  };

  const updateInvitee = (index: number, field: keyof Invitee, value: string) => {
    setInvitees((prev) => prev.map((row, i) => (i === index ? { ...row, [field]: value } : row)));
  };

  const addRow = () => setInvitees((prev) => [...prev, { name: "", email: "" }]);

  const removeRow = (index: number) => {
    setInvitees((prev) => (prev.length === 1 ? prev : prev.filter((_, i) => i !== index)));
  };

  const onSubmit = async () => {
    const filled = invitees.filter((row) => row.name.trim() || row.email.trim());

    if (filled.length === 0) {
      await alertMessage("초대할 관리자의 성함과 이메일을 입력해주세요.");
      return;
    }

    for (const row of filled) {
      if (!row.name.trim()) {
        await alertMessage("성함을 입력해주세요.");
        return;
      }
      if (!EMAIL_REGEX.test(row.email.trim())) {
        await alertMessage(`이메일 형식이 올바르지 않습니다: ${row.email || "(빈 값)"}`);
        return;
      }
    }

    setSubmitting(true);
    try {
      const result = await Api.Users.inviteCompanyAdmins({
        corporationId: company.corporationId!,
        invitees: filled.map((row) => ({ name: row.name.trim(), email: row.email.trim() })),
      });

      if (!checkApiResult(result)) return;

      await alertMessage(`${filled.length}명에게 관리자 초대 메일을 발송했습니다.`);
      resetAndClose();
      onInvited();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(value) => (value ? onOpenChange(true) : resetAndClose())}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-primary" />
            관리자 초대
          </DialogTitle>
          <DialogDescription>
            {company.name} 회사에 추가할 관리자의 성함과 이메일을 입력하세요. 입력한 이메일로 초대 메일이 발송됩니다.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3 py-2">
          <div className="hidden grid-cols-[1fr_1.4fr_auto] gap-2 px-1 text-xs font-medium text-muted-foreground sm:grid">
            <span>성함</span>
            <span>이메일</span>
            <span className="w-8" />
          </div>
          {invitees.map((row, index) => (
            <div key={index} className="grid grid-cols-1 gap-2 sm:grid-cols-[1fr_1.4fr_auto] sm:items-center">
              <div className="sm:hidden">
                <Label className="text-xs text-muted-foreground">성함</Label>
              </div>
              <Input
                placeholder="홍길동"
                value={row.name}
                onChange={(e) => updateInvitee(index, "name", e.target.value)}
              />
              <div className="sm:hidden">
                <Label className="text-xs text-muted-foreground">이메일</Label>
              </div>
              <Input
                type="email"
                placeholder="name@company.com"
                value={row.email}
                onChange={(e) => updateInvitee(index, "email", e.target.value)}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="hidden text-muted-foreground hover:text-destructive sm:inline-flex"
                onClick={() => removeRow(index)}
                disabled={invitees.length === 1}
                aria-label="행 삭제"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              {invitees.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="text-muted-foreground hover:text-destructive sm:hidden"
                  onClick={() => removeRow(index)}
                >
                  <Trash2 className="mr-1 h-4 w-4" />
                  이 항목 삭제
                </Button>
              )}
            </div>
          ))}

          <Button type="button" variant="outline" size="sm" className="self-start" onClick={addRow}>
            <Plus className="mr-1 h-4 w-4" />
            관리자 추가
          </Button>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={resetAndClose} disabled={submitting}>
            취소
          </Button>
          <Button onClick={onSubmit} disabled={submitting}>
            <Mail className="mr-1 h-4 w-4" />
            초대 메일 발송
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
