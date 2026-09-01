"use client";

import { useState } from "react";
import { fmtMan, monthsToGoal, requiredMonthly } from "@/lib/finance";
import NumberField, { GOAL_QUICK, MONEY_QUICK, num } from "./NumberField";

type Mode = "period" | "monthly";

export default function GoalCalc() {
  const [mode, setMode] = useState<Mode>("period");
  const [goal, setGoal] = useState("10000");
  const [principal, setPrincipal] = useState("0");
  const [monthly, setMonthly] = useState("100");
  const [years, setYears] = useState("10");
  const [rate, setRate] = useState("5");
  const [result, setResult] = useState<React.ReactNode>(null);

  const calc = () => {
    const g = num(goal);
    if (g <= 0) return;
    if (mode === "period") {
      const months = monthsToGoal(g, num(principal), num(monthly), num(rate));
      if (months === null) {
        setResult(
          <div className="calc-result">
            <div className="headline">100년 안에 도달하기 어렵습니다</div>
            <div className="big">적립금을 늘려보세요</div>
            <div className="rows">
              <div>
                <span className="k">해결 방법</span>
                <span className="v">월 적립금 증액 또는 수익률 상향</span>
              </div>
            </div>
          </div>
        );
        return;
      }
      const y = Math.floor(months / 12);
      const m = months % 12;
      const paid = num(principal) + num(monthly) * months;
      setResult(
        <div className="calc-result">
          <div className="headline">{fmtMan(g)} 달성까지</div>
          <div className="big">
            {months === 0 ? "이미 달성!" : `${y > 0 ? `${y}년 ` : ""}${m > 0 ? `${m}개월` : ""}`}
          </div>
          <div className="rows">
            <div>
              <span className="k">총 납입 원금</span>
              <span className="v">{fmtMan(paid)}</span>
            </div>
            <div>
              <span className="k">복리 수익 부분</span>
              <span className="v">+{fmtMan(Math.max(0, g - paid))}</span>
            </div>
          </div>
        </div>
      );
    } else {
      const y = num(years);
      if (y <= 0) return;
      const need = requiredMonthly(g, num(principal), y, num(rate));
      setResult(
        <div className="calc-result">
          <div className="headline">
            {y}년 안에 {fmtMan(g)}을 모으려면 매달
          </div>
          <div className="big">{need === 0 ? "추가 적립 불필요" : fmtMan(Math.ceil(need))}</div>
          <div className="rows">
            <div>
              <span className="k">총 납입 원금</span>
              <span className="v">{fmtMan(num(principal) + Math.ceil(need) * y * 12)}</span>
            </div>
            <div>
              <span className="k">연 수익률 가정</span>
              <span className="v">{num(rate)}%</span>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="calc-shell">
      <div className="calc-tabs">
        <button className={mode === "period" ? "active" : ""} onClick={() => { setMode("period"); setResult(null); }}>
          ⏱️ 달성 기간 계산
        </button>
        <button className={mode === "monthly" ? "active" : ""} onClick={() => { setMode("monthly"); setResult(null); }}>
          💰 필요 월 적립금 계산
        </button>
      </div>

      <NumberField
        label="목표 금액"
        value={goal}
        onChange={setGoal}
        unit="만 원"
        quick={GOAL_QUICK}
        hint="예: 1억 = 10000"
      />
      <NumberField
        label="현재 자산"
        value={principal}
        onChange={setPrincipal}
        unit="만 원"
        quick={MONEY_QUICK}
      />
      {mode === "period" ? (
        <NumberField label="월 적립금" value={monthly} onChange={setMonthly} unit="만 원" />
      ) : (
        <NumberField label="목표 기간" value={years} onChange={setYears} unit="년" />
      )}
      <NumberField label="연 수익률" value={rate} onChange={setRate} unit="%" />

      <button className="calc-submit" onClick={calc}>
        계산하기 →
      </button>
      {result}
    </div>
  );
}
