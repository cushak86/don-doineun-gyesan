"use client";

import { useState } from "react";
import { fmtMan } from "@/lib/finance";
import NumberField, { MONEY_QUICK, num } from "./NumberField";

interface YearRow {
  year: number;
  value: number;
  dividend: number; // 세전 연 배당
  yoc: number; // 납입 원금 대비 배당률 %
}

export default function SchdDividendCalc() {
  const [principal, setPrincipal] = useState("1000");
  const [monthly, setMonthly] = useState("50");
  const [years, setYears] = useState("15");
  const [priceGrowth, setPriceGrowth] = useState("6");
  const [startYield, setStartYield] = useState("3.5");
  const [divGrowth, setDivGrowth] = useState("10");
  const [result, setResult] = useState<{ rows: YearRow[]; paid: number } | null>(null);

  const calc = () => {
    const y = num(years);
    if (y <= 0) return;
    const p = num(priceGrowth) / 100;
    const g = num(divGrowth) / 100;
    const taxKeep = 1 - 0.15; // 미국 배당 원천징수 15%, 세후 재투자

    // 단위 모델: 가격 P, 주당 배당 D, 보유 수량 U (연 단위 시뮬레이션)
    let P = 100;
    let D = P * (num(startYield) / 100);
    let U = num(principal) / P;
    let paid = num(principal);
    const annual = num(monthly) * 12;
    const rows: YearRow[] = [];

    for (let year = 1; year <= y; year++) {
      // 연중 평균 가격으로 적립 매수
      const avgP = P * (1 + p / 2);
      U += annual / avgP;
      paid += annual;
      // 연말 가격·배당 성장
      P *= 1 + p;
      D *= 1 + g;
      // 배당 수령(세후) 후 재투자
      const grossDiv = U * D;
      U += (grossDiv * taxKeep) / P;
      rows.push({
        year,
        value: U * P,
        dividend: grossDiv,
        yoc: paid > 0 ? (grossDiv / paid) * 100 : 0,
      });
    }
    setResult({ rows, paid });
  };

  const last = result?.rows[result.rows.length - 1];

  return (
    <div className="calc-shell">
      <NumberField
        label="초기 투자금"
        value={principal}
        onChange={setPrincipal}
        unit="만 원"
        quick={MONEY_QUICK}
      />
      <NumberField label="월 적립금" value={monthly} onChange={setMonthly} unit="만 원" />
      <NumberField label="투자 기간" value={years} onChange={setYears} unit="년" />
      <NumberField
        label="주가 성장률 (연)"
        value={priceGrowth}
        onChange={setPriceGrowth}
        unit="%"
        hint="SCHD의 장기 주가 성장은 연 5~8% 수준이었습니다."
      />
      <NumberField
        label="현재 배당수익률"
        value={startYield}
        onChange={setStartYield}
        unit="%"
      />
      <NumberField
        label="배당 성장률 (연)"
        value={divGrowth}
        onChange={setDivGrowth}
        unit="%"
        hint="SCHD의 최근 10년 배당 성장률은 연 10% 안팎이었습니다."
      />
      <button className="calc-submit" onClick={calc}>
        계산하기 →
      </button>

      {result && last && (
        <div className="calc-result">
          <div className="headline">{years}년 후 (배당 세후 전액 재투자 가정)</div>
          <div className="big">{fmtMan(last.value)}</div>
          <div className="rows">
            <div>
              <span className="k">총 납입 원금</span>
              <span className="v">{fmtMan(result.paid)}</span>
            </div>
            <div>
              <span className="k">연 배당금 (세전)</span>
              <span className="v">
                {fmtMan(last.dividend)} (월 약 {fmtMan(last.dividend / 12)})
              </span>
            </div>
            <div>
              <span className="k">YOC (납입 원금 대비 배당률)</span>
              <span className="v">{last.yoc.toFixed(1)}%</span>
            </div>
          </div>
          <div className="year-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>연차</th>
                  <th>예상 자산</th>
                  <th>연 배당(세전)</th>
                  <th>YOC</th>
                </tr>
              </thead>
              <tbody>
                {result.rows.map((r) => (
                  <tr key={r.year}>
                    <td>{r.year}년차</td>
                    <td>{fmtMan(r.value)}</td>
                    <td>{fmtMan(r.dividend)}</td>
                    <td>{r.yoc.toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <p className="hint" style={{ marginTop: 14, fontSize: 12, color: "var(--text-muted)" }}>
        미국 배당 원천징수 15%를 제한 배당을 전액 재투자하는 모델입니다. 주가·배당 성장률은 과거
        수준을 참고한 가정값이며 미래를 보장하지 않습니다.
      </p>
    </div>
  );
}
