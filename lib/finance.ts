// 금액 단위는 모두 "만원"입니다. (예: 10000 = 1억 원)

/** 만원 단위 금액을 "1억 2,345만 원" 형태로 표기 */
export function fmtMan(man: number): string {
  const n = Math.round(man);
  if (n < 0) return `-${fmtMan(-n)}`;
  const eok = Math.floor(n / 10000);
  const rest = n % 10000;
  if (eok > 0 && rest > 0) return `${eok.toLocaleString()}억 ${rest.toLocaleString()}만 원`;
  if (eok > 0) return `${eok.toLocaleString()}억 원`;
  return `${rest.toLocaleString()}만 원`;
}

export interface FvResult {
  fv: number; // 최종 자산
  principal: number; // 총 납입 원금
  interest: number; // 수익(이자)
  yearly: { year: number; value: number; principal: number }[];
}

/** 월복리 기준 미래 자산 (원금 + 월 적립) */
export function futureValue(
  principalMan: number,
  monthlyMan: number,
  years: number,
  annualPct: number
): FvResult {
  const i = annualPct / 100 / 12;
  const months = Math.round(years * 12);
  let value = principalMan;
  let paid = principalMan;
  const yearly: FvResult["yearly"] = [];
  for (let m = 1; m <= months; m++) {
    value = value * (1 + i) + monthlyMan;
    paid += monthlyMan;
    if (m % 12 === 0) yearly.push({ year: m / 12, value, principal: paid });
  }
  return { fv: value, principal: paid, interest: value - paid, yearly };
}

/** 목표 금액 도달까지 걸리는 개월 수 (최대 100년, 도달 불가 시 null) */
export function monthsToGoal(
  goalMan: number,
  principalMan: number,
  monthlyMan: number,
  annualPct: number
): number | null {
  if (principalMan >= goalMan) return 0;
  const i = annualPct / 100 / 12;
  let value = principalMan;
  for (let m = 1; m <= 1200; m++) {
    value = value * (1 + i) + monthlyMan;
    if (value >= goalMan) return m;
  }
  return null;
}

/** 목표 금액을 기간 안에 달성하기 위한 필요 월 적립금 */
export function requiredMonthly(
  goalMan: number,
  principalMan: number,
  years: number,
  annualPct: number
): number {
  const i = annualPct / 100 / 12;
  const n = Math.round(years * 12);
  const growth = Math.pow(1 + i, n);
  const fromPrincipal = principalMan * growth;
  if (fromPrincipal >= goalMan) return 0;
  if (i === 0) return (goalMan - fromPrincipal) / n;
  return ((goalMan - fromPrincipal) * i) / (growth - 1);
}

/** 4% 룰 기준 은퇴 필요 자산 (연 지출 / 인출률) */
export function fireTarget(annualSpendMan: number, withdrawalPct = 4): number {
  return (annualSpendMan / withdrawalPct) * 100;
}

/** 목표 월 배당(세후)에 필요한 자산. 배당소득세 기본 15.4% */
export function dividendAssetNeeded(
  monthlyDividendMan: number,
  yieldPct: number,
  taxPct = 15.4
): number {
  const netYield = (yieldPct / 100) * (1 - taxPct / 100);
  if (netYield <= 0) return Infinity;
  return (monthlyDividendMan * 12) / netYield;
}
