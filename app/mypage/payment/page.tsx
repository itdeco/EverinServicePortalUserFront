"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  CheckCircle,
  ChevronRight,
  Clock,
  Receipt,
  XCircle,
} from "lucide-react";
import { Api } from "@/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { checkApiResult } from "@/utils/apiUtil";
import { useLoginStatus } from "@/redux/selectors/Users";
import { PaymentLogStatusType } from "@/types/Payments";

type BmsRecord = Record<string, any>;

type BmsPaymentPayload = {
  DataBlock1?: BmsRecord[];
  totalCount?: number;
  currentPage?: number;
  totalPage?: number;
};

const PAGE_SIZE = 10;

const DEMO_PAYMENT_PAYLOAD: BmsPaymentPayload = {
  DataBlock1: [
    {
      IDX_NO: 1,
      ResultStatus: "OK",
      PaymentLogId: 9001,
      TotCompanySeq: 339,
      BizCompanySeq: 10,
      ContSeq: 1,
      ContNo: "20260101-001",
      BillNo: "BILL-202606-001",
      BillYm: "202606",
      BillDate: "20260601",
      CompanyName: "참존(주)",
      BizNo: "212-12-12222",
      ServiceItemName: "에버웰커밍, 에버타임",
      ServiceStartDate: "20260601",
      ServiceEndDate: "20260630",
      CardCompany: "신한카드",
      CardNo: "************1234",
      Amt: 90000,
      Vat: 9000,
      TotAmt: 99000,
      PayStatus: PaymentLogStatusType.Paid,
      PayStatusName: "납부완료",
      PayDate: "20260605",
    },
    {
      IDX_NO: 2,
      ResultStatus: "OK",
      PaymentLogId: 9002,
      TotCompanySeq: 339,
      BizCompanySeq: 10,
      ContSeq: 1,
      ContNo: "20260101-001",
      BillNo: "BILL-202607-001",
      BillYm: "202607",
      BillDate: "20260701",
      CompanyName: "참존(주)",
      BizNo: "212-12-12222",
      ServiceItemName: "에버웰커밍, 에버타임",
      ServiceStartDate: "20260701",
      ServiceEndDate: "20260731",
      CardCompany: "신한카드",
      CardNo: "************1234",
      Amt: 90000,
      Vat: 9000,
      TotAmt: 99000,
      PayStatus: PaymentLogStatusType.NotPaid,
      PayStatusName: "결제예정",
      PayDate: null,
    },
    {
      IDX_NO: 3,
      ResultStatus: "OK",
      PaymentLogId: 9003,
      TotCompanySeq: 340,
      BizCompanySeq: 11,
      ContSeq: 2,
      ContNo: "20260601-002",
      BillNo: "BILL-202606-002",
      BillYm: "202606",
      BillDate: "20260601",
      CompanyName: "에버인테스트 법인",
      BizNo: "212-12-33333",
      ServiceItemName: "급여관리",
      ServiceStartDate: "20260601",
      ServiceEndDate: "20260630",
      CardCompany: "국민카드",
      CardNo: "************5678",
      Amt: 112500,
      Vat: 11250,
      TotAmt: 123750,
      PayStatus: PaymentLogStatusType.Error,
      PayStatusName: "결제실패",
      PayDate: null,
      ErrMsg: "카드 승인 실패",
    },
  ],
};

