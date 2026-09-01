import type { Metadata } from "next";
import CalcPageLayout from "@/components/CalcPageLayout";
import DividendCalc from "@/components/calculators/DividendCalc";

export const metadata: Metadata = {
  title: "배당 계산기 — 월 100만원 배당에 필요한 자산 역산",
  description:
    "목표 월 배당금을 받으려면 얼마가 필요할까요? 배당수익률과 세금을 반영해 필요 자산을 역산합니다. 무료 배당 계산기.",
};

export default function Page() {
  return (
    <CalcPageLayout slug="dividend">
      <DividendCalc />
    </CalcPageLayout>
  );
}
