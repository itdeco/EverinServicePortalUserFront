"use client";

import { Fragment, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  Calendar,
  ChevronDown,
  ChevronRight,
  FileText,
  Layers3,
} from "lucide-react";
import { Api } from "@/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { checkApiResult } from "@/utils/apiUtil";
import { useLoginStatus, useUserProfile } from "@/redux/selectors/Users";

type BmsRecord = Record<string, any>;

type BmsSubscriptionPayload = {
  DataBlock1?: BmsRecord[];
  DataBlock2?: BmsRecord[];
};

const DEMO_SUBSCRIPTION_PAYLOAD: BmsSubscriptionPayload = {
  DataBlock1: [
    {
      IDX_NO: 1,
      Status: 0,
      ResultStatus: "OK",
      TotCompanySeq: 339,
      BizCompanySeq: 10,
      ClientSeq: 472,
      ContSeq: 1,
      ContNo: "20260101-001",
      CompanyName: "참존(주)",
      ContDate: "20260101",
      ServiceStartDate: "20260101",
      ServiceEndDate: "20261231",
      UseStatusName: "이용중",
    },
    {
      IDX_NO: 2,
      Status: 1,
      ResultStatus: "OK",
      TotCompanySeq: 340,
      BizCompanySeq: 11,
      ClientSeq: 473,
      ContSeq: 2,
      ContNo: "20260601-002",
      CompanyName: "에버인테스트 법인",
      ContDate: "20260601",
      ServiceStartDate: "20260601",
      ServiceEndDate: "20270531",
      UseStatusName: "이용대기",
    },
  ],
  DataBlock2: [
    {
      IDX_NO: 1,
      TotCompanySeq: 339,
      BizCompanySeq: 10,
      ContSeq: 1,
      ContNo: "20260101-001",
      ServiceItemSeq: 37,
      ServiceItemName: "에버웰커밍",
      SubServiceItemSeq: -1,
      SubServiceItemName: "",
      CurrSeq: 1,
      Qty: 10,
      Price: 0,
      Amt: 0,
      PolicySeq: 86,
      PriceAppYm: "202601",
      ServiceStartDate: "20260101",
      ServiceEndDate: "20261231",
    },
    {
      IDX_NO: 2,
      TotCompanySeq: 339,
      BizCompanySeq: 10,
      ContSeq: 1,
      ContNo: "20260101-001",
      ServiceItemSeq: 37,
      ServiceItemName: "에버웰커밍",
      SubServiceItemSeq: 101,
      SubServiceItemName: "AI 컨텐츠 빌더",
      CurrSeq: 1,
      Qty: 10,
      Price: 0,
      Amt: 0,
      PolicySeq: 87,
      PriceAppYm: "202601",
      ServiceStartDate: "20260101",
      ServiceEndDate: "20261231",
    },
    {
      IDX_NO: 3,
      TotCompanySeq: 339,
      BizCompanySeq: 10,
      ContSeq: 1,
      ContNo: "20260101-001",
      ServiceItemSeq: 40,
      ServiceItemName: "에버타임",
      SubServiceItemSeq: 120,
      SubServiceItemName: "PC-OFF",
      CurrSeq: 1,
      Qty: 10,
      Price: 1000,
      Amt: 10000,
      PolicySeq: 90,
      PriceAppYm: "202601",
      ServiceStartDate: "20260101",
      ServiceEndDate: "20261231",
    },
    {
      IDX_NO: 4,
      TotCompanySeq: 340,
      BizCompanySeq: 11,
      ContSeq: 2,
      ContNo: "20260601-002",
      ServiceItemSeq: 41,
      ServiceItemName: "급여",
      SubServiceItemSeq: -1,
      SubServiceItemName: "",
      CurrSeq: 1,
      Qty: 25,
      Price: 4500,
      Amt: 112500,
      PolicySeq: 91,
      PriceAppYm: "202606",
      ServiceStartDate: "20260601",
      ServiceEndDate: "20270531",
    },
  ],
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

  const text = String(value);
  if (/^\d{8}$/.test(text)) {
    return `${text.slice(0, 4)}.${text.slice(4, 6)}.${text.slice(6, 8)}`;
  }

  const date = new Date(value);
  if (!Number.isNaN(date.getTime())) {
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
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
  const textStatus = valueOf(master, ["UseStatusName", "StatusName", "ServiceStatusName"]);
  if (textStatus) return String(textStatus);

  const status = Number(valueOf(master, ["Status", "UseStatus"]));
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

export default function SubscriptionPage() {
  const router = useRouter();
  const isLoggedIn = useLoginStatus();
  const profile = useUserProfile();
  const [isLoading, setIsLoading] = useState(true);
  const [payload, setPayload] = useState<BmsSubscriptionPayload>({});
  const [isUsingDemoData, setIsUsingDemoData] = useState(false);
  const [openKey, setOpenKey] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/login");
      return;
    }

    const loadData = async () => {
      setIsLoading(true);

      try {
        const result = await Api.Subscriptions.getMySubscriptions();
        if (!checkApiResult(result)) {
          setPayload(DEMO_SUBSCRIPTION_PAYLOAD);
          setIsUsingDemoData(true);
          return;
        }

        const nextPayload = normalizePayload(result!.payload);
        const hasData = !!nextPayload.DataBlock1?.length;

        setPayload(hasData ? nextPayload : DEMO_SUBSCRIPTION_PAYLOAD);
        setIsUsingDemoData(!hasData);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [isLoggedIn, router]);

  const masters = useMemo(() => payload.DataBlock1 || [], [payload]);
  const details = useMemo(() => payload.DataBlock2 || [], [payload]);

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
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-12">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="mb-2 text-3xl font-bold text-foreground">구독 정보</h1>
          <p className="text-muted-foreground">
            계약 master 정보를 기준으로 구독 내역을 확인하고, 상세보기에서 서비스별 상세 내역을 확인할 수 있습니다.
          </p>
        </div>
        <Button variant="outline" onClick={() => window.open("/quotation", "_blank")}>
          <FileText className="mr-2 h-4 w-4" />
          견적 받기
        </Button>
      </div>

      {profile && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">회원 정보</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-center gap-4 rounded-lg bg-muted/50 p-3">
                <span className="min-w-[60px] text-sm text-muted-foreground">이름</span>
                <span className="font-medium">{profile.name}</span>
              </div>
              <div className="flex items-center gap-4 rounded-lg bg-muted/50 p-3">
                <span className="min-w-[60px] text-sm text-muted-foreground">이메일</span>
                <span className="font-medium">{profile.loginId}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {isUsingDemoData && (
        <Card className="mb-4 border-amber-200 bg-amber-50">
          <CardContent className="flex gap-3 py-4 text-sm text-amber-800">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <p>
              API 구독 데이터가 없어 화면 확인용 임시 데이터를 표시하고 있습니다. 실제 DataBlock1/DataBlock2가
              조회되면 이 임시 데이터는 자동으로 사라집니다.
            </p>
          </CardContent>
        </Card>
      )}

      {masters.length === 0 ? (
        <Card className="border-2">
          <CardContent className="py-12 text-center">
            <AlertCircle className="mx-auto mb-4 h-12 w-12 text-muted-foreground opacity-50" />
            <h3 className="mb-2 text-lg font-semibold">현재 구독 정보가 없습니다.</h3>
            <p className="text-muted-foreground">조회된 계약 정보가 없습니다.</p>
          </CardContent>
        </Card>
      ) : (
        <Card className="overflow-hidden border-2">
          <CardHeader className="border-b bg-slate-50/70">
            <div className="flex items-center gap-2">
              <Layers3 className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">구독정보 master</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="hidden lg:block">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[120px]">구독일자</TableHead>
                    <TableHead className="w-[180px]">회사명(법인명)</TableHead>
                    <TableHead>서비스상품명</TableHead>
                    <TableHead className="w-[130px]">서비스시작일</TableHead>
                    <TableHead className="w-[130px]">서비스만료일</TableHead>
                    <TableHead className="w-[110px]">이용상태</TableHead>
                    <TableHead className="w-[88px] text-center">상세</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {masters.map((master, index) => {
                    const key = getMasterKey(master) || String(index);
                    const detailRows = getDetailRows(master, details);
                    const isOpen = openKey === key;

                    return (
                      <Fragment key={key}>
                        <TableRow className="hover:bg-slate-50">
                          <TableCell className="font-medium">{getContractDate(master)}</TableCell>
                          <TableCell>
                            <div className="font-semibold text-slate-900">{getCompanyName(master)}</div>
                            <div className="text-xs text-muted-foreground">
                              TotCompanySeq {valueOf(master, ["TotCompanySeq"]) || "-"}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="max-w-[360px] truncate font-medium">
                              {getServiceSummary(detailRows)}
                            </div>
                          </TableCell>
                          <TableCell>{getServiceStartDate(master)}</TableCell>
                          <TableCell>{getServiceEndDate(master)}</TableCell>
                          <TableCell>
                            <Badge className="bg-green-100 text-green-800">{getUseStatus(master)}</Badge>
                          </TableCell>
                          <TableCell className="text-center">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => setOpenKey(isOpen ? null : key)}
                              aria-label="상세보기"
                            >
                              {isOpen ? (
                                <ChevronDown className="h-4 w-4" />
                              ) : (
                                <ChevronRight className="h-4 w-4" />
                              )}
                            </Button>
                          </TableCell>
                        </TableRow>
                        {isOpen && (
                          <TableRow>
                            <TableCell colSpan={7} className="bg-slate-50/80 p-0">
                              <DetailTable rows={detailRows} />
                            </TableCell>
                          </TableRow>
                        )}
                      </Fragment>
                    );
                  })}
                </TableBody>
              </Table>
            </div>

            <div className="divide-y lg:hidden">
              {masters.map((master, index) => {
                const key = getMasterKey(master) || String(index);
                const detailRows = getDetailRows(master, details);
                const isOpen = openKey === key;

                return (
                  <div key={key} className="p-4">
                    <button
                      type="button"
                      className="flex w-full items-start justify-between gap-4 text-left"
                      onClick={() => setOpenKey(isOpen ? null : key)}
                    >
                      <div className="min-w-0">
                        <div className="mb-1 flex items-center gap-2">
                          <span className="font-bold text-slate-900">{getCompanyName(master)}</span>
                          <Badge className="bg-green-100 text-green-800">{getUseStatus(master)}</Badge>
                        </div>
                        <p className="truncate text-sm font-medium">{getServiceSummary(detailRows)}</p>
                        <p className="mt-2 text-xs text-muted-foreground">
                          {getServiceStartDate(master)} - {getServiceEndDate(master)}
                        </p>
                      </div>
                      {isOpen ? (
                        <ChevronDown className="mt-1 h-5 w-5 shrink-0" />
                      ) : (
                        <ChevronRight className="mt-1 h-5 w-5 shrink-0" />
                      )}
                    </button>

                    {isOpen && <DetailTable rows={detailRows} compact />}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function DetailTable({ rows, compact = false }: { rows: BmsRecord[]; compact?: boolean }) {
  if (rows.length === 0) {
    return (
      <div className="p-5 text-sm text-muted-foreground">
        매칭되는 상세 내역이 없습니다.
      </div>
    );
  }

  if (compact) {
    return (
      <div className="mt-4 space-y-3 rounded-2xl bg-slate-50 p-3">
        {rows.map((row, index) => (
          <div key={index} className="rounded-xl bg-white p-3 text-sm">
            <p className="font-semibold text-slate-900">{getServiceName(row)}</p>
            <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
              <span>수량 {valueOf(row, ["Qty", "UserCount"]) || "-"}</span>
              <span>단가 {formatCurrency(valueOf(row, ["Price", "UnitPrice"]))}</span>
              <span>금액 {formatCurrency(valueOf(row, ["Amt", "Amount"]))}</span>
              <span>적용월 {valueOf(row, ["PriceAppYm", "AppYm"]) || "-"}</span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="p-5">
      <div className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-900">
        <Calendar className="h-4 w-4 text-primary" />
        상세내역
      </div>
      <div className="overflow-hidden rounded-2xl border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>서비스상품명</TableHead>
              <TableHead className="w-[90px] text-right">수량</TableHead>
              <TableHead className="w-[120px] text-right">단가</TableHead>
              <TableHead className="w-[120px] text-right">금액</TableHead>
              <TableHead className="w-[100px]">적용월</TableHead>
              <TableHead className="w-[110px]">정책번호</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{getServiceName(row)}</TableCell>
                <TableCell className="text-right">{valueOf(row, ["Qty", "UserCount"]) || "-"}</TableCell>
                <TableCell className="text-right">{formatCurrency(valueOf(row, ["Price", "UnitPrice"]))}</TableCell>
                <TableCell className="text-right font-semibold">{formatCurrency(valueOf(row, ["Amt", "Amount"]))}</TableCell>
                <TableCell>{valueOf(row, ["PriceAppYm", "AppYm"]) || "-"}</TableCell>
                <TableCell>{valueOf(row, ["PolicySeq"]) || "-"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
