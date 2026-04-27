/**
 * 공통 유틸리티 함수들
 */
const CommonUtil = {
  /**
   * 전화번호 포맷팅
   * @param phone 전화번호 문자열
   * @returns 포맷된 전화번호
   */
  formatPhoneNumber: (phone?: string): string => {
    if (!phone) return "";
    const cleaned = phone.replace(/\D/g, "");
    
    if (cleaned.length === 11) {
      return cleaned.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
    } else if (cleaned.length === 10) {
      return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
    }
    return phone;
  },

  /**
   * 신용카드 번호 포맷팅
   * @param cardNumber 카드번호
   * @param mask 마스킹 여부
   * @returns 포맷된 카드번호
   */
  formatCreditCardNumber: (cardNumber?: string, mask: boolean = false): string => {
    if (!cardNumber) return "";
    const cleaned = cardNumber.replace(/\D/g, "");
    
    if (mask) {
      if (cleaned.length >= 16) {
        return `•••• •••• •••• ${cleaned.slice(-4)}`;
      }
      return `•••• ${cleaned.slice(-4)}`;
    }
    
    // 4자리씩 구분
    return cleaned.match(/.{1,4}/g)?.join(" ") || cardNumber;
  },

  /**
   * 조건부 클래스 이름 생성
   * @param baseClass 기본 클래스
   * @param enabled 활성화 여부
   * @returns 클래스 문자열
   */
  enableElement: (baseClass: string, enabled?: boolean): string => {
    if (enabled) {
      return baseClass;
    }
    return `${baseClass} disabled opacity-50 pointer-events-none`;
  },

  /**
   * 빈 값 체크
   * @param value 체크할 값
   * @returns 빈 값 여부
   */
  isEmpty: (value: any): boolean => {
    if (value === null || value === undefined) return true;
    if (typeof value === "string") return value.trim().length === 0;
    if (Array.isArray(value)) return value.length === 0;
    if (typeof value === "object") return Object.keys(value).length === 0;
    return false;
  },

  /**
   * 이메일 유효성 검사
   * @param email 이메일 주소
   * @returns 유효 여부
   */
  isValidEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  /**
   * 사업자등록번호 포맷팅
   * @param businessNo 사업자등록번호
   * @returns 포맷된 사업자등록번호
   */
  formatBusinessNo: (businessNo?: string): string => {
    if (!businessNo) return "";
    const cleaned = businessNo.replace(/\D/g, "");
    
    if (cleaned.length === 10) {
      return cleaned.replace(/(\d{3})(\d{2})(\d{5})/, "$1-$2-$3");
    }
    return businessNo;
  },

  /**
   * 금액 포맷팅
   * @param amount 금액
   * @returns 포맷된 금액 문자열
   */
  formatCurrency: (amount?: number): string => {
    if (amount === undefined || amount === null) return "₩0";
    return `₩${amount.toLocaleString("ko-KR")}`;
  },
};

export default CommonUtil;
