"use client";

import { type ReactNode, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  Building2,
  ChevronDown,
  CircleCheck,
  CreditCard,
  Layers3,
  ReceiptText,
} from "lucide-react";
import { Api } from "@/api";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useLoginStatus, useUserProfile } from "@/redux/selectors/Users";

type BmsRecord = Record<string, any>;

type BmsSubscriptionPayload = {
  DataBlock1?: BmsRecord[];
  DataBlock2?: BmsRecord[];
};

function valueOf(record: BmsRecord | undefined, keys: string[]) {
  if (!record) return undefined;

  for (const key of keys) {
    const value = record[key];
    if (value !== undefined && value !== null && value !== "") {
      return value;
    }
  }

  return undefined;
}

function normalizePayload(payload: any): BmsSubscriptionPayload {
  if (!payload) return {};

  const source = payload.ROOT || payload.root || payload;
  const data = source.data?.ROOT || source.data || source;

  return {
    DataBlock1: data.DataBlock1 || data.datablock1 || data.master || [],
    DataBlock2: data.DataBlock2 || data.datablock2 || data.detail || [],
  };
}

function formatDate(value: any) {
  if (!value) return "-";

  const text = String(value).trim();
  if (/^\d{6}$/.test(text)) {
    return `${text.slice(0, 4)}-${text.slice(4, 6)}`;
  }

  if (/^\d{8}$/.test(text)) {
    return `${text.slice(0, 4)}-${text.slice(4, 6)}-${text.slice(6, 8)}`;
  }

  const date = new Date(value);
  if (!Number.isNaN(date.getTime())) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  return text;
}

function formatYearMonth(value: any) {
  if (!value) return "-";

  const text = String(value).trim();
  if (/^\d{6}$/.test(text)) {
    return `${text.slice(0, 4)}-${text.slice(4, 6)}`;
  }

  if (/^\d{8}$/.test(text)) {
    return `${text.slice(0, 4)}-${text.slice(4, 6)}`;
  }

  const date = new Date(value);
  if (!Number.isNaN(date.getTime())) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    return `${year}-${month}`;
  }

  return text;
}

function formatCurrency(value: any) {
  const amount = Number(value || 0);
  if (!amount) return "무료";
  return `₩${amount.toLocaleString()}`;
}

function getCompanyName(master: BmsRecord) {
  return (
    valueOf(master, [
      "CompanyName",
      "BizCompanyName",
      "CorporationName",
      "CorpName",
      "ClientName",
      "CustName",
    ]) || "-"
  );
}

function getContractDate(master: BmsRecord) {
  return formatDate(valueOf(master, ["ContDate", "ContractDate", "RegDate", "SubscribeDate"]));
}

function getServiceStartDate(record: BmsRecord) {
  return formatDate(valueOf(record, ["ServiceStartDate", "SvcStartDate", "UseStartDate", "StartDate"]));
}

function getServiceEndDate(record: BmsRecord) {
  return formatDate(valueOf(record, ["ServiceEndDate", "SvcEndDate", "UseEndDate", "EndDate", "ExpireDate"]));
}

function getUseStatus(master: BmsRecord) {
  const textStatus = valueOf(master, ["ContStatusName", "UseStatusName", "StatusName", "ServiceStatusName"]);
  if (textStatus) return String(textStatus);

  const status = Number(valueOf(master, ["ContStatus", "Status", "UseStatus"]));
  if (status === 0) return "이용중";
  if (status === 1) return "이용대기";
  if (status === 9) return "만료";

  return "-";
}

function getMasterKey(master: BmsRecord) {
  return [
    valueOf(master, ["TotCompanySeq"]),
    valueOf(master, ["ContSeq"]),
    valueOf(master, ["ContNo"]),
    valueOf(master, ["BizCompanySeq"]),
  ]
    .filter((item) => item !== undefined)
    .join("-");
}

function isSameContract(master: BmsRecord, detail: BmsRecord) {
  const masterTotCompanySeq = valueOf(master, ["TotCompanySeq"]);
  const detailTotCompanySeq = valueOf(detail, ["TotCompanySeq"]);
  if (masterTotCompanySeq && detailTotCompanySeq && masterTotCompanySeq !== detailTotCompanySeq) {
    return false;
  }

  const masterContSeq = valueOf(master, ["ContSeq"]);
  const detailContSeq = valueOf(detail, ["ContSeq"]);
  if (masterContSeq && detailContSeq) return masterContSeq === detailContSeq;

  const masterContNo = valueOf(master, ["ContNo"]);
  const detailContNo = valueOf(detail, ["ContNo"]);
  if (masterContNo && detailContNo) return masterContNo === detailContNo;

  return masterTotCompanySeq && detailTotCompanySeq
    ? masterTotCompanySeq === detailTotCompanySeq
    : false;
}

