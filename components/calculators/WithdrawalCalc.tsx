"use client";

import { useState } from "react";
import { fmtMan } from "@/lib/finance";
import NumberField, { MONEY_QUICK, num } from "./NumberField";

export default function WithdrawalCalc() {
  const [assets, setAssets] = useState("50000");
  const [monthly, setMonthly] = useState("200");
  const [rate, setRate] = useState("5");
  const [inflation, setInflation] = useState("2.5");
  const [result, setResult] = useState<{
    months: number | null;
    firstYearRate: number;
    yearly: { year: number; balance: number; withdrawal: number }[];
  } | null>(null);

  const calc = () => {
    const a = num(assets);
    const m = num(monthly);
    if (a <= 0 || m <= 0) return;
    const i = num(rate) / 100 / 12;
    const infl = num(inflation) / 100;

    let balance = a;
    let w = m;
    let depleted: number | null = null;
    const yearly: { year: number; balance: number; withdrawal: number }[] = [];

    for (let month = 1; month <= 720; month++) {
      balance = balance * (1 + i) - w;
      if (balance <= 0 && depleted === null) {
        depleted = month;
        break;
      }
      if (month % 12 === 0) {
        yearly.push({ year: month / 12, balance, withdrawal: w });
        w = w * (1 + infl); // 매년 물가만큼 인출액 증가
      }
    }
    setResult({
      months: depleted,
      firstYearRate: ((m * 12) / a) * 100,
      yearly: yearly.slice(0, 40),
    });
  };

  return (
    <div className="calc-shell">
      <NumberField
        label="은퇴 자산"
        value={assets}
        onChange={setAssets}
        unit="만 원"
        quick={MONEY_QUICK}
      />
      <NumberField
        label="월 인출액 (현재 물가 기준)"
        value={monthly}
        onChange={setMonthly}
        unit="만 원"
        hint="매년 물가상승률만큼 인출액이 늘어난다고 가정합니다."
      />
      <NumberField label="연 수익률" value={rate} onChange={setRate} unit="%" />
      <NumberField label="연 물가상승률" value={inflation} onChange={setInflation} unit="%" />
      <button className="calc-submit" onClick={calc}>
        계산하기 →
      </button>

      {result && (
        <div className="calc-result">
          <div className="headline">자산 지속 기간</div>
          <div className="big">
            {result.months === null
              ? "60년 이상 🎉"
              : `약 ${Math.floor(result.months / 12)}년 ${result.months % 12}개월`}
          </div>
          <div className="rows">
            <div>
              <span className="k">첫해 인출률</span>
              <span className="v">
                연 {result.firstYearRate.toFixed(1)}%
                {result.firstYearRate <= 4 ? " (4% 룰 안쪽 ✅)" : " (4% 룰 초과 ⚠️)"}
              </span>
            </div>
          </div>
          {result.yearly.length > 0 && (
            <div className="year-table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>연차</th>
                    <th>연간 인출액</th>
                    <th>연말 잔액</th>
                  </tr>
                </thead>
                <tbody>
                  {result.yearly
                    .filter((r) => r.year <= 5 || r.year % 5 === 0)
                    .map((r) => (
                      <tr key={r.year}>
                        <td>{r.year}년차</td>
                        <td>{fmtMan(r.withdrawal * 12)}</td>
                        <td>{fmtMan(r.balance)}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      <p className="hint" style={{ marginTop: 14, fontSize: 12, color: "var(--text-muted)" }}>
        수익률이 매년 일정하다고 가정한 모델입니다. 실제로는 은퇴 초기에 하락장이 오면(시퀀스 리스크)
        고갈 시점이 크게 앞당겨질 수 있습니다. 첫해 인출률을 4% 이하로 잡는 것이 안전합니다.
      </p>
    </div>
  );
}
