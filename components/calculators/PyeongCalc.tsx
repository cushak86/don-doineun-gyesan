"use client";

import { useState } from "react";

const PYEONG = 3.305785; // 1평 = 3.305785㎡
const REFERENCE = [10, 18, 25, 34, 45, 59, 84];

export default function PyeongCalc() {
  const [pyeong, setPyeong] = useState("25");
  const [sqm, setSqm] = useState((25 * PYEONG).toFixed(1));

  const fromPyeong = (v: string) => {
    setPyeong(v);
    const n = parseFloat(v);
    setSqm(Number.isFinite(n) ? (n * PYEONG).toFixed(1) : "");
  };
  const fromSqm = (v: string) => {
    setSqm(v);
    const n = parseFloat(v);
    setPyeong(Number.isFinite(n) ? (n / PYEONG).toFixed(2) : "");
  };

  return (
    <div className="calc-shell">
      <div className="field">
        <label>평</label>
        <div className="input-wrap">
          <input type="number" inputMode="decimal" value={pyeong} onChange={(e) => fromPyeong(e.target.value)} />
          <span className="unit">평</span>
        </div>
      </div>
      <div className="field">
        <label>제곱미터</label>
        <div className="input-wrap">
          <input type="number" inputMode="decimal" value={sqm} onChange={(e) => fromSqm(e.target.value)} />
          <span className="unit">㎡</span>
        </div>
        <div className="hint">어느 쪽이든 입력하면 즉시 변환됩니다. 1평 = 3.3058㎡</div>
      </div>

      <div className="year-table-wrap" style={{ marginTop: 18 }}>
        <table>
          <thead>
            <tr>
              <th>자주 쓰는 평수</th>
              <th>제곱미터</th>
              <th>참고</th>
            </tr>
          </thead>
          <tbody>
            {REFERENCE.map((p) => (
              <tr key={p}>
                <td>{p}평</td>
                <td>{(p * PYEONG).toFixed(1)}㎡</td>
                <td>
                  {p === 18 ? "소형 아파트" : p === 25 ? "구 25평형(59㎡ 전용과 유사)" : p === 34 ? "국민평형(84㎡ 전용과 유사)" : p === 59 || p === 84 ? "전용면적 표기" : ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="hint" style={{ marginTop: 14, fontSize: 12, color: "var(--text-muted)" }}>
        아파트 분양 공고의 &quot;전용 84㎡&quot;는 약 25.4평이지만, 관습적으로 공급면적 기준
        &quot;34평형&quot;이라 부릅니다. 전용면적과 공급면적의 차이에 주의하세요.
      </p>
    </div>
  );
}