function getServiceName(detail: BmsRecord) {
  const serviceName = valueOf(detail, [
    "ServiceItemName",
    "ServiceName",
    "ProductName",
    "PlanProductName",
    "ItemName",
  ]);
  const subServiceName = valueOf(detail, ["SubServiceItemName", "SubServiceName"]);
  const subServiceSeq = Number(valueOf(detail, ["SubServiceItemSeq"]));

  if (subServiceName && subServiceSeq !== -1) {
    return `${serviceName || "서비스"} > ${subServiceName}`;
  }

  return serviceName || "서비스";
}

function getServiceSummary(details: BmsRecord[]) {
  if (details.length === 0) return "-";

  const names = Array.from(new Set(details.map(getServiceName)));
  return names.join(", ");
}

function getDetailRows(master: BmsRecord, details: BmsRecord[]) {
  return details.filter((detail) => isSameContract(master, detail));
}

function getCompanyKey(master: BmsRecord) {
  return [
    valueOf(master, ["TotCompanySeq"]),
    valueOf(master, ["BizCompanySeq"]),
    getCompanyName(master),
  ]
    .filter((item) => item !== undefined && item !== "-")
    .join("-");
}

function isSameCompany(master: BmsRecord, detail: BmsRecord) {
  const masterTotCompanySeq = valueOf(master, ["TotCompanySeq"]);
  const detailTotCompanySeq = valueOf(detail, ["TotCompanySeq"]);
  const masterBizCompanySeq = valueOf(master, ["BizCompanySeq"]);
  const detailBizCompanySeq = valueOf(detail, ["BizCompanySeq"]);

  if (masterTotCompanySeq && detailTotCompanySeq && masterTotCompanySeq !== detailTotCompanySeq) {
    return false;
  }

  if (masterBizCompanySeq && detailBizCompanySeq) {
    return masterBizCompanySeq === detailBizCompanySeq;
  }

  return masterTotCompanySeq && detailTotCompanySeq
    ? masterTotCompanySeq === detailTotCompanySeq
    : false;
}

function getAmountTotal(rows: BmsRecord[]) {
  return rows.reduce((total, row) => total + Number(valueOf(row, ["Amt", "Amount"]) || 0), 0);
}

function getServiceCount(rows: BmsRecord[]) {
  return new Set(rows.map(getServiceName)).size;
}

function getContractNo(master: BmsRecord) {
  return valueOf(master, ["ContNo", "ContractNo"]) || "-";
}

function getContractPeriod(master: BmsRecord) {
  return `${getServiceStartDate(master)} - ${getServiceEndDate(master)}`;
}

function getStatusBadgeClass(status: string) {
  if (status.includes("이용중")) return "border-transparent bg-primary/10 text-primary";
  if (status.includes("대기")) return "border-transparent bg-sky-100 text-sky-700";
  if (status.includes("만료")) return "border-transparent bg-muted text-muted-foreground";

  return "border-transparent bg-muted text-muted-foreground";
}

function formatQuantity(value: any) {
  const quantity = Number(value);
  if (!Number.isFinite(quantity)) return "-";

  return quantity.toLocaleString("ko-KR", {
    maximumFractionDigits: 2,
  });
}

function buildCompanyGroups(masters: BmsRecord[], details: BmsRecord[]) {
  return masters.map((master) => {
    const companyDetails = details.filter((detail) => isSameCompany(master, detail));
    return {
      key: getCompanyKey(master),
      name: getCompanyName(master),
      totCompanySeq: valueOf(master, ["TotCompanySeq"]),
      bizCompanySeq: valueOf(master, ["BizCompanySeq"]),
      masters: [] as BmsRecord[],
      details: companyDetails,
    };
  }).reduce((groups, current, index) => {
    const key = current.key || `company-${index}`;
    const found = groups.find((group) => group.key === key);

    if (found) {
      found.masters.push(masters[index]);
      found.details = Array.from(new Set([...found.details, ...current.details]));
      return groups;
    }

    groups.push({
      ...current,
      key,
      masters: [masters[index]],
    });
    return groups;
  }, [] as Array<{
    key: string;
    name: string;
    totCompanySeq: any;
    bizCompanySeq: any;
    masters: BmsRecord[];
    details: BmsRecord[];
  }>);
}

