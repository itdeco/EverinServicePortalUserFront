import { TOKEN_VALID, TOKEN_INVALID, TOKEN_EXPIRED } from "./constant";

/**
 * 토큰 관련 유틸리티 함수들
 */
const TOKEN_KEY = "evertime_token";

interface TokenValidationResult {
  success: boolean;
  code: number;
  message?: string;
}

const TokenUtil = {
  /**
   * 토큰 저장
   * @param token 저장할 토큰
   */
  setToken: (token: string | null): void => {
    if (typeof window === "undefined") return;
    
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }
  },

  /**
   * 토큰 가져오기
   * @returns 저장된 토큰
   */
  getToken: (): string | null => {
    if (typeof window === "undefined") return null;
    
    return localStorage.getItem(TOKEN_KEY);
  },

  /**
   * 토큰 삭제
   */
  removeToken: (): void => {
    if (typeof window === "undefined") return;
    
    localStorage.removeItem(TOKEN_KEY);
  },

  /**
   * 토큰 존재 여부 확인
   * @returns 토큰 존재 여부
   */
  hasToken: (): boolean => {
    return !!TokenUtil.getToken();
  },

  /**
   * 토큰 디코딩 (JWT 페이로드)
   * @param token JWT 토큰
   * @returns 디코딩된 페이로드
   */
  decodeToken: (token?: string): any => {
    const targetToken = token || TokenUtil.getToken();
    if (!targetToken) return null;
    
    try {
      const base64Url = targetToken.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch {
      return null;
    }
  },

  /**
   * 토큰 만료 여부 확인
   * @param token JWT 토큰
   * @returns 만료 여부
   */
  isTokenExpired: (token?: string): boolean => {
    const decoded = TokenUtil.decodeToken(token);
    if (!decoded || !decoded.exp) return true;
    
    const expirationDate = new Date(decoded.exp * 1000);
    return expirationDate < new Date();
  },

  /**
   * 토큰 유효성 검증
   * @param token JWT 토큰
   * @returns 검증 결과 객체
   */
  validateToken: (token?: string): TokenValidationResult => {
    const targetToken = token || TokenUtil.getToken();
    
    // 토큰이 없는 경우
    if (!targetToken) {
      return {
        success: false,
        code: TOKEN_INVALID,
        message: "토큰이 없습니다."
      };
    }
    
    // 토큰 디코딩 시도
    const decoded = TokenUtil.decodeToken(targetToken);
    if (!decoded) {
      return {
        success: false,
        code: TOKEN_INVALID,
        message: "유효하지 않은 토큰입니다."
      };
    }
    
    // 토큰 만료 확인
    if (TokenUtil.isTokenExpired(targetToken)) {
      return {
        success: false,
        code: TOKEN_EXPIRED,
        message: "토큰이 만료되었습니다."
      };
    }
    
    return {
      success: true,
      code: TOKEN_VALID
    };
  },
};

export default TokenUtil;
