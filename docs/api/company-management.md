# 회사 관리 API 명세서 (계정정보 > 회사 탭)

마이페이지 `계정정보`의 `회사` 탭에서 사용하는 API 명세입니다.
회사별 **관리자 조회/초대/삭제**와 **회사별 결제수단(카드/CMS) 조회/등록/삭제**를 다룹니다.

## 공통 사항

- Base URL: `{apiServer}`
- 인증: 로그인 토큰 헤더 필요 (기존 `callApi` 와 동일한 토큰 헤더 규칙)
- 응답 포맷(기존 규약과 동일):
  ```json
  {
    "code": 1000,        // 1000(API_SUCCESS) 이하: 성공, contents 사용 / 초과: 오류, message 사용
    "contents": { ... }, // 성공 시 데이터
    "message": "..."     // 오류 시 메시지
  }
  ```
- 관리자 권한: **모든 관리자는 동일한 권한**을 가집니다. 마스터/등급 구분은 없습니다.
- 삭제 제약: **본인(로그인 사용자)은 관리자 목록에서 삭제할 수 없습니다.** 프론트에서 본인 행의 삭제 버튼을 숨기지만, 서버에서도 `userId == 로그인 사용자` 인 경우 거부해야 합니다.

---

## 1. (권장) 통합 조회 — 내 회사 + 관리자 + 결제수단

> 프론트는 회사 탭 진입 시 이 단일 API 한 번만 호출합니다. (N+1 방지)

### `GET /api/v1/users/companies/management`

로그인한 사용자가 소속된 모든 회사와, 각 회사의 관리자 목록 및 결제수단을 한 번에 반환합니다.

**Request**: 파라미터 없음 (토큰으로 사용자 식별)

**Response `contents`**: `CompanyManagement[]`

```jsonc
[
  {
    "corporationId": 1,
    "name": "참존(주)",
    "businessNo": "212-12-12222",
    "admins": [
      {
        "adminId": 101,                // 관리자 레코드 PK
        "userId": 5001,                // 가입 사용자일 경우 사용자 PK (초대 대기중이면 null)
        "name": "홍길동",
        "email": "test@test.com",
        "status": 0,                   // 0: Active(수락완료), 1: Invited(초대 대기)
        "invitedDate": "2026-02-10",   // status=1 일 때
        "joinedDate": "2026-01-01"     // status=0 일 때
      }
    ],
    "paymentMethods": [
      {
        "methodId": 201,
        "type": 0,                       // 0: Card(신용카드), 1: Cms(계좌이체)
        "primary": 1,                    // 1: 기본 결제수단, 0: 예비
        // type=0 (카드)
        "cardCompany": "신한카드",
        "cardNumber": "5570-****-****-1234", // 마스킹된 카드번호
        "expirationYear": "28",
        "expirationMonth": "12"
      },
      {
        "methodId": 202,
        "type": 1,                       // CMS
        "primary": 0,
        // type=1 (CMS)
        "bankName": "국민은행",
        "accountNumber": "123456-**-******", // 마스킹된 계좌번호
        "accountHolder": "참존(주)"
      }
    ]
  }
]
```

---

## 2. 회사별 관리자 조회

### `GET /api/v1/users/corporation/{corporationId}/admins`

**Path**: `corporationId` (number) — 회사 PK

**Response `contents`**: `CompanyAdmin[]` (위 `admins` 항목과 동일 스키마)

---

## 3. 회사별 관리자 초대 (메일 발송)

### `POST /api/v1/users/corporation/{corporationId}/admins/invite`

이메일/성함을 N건 받아 각 대상자에게 초대 메일을 발송하고, 관리자 레코드를 `Invited(1)` 상태로 생성합니다.

**Path**: `corporationId` (number)

**Request Body**:
```jsonc
{
  "invitees": [
    { "name": "이영희", "email": "younghee@test.com" },
    { "name": "박민수", "email": "minsu@test.com" }
  ]
}
```

**처리 요구사항**:
- 각 `email` 로 초대 메일 발송 (가입/수락 링크 포함)
- 이미 해당 회사 관리자이거나 초대 대기중인 이메일은 중복 처리(스킵 또는 오류 메시지)
- 초대 만료: **7일** (메일 안내 문구와 동일)
- 부분 성공 시 처리 결과를 알 수 있으면 좋음

**초대 메일 템플릿** (제목: `[에버人] 사내 관리자 초대 안내`):

```
[에버人] 사내 관리자 초대 안내

안녕하세요, 에버人(EverIn)입니다.

{초대한 관리자명}님 귀하를 사내 관리자로 {초대 대상명}님을 초대했습니다.
아래 버튼을 클릭하여 가입을 완료해주세요.

[ 관리자초대수락하기 ]   ← 수락 링크 버튼

이 초대는 7일 후 만료됩니다.

본 초대와 관련해 궁금한 사항이 있으시면 에버人 고객센터 또는 관리자에게 문의해 주세요.

감사합니다.
에버人 드림

본 메일은 관련법령에 의거하여 이메일 수신여부와 관계없이 발송되는 메일입니다.
```

