"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  Calendar,
  CheckCircle,
  ChevronRight,
  Clock,
  Receipt,
  XCircle,
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
      ServiceItemName: "에버웰커밍, 에버타임 PC-OFF",
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
      ServiceItemName: "에버웰커밍, 에버타임 PC-OFF",
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

const StatusTitle: Record<number, { text: string; icon: React.ReactNode; variant: string }> = {
  [PaymentLogStatusType.NotPaid]: {
    text: "미납",
    icon: <Clock className="h-4 w-4" />,
    variant: "bg-yellow-100 text-yellow-800",
  },
  [PaymentLogStatusType.Paid]: {
    text: "납부완료",
    icon: <CheckCircle className="h-4 w-4" />,
    variant: "bg-green-100 text-green-800",
  },
  [PaymentLogStatusType.ManualPaid]: {
    text: "수동납부",
    icon: <CheckCircle className="h-4 w-4" />,
    variant: "bg-blue-100 text-blue-800",
  },
  [PaymentLogStatusType.Refund]: {
    text: "환불",
    icon: <Receipt className="h-4 w-4" />,
    variant: "bg-slate-100 text-slate-800",
  },
  [PaymentLogStatusType.Cancel]: {
    text: "취소",
    icon: <Receipt className="h-4 w-4" />,
    variant: "bg-slate-100 text-slate-800",
  },
  [PaymentLogStatusType.Error]: {
    text: "실패",
    icon: <XCircle className="h-4 w-4" />,
    variant: "bg-red-100 text-red-800",
  },
  [PaymentLogStatusType.Pause]: {
    text: "중지",
    icon: <AlertCircle className="h-4 w-4" />,
    variant: "bg-red-100 text-red-800",
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
  if (year && month) return `${year}.${String(month).padStart(2, "0")}`;

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
    return `${cardCompany || "카드"}${cardText ? ` (${cardText})` : ""}`;
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
    <Badge className={`${statusInfo.variant} inline-flex items-center gap-1 whitespace-nowrap`}>
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
  const [isUsingDemoData, setIsUsingDemoData] = useState(false);
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
          setIsUsingDemoData(true);
          return;
        }

        const nextPayload = normalizePayload(result!.payload);
        const hasData = !!nextPayload.DataBlock1?.length;

        setPayload(hasData ? nextPayload : DEMO_PAYMENT_PAYLOAD);
        setIsUsingDemoData(!hasData);
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
        <h1 className="mb-2 text-3xl font-bold text-foreground">청구요금 및 납부내역</h1>
        <p className="text-muted-foreground">
          BMS 청구/납부 DataBlock1 기준으로 월별 청구금액, 납부상태, 납부수단을 확인할 수 있습니다.
        </p>
      </div>

      {isUsingDemoData && (
        <Card className="mb-4 border-amber-200 bg-amber-50">
          <CardContent className="flex gap-3 py-4 text-sm text-amber-800">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <p>
              API 청구/납부 데이터가 없어 화면 확인용 임시 데이터를 표시하고 있습니다. 실제 DataBlock1이 조회되면 임시 데이터는
              자동으로 사라집니다.
            </p>
          </CardContent>
        </Card>
      )}

      {rows.length === 0 ? (
        <Card className="border-2">
          <CardContent className="py-12 text-center">
            <Receipt className="mx-auto mb-4 h-12 w-12 text-muted-foreground opacity-50" />
            <h3 className="mb-2 text-lg font-semibold">청구/납부 내역이 없습니다.</h3>
            <p className="text-muted-foreground">조회된 청구 데이터가 없습니다.</p>
          </CardContent>
        </Card>
      ) : (
        <Card className="overflow-hidden border-2">
          <CardHeader className="border-b bg-slate-50/70">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">청구/납부내역 DataBlock1</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="hidden lg:block">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[110px]">청구월</TableHead>
                    <TableHead className="w-[180px]">회사명(법인명)</TableHead>
                    <TableHead>서비스상품명</TableHead>
                    <TableHead className="w-[210px]">서비스기간</TableHead>
                    <TableHead className="w-[150px]">납부방법</TableHead>
                    <TableHead className="w-[130px] text-right">청구금액</TableHead>
                    <TableHead className="w-[120px] text-center">납부상태</TableHead>
                    <TableHead className="w-[120px] text-center">납부일</TableHead>
                    <TableHead className="w-[80px] text-center">상세</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pagedRows.map((row, index) => (
                    <TableRow key={`${getInvoiceId(row, index)}-${index}`} className="hover:bg-slate-50">
                      <TableCell className="font-medium">{formatBillingMonth(row)}</TableCell>
                      <TableCell>
                        <div className="font-semibold text-slate-900">{getCompanyName(row)}</div>
                        <div className="text-xs text-muted-foreground">
                          TotCompanySeq {valueOf(row, ["TotCompanySeq"]) || "-"}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-[320px] truncate font-medium">{getServiceName(row)}</div>
                      </TableCell>
                      <TableCell>{getServicePeriod(row)}</TableCell>
                      <TableCell>{getPaymentMethod(row)}</TableCell>
                      <TableCell className="text-right font-semibold">{formatCurrency(getTotalAmount(row))}</TableCell>
                      <TableCell className="text-center">{getStatusBadge(row)}</TableCell>
                      <TableCell className="text-center">{getPayDate(row)}</TableCell>
                      <TableCell className="text-center">
                        <Button variant="ghost" size="sm" onClick={() => onViewInvoiceClick(row, index)}>
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="divide-y lg:hidden">
              {pagedRows.map((row, index) => (
                <button
                  key={`${getInvoiceId(row, index)}-${index}`}
                  type="button"
                  className="block w-full p-4 text-left transition-colors hover:bg-slate-50"
                  onClick={() => onViewInvoiceClick(row, index)}
                >
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-bold text-slate-900">{formatBillingMonth(row)}</p>
                      <p className="truncate text-sm text-muted-foreground">{getCompanyName(row)}</p>
                    </div>
                    {getStatusBadge(row)}
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between gap-4">
                      <span className="text-muted-foreground">서비스</span>
                      <span className="truncate font-medium">{getServiceName(row)}</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-muted-foreground">납부방법</span>
                      <span>{getPaymentMethod(row)}</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-muted-foreground">청구금액</span>
                      <span className="font-bold">{formatCurrency(getTotalAmount(row))}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
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
