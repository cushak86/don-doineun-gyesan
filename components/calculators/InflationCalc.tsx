"use client";

import { useState } from "react";
import { fmtMan } from "@/lib/finance";
import NumberField, { GOAL_QUICK, num } from "./NumberField";

export default function InflationCalc() {
  const [mode, setMode] = useState<"power" | "future">("power");
  const [amount, setAmount] = useState("10000");
  const [rate, setRate] = useState("3");
  const [years, setYears] = useState("20");
  const [result, setResult] = useState<React.ReactNode>(null);

  const calc = () => {
    const a = num(amount);
    const r = num(rate) / 100;
    const y = num(years);
    if (a <= 0 || y <= 0) return;
    const table = [10, 20, 30].map((n) => ({
      n,
      power: a / Math.pow(1 + r, n),
      future: a * Math.pow(1 + r, n),
    }));

    if (mode === "power") {
      setResult(
        <div className="calc-result">
          <div className="headline">
            물가 연 {num(rate)}% 기준, {y}년 뒤 {fmtMan(a)}의 실질 구매력
          </div>
          <div className="big">{fmtMan(a / Math.pow(1 + r, y))}</div>
          <div className="rows">
            <div>
              <span className="k">구매력 감소분</span>
              <span className="v">-{fmtMan(a - a / Math.pow(1 + r, y))}</span>
            </div>
          </div>
          <div className="year-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>경과</th>
                  <th>실질 구매력</th>
                </tr>
              </thead>
              <tbody>
                {table.map((t) => (
                  <tr key={t.n}>
                    <td>{t.n}년 후</td>
                    <td>{fmtMan(t.power)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    } else {
      setResult(
        <div className="calc-result">
          <div className="headline">
            {y}년 뒤에 오늘의 {fmtMan(a)}와 같은 구매력을 가지려면
          </div>
          <div className="big">{fmtMan(a * Math.pow(1 + r, y))}</div>
          <div className="year-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>경과</th>
                  <th>필요 금액</th>
                </tr>
              </thead>
              <tbody>
                {table.map((t) => (
                  <tr key={t.n}>
                    <td>{t.n}년 후</td>
                    <td>{fmtMan(t.future)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="calc-shell">
      <div className="calc-tabs">
        <button className={mode === "power" ? "active" : ""} onClick={() => { setMode("power"); setResult(null); }}>
          💸 미래의 실질 구매력
        </button>
        <button className={mode === "future" ? "active" : ""} onClick={() => { setMode("future"); setResult(null); }}>
          🎈 필요한 미래 금액
        </button>
      </div>

      <NumberField label="금액" value={amount} onChange={setAmount} unit="만 원" quick={GOAL_QUICK} />
      <NumberField
        label="연 물가상승률"
        value={rate}
        onChange={setRate}
        unit="%"
        hint="한국의 장기 평균 물가상승률은 2~3% 수준입니다."
      />
      <NumberField label="기간" value={years} onChange={setYears} unit="년" />
      <button className="calc-submit" onClick={calc}>
        계산하기 →
      </button>
      {result}
    </div>
  );
}