- 치환 변수: `{초대한 관리자명}`(초대를 발송한 로그인 사용자), `{초대 대상명}`(invitee.name), 수락 링크 버튼 URL

**Response `contents`**:
```jsonc
{
  "invitedCount": 2,
  "results": [
    { "email": "younghee@test.com", "success": true },
    { "email": "minsu@test.com", "success": false, "reason": "이미 초대된 사용자" }
  ]
}
```

---

## 4. 회사별 관리자 삭제

### `DELETE /api/v1/users/corporation/{corporationId}/admins/{adminId}`

**Path**:
- `corporationId` (number) — 회사 PK
- `adminId` (number) — 관리자 레코드 PK

**처리 요구사항**:
- **본인(로그인 사용자)은 삭제 불가** — 요청자의 `userId` 와 대상 관리자의 `userId` 가 같으면 거부
- 초대 대기(`Invited`) 상태 레코드도 삭제 가능(초대 취소)

**Response `contents`**: `true` 또는 삭제된 `adminId`

---

## 5. 회사별 결제수단 조회 (카드 + CMS)

### `GET /api/v1/users/corporation/{corporationId}/payment-methods`

> 기존 `GET /api/v1/users/cards/` (사용자별) 를 **회사별**로 변경/확장하는 엔드포인트입니다. 카드와 CMS(계좌이체)를 모두 반환합니다.

**Path**: `corporationId` (number)

**Response `contents`**: `CompanyPaymentMethod[]` (위 `paymentMethods` 항목과 동일 스키마)

---

## 6. 회사별 결제수단 등록

### `POST /api/v1/users/corporation/{corporationId}/payment-methods`

**Path**: `corporationId` (number)

**Request Body** (카드):
```jsonc
{
  "type": 0,
  "cardCompany": "신한카드",
  "cardNumber": "5570111122223333",
  "expirationMonth": "12",
  "expirationYear": "28"
}
```

**Request Body** (CMS):
```jsonc
{
  "type": 1,
  "bankName": "국민은행",
  "accountNumber": "12345678901234",
  "accountHolder": "참존(주)"
}
```

**처리 요구사항**:
- 카드번호/계좌번호는 저장 시 암호화 및 응답 시 마스킹
- 회사 첫 결제수단이면 `primary=1` 자동 지정 권장
- **회사당 결제수단은 최대 2개까지만 등록 가능** — 이미 2개면 거부(프론트에서도 차단하나 서버 검증 필수)

**Response `contents`**: 생성된 `CompanyPaymentMethod`

---

## 7. 회사별 결제수단 삭제

### `DELETE /api/v1/users/corporation/{corporationId}/payment-methods/{methodId}`

**Path**:
- `corporationId` (number)
- `methodId` (number) — 결제수단 PK

**처리 요구사항**:
- 삭제 대상이 `primary=1`(기본)이고 다른 결제수단이 남아있으면, 남은 수단 중 하나를 자동으로 기본(`primary=1`)으로 승격 권장

**Response `contents`**: `true` 또는 삭제된 `methodId`

---

## 8. 회사별 기본 결제수단 변경

### `PUT /api/v1/users/corporation/{corporationId}/payment-methods/{methodId}/primary`

지정한 결제수단을 **기본(primary)** 으로 설정하고, 같은 회사의 나머지 결제수단은 **예비(primary=0)** 로 변경합니다.

**Path**:
- `corporationId` (number)
- `methodId` (number) — 기본으로 지정할 결제수단 PK

**처리 요구사항**:
- 회사당 `primary=1` 은 항상 1개만 유지

**Response `contents`**: `true` 또는 갱신된 `CompanyPaymentMethod[]`

---

## 9. [초대] 토큰으로 초대 정보 조회 (비로그인)

### `GET /api/v1/users/invitations/{token}`

초대 메일의 링크(`/invite?token=...`)로 진입했을 때 호출합니다. **인증 불필요.**

**Path**: `token` (string) — 초대 토큰

**Response `contents`** (`CompanyAdminInvitation`):
```jsonc
{
  "token": "abc123",
  "corporationId": 1,
  "corporationName": "참존(주)",
  "inviterName": "홍길동",      // 초대한 관리자
  "inviteeName": "박은경",      // 초대 시 입력한 성함(초기값, 수정 가능)
  "email": "invitee@test.com",  // 초대된 이메일(고정, 변경 불가)
  "isExistingUser": false,      // 이미 가입된 회원이면 true → 로그인 분기
  "expired": false              // 발송 후 7일 경과 시 true
}
```

**처리 요구사항**:
- `email` 이 이미 가입된 회원이면 `isExistingUser=true` 로 반환 → 프론트는 로그인 폼 노출
- 발송 후 7일 경과 시 `expired=true`

