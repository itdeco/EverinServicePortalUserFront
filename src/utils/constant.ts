// 토큰 관련
export const TOKEN_HEADER_NAME = "X-Api-Token";
export const TOKEN_VALID = 0;
export const TOKEN_INVALID = 1;
export const TOKEN_EXPIRED = 2;

// 사이트 주소
export const EVERTIME_DOMAIN = "evertime.co.kr";
export const EVERPAYROLL_DOMAIN = "everpayroll.co.kr";

// 포털타입
export const PORTAL_TYPE_HEADER_NAME = "portal-type";
export const PORTAL_TYPE = "1";

// 기본 자동 결제 일 (매월 5일)
export const DEFAULT_PAY_DAY = 5;

export const PAGINATION_PAGE_COUNT = 5;	//  페이지네이션에 표시될 페이지 번호 갯수
export const PAGINATION_PAGE_SIZE = 5;	// 페이지네이션 리스트 개수

export const MAX_UPLOAD_SIZE = 1024 * 1024 * 200;	// 200MB

export const METADATA = {
    EverTime: {
        title: "에버타임",
        metaTitle: "에버타임(근태관리)",
        description: "근태관리 솔루션은 많지만 52시간 근무제와 복잡하고 다양한 근무제를 완벽하게 지원하는 솔루션은 에버타임 뿐",
    },
    EverPayroll: {
        title: "에버페이롤",
        metaTitle: "에버페이롤(급여아웃소싱)",
        description: "복잡하고 까다로운 급여업무를 아웃소싱 서비스로 간편하게 해결하시고 가장 중요한 업무에 집중하세요.",
    }
}
