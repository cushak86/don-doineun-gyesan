"use client";

import { useState } from "react";
import { fmtMan, futureValue, type FvResult } from "@/lib/finance";
import NumberField, { MONEY_QUICK, num } from "./NumberField";

export default function CompoundCalc() {
  const [principal, setPrincipal] = useState("1000");
  const [monthly, setMonthly] = useState("50");
  const [years, setYears] = useState("10");
  const [rate, setRate] = useState("7");
  const [result, setResult] = useState<FvResult | null>(null);

  const calc = () => {
    const y = num(years);
    if (y <= 0) return;
    setResult(futureValue(num(principal), num(monthly), y, num(rate)));
  };

  return (
    <div className="calc-shell">
      <NumberField
        label="현재 자산"
        value={principal}
        onChange={setPrincipal}
        unit="만 원"
        quick={MONEY_QUICK}
        hint="지금 투자할 수 있는 금액. 없으면 0으로 두세요."
      />
      <NumberField label="월 적립금" value={monthly} onChange={setMonthly} unit="만 원" />
      <NumberField label="투자 기간" value={years} onChange={setYears} unit="년" />
      <NumberField
        label="연 수익률"
        value={rate}
        onChange={setRate}
        unit="%"
        hint="S&P500 장기 평균은 연 7~10% 수준입니다. 보수적으로 5~7%를 권장합니다."
      />
      <button className="calc-submit" onClick={calc}>
        계산하기 →
      </button>

      {result && (
        <div className="calc-result">
          <div className="headline">{years}년 뒤 예상 자산</div>
          <div className="big">{fmtMan(result.fv)}</div>
          <div className="rows">
            <div>
              <span className="k">총 납입 원금</span>
              <span className="v">{fmtMan(result.principal)}</span>
            </div>
            <div>
              <span className="k">투자 수익 (복리)</span>
              <span className="v">+{fmtMan(result.interest)}</span>
            </div>
            <div>
              <span className="k">원금 대비</span>
              <span className="v">{(result.fv / Math.max(result.principal, 1)).toFixed(2)}배</span>
            </div>
          </div>
          <div className="year-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>연차</th>
                  <th>납입 원금</th>
                  <th>예상 자산</th>
                </tr>
              </thead>
              <tbody>
                {result.yearly.map((r) => (
                  <tr key={r.year}>
                    <td>{r.year}년차</td>
                    <td>{fmtMan(r.principal)}</td>
                    <td>{fmtMan(r.value)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
