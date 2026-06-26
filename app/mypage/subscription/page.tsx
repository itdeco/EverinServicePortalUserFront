"use client";

import { Fragment, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
    AlertCircle,
    Calendar,
    ChevronDown,
    MoreVertical,
} from "lucide-react";
import { Api } from "@/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
            BizNo: "212-12-12222",
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
            BizNo: "212-12-33333",
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
            IDX_NO: 3,
            TotCompanySeq: 339,
            BizCompanySeq: 10,
            ContSeq: 1,
            ContNo: "20260101-001",
            ServiceItemSeq: 40,
            ServiceItemName: "에버타임",
            SubServiceItemSeq: 120,
            SubServiceItemName: "",
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

    const text = String(value).trim();
    if (/^\d{8}$/.test(text)) {
        return `${text.slice(0, 4)}-${text.slice(4, 6)}-${text.slice(6, 8)}`;
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

function getBizNo(master: BmsRecord) {
    return valueOf(master, ["BizNo", "BizRegNo", "BizRegNumber", "CompanyRegNo", "RegNo"]);
}

function getCompanyLabel(master: BmsRecord) {
    const name = getCompanyName(master);
    const bizNo = getBizNo(master);
    return bizNo ? `${name} (${bizNo})` : name;
}

function getTotalQty(rows: BmsRecord[]) {
    const qty = rows.reduce((max, row) => {
        const value = Number(valueOf(row, ["Qty", "UserCount"]) || 0);
        return Math.max(max, value);
    }, 0);
    return qty > 0 ? `${qty}명` : "-";
}

function getTotalAmount(rows: BmsRecord[]) {
    const total = rows.reduce((sum, row) => sum + Number(valueOf(row, ["Amt", "Amount"]) || 0), 0);
    return total > 0 ? formatCurrency(total) : "무료";
}

// 회사(사업자) 단위로 계약을 그룹핑
function groupByCompany(masters: BmsRecord[]) {
    const groups: { key: string; label: string; masters: BmsRecord[] }[] = [];
    const indexMap = new Map<string, number>();

    masters.forEach((master) => {
        const key = String(
            valueOf(master, ["TotCompanySeq", "BizCompanySeq"]) ?? getCompanyName(master),
        );

        if (!indexMap.has(key)) {
            indexMap.set(key, groups.length);
            groups.push({ key, label: getCompanyLabel(master), masters: [] });
        }

        groups[indexMap.get(key)!].masters.push(master);
    });

    return groups;
}

const CONTRACT_MENU_ITEMS = [
    "계약 추가/변경",
    "결제수단변경",
    "청구요금 및 납부내역",
    "관리자 추가",
    "멤버십(구독)해지",
];

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
    const companyGroups = useMemo(() => groupByCompany(masters), [masters]);

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
            <div className="mb-8">
                <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-[28px]">
                    <span className="text-primary">{profile?.name ?? "고객"}</span>님, 안녕하세요!
                </h1>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                    현재 이용 중인 플랜을 확인하고 관리하세요. 조직의 규모와 환경에 맞는 최적의 옵션을 선택하여 더욱 효율적으로 활용해보세요.
                </p>
            </div>

            {profile && (
                <Card className="mb-8 border-border/70 py-0 shadow-sm">
                    <CardContent className="flex flex-col gap-3 px-5 py-4 md:flex-row md:items-center md:justify-between">
                        <div className="flex flex-col gap-3 md:flex-row md:items-center">
                            <div className="flex items-center gap-3">
                                <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">이름</span>
                                <span className="text-sm font-semibold text-foreground">{profile.name}</span>
                            </div>
                            <Separator orientation="vertical" className="hidden h-4 md:block" />
                            <div className="flex items-center gap-3">
                                <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">이메일</span>
                                <span className="text-sm font-semibold text-foreground">{profile.loginId}</span>
                            </div>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            className="w-full md:w-auto"
                            onClick={() => router.push("/mypage/account")}
                        >
                            계정정보 변경
                        </Button>
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
                <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-2">
                        <h2 className="text-lg font-bold text-foreground">멤버십(구독)정보</h2>
                        <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                            {companyGroups.length}개 사업자
                        </span>
                    </div>
                    {companyGroups.map((group) => (
                        <Card key={group.key} className="overflow-hidden border-border/70 py-0 shadow-sm">
                            {/* 회사(사업자) 그룹 헤더 */}
                            <div className="border-b bg-muted/40 px-5 py-3">
                                <h3 className="text-base font-bold text-foreground">
                                    {group.label}
                                </h3>
                            </div>
                            <CardContent className="p-0">
                                {/* 데스크톱 테이블 */}
                                <div className="hidden lg:block">
                                    <Table>
                                        <TableHeader>
                                            <TableRow className="border-b bg-muted/20 hover:bg-muted/20">
                                                <TableHead className="w-[52px]" />
                                                <TableHead className="h-9 w-[116px] text-xs font-semibold uppercase tracking-wide text-muted-foreground">구독일자</TableHead>
                                                <TableHead className="h-9 text-xs font-semibold uppercase tracking-wide text-muted-foreground">서비스명</TableHead>
                                                <TableHead className="h-9 w-[124px] text-xs font-semibold uppercase tracking-wide text-muted-foreground">서비스시작일</TableHead>
                                                <TableHead className="h-9 w-[124px] text-xs font-semibold uppercase tracking-wide text-muted-foreground">서비스만료일</TableHead>
                                                <TableHead className="h-9 w-[88px] text-right text-xs font-semibold uppercase tracking-wide text-muted-foreground">사용자인원</TableHead>
                                                <TableHead className="h-9 w-[120px] text-right text-xs font-semibold uppercase tracking-wide text-muted-foreground">서비스요금</TableHead>
                                                <TableHead className="h-9 w-[100px] text-center text-xs font-semibold uppercase tracking-wide text-muted-foreground">이용상태</TableHead>
                                                <TableHead className="h-9 w-[64px] text-center text-xs font-semibold uppercase tracking-wide text-muted-foreground">상세</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {group.masters.map((master, index) => {
                                                const key = getMasterKey(master) || `${group.key}-${index}`;
                                                const detailRows = getDetailRows(master, details);
                                                const isOpen = openKey === key;

                                                return (
                                                    <Fragment key={key}>
                                                        <TableRow
                                                            className={`cursor-pointer border-b transition-colors hover:bg-muted/30 ${isOpen ? "bg-muted/30" : ""}`}
                                                            onClick={() => setOpenKey(isOpen ? null : key)}
                                                        >
                                                            <TableCell className="text-center" onClick={(e) => e.stopPropagation()}>
                                                                <ContractMenu />
                                                            </TableCell>
                                                            <TableCell className="font-medium text-foreground">{getContractDate(master)}</TableCell>
                                                            <TableCell>
                                                                <div className="max-w-[320px] truncate font-medium text-foreground">
                                                                    {getServiceSummary(detailRows)}
                                                                </div>
                                                            </TableCell>
                                                            <TableCell className="text-muted-foreground">{getServiceStartDate(master)}</TableCell>
                                                            <TableCell className="text-muted-foreground">{getServiceEndDate(master)}</TableCell>
                                                            <TableCell className="text-right tabular-nums text-foreground">{getTotalQty(detailRows)}</TableCell>
                                                            <TableCell className="text-right font-semibold tabular-nums text-foreground">{getTotalAmount(detailRows)}</TableCell>
                                                            <TableCell className="text-center">
                                                                <Badge variant="secondary" className="border-0 bg-primary/10 font-medium text-primary">
                                                                    {getUseStatus(master)}
                                                                </Badge>
                                                            </TableCell>
                                                            <TableCell className="text-center">
                                                                <ChevronDown
                                                                    className={`mx-auto h-4 w-4 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`}
                                                                />
                                                            </TableCell>
                                                        </TableRow>
                                                        {isOpen && (
                                                            <TableRow className="hover:bg-transparent">
                                                                <TableCell colSpan={9} className="bg-muted/20 p-0">
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

                                {/* 모바일 카드 */}
                                <div className="divide-y lg:hidden">
                                    {group.masters.map((master, index) => {
                                        const key = getMasterKey(master) || `${group.key}-${index}`;
                                        const detailRows = getDetailRows(master, details);
                                        const isOpen = openKey === key;

                                        return (
                                            <div key={key} className="p-4">
                                                <div className="flex items-start gap-2">
                                                    <ContractMenu />
                                                    <button
                                                        type="button"
                                                        className="flex flex-1 items-start justify-between gap-4 text-left"
                                                        onClick={() => setOpenKey(isOpen ? null : key)}
                                                    >
                                                        <div className="min-w-0">
                                                            <div className="mb-1.5 flex items-center gap-2">
                                                                <span className="text-xs text-muted-foreground">{getContractDate(master)}</span>
                                                                <Badge variant="secondary" className="border-0 bg-primary/10 font-medium text-primary">
                                                                    {getUseStatus(master)}
                                                                </Badge>
                                                            </div>
                                                            <p className="truncate text-sm font-semibold text-foreground">{getServiceSummary(detailRows)}</p>
                                                            <p className="mt-2 text-xs text-muted-foreground">
                                                                {getServiceStartDate(master)} ~ {getServiceEndDate(master)}
                                                            </p>
                                                            <p className="mt-1 text-xs font-medium text-foreground">
                                                                {getTotalQty(detailRows)} · {getTotalAmount(detailRows)}
                                                            </p>
                                                        </div>
                                                        <ChevronDown
                                                            className={`mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`}
                                                        />
                                                    </button>
                                                </div>

                                                {isOpen && <DetailTable rows={detailRows} compact />}
                                            </div>
                                        );
                                    })}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}

function ContractMenu() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" aria-label="계약 관리 메뉴">
                    <MoreVertical className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-44">
                {CONTRACT_MENU_ITEMS.map((label, index) => (
                    <Fragment key={label}>
                        {index === CONTRACT_MENU_ITEMS.length - 1 && <DropdownMenuSeparator />}
                        <DropdownMenuItem
                            onSelect={() => {
                                console.log("[v0] contract menu action:", label);
                            }}
                            className={index === CONTRACT_MENU_ITEMS.length - 1 ? "text-destructive focus:text-destructive" : ""}
                        >
                            {label}
                        </DropdownMenuItem>
                    </Fragment>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
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
            <div className="mt-3 flex flex-col gap-2 rounded-xl bg-muted/50 p-3">
                {rows.map((row, index) => (
                    <div key={index} className="rounded-lg border border-border/60 bg-card p-3 text-sm">
                        <p className="font-semibold text-foreground">{getServiceName(row)}</p>
                        <div className="mt-2 grid grid-cols-2 gap-y-1.5 text-xs">
                            <span className="text-muted-foreground">인원 <span className="font-medium text-foreground">{valueOf(row, ["Qty", "UserCount"]) || "-"}</span></span>
                            <span className="text-muted-foreground">단가 <span className="font-medium text-foreground">{formatCurrency(valueOf(row, ["Price", "UnitPrice"]))}</span></span>
                            <span className="text-muted-foreground">금액 <span className="font-semibold text-foreground">{formatCurrency(valueOf(row, ["Amt", "Amount"]))}</span></span>
                            <span className="text-muted-foreground">적용년월 <span className="font-medium text-foreground">{formatYearMonth(valueOf(row, ["PriceAppYm", "AppYm"]))}</span></span>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="px-5 py-4">
            <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                <Calendar className="h-3.5 w-3.5 text-primary" />
                상세내역
            </div>
            <div className="overflow-hidden rounded-xl border border-border/60 bg-card">
                <Table>
                    <TableHeader>
                        <TableRow className="border-b bg-muted/30 hover:bg-muted/30">
                            <TableHead className="h-10 text-xs font-semibold text-muted-foreground">서비스</TableHead>
                            <TableHead className="h-10 w-[100px] text-right text-xs font-semibold text-muted-foreground">인원</TableHead>
                            <TableHead className="h-10 w-[130px] text-right text-xs font-semibold text-muted-foreground">단가</TableHead>
                            <TableHead className="h-10 w-[130px] text-right text-xs font-semibold text-muted-foreground">금액</TableHead>
                            <TableHead className="h-10 w-[110px] text-right text-xs font-semibold text-muted-foreground">적용년월</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow key={index} className="border-b last:border-0 hover:bg-muted/20">
                                <TableCell className="font-medium text-foreground">{getServiceName(row)}</TableCell>
                                <TableCell className="text-right tabular-nums text-muted-foreground">{valueOf(row, ["Qty", "UserCount"]) || "-"}</TableCell>
                                <TableCell className="text-right tabular-nums text-muted-foreground">{formatCurrency(valueOf(row, ["Price", "UnitPrice"]))}</TableCell>
                                <TableCell className="text-right font-semibold tabular-nums text-foreground">{formatCurrency(valueOf(row, ["Amt", "Amount"]))}</TableCell>
                                <TableCell className="text-right tabular-nums text-muted-foreground">{formatYearMonth(valueOf(row, ["PriceAppYm", "AppYm"]))}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
