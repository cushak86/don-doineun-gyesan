export type ClusterKey = "etf" | "fire" | "dividend" | "basics";

export const CLUSTERS: Record<
  ClusterKey,
  { label: string; emoji: string; description: string }
> = {
  etf: {
    label: "ETF·미국주식",
    emoji: "📊",
    description: "QQQ·SPY·SCHD 비교, 적립식(DCA) 전략, 세금·환율까지 미국 ETF 투자의 모든 것.",
  },
  fire: {
    label: "FIRE·은퇴설계",
    emoji: "🏖️",
    description: "4% 룰, 저축률의 마법, 은퇴 후 인출 전략 등 경제적 자유를 향한 실전 가이드.",
  },
  dividend: {
    label: "배당·커버드콜",
    emoji: "💵",
    description: "월배당 로드맵, JEPI·QYLD 커버드콜 분석, 고배당 vs 배당성장 비교.",
  },
  basics: {
    label: "재테크 기초·복리",
    emoji: "🌱",
    description: "복리의 원리, 인플레이션과 실질 수익률, 종잣돈 모으기 등 투자의 기본기.",
  },
};

export const CLUSTER_KEYS = Object.keys(CLUSTERS) as ClusterKey[];

export type CalcCategory = "invest" | "retire" | "tax" | "bank" | "life";

export const CALC_CATEGORIES: Record<CalcCategory, { label: string; emoji: string }> = {
  invest: { label: "투자·수익률", emoji: "📈" },
  retire: { label: "은퇴·배당", emoji: "🏖️" },
  tax: { label: "세금·연봉", emoji: "🧾" },
  bank: { label: "예금·적금·대출", emoji: "🏦" },
  life: { label: "생활", emoji: "🧮" },
};

export const CALC_CATEGORY_KEYS = Object.keys(CALC_CATEGORIES) as CalcCategory[];

export interface CalculatorInfo {
  slug: string;
  title: string;
  short: string;
  emoji: string;
  category: CalcCategory;
  featured?: boolean;
  description: string;
}

