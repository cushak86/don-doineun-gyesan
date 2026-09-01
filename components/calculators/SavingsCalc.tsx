"use client";

import { useState } from "react";
import { fmtMan } from "@/lib/finance";
import NumberField, { GOAL_QUICK, num } from "./NumberField";

export default function SavingsCalc() {
  const [mode, setMode] = useState<"maturity" | "goal">("maturity");
  const [monthly, setMonthly] = useState("50");
  const [goal, setGoal] = useState("1000");
  const [rate, setRate] = useState("3.5");
  const [months, setMonths] = useState("12");
  const [result, setResult] = useState<React.ReactNode>(null);

  // 적금 단리: 세전 이자 = 월납입 × (연이율/12) × n(n+1)/2
  const calc = () => {
    const r = num(rate) / 100;
    const n = num(months);
    if (n <= 0) return;
    const interestFactor = (r / 12) * ((n * (n + 1)) / 2);

    if (mode === "maturity") {
      const m = num(monthly);
      if (m <= 0) return;
      const interest = m * interestFactor;
      const tax = interest * 0.154;
      setResult(
        <div className="calc-result">
          <div className="headline">
            월 {fmtMan(m)}씩 {n}개월 납입 시 만기 세후 수령액
          </div>
          <div className="big">{fmtMan(m * n + interest - tax)}</div>
          <div className="rows">
            <div>
              <span className="k">납입 원금</span>
              <span className="v">{fmtMan(m * n)}</span>
            </div>
            <div>
              <span className="k">세전 이자</span>
              <span className="v">+{fmtMan(interest)}</span>
            </div>
            <div>
              <span className="k">이자소득세 (15.4%)</span>
              <span className="v">-{fmtMan(tax)}</span>
            </div>
          </div>
        </div>
      );
    } else {
      const g = num(goal);
      if (g <= 0) return;
      // 세후 만기 = M×n + M×factor×(1−0.154) = 목표
      const m = g / (n + interestFactor * (1 - 0.154));
      setResult(
        <div className="calc-result">
          <div className="headline">
            {n}개월 만에 {fmtMan(g)}을 모으려면 매달
          </div>
          <div className="big">{fmtMan(Math.ceil(m))}</div>
          <div className="rows">
            <div>
              <span className="k">납입 원금 합계</span>
              <span className="v">{fmtMan(Math.ceil(m) * n)}</span>
            </div>
            <div>
              <span className="k">이자(세후)가 채워주는 부분</span>
              <span className="v">+{fmtMan(Math.max(0, g - Math.ceil(m) * n))}</span>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="calc-shell">
      <div className="calc-tabs">
        <button className={mode === "maturity" ? "active" : ""} onClick={() => { setMode("maturity"); setResult(null); }}>
          🐷 만기금액 계산
        </button>
        <button className={mode === "goal" ? "active" : ""} onClick={() => { setMode("goal"); setResult(null); }}>
          🎯 목돈 만들기 (필요 납입액)
        </button>
      </div>

      {mode === "maturity" ? (
        <NumberField label="월 납입액" value={monthly} onChange={setMonthly} unit="만 원" />
      ) : (
        <NumberField label="목표 금액" value={goal} onChange={setGoal} unit="만 원" quick={GOAL_QUICK} />
      )}
      <NumberField label="연 이자율" value={rate} onChange={setRate} unit="%" />
      <NumberField label="적금 기간" value={months} onChange={setMonths} unit="개월" />
      <button className="calc-submit" onClick={calc}>
        계산하기 →
      </button>
      {result}

      <p className="hint" style={{ marginTop: 14, fontSize: 12, color: "var(--text-muted)" }}>
        은행 적금과 같은 월 단리, 일반 과세(15.4%) 기준입니다. 표시 금리 3.5% 적금의 실제 세후
        수익률은 절반 수준이라는 점(납입금이 평균적으로 절반 기간만 예치)도 함께 기억하세요.
      </p>
    </div>
  );
}
