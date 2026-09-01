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

export interface CalculatorInfo {
  slug: string;
  title: string;
  short: string;
  emoji: string;
  description: string;
}

export const CALCULATORS: CalculatorInfo[] = [
  {
    slug: "compound",
    title: "복리 계산기",
    short: "미래 자산 시뮬레이션",
    emoji: "📈",
    description: "현재 자산과 월 적립금이 복리로 불어나면 10년, 20년 뒤 얼마가 될까요?",
  },
  {
    slug: "goal",
    title: "목표금액 계산기",
    short: "달성 기간·필요 적립금 역산",
    emoji: "🎯",
    description: "목표 금액까지 걸리는 기간과 매달 모아야 하는 금액을 역산합니다.",
  },
  {
    slug: "fire",
    title: "FIRE 계산기",
    short: "경제적 자유 달성 시점",
    emoji: "🏖️",
    description: "4% 룰 기준 은퇴 필요 자산과 내가 경제적 자유에 도달하는 시점을 계산합니다.",
  },
  {
    slug: "dividend",
    title: "배당 계산기",
    short: "월 배당 필요 자산 역산",
    emoji: "💵",
    description: "목표 월 배당금을 받으려면 얼마가 필요한지 세후 기준으로 역산합니다.",
  },
];
