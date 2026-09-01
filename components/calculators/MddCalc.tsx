"use client";

import { useState } from "react";
import NumberField, { num } from "./NumberField";

const REFERENCE = [
  { drop: 10, need: 11.1 },
  { drop: 20, need: 25 },
  { drop: 30, need: 42.9 },
  { drop: 40, need: 66.7 },
  { drop: 50, need: 100 },
  { drop: 60, need: 150 },
];

export default function MddCalc() {
  const [peak, setPeak] = useState("10000");
  const [trough, setTrough] = useState("7000");
  const [rate, setRate] = useState("8");
  const [result, setResult] = useState<{ mdd: number; need: number; years: number } | null>(null);

  const calc = () => {
    const p = num(peak);
    const t = num(trough);
    const r = num(rate);
    if (p <= 0 || t <= 0 || t > p) return;
    const mdd = ((p - t) / p) * 100;
    const need = (p / t - 1) * 100;
    const years = r > 0 ? Math.log(p / t) / Math.log(1 + r / 100) : Infinity;
    setResult({ mdd, need, years });
  };

  return (
    <div className="calc-shell">
      <NumberField
        label="전고점 금액(가격)"
        value={peak}
        onChange={setPeak}
        unit=""
        hint="계좌 잔액, 주가, 지수 등 아무 단위나 넣어도 됩니다."
      />
      <NumberField label="저점(현재) 금액(가격)" value={trough} onChange={setTrough} unit="" />
      <NumberField
        label="예상 연 수익률"
        value={rate}
        onChange={setRate}
        unit="%"
        hint="회복 기간 추정에 사용됩니다."
      />
      <button className="calc-submit" onClick={calc}>
        계산하기 →
      </button>

      {result && (
        <div className="calc-result">
          <div className="headline">최대 낙폭 (MDD)</div>
          <div className="big">-{result.mdd.toFixed(1)}%</div>
          <div className="rows">
            <div>
              <span className="k">원금 회복에 필요한 수익률</span>
              <span className="v">+{result.need.toFixed(1)}%</span>
            </div>
            <div>
              <span className="k">연 {num(rate)}% 기준 예상 회복 기간</span>
              <span className="v">
                {Number.isFinite(result.years) ? `약 ${result.years.toFixed(1)}년` : "—"}
              </span>
            </div>
          </div>
          <div className="year-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>하락률</th>
                  <th>회복에 필요한 수익률</th>
                </tr>
              </thead>
              <tbody>
                {REFERENCE.map((r) => (
                  <tr key={r.drop}>
                    <td>-{r.drop}%</td>
                    <td>+{r.need}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <p className="hint" style={{ marginTop: 14, fontSize: 12, color: "var(--text-muted)" }}>
        하락과 회복은 비대칭입니다. -50% 하락은 +100% 상승이 있어야 원금이 회복됩니다. MDD가 큰
        자산일수록 필요한 회복 수익률이 기하급수적으로 커집니다.
      </p>
    </div>
  );
}
