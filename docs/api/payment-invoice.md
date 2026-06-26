# 청구 내역 상세(인보이스) API 명세

마이페이지 > 청구요금 및 납부내역 목록에서 **상세** 클릭 시 진입하는 인보이스 화면(`/mypage/payment/invoice?id={paymentLogId}`)에서 사용합니다.

서비스별 금액과 총 요금, 최근 4개월 이용 현황(요금/사용인원)을 한 번에 보여주고, **출력(인쇄)** 기능을 지원합니다.

공통 응답 래퍼는 기존 규격(`code`, `message`, `payload`)을 따릅니다. `code <= 0` 이면 성공입니다.

---

## 1. 인보이스 상세 조회 (통합)

### `GET /api/v1/payments/logs/{paymentLogId}/invoice`

청구 1건에 대한 인보이스 상세를 **한 번에** 반환합니다.
(서비스별 라인 + 합계 + 회사/결제 정보 + 최근 4개월 차트 데이터 포함)

**Path**
- `paymentLogId` (number) — 청구(결제) 로그 PK. 목록 행의 `PaymentLogId`.

**Response `payload`** (`PaymentInvoiceDto`)
```jsonc
{
  "invoiceNo": "BILL-202606-001",   // 청구번호
  "paymentLogId": 9001,
  "subscriptionId": 1,
  "companyName": "참존(주)",
  "bizNo": "212-12-12222",          // 사업자번호
  "year": 2026,
  "month": 6,
  "periodStart": "2026-06-01",       // 이용 시작일
  "periodEnd": "2026-06-30",         // 이용 종료일
  "status": 1,                        // PaymentLogStatusType (0:미납,1:납부완료,2:수동납부,8:오류 ...)
  "statusName": "납부완료",
  "payDate": "2026-06-05",            // 납부일 (미납/예정 시 null)
  "payMethod": "신한카드 1234",       // 결제수단 표기

  // 서비스별 금액 (라인 아이템)
  "serviceLines": [
    { "serviceName": "에버웰커밍", "userCount": 30, "unitPrice": 2000, "amount": 60000 },
    { "serviceName": "에버타임",   "userCount": 30, "unitPrice": 1000, "amount": 30000 }
  ],

  // 합계
  "subtotal": 90000,         // 서비스 요금 합계 (serviceLines.amount 합)
  "memberChangeAmt": 0,      // 멤버 변동(추가/삭제) 금액
  "vat": 9000,               // 부가세
  "total": 99000,            // 총 요금 (subtotal + memberChangeAmt + vat)

  // 최근 4개월 이용 현황 (차트)
  "amounts":   [ { "month": 3, "value": 66000 }, { "month": 4, "value": 90000 }, { "month": 5, "value": 90000 }, { "month": 6, "value": 99000 } ],
  "userCounts":[ { "month": 3, "value": 10 },    { "month": 4, "value": 20 },    { "month": 5, "value": 30 },    { "month": 6, "value": 45 } ]
}
```

**처리 요구사항**
- 요청 사용자가 해당 청구의 소유(또는 회사 관리자)인지 권한 검증 필수.
- `serviceLines` 는 구독의 서비스 항목별로 분해하여 각 서비스의 단가/사용인원/금액을 반환.
  - 단일 플랜만 있는 경우 라인 1개로 반환.
  - 견적 전용(quoteOnly) 항목은 제외.
- `subtotal = Σ serviceLines.amount`, `total = subtotal + memberChangeAmt + vat` 로 일관되게 계산.
- `amounts`/`userCounts` 는 해당 구독의 최근 4개월(현재 청구월 포함) 추이. 데이터가 없으면 빈 배열.
- 금액 단위는 원(KRW), 정수.

---

## 2. (대안) 분리 호출

통합 API를 만들기 어려우면 아래 2개로 분리해도 됩니다. 프론트는 통합 API를 우선 사용합니다.

### 2-1. 청구 상세
`GET /api/v1/payments/logs/{paymentLogId}`
→ `serviceLines`, `subtotal`, `memberChangeAmt`, `vat`, `total`, 회사/결제/기간/상태 정보 반환.

### 2-2. 최근 4개월 이용 현황
`GET /api/v1/subscriptions/{subscriptionId}/recent-chart`
→ `{ amounts: MonthlyValue[], userCounts: MonthlyValue[] }`
*(기존 `getRecentChartData` 와 동일 규격 — 이미 존재한다면 재사용)*

---

## 타입 정의 (참고)

```ts
type InvoiceServiceLine = {
  serviceName: string;
  userCount: number;
  unitPrice: number;   // 인/월 단가
  amount: number;      // 서비스 금액
};

type MonthlyValue = {
  month: number;       // 1~12
  value: number;
};

type PaymentInvoiceDto = {
  invoiceNo: string;
  paymentLogId: number;
  subscriptionId: number;
  companyName: string;
  bizNo?: string;
  year: number;
  month: number;
  periodStart: string;     // YYYY-MM-DD
  periodEnd: string;       // YYYY-MM-DD
  status: number;          // PaymentLogStatusType
  statusName: string;
  payDate?: string | null; // YYYY-MM-DD
  payMethod?: string;
  serviceLines: InvoiceServiceLine[];
  subtotal: number;
  memberChangeAmt: number;
  vat: number;
  total: number;
  amounts: MonthlyValue[];
  userCounts: MonthlyValue[];
};
```

## 출력(인쇄)

- 프론트에서 `window.print()` 로 인보이스 영역만 인쇄합니다(별도 API 불필요).
- PDF 다운로드가 필요하면 추후 `GET /api/v1/payments/logs/{paymentLogId}/invoice.pdf` (application/pdf) 추가를 검토합니다.
