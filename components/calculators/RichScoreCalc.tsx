"use client";

import { useState } from "react";
import { fmtMan } from "@/lib/finance";
import NumberField, { MONEY_QUICK, num } from "./NumberField";

function grade(score: number): { label: string; desc: string } {
  if (score >= 2)
    return { label: "매우 우수 🏆", desc: "나이·소득 대비 자산이 매우 훌륭합니다. 지금 구조를 유지하세요." };
  if (score >= 1)
    return { label: "우수 👍", desc: "평균 이상입니다. 저축률을 조금만 더 올리면 상위권입니다." };
  if (score >= 0.5)
    return { label: "보통 🌱", desc: "평균 수준입니다. 고정비 점검과 자동 적립으로 개선할 수 있습니다." };
  return { label: "노력 필요 ⚠️", desc: "소득 대비 자산 축적이 느립니다. 소비 구조부터 점검해보세요." };
}

export default function RichScoreCalc() {
  const [age, setAge] = useState("35");
  const [income, setIncome] = useState("5000");
  const [netWorth, setNetWorth] = useState("10000");
  const [result, setResult] = useState<number | null>(null);

  const calc = () => {
    const a = num(age);
    const inc = num(income);
    if (a <= 0 || inc <= 0) return;
    setResult((num(netWorth) * 10) / (a * inc));
  };

  const g = result !== null ? grade(result) : null;
  const expected = (num(age) * num(income)) / 10;

  return (
    <div className="calc-shell">
      <NumberField label="나이" value={age} onChange={setAge} unit="세" />
      <NumberField
        label="세전 연소득"
        value={income}
        onChange={setIncome}
        unit="만 원"
        hint="연봉 + 기타 소득의 합계."
      />
      <NumberField
        label="순자산"
        value={netWorth}
        onChange={setNetWorth}
        unit="만 원"
        quick={MONEY_QUICK}
        hint="전체 자산(부동산·예금·주식 등)에서 대출 등 부채를 뺀 금액."
      />
      <button className="calc-submit" onClick={calc}>
        계산하기 →
      </button>

      {result !== null && g && (
        <div className="calc-result">
          <div className="headline">나의 부자지수</div>
          <div className="big">
            {result.toFixed(2)} — {g.label}
          </div>
          <div className="rows">
            <div>
              <span className="k">진단</span>
              <span className="v" style={{ textAlign: "right", maxWidth: "70%" }}>
                {g.desc}
              </span>
            </div>
            <div>
              <span className="k">지수 1.0 기준 순자산 (나이×연소득÷10)</span>
              <span className="v">{fmtMan(expected)}</span>
            </div>
          </div>
        </div>
      )}

      <p className="hint" style={{ marginTop: 14, fontSize: 12, color: "var(--text-muted)" }}>
        부자지수 = (순자산 × 10) ÷ (나이 × 연소득). 『이웃집 백만장자』의 기대 자산 공식을 지수화한
        것으로, 2 이상이면 같은 나이·소득 대비 자산 축적을 매우 잘하고 있다는 의미입니다.
      </p>
    </div>
  );
}
