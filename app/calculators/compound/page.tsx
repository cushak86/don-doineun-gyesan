import type { Metadata } from "next";
import CalcPageLayout from "@/components/CalcPageLayout";
import CompoundCalc from "@/components/calculators/CompoundCalc";

export const metadata: Metadata = {
  title: "복리 계산기 — 10년 뒤 내 자산 시뮬레이션",
  description:
    "현재 자산과 월 적립금, 연 수익률을 입력하면 복리로 불어난 미래 자산을 연차별로 계산해드립니다. 무료 복리 계산기.",
};

export default function Page() {
  return (
    <CalcPageLayout slug="compound">
      <CompoundCalc />
    </CalcPageLayout>
  );
}
