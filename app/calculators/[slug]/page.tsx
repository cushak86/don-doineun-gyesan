import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CalcPageLayout from "@/components/CalcPageLayout";
import BmiCalc from "@/components/calculators/BmiCalc";
import CompoundCalc from "@/components/calculators/CompoundCalc";
import DepositCalc from "@/components/calculators/DepositCalc";
import DividendCalc from "@/components/calculators/DividendCalc";
import DoubleCalc from "@/components/calculators/DoubleCalc";
import EtfAfterTaxCalc from "@/components/calculators/EtfAfterTaxCalc";
import FireCalc from "@/components/calculators/FireCalc";
import GoalCalc from "@/components/calculators/GoalCalc";
import InflationCalc from "@/components/calculators/InflationCalc";
import InvestRatioCalc from "@/components/calculators/InvestRatioCalc";
import LoanCalc from "@/components/calculators/LoanCalc";
import MddCalc from "@/components/calculators/MddCalc";
import PensionIsaTaxCalc from "@/components/calculators/PensionIsaTaxCalc";
import PyeongCalc from "@/components/calculators/PyeongCalc";
import QqqDcaCalc from "@/components/calculators/QqqDcaCalc";
import RebalancingCalc from "@/components/calculators/RebalancingCalc";
import RichScoreCalc from "@/components/calculators/RichScoreCalc";
import SalaryCalc from "@/components/calculators/SalaryCalc";
import SavingsCalc from "@/components/calculators/SavingsCalc";
import SchdDividendCalc from "@/components/calculators/SchdDividendCalc";
import WithdrawalCalc from "@/components/calculators/WithdrawalCalc";
import { CALCULATORS } from "@/lib/clusters";

const COMPONENTS: Record<string, React.ComponentType> = {
  compound: CompoundCalc,
  goal: GoalCalc,
  "qqq-dca": QqqDcaCalc,
  "schd-dividend": SchdDividendCalc,
  mdd: MddCalc,
  rebalancing: RebalancingCalc,
  double: DoubleCalc,
  "invest-ratio": InvestRatioCalc,
  inflation: InflationCalc,
  "rich-score": RichScoreCalc,
  fire: FireCalc,
  withdrawal: WithdrawalCalc,
  dividend: DividendCalc,
  "etf-after-tax": EtfAfterTaxCalc,
  "pension-isa-tax": PensionIsaTaxCalc,
  salary: SalaryCalc,
  deposit: DepositCalc,
  savings: SavingsCalc,
  loan: LoanCalc,
  pyeong: PyeongCalc,
  bmi: BmiCalc,
};

export function generateStaticParams() {
  return CALCULATORS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const calc = CALCULATORS.find((c) => c.slug === slug);
  if (!calc) return {};
  return {
    title: `${calc.title} — ${calc.short}`,
    description: `${calc.description} 회원가입 없이 무료로 사용하세요.`,
  };
}

export default async function CalcPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const Calc = COMPONENTS[slug];
  if (!Calc || !CALCULATORS.some((c) => c.slug === slug)) notFound();
  return (
    <CalcPageLayout slug={slug}>
      <Calc />
    </CalcPageLayout>
  );
}