export const CALCULATORS: CalculatorInfo[] = [
  // 투자·수익률
  {
    slug: "compound",
    title: "복리 계산기",
    short: "미래 자산 시뮬레이션",
    emoji: "📈",
    category: "invest",
    featured: true,
    description: "현재 자산과 월 적립금이 복리로 불어나면 10년, 20년 뒤 얼마가 될까요?",
  },
  {
    slug: "goal",
    title: "목표금액 계산기",
    short: "기간·적립금·종잣돈 역산",
    emoji: "🎯",
    category: "invest",
    featured: true,
    description: "목표 금액까지 걸리는 기간, 필요한 월 적립금, 필요한 일시금(종잣돈)을 역산합니다.",
  },
  {
    slug: "qqq-dca",
    title: "QQQ 적립식 계산기",
    short: "시나리오별 장기 시뮬레이션",
    emoji: "🚀",
    category: "invest",
    description: "QQQ에 매달 적립하면? 보수·기준·낙관 3가지 수익률 시나리오로 비교합니다.",
  },
  {
    slug: "schd-dividend",
    title: "SCHD 배당 재투자 계산기",
    short: "배당 성장·YOC 시뮬레이션",
    emoji: "🌾",
    category: "invest",
    description: "배당 재투자와 배당 성장이 만드는 이중 복리를 연도별로 시뮬레이션합니다.",
  },
  {
    slug: "mdd",
    title: "MDD(최대 낙폭) 계산기",
    short: "하락률·회복 필요 수익률",
    emoji: "📉",
    category: "invest",
    description: "고점 대비 하락률(MDD)과 원금 회복에 필요한 수익률·기간을 계산합니다.",
  },
  {
    slug: "rebalancing",
    title: "리밸런싱 계산기",
    short: "목표 비중 대비 매수·매도",
    emoji: "⚖️",
    category: "invest",
    description: "자산별 현재 금액과 목표 비중을 넣으면 얼마를 사고팔아야 하는지 계산합니다.",
  },
  {
    slug: "double",
    title: "원금 2배 계산기",
    short: "72의 법칙",
    emoji: "⏳",
    category: "invest",
    description: "내 돈이 2배가 되는 데 걸리는 기간, 또는 2배에 필요한 수익률을 계산합니다.",
  },
  {
    slug: "invest-ratio",
    title: "투자비율 계산기",
    short: "나이 기반 자산배분",
    emoji: "🧭",
    category: "invest",
    description: "나이에 따른 주식·안전자산 권장 비율(100-나이 법칙)을 계산합니다.",
  },
  {
    slug: "inflation",
    title: "인플레이션 계산기",
    short: "실질 구매력 계산",
    emoji: "💸",
    category: "invest",
    description: "물가상승률을 반영해 미래 돈의 실질 가치와 필요한 미래 금액을 계산합니다.",
  },
  {
    slug: "rich-score",
    title: "부자지수 계산기",
    short: "재무 건강 진단",
    emoji: "🏆",
    category: "invest",
    featured: true,
    description: "나이·소득 대비 순자산으로 재무 상태를 진단하는 부자지수를 계산합니다.",
  },
  // 은퇴·배당
  {
    slug: "fire",
    title: "FIRE 계산기",
    short: "경제적 자유 달성 시점",
    emoji: "🏖️",
    category: "retire",
    featured: true,
    description: "4% 룰 기준 은퇴 필요 자산과 내가 경제적 자유에 도달하는 시점을 계산합니다.",
  },
  {
    slug: "withdrawal",
    title: "은퇴 인출 계산기",
    short: "자산 고갈 시점 시뮬레이션",
    emoji: "🧓",
    category: "retire",
    description: "은퇴 자산에서 매달 인출하면 몇 년이나 버틸까요? 물가 상승까지 반영합니다.",
  },
  {
    slug: "dividend",
    title: "배당 계산기",
    short: "월 배당 필요 자산 역산",
    emoji: "💵",
    category: "retire",
    featured: true,
    description: "목표 월 배당금을 받으려면 얼마가 필요한지 세후 기준으로 역산합니다.",
  },
  // 세금·연봉
  {
    slug: "etf-after-tax",
    title: "ETF 세후 복리 계산기",
    short: "배당세·양도세·보수 반영",
    emoji: "🧾",
    category: "tax",
    description: "배당세·양도세·총보수를 반영한 진짜 세후 수익률과 자산을 계산합니다.",
  },
  {
    slug: "pension-isa-tax",
    title: "연금저축·ISA 절세 계산기",
    short: "계좌별 세후 비교",
    emoji: "🛡️",
    category: "tax",
    description: "같은 돈을 일반계좌·ISA·연금저축에 넣었을 때 세후 결과를 비교합니다.",
  },
  {
    slug: "salary",
    title: "연봉 실수령 계산기",
    short: "4대보험·소득세 공제",
    emoji: "💼",
    category: "tax",
    featured: true,
    description: "연봉에서 4대보험과 소득세를 뺀 월 실수령액을 계산합니다.",
  },
  // 예금·적금·대출
  {
    slug: "deposit",
    title: "예금 계산기",
    short: "목돈 굴리기 만기 수령액",
    emoji: "🏦",
    category: "bank",
    description: "목돈을 예금에 넣으면 만기에 얼마를 받는지 단리·월복리로 계산합니다.",
  },
  {
    slug: "savings",
    title: "적금 계산기",
    short: "만기금액·목돈만들기",
    emoji: "🐷",
    category: "bank",
    featured: true,
    description: "적금 만기 수령액과, 목표 금액을 모으기 위한 필요 월 납입액을 계산합니다.",
  },
  {
    slug: "loan",
    title: "대출 계산기",
    short: "월 상환액·총 이자",
    emoji: "🏠",
    category: "bank",
    featured: true,
    description: "원리금균등·원금균등·만기일시 방식별 월 상환액과 총 이자를 계산합니다.",
  },
  // 생활
  {
    slug: "pyeong",
    title: "평수 계산기",
    short: "평 ↔ 제곱미터 환산",
    emoji: "📐",
    category: "life",
    description: "평과 제곱미터(㎡)를 서로 변환합니다.",
  },
  {
    slug: "bmi",
    title: "비만도(BMI) 계산기",
    short: "체질량지수·적정 체중",
    emoji: "🏃",
    category: "life",
    description: "키와 몸무게로 BMI와 비만도 단계, 적정 체중 범위를 계산합니다.",
  },
];
