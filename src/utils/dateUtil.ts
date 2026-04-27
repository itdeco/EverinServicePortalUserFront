/**
 * 날짜 관련 유틸리티 함수들
 */
const DateUtil = {
  /**
   * 날짜 포맷팅
   * @param date 날짜
   * @param includeYear 연도 포함 여부
   * @returns 포맷된 날짜 문자열
   */
  formattedDate: (date?: Date | string | null, includeYear: boolean = false): string => {
    if (!date) return "";
    
    const d = typeof date === "string" ? new Date(date) : date;
    
    if (isNaN(d.getTime())) return "";
    
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    
    if (includeYear) {
      return `${year}년 ${month}월 ${day}일`;
    }
    
    return `${month}월 ${day}일`;
  },

  /**
   * ISO 형식 날짜 포맷팅 (YYYY-MM-DD)
   * @param date 날짜
   * @returns ISO 형식 문자열
   */
  formatISODate: (date?: Date | string | null): string => {
    if (!date) return "";
    
    const d = typeof date === "string" ? new Date(date) : date;
    
    if (isNaN(d.getTime())) return "";
    
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    
    return `${year}-${month}-${day}`;
  },

  /**
   * 해당 월의 마지막 날짜 가져오기
   * @param date 기준 날짜
   * @returns 마지막 날짜
   */
  getLastDateOfMonth: (date: Date | string): Date => {
    const d = typeof date === "string" ? new Date(date) : new Date(date);
    return new Date(d.getFullYear(), d.getMonth() + 1, 0);
  },

  /**
   * 이전 달 날짜 가져오기
   * @returns 이전 달의 날짜
   */
  getPrevMonthDate: (): Date => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth() - 1, 1);
  },

  /**
   * 두 날짜 사이의 일수 계산
   * @param startDate 시작 날짜
   * @param endDate 종료 날짜
   * @returns 일수
   */
  calcIntervalDays: (startDate?: Date | string | null, endDate?: Date | string | null): number => {
    if (!startDate || !endDate) return 0;
    
    const start = typeof startDate === "string" ? new Date(startDate) : startDate;
    const end = typeof endDate === "string" ? new Date(endDate) : endDate;
    
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  },

  /**
   * 날짜 비교 (같은 날인지)
   * @param date1 첫 번째 날짜
   * @param date2 두 번째 날짜
   * @returns 같은 날 여부
   */
  isSameDate: (date1: Date, date2: Date): boolean => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  },

  /**
   * 날짜가 오늘인지 확인
   * @param date 확인할 날짜
   * @returns 오늘 여부
   */
  isToday: (date: Date): boolean => {
    return DateUtil.isSameDate(date, new Date());
  },

  /**
   * 날짜에 일수 더하기
   * @param date 기준 날짜
   * @param days 더할 일수
   * @returns 계산된 날짜
   */
  addDays: (date: Date, days: number): Date => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  },
};

export default DateUtil;
