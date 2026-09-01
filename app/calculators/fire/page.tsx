import type { Metadata } from "next";
import CalcPageLayout from "@/components/CalcPageLayout";
import FireCalc from "@/components/calculators/FireCalc";

export const metadata: Metadata = {
  title: "FIRE 계산기 — 경제적 자유 필요 자산과 달성 시점",
  description:
    "4% 룰 기준 은퇴에 필요한 자산과 현재 저축 속도로 경제적 자유에 도달하는 시점을 계산합니다. 무료 파이어족 계산기.",
};

export default function Page() {
  return (
    <CalcPageLayout slug="fire">
      <FireCalc />
    </CalcPageLayout>
  );
}
