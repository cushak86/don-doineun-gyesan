import type { Metadata } from "next";
import CalcPageLayout from "@/components/CalcPageLayout";
import GoalCalc from "@/components/calculators/GoalCalc";

export const metadata: Metadata = {
  title: "목표금액 계산기 — 1억 모으기까지 걸리는 기간·필요 적립금",
  description:
    "목표 금액까지 걸리는 기간과 매달 필요한 적립금을 역산합니다. 종잣돈 1억 모으기 계획을 숫자로 세워보세요.",
};

export default function Page() {
  return (
    <CalcPageLayout slug="goal">
      <GoalCalc />
    </CalcPageLayout>
  );
}