---

## 10. [초대] 신규 가입으로 초대 수락 (비로그인)

### `POST /api/v1/users/invitations/{token}/signup`

신규 사용자가 초대를 수락하며 계정을 생성합니다. **인증 불필요.**

**Request Body**:
```jsonc
{
  "token": "abc123",
  "email": "invitee@test.com",  // 초대된 이메일과 반드시 일치(서버 검증)
  "name": "박은경",
  "password": "********",
  "phone": "01012345678"        // SMS 인증 완료된 번호
}
```

**처리 요구사항**:
- `email` 은 초대 토큰의 이메일과 일치하는지 검증(불일치 시 거부)
- 계정 생성 후 초대된 회사(`corporationId`)의 관리자로 자동 등록(`status=Active`)
- 초대 토큰 만료 처리
- 가입과 동시에 로그인 처리하여 세션/프로필 반환 권장

**Response `contents`**: 로그인된 `UserDto`(프로필) — 프론트에서 즉시 로그인 상태로 전환

---

## 11. [초대] 기존 회원 로그인으로 초대 수락 (비로그인)

### `POST /api/v1/users/invitations/{token}/join`

이미 가입된 회원이 로그인하여 초대된 회사에 관리자로 합류합니다. **인증 불필요(로그인 처리 포함).**

**Request Body**:
```jsonc
{
  "token": "abc123",
  "loginId": "exist@test.com",  // 초대된 이메일(고정)
  "password": "********"
}
```

**처리 요구사항**:
- 로그인 검증 후, 해당 사용자를 초대된 회사(`corporationId`)의 관리자로 추가(`status=Active`)
- 이미 해당 회사 관리자면 중복 추가하지 않고 성공 처리
- 초대 토큰 만료 처리

**Response `contents`**: 로그인된 `UserDto`(프로필)

---

## 초대 메일 템플릿

제목: `[에버人] 사내 관리자 초대 안내`

본문(치환 변수):
- `{inviterName}` — 초대한(기존) 관리자 성함
- `{inviteeName}` — 초대 대상 성함
- `{corporationName}` — 회사명

```
안녕하세요, 에버人(EverIn)입니다.

{inviterName}님 귀하를 사내 관리자로 {inviteeName}님을 초대했습니다.
아래 버튼을 클릭하여 가입을 완료해주세요.

[ 관리자초대수락하기 ]   → /invite?token={token}

이 초대는 7일 후 만료됩니다.

본 초대와 관련해 궁금한 사항이 있으시면 에버人 고객센터 또는 관리자에게 문의해 주세요.

감사합니다.
에버人 드림
```

> 버튼 링크는 프론트 초대 수락 페이지 `/invite?token={token}` 로 연결합니다.

---

## 타입 정의 (프론트 기준)

```ts
enum CompanyAdminStatus { Active = 0, Invited = 1 }

type CompanyAdminDto = {
  adminId?: number;
  userId?: number;
  name?: string;
  email?: string;
  status?: CompanyAdminStatus;
  invitedDate?: string;
  joinedDate?: string;
};

type CompanyAdminInviteeDto = { name: string; email: string; };
type CompanyAdminInviteDto = { corporationId: number; invitees: CompanyAdminInviteeDto[]; };

enum CompanyPaymentMethodType { Card = 0, Cms = 1 }

type CompanyPaymentMethodDto = {
  methodId?: number;
  corporationId?: number;
  type?: CompanyPaymentMethodType;
  primary?: number;
  // 카드
  cardCompany?: string;
  cardNumber?: string;
  expirationYear?: string;
  expirationMonth?: string;
  // CMS(계좌이체)
  bankName?: string;
  accountNumber?: string;
  accountHolder?: string;
};

type CompanyManagementDto = {
  corporationId?: number;
  name?: string;
  businessNo?: string;
  admins?: CompanyAdminDto[];
  paymentMethods?: CompanyPaymentMethodDto[];
};

// 초대 수락 플로우
type CompanyAdminInvitationDto = {
  token?: string;
  corporationId?: number;
  corporationName?: string;
  inviterName?: string;
  inviteeName?: string;
  email?: string;            // 고정
  isExistingUser?: boolean;
  expired?: boolean;
};

type CompanyAdminInviteSignUpDto = {
  token: string;
  email: string;
  name: string;
  password: string;
  phone: string;
};

type CompanyAdminInviteJoinDto = {
  token: string;
  loginId: string;
  password: string;
};
```

## 권장 사항 (단일 vs 개별 API)

- **단일 통합 API(`#1`) 사용을 권장합니다.** 회사 탭 진입 시 1회 호출로 화면을 모두 그릴 수 있어 회사 수만큼의 N+1 호출을 피할 수 있습니다.
- 개별 조회 API(`#2`, `#5`)는 초대/삭제/등록 후 특정 회사만 새로고침할 때 보조적으로 사용합니다.
