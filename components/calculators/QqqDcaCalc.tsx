"use client";

import { useState } from "react";
import { fmtMan, futureValue } from "@/lib/finance";
import NumberField, { MONEY_QUICK, num } from "./NumberField";

const SCENARIOS = [
  { name: "보수적", rate: 8, note: "장기 평균이 크게 낮아지는 경우" },
  { name: "기준", rate: 12, note: "나스닥100 장기 평균에 근접" },
  { name: "낙관적", rate: 16, note: "지난 10년과 유사한 강세 지속" },
];

export default function QqqDcaCalc() {
  const [principal, setPrincipal] = useState("0");
  const [monthly, setMonthly] = useState("100");
  const [years, setYears] = useState("10");
  const [result, setResult] = useState<{ rate: number; fv: number }[] | null>(null);
  const [paid, setPaid] = useState(0);

  const calc = () => {
    const y = num(years);
    if (y <= 0) return;
    const rows = SCENARIOS.map((s) => ({
      rate: s.rate,
      fv: futureValue(num(principal), num(monthly), y, s.rate).fv,
    }));
    setPaid(num(principal) + num(monthly) * y * 12);
    setResult(rows);
  };

  return (
    <div className="calc-shell">
      <NumberField
        label="현재 투자금"
        value={principal}
        onChange={setPrincipal}
        unit="만 원"
        quick={MONEY_QUICK}
      />
      <NumberField label="월 적립금" value={monthly} onChange={setMonthly} unit="만 원" />
      <NumberField label="적립 기간" value={years} onChange={setYears} unit="년" />
      <button className="calc-submit" onClick={calc}>
        계산하기 →
      </button>

      {result && (
        <div className="calc-result">
          <div className="headline">{years}년 적립 시나리오별 예상 자산 (총 납입 {fmtMan(paid)})</div>
          <div className="big">{fmtMan(result[1].fv)} (기준 시나리오)</div>
          <div className="year-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>시나리오</th>
                  <th>연 수익률</th>
                  <th>예상 자산</th>
                  <th>수익</th>
                </tr>
              </thead>
              <tbody>
                {result.map((r, i) => (
                  <tr key={r.rate}>
                    <td>{SCENARIOS[i].name}</td>
                    <td>{r.rate}%</td>
                    <td>{fmtMan(r.fv)}</td>
                    <td>+{fmtMan(r.fv - paid)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <p className="hint" style={{ marginTop: 14, fontSize: 12, color: "var(--text-muted)" }}>
        QQQ(나스닥100)의 과거 10년 연평균 수익률은 약 17~18%였지만, 이는 미래를 보장하지 않습니다.
        2022년에는 고점 대비 약 -35%까지 하락했습니다. 하락장을 버틸 수 있어야 위 수익률이 내 것이
        됩니다. 과거 수익률 기준의 참고용 시뮬레이션입니다.
      </p>
    </div>
  );
}