export default function SubscriptionPage() {
  const router = useRouter();
  const isLoggedIn = useLoginStatus();
  const profile = useUserProfile();
  const [isLoading, setIsLoading] = useState(true);
  const [payload, setPayload] = useState<BmsSubscriptionPayload>({});
  const [openKey, setOpenKey] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/login");
      return;
    }

    const loadData = async () => {
      setIsLoading(true);

      try {
        const totUserSeq = Number(profile?.totUserSeq);

        if (!Number.isFinite(totUserSeq) || totUserSeq <= 0) {
          setPayload({});
          return;
        }

        const result = await Api.Subscribe.getContractList(totUserSeq);
        const nextPayload = normalizePayload(result);

        setPayload(nextPayload);
      } catch (error) {
        console.error("BMS 구독 계약 조회 오류", error);
        setPayload({});
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [isLoggedIn, profile, router]);

  const masters = useMemo(() => payload.DataBlock1 || [], [payload]);
  const details = useMemo(() => payload.DataBlock2 || [], [payload]);
  const companyGroups = useMemo(() => buildCompanyGroups(masters, details), [masters, details]);
  const activeContractCount = useMemo(
    () => masters.filter((master) => getUseStatus(master).includes("이용중")).length,
    [masters]
  );
  const totalAmount = useMemo(() => getAmountTotal(details), [details]);

  if (!isLoggedIn) return null;

  if (isLoading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center px-4">
        <div className="flex flex-col items-center gap-5 text-center">
          <div className="relative flex h-16 w-16 items-center justify-center">
            <span className="absolute inset-0 animate-ping rounded-full bg-primary/15" />
            <span className="absolute inset-0 rounded-full border border-primary/20" />
            <div className="h-9 w-9 animate-spin rounded-full border-[3px] border-primary/25 border-t-primary" />
          </div>
          <div className="space-y-1">
            <p className="text-base font-semibold text-foreground">구독 정보를 불러오는 중</p>
            <p className="text-sm text-muted-foreground">잠시만 기다려 주세요</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-96px)] bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-12">
        <header className="mb-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold tracking-wide text-primary">
                <Layers3 className="h-3.5 w-3.5" />
                SUBSCRIPTION
              </div>
              <h1 className="text-pretty text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                회사별 구독 현황
              </h1>
              <p className="max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
                계약 정보를 회사별로 묶어 확인하고, 계약을 펼치면 서비스와 금액을 한눈에 볼 수 있어요.
              </p>
            </div>

            {profile && (
              <div className="flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  {(profile.name || "U").slice(0, 1)}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-foreground">{profile.name || "사용자"}</p>
                  <p className="truncate text-xs text-muted-foreground">{profile.loginId}</p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-3">
            <SummaryStat
              icon={<Building2 className="h-5 w-5" />}
              label="회사"
              value={`${companyGroups.length.toLocaleString()}개`}
            />
            <SummaryStat
              icon={<CircleCheck className="h-5 w-5" />}
              label="이용중 계약"
              value={`${activeContractCount.toLocaleString()}건`}
              highlight
            />
            <SummaryStat
              icon={<CreditCard className="h-5 w-5" />}
              label="총 이용금액"
              value={formatCurrency(totalAmount)}
            />
          </div>
        </header>

        {companyGroups.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-border bg-card py-20 text-center">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
              <AlertCircle className="h-7 w-7" />
            </div>
            <h3 className="mb-1.5 text-lg font-bold text-foreground">구독 정보가 없습니다</h3>
            <p className="text-sm text-muted-foreground">조회된 계약 정보가 아직 없어요.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {companyGroups.map((group) => {
              const companyAmount = getAmountTotal(group.details);
              const serviceCount = getServiceCount(group.details);
              const activeCount = group.masters.filter((master) => getUseStatus(master).includes("이용중")).length;

              return (
                <Card
                  key={group.key}
                  className="overflow-hidden rounded-3xl border-border bg-card shadow-sm transition-shadow hover:shadow-md"
                >
                  <CardHeader className="gap-5 border-b border-border/70 p-5 md:p-6">
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex min-w-0 items-center gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-inset ring-primary/15">
                          <Building2 className="h-6 w-6" />
                        </div>
                        <div className="min-w-0">
                          <CardTitle className="truncate text-lg font-bold text-foreground md:text-xl">
                            {group.name}
                          </CardTitle>
                          <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                            <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                              이용중 {activeCount}건
                            </span>
                            <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                              전체 {group.masters.length}건
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2 lg:min-w-[400px]">
                        <CompanyMetric label="계약" value={`${group.masters.length}건`} />
                        <CompanyMetric label="서비스" value={`${serviceCount}개`} />
                        <CompanyMetric label="이용금액" value={formatCurrency(companyAmount)} />
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="p-3 md:p-4">
                    <div className="space-y-2.5">
                      {group.masters.map((master, index) => {
                        const key = getMasterKey(master) || `${group.key}-${index}`;
                        const detailRows = getDetailRows(master, details);
                        const isOpen = openKey === key;
                        const status = getUseStatus(master);

                        return (
                          <div
                            key={key}
                            className={`overflow-hidden rounded-2xl border bg-card transition-all ${
                              isOpen
                                ? "border-primary/40 ring-1 ring-primary/10"
                                : "border-border hover:border-primary/30 hover:bg-muted/40"
                            }`}
                          >
                            <button
                              type="button"
                              className="grid w-full gap-4 p-4 text-left md:grid-cols-[minmax(0,1.5fr)_190px_150px_40px] md:items-center"
                              onClick={() => setOpenKey(isOpen ? null : key)}
                            >
                              <div className="min-w-0">
                                <div className="mb-2 flex flex-wrap items-center gap-2">
                                  <Badge className={`border font-semibold ${getStatusBadgeClass(status)}`}>{status}</Badge>
                                  <span className="text-xs font-medium text-muted-foreground">
                                    계약번호 {getContractNo(master)}
                                  </span>
                                </div>
                                <p className="truncate text-base font-bold text-foreground">
                                  {getServiceSummary(detailRows)}
                                </p>
                                <p className="mt-1 text-xs text-muted-foreground">구독일자 {getContractDate(master)}</p>
                              </div>

                              <div className="text-sm">
                                <p className="text-xs font-medium text-muted-foreground">서비스 기간</p>
                                <p className="mt-1 font-medium text-foreground">{getContractPeriod(master)}</p>
                              </div>

                              <div className="text-sm md:text-right">
                                <p className="text-xs font-medium text-muted-foreground">금액</p>
                                <p className="mt-1 text-lg font-bold text-foreground">
                                  {formatCurrency(getAmountTotal(detailRows))}
                                </p>
                              </div>

                              <span
                                className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors md:justify-self-end ${
                                  isOpen ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                                }`}
                              >
                                <ChevronDown
                                  className={`h-5 w-5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                                />
                              </span>
                            </button>

                            {isOpen && <DetailTable rows={detailRows} />}
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function SummaryStat({
  icon,
  label,
  value,
  highlight = false,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border p-5 transition-colors ${
        highlight ? "border-primary/30 bg-primary/5" : "border-border bg-card hover:border-primary/30"
      }`}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <span
          className={`flex h-9 w-9 items-center justify-center rounded-xl ${
            highlight ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
          }`}
        >
          {icon}
        </span>
      </div>
      <p className="mt-3 text-2xl font-bold tracking-tight text-foreground md:text-3xl">{value}</p>
    </div>
  );
}

function CompanyMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-muted/60 px-3 py-2.5 text-center">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p className="mt-0.5 truncate text-sm font-bold text-foreground md:text-base">{value}</p>
    </div>
  );
}

function DetailTable({ rows }: { rows: BmsRecord[] }) {
  if (rows.length === 0) {
    return (
      <div className="border-t border-border bg-muted/40 px-5 py-4 text-sm text-muted-foreground">
        매칭되는 상세 내역이 없습니다.
      </div>
    );
  }

  return (
    <div className="border-t border-border bg-muted/40 p-4 md:p-5">
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
        <ReceiptText className="h-4 w-4 text-primary" />
        서비스 상세내역
      </div>
      <div className="overflow-x-auto rounded-2xl border border-border bg-card">
        <Table className="min-w-[680px]">
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">서비스</TableHead>
              <TableHead className="w-[90px] text-right text-xs font-semibold uppercase tracking-wide text-muted-foreground">인원</TableHead>
              <TableHead className="w-[120px] text-right text-xs font-semibold uppercase tracking-wide text-muted-foreground">단가</TableHead>
              <TableHead className="w-[120px] text-right text-xs font-semibold uppercase tracking-wide text-muted-foreground">금액</TableHead>
              <TableHead className="w-[110px] text-xs font-semibold uppercase tracking-wide text-muted-foreground">적용년월</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index} className="border-border/60 hover:bg-muted/40">
                <TableCell className="font-medium text-foreground">{getServiceName(row)}</TableCell>
                <TableCell className="text-right text-muted-foreground">{formatQuantity(valueOf(row, ["Qty", "UserCount"]))}</TableCell>
                <TableCell className="text-right text-muted-foreground">{formatCurrency(valueOf(row, ["Price", "UnitPrice"]))}</TableCell>
                <TableCell className="text-right font-semibold text-foreground">{formatCurrency(valueOf(row, ["Amt", "Amount"]))}</TableCell>
                <TableCell className="text-muted-foreground">{formatYearMonth(valueOf(row, ["PriceAppYm", "AppYm"]))}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
