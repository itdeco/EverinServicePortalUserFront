"use client";

import { type ReactNode, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  Building2,
  ChevronDown,
  ChevronRight,
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
  if (status.includes("이용중")) return "border-emerald-200 bg-emerald-50 text-emerald-700";
  if (status.includes("대기")) return "border-sky-200 bg-sky-50 text-sky-700";
  if (status.includes("만료")) return "border-slate-200 bg-slate-100 text-slate-600";

  return "border-slate-200 bg-slate-50 text-slate-600";
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
    <div className="min-h-[calc(100vh-96px)] bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_42%,#f6fffb_100%)]">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-12">
        <section className="mb-6 overflow-hidden rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-3 py-1 text-sm font-semibold text-primary">
                <Layers3 className="h-4 w-4" />
                구독정보
              </div>
              <h1 className="text-3xl font-black tracking-tight text-slate-950 md:text-4xl">
                회사별 구독 현황
              </h1>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600">
                계약정보를 회사별로 묶어 확인하고, 계약별 상세보기에서 서비스와 금액을 확인할 수 있습니다.
              </p>
            </div>

            {profile && (
              <div className="rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-600">
                <p className="font-semibold text-slate-950">{profile.name || "사용자"}</p>
                <p className="mt-1">{profile.loginId}</p>
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
            />
            <SummaryStat
              icon={<CreditCard className="h-5 w-5" />}
              label="총 이용금액"
              value={formatCurrency(totalAmount)}
            />
          </div>
        </section>

        {companyGroups.length === 0 ? (
          <Card className="border-slate-200 bg-white/90 shadow-[0_18px_60px_rgba(15,23,42,0.08)]">
            <CardContent className="py-16 text-center">
              <AlertCircle className="mx-auto mb-4 h-12 w-12 text-slate-400" />
              <h3 className="mb-2 text-lg font-bold text-slate-950">현재 구독 정보가 없습니다.</h3>
              <p className="text-slate-500">조회된 계약 정보가 없습니다.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-5">
            {companyGroups.map((group) => {
              const companyAmount = getAmountTotal(group.details);
              const serviceCount = getServiceCount(group.details);
              const activeCount = group.masters.filter((master) => getUseStatus(master).includes("이용중")).length;

              return (
                <Card
                  key={group.key}
                  className="overflow-hidden border-slate-200/80 bg-white/95 shadow-[0_20px_70px_rgba(15,23,42,0.08)]"
                >
                  <CardHeader className="border-b border-slate-100 bg-[linear-gradient(135deg,#ffffff_0%,#f8fbff_52%,#f0fff9_100%)] p-5 md:p-6">
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex min-w-0 items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                          <Building2 className="h-6 w-6" />
                        </div>
                        <div className="min-w-0">
                          <CardTitle className="truncate text-xl font-black text-slate-950">
                            {group.name}
                          </CardTitle>
                          <div className="mt-2 flex flex-wrap gap-2 text-xs font-medium text-slate-500">
                            {group.totCompanySeq && <span>TotCompanySeq {group.totCompanySeq}</span>}
                            {group.bizCompanySeq && <span>BizCompanySeq {group.bizCompanySeq}</span>}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2 lg:min-w-[420px]">
                        <CompanyMetric label="계약" value={`${group.masters.length}건`} />
                        <CompanyMetric label="서비스" value={`${serviceCount}개`} />
                        <CompanyMetric label="이용금액" value={formatCurrency(companyAmount)} />
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <Badge className="border border-emerald-200 bg-emerald-50 text-emerald-700">
                        이용중 {activeCount}건
                      </Badge>
                      <Badge className="border border-slate-200 bg-white text-slate-600">
                        전체 {group.masters.length}건
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="p-4 md:p-5">
                    <div className="space-y-3">
                      {group.masters.map((master, index) => {
                        const key = getMasterKey(master) || `${group.key}-${index}`;
                        const detailRows = getDetailRows(master, details);
                        const isOpen = openKey === key;
                        const status = getUseStatus(master);

                        return (
                          <div
                            key={key}
                            className="overflow-hidden rounded-2xl border border-slate-200 bg-white transition-colors hover:border-primary/30"
                          >
                            <button
                              type="button"
                              className="grid w-full gap-4 p-4 text-left md:grid-cols-[minmax(0,1.5fr)_180px_140px_44px] md:items-center"
                              onClick={() => setOpenKey(isOpen ? null : key)}
                            >
                              <div className="min-w-0">
                                <div className="mb-2 flex flex-wrap items-center gap-2">
                                  <Badge className={`border ${getStatusBadgeClass(status)}`}>{status}</Badge>
                                  <span className="text-xs font-semibold text-slate-500">
                                    계약번호 {getContractNo(master)}
                                  </span>
                                </div>
                                <p className="truncate text-base font-bold text-slate-950">
                                  {getServiceSummary(detailRows)}
                                </p>
                                <p className="mt-1 text-sm text-slate-500">구독일자 {getContractDate(master)}</p>
                              </div>

                              <div className="text-sm text-slate-600">
                                <p className="font-semibold text-slate-950">서비스 기간</p>
                                <p className="mt-1">{getContractPeriod(master)}</p>
                              </div>

                              <div className="text-sm md:text-right">
                                <p className="font-semibold text-slate-500">금액</p>
                                <p className="mt-1 text-lg font-black text-slate-950">
                                  {formatCurrency(getAmountTotal(detailRows))}
                                </p>
                              </div>

                              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-50 text-slate-500 md:justify-self-end">
                                {isOpen ? (
                                  <ChevronDown className="h-5 w-5" />
                                ) : (
                                  <ChevronRight className="h-5 w-5" />
                                )}
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

function SummaryStat({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
        {icon}
      </div>
      <p className="text-sm font-semibold text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-black tracking-tight text-slate-950">{value}</p>
    </div>
  );
}

function CompanyMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/80 px-3 py-3 text-center">
      <p className="text-xs font-semibold text-slate-500">{label}</p>
      <p className="mt-1 truncate text-sm font-black text-slate-950 md:text-base">{value}</p>
    </div>
  );
}

function DetailTable({ rows }: { rows: BmsRecord[] }) {
  if (rows.length === 0) {
    return (
      <div className="border-t border-slate-100 bg-slate-50/70 p-5 text-sm text-slate-500">
        매칭되는 상세 내역이 없습니다.
      </div>
    );
  }

  return (
    <div className="border-t border-slate-100 bg-slate-50/70 p-4 md:p-5">
      <div className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-900">
        <ReceiptText className="h-4 w-4 text-primary" />
        서비스 상세내역
      </div>
      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
        <Table className="min-w-[680px]">
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead>서비스</TableHead>
              <TableHead className="w-[90px] text-right">인원</TableHead>
              <TableHead className="w-[120px] text-right">단가</TableHead>
              <TableHead className="w-[120px] text-right">금액</TableHead>
              <TableHead className="w-[110px]">적용년월</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index} className="hover:bg-slate-50/70">
                <TableCell className="font-medium">{getServiceName(row)}</TableCell>
                <TableCell className="text-right">{formatQuantity(valueOf(row, ["Qty", "UserCount"]))}</TableCell>
                <TableCell className="text-right">{formatCurrency(valueOf(row, ["Price", "UnitPrice"]))}</TableCell>
                <TableCell className="text-right font-semibold">{formatCurrency(valueOf(row, ["Amt", "Amount"]))}</TableCell>
                <TableCell>{formatYearMonth(valueOf(row, ["PriceAppYm", "AppYm"]))}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
