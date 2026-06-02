# Everin Service Portal User Front

> Ever人 서비스 포탈 사용자 Front-End 프로젝트
>
> Last Updated: 2026-06-01

---

# 1. 프로젝트 소개

Everin Service Portal User Front는 에버인의 SaaS 서비스(에버타임, 에버웰커밍, 인사관리, PC-OFF, 그룹웨어 등)를 소개하고,
체험신청, 구독신청, 결제, 고객지원 기능을 제공하는 사용자용 포탈입니다.

주요 목적

- 서비스 소개
- 구독 신청
- 무료 체험 신청
- 결제 및 구독 관리
- 고객지원
- 파트너 안내

---

# 2. 기술 스택

## Frontend

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Shadcn UI
- Lucide React

## Backend 연동

- Next.js API Route
- BMS API 연동

## 배포

- Docker
- Nginx
- AWS / On-Premise

---

# 3. 프로젝트 구조

```text
app/
components/
hooks/
lib/
types/
public/
```

---

# 4. 화면 구조

## 메인

| URL | 화면 |
|------|------|
| / | 메인 랜딩 |
| /stories | 고객 사례 |
| /partners | 파트너 |

---

## 서비스 소개

| URL | 화면 |
|------|------|
| /people/everworks | 그룹웨어 |
| /people/smartWorkCare/hr | 인사관리 |
| /people/smartWorkCare/evertime | 에버타임 |
| /people/smartWorkCare/pcoff | PC-OFF |

---

## 회원

| URL | 화면 |
|------|------|
| /login | 로그인 |
| /find | 계정 찾기 |
| /signup | 회원가입 |
| /signup/step2 | 회원가입 Step2 |
| /signup/step3 | 회원가입 Step3 |
| /signup/step4 | 회원가입 완료 |
| /withdrawal | 회원 탈퇴 |

---

## 구독

| URL | 화면 |
|------|------|
| /subscribe | 견적 시뮬레이터 |
| /subscribe/step2 | 구독 정보 |
| /subscribe/step3 | 결제 진행 |

---

## 무료 체험

| URL | 화면 |
|------|------|
| /trial | 체험 신청 |
| /trial/step2 | 체험 정보 |
| /trial/user | 사용자 등록 |

---

## 고객지원

| URL | 화면 |
|------|------|
| /support/faq | FAQ |
| /support/help | 도움말 |
| /support/notice | 공지사항 |
| /support/video | 영상자료 |
| /support/inquiry | 문의하기 |
| /support/feedback/write | 피드백 등록 |

---

## 마이페이지

| URL | 화면 |
|------|------|
| /mypage/account | 계정정보 |
| /mypage/payment | 결제내역 |
| /mypage/payment/invoice | 청구서 |
| /mypage/payment/error | 결제오류 |
| /mypage/subscription | 구독관리 |
| /mypage/subscription/expire | 해지 |
| /mypage/subscription/recover | 복구 |
| /mypage/withdrawal | 회원탈퇴 |
| /account/password | 비밀번호 변경 |

---

# 5. 구독 시뮬레이터

프로젝트 핵심 기능

## 지원 기능

- 카테고리 선택
- 서비스 선택
- 플랜 선택
- 하위 서비스 선택
- 사용자 수 입력
- 가격 계산
- 견적 요청

## 가격 정책

### 고정 단가

```text
총금액 = 단가 × 인원수
```

### 인원 구간 단가

```text
총금액 =
기본금액 +
(인원수 - 시작인원) × 추가단가
```

## 특수 정책

- Enterprise → 별도견적
- 하위 서비스 포함 상품 지원
- 실시간 가격 계산
- VAT 처리

---

# 6. API 구조

## BMS Proxy

```text
/app/api/bms/subscribe/route.ts
```

역할

- 프론트 ↔ BMS 중계
- CORS 우회
- API 통합

### ServiceList

서비스 목록 조회

### PriceList

가격 정책 조회

---

# 7. 환경변수

## Local

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Environment Files

```text
.env.local
.env.dev
.env.stg
.env.prod
```

---

# 8. 실행 방법

## 패키지 설치

```bash
npm install
```

## 개발 서버

```bash
npm run dev
```

## Production Build

```bash
npm run build
```

## Start

```bash
npm run start
```

---

# 9. Docker

## Build

```bash
docker build -t everin-portal-user .
```

## Run

```bash
docker run -d \
-p 3000:3000 \
--name everin-portal-user \
everin-portal-user
```

---

# 10. 운영 아키텍처

```text
사용자
   ↓
CloudFront
   ↓
Next.js User Front
   ↓
BMS API Proxy
   ↓
Backend API
   ↓
Database
```

---

# 11. 개발 규칙

## 컴포넌트

```tsx
export default function ComponentName() {
    return <div />
}
```

## Type

```ts
export type UserDto = {
    id?: number;
}
```

---

# 12. 향후 계획

- AI 챗봇
- SaaS Marketplace
- 다국어 지원
- 관리자 CMS 연동
- 결제 자동화

---

# 13. 프로젝트 구성

## Front

EverinServicePortalUserFront

사용자 포탈

## Admin

EverinServicePortalAdminFront

관리자 포탈

## Backend

EverinServicePortalServer

API 서버

---

# 14. 신규 개발자 확인 사항

- 환경변수 설정
- npm install
- BMS API 연결 확인
- Docker Build 확인
- Subscribe 가격 계산 로직 확인
- 배포 파이프라인 확인
- 운영 URL 확인

---

