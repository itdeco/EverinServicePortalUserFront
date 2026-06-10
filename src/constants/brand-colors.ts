export const COLORS = {
  people: "#03b565",       // 스마트 워크케어, 에버타임
  payroll: "#3344e6",      // 급여, 에버페이롤
  everworks: "#FF5A00",    // 에버웍스, 그룹웨어
  onboarding: "#00dcaa",   // 에버웰커밍, 온보딩
  evaluation: "#0074ff",   // 에버평가, 평가
  culture: "#0D99FF",      // 에버레스크, 에버온사람, Culture, 기업문화
} as const;

export const BRAND_COLORS = COLORS;

export type BrandColorKey = keyof typeof COLORS;
