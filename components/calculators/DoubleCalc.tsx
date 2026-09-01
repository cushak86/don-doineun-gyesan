"use client";

import { useState } from "react";
import NumberField, { num } from "./NumberField";

const REFERENCE = [3, 5, 7, 10, 15].map((r) => ({
  rate: r,
  rule72: 72 / r,
  exact: Math.log(2) / Math.log(1 + r / 100),
}));

export default function DoubleCalc() {
  const [mode, setMode] = useState<"years" | "rate">("years");
  const [rate, setRate] = useState("7");
  const [years, setYears] = useState("10");
  const [result, setResult] = useState<React.ReactNode>(null);

  const calc = () => {
    if (mode === "years") {
      const r = num(rate);
      if (r <= 0) return;
      const exact = Math.log(2) / Math.log(1 + r / 100);
      setResult(
        <div className="calc-result">
          <div className="headline">연 {r}%로 굴리면 원금이 2배 되는 데</div>
          <div className="big">약 {exact.toFixed(1)}년</div>
          <div className="rows">
            <div>
              <span className="k">72의 법칙 근사 (72 ÷ {r})</span>
              <span className="v">약 {(72 / r).toFixed(1)}년</span>
            </div>
            <div>
              <span className="k">4배가 되는 데 (2배 × 2회)</span>
              <span className="v">약 {(exact * 2).toFixed(1)}년</span>
            </div>
          </div>
        </div>
      );
    } else {
      const y = num(years);
      if (y <= 0) return;
      const need = (Math.pow(2, 1 / y) - 1) * 100;
      setResult(
        <div className="calc-result">
          <div className="headline">{y}년 안에 원금을 2배로 만들려면</div>
          <div className="big">연 {need.toFixed(2)}% 필요</div>
          <div className="rows">
            <div>
              <span className="k">72의 법칙 근사 (72 ÷ {y})</span>
              <span className="v">연 {(72 / y).toFixed(1)}%</span>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="calc-shell">
      <div className="calc-tabs">
        <button className={mode === "years" ? "active" : ""} onClick={() => { setMode("years"); setResult(null); }}>
          ⏳ 2배 되는 기간
        </button>
        <button className={mode === "rate" ? "active" : ""} onClick={() => { setMode("rate"); setResult(null); }}>
          📈 필요한 수익률
        </button>
      </div>

      {mode === "years" ? (
        <NumberField label="연 수익률" value={rate} onChange={setRate} unit="%" />
      ) : (
        <NumberField label="목표 기간" value={years} onChange={setYears} unit="년" />
      )}
      <button className="calc-submit" onClick={calc}>
        계산하기 →
      </button>
      {result}

      <div className="year-table-wrap" style={{ marginTop: 18 }}>
        <table>
          <thead>
            <tr>
              <th>연 수익률</th>
              <th>72의 법칙</th>
              <th>정확한 계산</th>
            </tr>
          </thead>
          <tbody>
            {REFERENCE.map((r) => (
              <tr key={r.rate}>
                <td>{r.rate}%</td>
                <td>{r.rule72.toFixed(1)}년</td>
                <td>{r.exact.toFixed(1)}년</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