const StatusTitle: Record<number, { text: string; icon: React.ReactNode; className: string }> = {
  [PaymentLogStatusType.NotPaid]: {
    text: "미납",
    icon: <Clock className="h-3.5 w-3.5" />,
    className: "bg-amber-500/10 text-amber-600",
  },
  [PaymentLogStatusType.Paid]: {
    text: "납부완료",
    icon: <CheckCircle className="h-3.5 w-3.5" />,
    className: "bg-primary/10 text-primary",
  },
  [PaymentLogStatusType.ManualPaid]: {
    text: "수동납부",
    icon: <CheckCircle className="h-3.5 w-3.5" />,
    className: "bg-primary/10 text-primary",
  },
  [PaymentLogStatusType.Refund]: {
    text: "환불",
    icon: <Receipt className="h-3.5 w-3.5" />,
    className: "bg-muted text-muted-foreground",
  },
  [PaymentLogStatusType.Cancel]: {
    text: "취소",
    icon: <Receipt className="h-3.5 w-3.5" />,
    className: "bg-muted text-muted-foreground",
  },
  [PaymentLogStatusType.Error]: {
    text: "실패",
    icon: <XCircle className="h-3.5 w-3.5" />,
    className: "bg-destructive/10 text-destructive",
  },
  [PaymentLogStatusType.Pause]: {
    text: "중지",
    icon: <AlertCircle className="h-3.5 w-3.5" />,
    className: "bg-destructive/10 text-destructive",
  },
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

function normalizePayload(payload: any): BmsPaymentPayload {
  if (!payload) return {};

  const source = payload.ROOT || payload.root || payload;
  const data = source.data?.ROOT || source.data || source;
  const dataBlock1 = data.DataBlock1 || data.datablock1 || data.list || data.List || [];

  return {
    DataBlock1: Array.isArray(dataBlock1) ? dataBlock1 : [],
    totalCount: Number(data.totalCount || data.TotalCount || data.TotCnt || dataBlock1.length || 0),
    currentPage: Number(data.currentPage || data.PageNo || 1),
    totalPage: Number(data.totalPage || data.TotalPage || 0),
  };
}

function formatDate(value: any) {
  if (!value) return "-";

  const text = String(value);
  if (/^\d{6}$/.test(text)) {
    return `${text.slice(0, 4)}.${text.slice(4, 6)}`;
  }
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

function formatBillingMonth(row: BmsRecord) {
  const value = valueOf(row, ["BillYm", "BillingYm", "PayYm", "UseYm", "PriceAppYm"]);
  if (value) return formatDate(value);

  const year = valueOf(row, ["year", "Year"]);
  const month = valueOf(row, ["month", "Month"]);
  if (year && month) return `${year}-${String(month).padStart(2, "0")}`;

  return "-";
}

function formatCurrency(value: any) {
  const amount = Number(value || 0);
  return `₩${amount.toLocaleString()}`;
}

function getCompanyName(row: BmsRecord) {
  return (
    valueOf(row, [
      "CompanyName",
      "BizCompanyName",
      "CorporationName",
      "CorpName",
      "ClientName",
      "CustName",
      "corporationName",
    ]) || "-"
  );
}

function getBizNo(row: BmsRecord) {
  return valueOf(row, ["BizNo", "BizRegNo", "BizRegNumber", "CompanyRegNo", "RegNo"]);
}

function getCompanyLabel(row: BmsRecord) {
  const name = getCompanyName(row);
  const bizNo = getBizNo(row);
  return bizNo ? `${name} (${bizNo})` : name;
}

function groupByCompany(rows: BmsRecord[]) {
  const groups: { key: string; label: string; rows: BmsRecord[] }[] = [];
  const indexMap = new Map<string, number>();

  rows.forEach((row) => {
    const key = String(valueOf(row, ["TotCompanySeq", "BizCompanySeq"]) ?? getCompanyName(row));

    if (!indexMap.has(key)) {
      indexMap.set(key, groups.length);
      groups.push({ key, label: getCompanyLabel(row), rows: [] });
    }

    groups[indexMap.get(key)!].rows.push(row);
  });

  return groups;
}

function getServiceName(row: BmsRecord) {
  return (
    valueOf(row, [
      "ServiceItemName",
      "ServiceName",
      "ProductName",
      "PlanProductName",
      "PlanName",
      "planName",
      "ItemName",
    ]) || "-"
  );
}

function getServicePeriod(row: BmsRecord) {
  const startDate = formatDate(valueOf(row, ["ServiceStartDate", "UseStartDate", "StartDate", "useStartDate"]));
  const endDate = formatDate(valueOf(row, ["ServiceEndDate", "UseEndDate", "EndDate", "useEndDate"]));

  if (startDate === "-" && endDate === "-") return "-";
  return `${startDate} ~ ${endDate}`;
}

function getPaymentMethod(row: BmsRecord) {
  const cardCompany = valueOf(row, ["CardCompany", "CardName", "cardCompany"]);
  const cardNo = valueOf(row, ["CardNo", "CardNumber", "cardNo"]);
  const methodName = valueOf(row, ["PaymentMethodName", "PayMethodName"]);

  if (cardCompany || cardNo) {
    const cardText = cardNo ? String(cardNo).slice(-4) : "";
    return `${cardCompany || "카드"}${cardText ? ` ${cardText}` : ""}`;
  }

  return methodName || "-";
}

function getTotalAmount(row: BmsRecord) {
  const total = valueOf(row, ["TotAmt", "TotAmount", "TotalAmount", "totAmount"]);
  if (total !== undefined) return Number(total);

  const amount = Number(valueOf(row, ["Amt", "Amount", "amount"]) || 0);
  const vat = Number(valueOf(row, ["Vat", "VAT", "vat"]) || 0);
  return amount + vat;
}

function getStatusBadge(row: BmsRecord) {
  const statusText = valueOf(row, ["PayStatusName", "PaymentStatusName", "StatusName"]);
  const status = Number(valueOf(row, ["PayStatus", "PaymentStatus", "status", "Status"]));
  const statusInfo = StatusTitle[status] || StatusTitle[PaymentLogStatusType.NotPaid];

  return (
    <Badge className={`${statusInfo.className} inline-flex items-center gap-1 border-0 font-medium whitespace-nowrap`}>
      {statusInfo.icon}
      {statusText || statusInfo.text}
    </Badge>
  );
}

function getPayDate(row: BmsRecord) {
  return formatDate(valueOf(row, ["PayDate", "PaymentDate", "payDate", "PaidDate"]));
}

function getInvoiceId(row: BmsRecord, index: number) {
  return (
    valueOf(row, ["PaymentLogId", "PayLogSeq", "PaymentSeq", "BillSeq", "BillNo", "id"]) ||
    `${valueOf(row, ["TotCompanySeq"]) || "demo"}-${formatBillingMonth(row)}-${index}`
  );
}

export default function PaymentPage() {
  const router = useRouter();
  const isLoggedIn = useLoginStatus();
  const [isLoading, setIsLoading] = useState(true);
  const [payload, setPayload] = useState<BmsPaymentPayload>({});
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/login");
      return;
    }

    const loadData = async () => {
      setIsLoading(true);

      try {
        const result = await Api.Payments.getPagedPaymentList({
          pageNumber: 0,
          pageSize: 100,
        });

        if (!checkApiResult(result)) {
          setPayload(DEMO_PAYMENT_PAYLOAD);
          return;
        }

        const nextPayload = normalizePayload(result!.payload);
        const hasData = !!nextPayload.DataBlock1?.length;

        setPayload(hasData ? nextPayload : DEMO_PAYMENT_PAYLOAD);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [isLoggedIn, router]);

  const rows = useMemo(() => payload.DataBlock1 || [], [payload]);
  const totalPage = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
  const pagedRows = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return rows.slice(start, start + PAGE_SIZE);
  }, [page, rows]);
  const companyGroups = useMemo(() => groupByCompany(pagedRows), [pagedRows]);

  const onViewInvoiceClick = (row: BmsRecord, index: number) => {
    router.push(`/mypage/payment/invoice?id=${getInvoiceId(row, index)}`);
  };

  if (!isLoggedIn) return null;

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <div className="h-8 w-8 animate-spin rounded-full border-3 border-primary border-t-transparent" />
          </div>
          <p className="text-muted-foreground">청구/납부 내역을 불러오는 중입니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-[28px]">
          청구요금 및 납부내역
        </h1>
      </div>

      {rows.length === 0 ? (
        <Card className="border-border/70 shadow-sm">
          <CardContent className="py-14 text-center">
            <Receipt className="mx-auto mb-4 h-12 w-12 text-muted-foreground opacity-40" />
            <h3 className="mb-1 text-base font-semibold text-foreground">청구/납부 내역이 없습니다.</h3>
            <p className="text-sm text-muted-foreground">조회된 청구 데이터가 없습니다.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-foreground">청구/납부내역</h2>
            <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
              {companyGroups.length}개 사업자
            </span>
          </div>

          {companyGroups.map((group) => (
            <Card key={group.key} className="overflow-hidden gap-0 border-border/70 py-0 shadow-sm">
              {/* 회사(사업자) 그룹 헤더 */}
              <div className="border-b bg-muted/40 px-5 py-3">
                <h3 className="text-base font-bold text-foreground">{group.label}</h3>
              </div>
              <CardContent className="p-0">
                {/* 데스크톱 테이블 */}
                <div className="hidden lg:block">
                  <Table className="text-[13px]">
                    <TableHeader>
                      <TableRow className="border-b bg-muted/20 hover:bg-muted/20">
                        <TableHead className="h-9 w-[88px] text-xs font-semibold text-muted-foreground">청구년월</TableHead>
                        <TableHead className="h-9 text-xs font-semibold text-muted-foreground">서비스</TableHead>
                        <TableHead className="h-9 w-[176px] text-xs font-semibold text-muted-foreground">기간</TableHead>
                        <TableHead className="h-9 w-[124px] text-xs font-semibold text-muted-foreground">납부방법</TableHead>
                        <TableHead className="h-9 w-[110px] text-right text-xs font-semibold text-muted-foreground">청구금액</TableHead>
                        <TableHead className="h-9 w-[104px] text-center text-xs font-semibold text-muted-foreground">납부상태</TableHead>
                        <TableHead className="h-9 w-[92px] text-center text-xs font-semibold text-muted-foreground">납부일</TableHead>
                        <TableHead className="h-9 w-[52px] text-center text-xs font-semibold text-muted-foreground">상세</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {group.rows.map((row, index) => (
                        <TableRow
                          key={`${getInvoiceId(row, index)}-${index}`}
                          className="cursor-pointer border-b transition-colors hover:bg-muted/30"
                          onClick={() => onViewInvoiceClick(row, index)}
                        >
                          <TableCell className="font-medium tabular-nums text-foreground">{formatBillingMonth(row)}</TableCell>
                          <TableCell>
                            <div className="max-w-[260px] truncate font-medium text-foreground">{getServiceName(row)}</div>
                          </TableCell>
                          <TableCell className="tabular-nums text-muted-foreground">{getServicePeriod(row)}</TableCell>
                          <TableCell className="text-muted-foreground">{getPaymentMethod(row)}</TableCell>
                          <TableCell className="text-right font-semibold tabular-nums text-foreground">{formatCurrency(getTotalAmount(row))}</TableCell>
                          <TableCell className="text-center">{getStatusBadge(row)}</TableCell>
                          <TableCell className="text-center tabular-nums text-muted-foreground">{getPayDate(row)}</TableCell>
                          <TableCell className="text-center">
                            <ChevronRight className="mx-auto h-4 w-4 text-muted-foreground" />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* 모바일 카드 */}
                <div className="divide-y lg:hidden">
                  {group.rows.map((row, index) => (
                    <button
                      key={`${getInvoiceId(row, index)}-${index}`}
                      type="button"
                      className="block w-full p-4 text-left transition-colors hover:bg-muted/30"
                      onClick={() => onViewInvoiceClick(row, index)}
                    >
                      <div className="mb-3 flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="font-bold tabular-nums text-foreground">{formatBillingMonth(row)}</p>
                          <p className="truncate text-sm text-muted-foreground">{getServiceName(row)}</p>
                        </div>
                        {getStatusBadge(row)}
                      </div>
                      <div className="flex flex-col gap-1.5 text-sm">
                        <div className="flex justify-between gap-4">
                          <span className="text-muted-foreground">기간</span>
                          <span className="tabular-nums text-foreground">{getServicePeriod(row)}</span>
                        </div>
                        <div className="flex justify-between gap-4">
                          <span className="text-muted-foreground">납부방법</span>
                          <span className="text-foreground">{getPaymentMethod(row)}</span>
                        </div>
                        <div className="flex justify-between gap-4">
                          <span className="text-muted-foreground">청구금액</span>
                          <span className="font-bold tabular-nums text-foreground">{formatCurrency(getTotalAmount(row))}</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {totalPage > 1 && (
        <div className="mt-6 flex justify-center gap-2">
          {Array.from({ length: totalPage }, (_, index) => (
            <Button
              key={index}
              variant={page === index + 1 ? "default" : "outline"}
              size="sm"
              onClick={() => setPage(index + 1)}
            >
              {index + 1}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
