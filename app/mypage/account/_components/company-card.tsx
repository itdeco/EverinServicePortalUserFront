"use client";

import { useState } from "react";
import { UserPlus, Trash2, CreditCard, Landmark, ShieldCheck, Mail, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Api } from "@/api";
import { checkApiResult } from "@/utils/apiUtil";
import { alertMessage, confirmMessage } from "@/utils/messageBox";
import {
  CompanyAdminDto,
  CompanyAdminStatus,
  CompanyManagementDto,
  CompanyPaymentMethodDto,
  CompanyPaymentMethodType,
} from "@/types/Users";
import { InviteAdminDialog } from "./invite-admin-dialog";
import { AddPaymentDialog } from "./add-payment-dialog";

function describePaymentMethod(method: CompanyPaymentMethodDto) {
  if (method.type === CompanyPaymentMethodType.Cms) {
    const account = method.accountNumber ? ` ${method.accountNumber}` : "";
    const holder = method.accountHolder ? ` [${method.accountHolder}]` : "";
    return `${method.bankName ?? "CMS"}${account}${holder}`;
  }

  const number = method.cardNumber ?? "카드정보 오류";
  return method.cardCompany ? `${method.cardCompany} ${number}` : number;
}

export function CompanyCard({
  company,
  currentUserId,
  onChanged,
}: {
  company: CompanyManagementDto;
  currentUserId?: number;
  onChanged: () => void;
}) {
  const [inviteOpen, setInviteOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const admins = company.admins ?? [];
  const methods = company.paymentMethods ?? [];

  const onDeleteAdmin = async (admin: CompanyAdminDto) => {
    if (currentUserId && admin.userId === currentUserId) {
      await alertMessage("본인은 삭제할 수 없습니다.");
      return;
    }

    const answer = await confirmMessage(`${admin.name || admin.email} 관리자를 삭제하시겠습니까?`);
    if (!answer.isConfirmed) return;

    const result = await Api.Users.deleteCompanyAdmin(company.corporationId!, admin.adminId!);
    if (!checkApiResult(result)) return;

    await alertMessage("관리자가 삭제되었습니다.");
    onChanged();
  };

  const onDeletePaymentMethod = async (method: CompanyPaymentMethodDto) => {
    const answer = await confirmMessage("이 결제수단을 삭제하시겠습니까?");
    if (!answer.isConfirmed) return;

    const result = await Api.Users.deleteCompanyPaymentMethod(company.corporationId!, method.methodId!);
    if (!checkApiResult(result)) return;

    await alertMessage("결제수단이 삭제되었습니다.");
    onChanged();
  };

  return (
    <Card className="gap-0 overflow-hidden border-border/70 py-0 shadow-sm">
      {/* 회사 헤더 */}
      <div className="border-b bg-muted/40 px-5 py-3.5">
        <h3 className="text-base font-bold text-foreground">
          {company.name}
          {company.businessNo ? ` (${company.businessNo})` : ""}
        </h3>
      </div>

      <CardContent className="flex flex-col gap-6 p-5">
        {/* 관리자 목록 */}
        <section>
          <div className="mb-3 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" />
              관리자 ({admins.length})
            </div>
            <Button size="sm" variant="outline" onClick={() => setInviteOpen(true)}>
              <UserPlus className="mr-1 h-4 w-4" />
              관리자 초대
            </Button>
          </div>
          {admins.length === 0 ? (
            <p className="rounded-lg bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
              등록된 관리자가 없습니다.
            </p>
          ) : (
            <div className="flex flex-col gap-2">
              {admins.map((admin) => {
                const isSelf = !!currentUserId && admin.userId === currentUserId;
                return (
                  <div
                    key={admin.adminId}
                    className="flex items-center justify-between gap-3 rounded-lg border border-border/60 bg-card px-4 py-3"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <Mail className="h-4 w-4 text-primary" />
                      </span>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="truncate text-sm font-semibold text-foreground">{admin.name}</span>
                          {isSelf && <span className="text-xs text-muted-foreground">(본인)</span>}
                        </div>
                        <p className="truncate text-xs text-muted-foreground">{admin.email}</p>
                      </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      {admin.status === CompanyAdminStatus.Invited ? (
                        <Badge variant="secondary" className="border-0 bg-amber-100 font-medium text-amber-700">
                          초대됨
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="border-0 bg-primary/10 font-medium text-primary">
                          활성
                        </Badge>
                      )}
                      {!isSelf && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => onDeleteAdmin(admin)}
                          aria-label="관리자 삭제"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* 결제수단 목록 */}
        <section>
          <div className="mb-3 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
              <CreditCard className="h-3.5 w-3.5 text-primary" />
              결제수단 ({methods.length})
            </div>
            <Button size="sm" variant="outline" onClick={() => setPaymentOpen(true)}>
              <Plus className="mr-1 h-4 w-4" />
              결제수단 등록
            </Button>
          </div>
          {methods.length === 0 ? (
            <p className="rounded-lg bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
              등록된 결제수단이 없습니다.
            </p>
          ) : (
            <div className="flex flex-col gap-2">
              {methods.map((method) => (
                <div
                  key={method.methodId}
                  className="flex items-center justify-between gap-3 rounded-lg border border-border/60 bg-card px-4 py-3"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted">
                      {method.type === CompanyPaymentMethodType.Cms ? (
                        <Landmark className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                      )}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-foreground">{describePaymentMethod(method)}</p>
                      <p className="text-xs text-muted-foreground">
                        {method.type === CompanyPaymentMethodType.Cms ? "CMS(계좌이체)" : "신용카드"}
                      </p>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    {method.primary === 1 && (
                      <Badge variant="secondary" className="border-0 bg-primary/10 font-medium text-primary">
                        기본
                      </Badge>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={() => onDeletePaymentMethod(method)}
                      aria-label="결제수단 삭제"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </CardContent>

      <InviteAdminDialog
        company={company}
        open={inviteOpen}
        onOpenChange={setInviteOpen}
        onInvited={onChanged}
      />
      <AddPaymentDialog
        company={company}
        open={paymentOpen}
        onOpenChange={setPaymentOpen}
        onAdded={onChanged}
      />
    </Card>
  );
}
