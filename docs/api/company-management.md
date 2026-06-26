# 회사 관리 API 명세서 (계정정보 > 회사 탭)

마이페이지 `계정정보`의 `회사` 탭에서 사용하는 API 명세입니다.
회사별 **관리자 조회/초대/삭제**와 **회사별 결제수단 조회**를 다룹니다.

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
- 권한: 관리자 초대/삭제는 **마스터 관리자(`isMaster=true`)** 에게만 허용하는 것을 권장합니다. (현재 프론트는 모든 사용자에게 버튼을 노출하므로, 서버에서 권한 검증 필요)

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
    "isMaster": true,                  // 로그인 사용자가 이 회사의 마스터 관리자인지
    "admins": [
      {
        "adminId": 101,                // 관리자 레코드 PK
        "userId": 5001,                // 가입 사용자일 경우 사용자 PK (초대 대기중이면 null)
        "name": "홍길동",
        "email": "test@test.com",
        "isMaster": true,
        "status": 0,                   // 0: Active(수락완료), 1: Invited(초대 대기)
        "invitedDate": "2026-02-10",   // status=1 일 때
        "joinedDate": "2026-01-01"     // status=0 일 때
      }
    ],
    "creditCards": [
      {
        "cardId": 201,
        "companyName": "신한카드",
        "number": "5570-****-****-1234", // 마스킹된 카드번호
        "primary": 1                     // 1: 기본 결제수단, 0: 예비
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
- 각 `email` 로 초대 메일 발송 (가입 링크/수락 링크 포함)
- 이미 해당 회사 관리자이거나 초대 대기중인 이메일은 중복 처리(스킵 또는 오류 메시지)
- 부분 성공 시 처리 결과를 알 수 있으면 좋음

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
- 마스터 관리자 자기 자신 또는 마지막 마스터는 삭제 불가 처리 권장
- 초대 대기(`Invited`) 상태 레코드도 삭제 가능(초대 취소)

**Response `contents`**: `true` 또는 삭제된 `adminId`

---

## 5. 회사별 결제수단 조회

### `GET /api/v1/users/corporation/{corporationId}/cards`

> 기존 `GET /api/v1/users/cards/` (사용자별) 를 **회사별**로 변경/추가하는 엔드포인트입니다.

**Path**: `corporationId` (number)

**Response `contents`**: `CreditCard[]`
```jsonc
[
  {
    "cardId": 201,
    "companyName": "신한카드",
    "number": "5570-****-****-1234",
    "primary": 1
  }
]
```

---

## 타입 정의 (프론트 기준)

```ts
enum CompanyAdminStatus { Active = 0, Invited = 1 }

type CompanyAdminDto = {
  adminId?: number;
  userId?: number;
  name?: string;
  email?: string;
  isMaster?: boolean;
  status?: CompanyAdminStatus;
  invitedDate?: string;
  joinedDate?: string;
};

type CompanyAdminInviteeDto = { name: string; email: string; };
type CompanyAdminInviteDto = { corporationId: number; invitees: CompanyAdminInviteeDto[]; };

type CompanyManagementDto = {
  corporationId?: number;
  name?: string;
  businessNo?: string;
  isMaster?: boolean;
  admins?: CompanyAdminDto[];
  creditCards?: CreditCardDto[];
};
```

## 권장 사항 (단일 vs 개별 API)

- **단일 통합 API(`#1`) 사용을 권장합니다.** 회사 탭 진입 시 1회 호출로 화면을 모두 그릴 수 있어 회사 수만큼의 N+1 호출을 피할 수 있습니다.
- 개별 조회 API(`#2`, `#5`)는 초대/삭제 후 특정 회사만 새로고침할 때 보조적으로 사용합니다.
