"use client";

import { useState } from "react";
import { fmtMan } from "@/lib/finance";
import NumberField, { MONEY_QUICK, num } from "./NumberField";

export default function InvestRatioCalc() {
  const [age, setAge] = useState("35");
  const [total, setTotal] = useState("10000");
  const [result, setResult] = useState<{ age: number; total: number } | null>(null);

  const calc = () => {
    const a = num(age);
    if (a <= 0 || a > 110) return;
    setResult({ age: a, total: num(total) });
  };

  const rows =
    result &&
    [
      { name: "안정형 (90 − 나이)", stock: Math.max(0, 90 - result.age) },
      { name: "기본형 (100 − 나이)", stock: Math.max(0, 100 - result.age) },
      { name: "공격형 (110 − 나이)", stock: Math.min(100, Math.max(0, 110 - result.age)) },
    ];

  return (
    <div className="calc-shell">
      <NumberField label="나이" value={age} onChange={setAge} unit="세" />
      <NumberField
        label="총 투자 자산 (선택)"
        value={total}
        onChange={setTotal}
        unit="만 원"
        quick={MONEY_QUICK}
        hint="입력하면 비율에 따른 배분 금액도 계산해드립니다."
      />
      <button className="calc-submit" onClick={calc}>
        계산하기 →
      </button>

      {result && rows && (
        <div className="calc-result">
          <div className="headline">{result.age}세 기준 권장 주식 비중</div>
          <div className="big">{100 - result.age > 0 ? 100 - result.age : 0}% (기본형)</div>
          <div className="year-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>성향</th>
                  <th>주식</th>
                  <th>채권·안전자산</th>
                  {result.total > 0 && <th>주식 배분 금액</th>}
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.name}>
                    <td>{r.name}</td>
                    <td>{r.stock}%</td>
                    <td>{100 - r.stock}%</td>
                    {result.total > 0 && <td>{fmtMan((result.total * r.stock) / 100)}</td>}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <p className="hint" style={{ marginTop: 14, fontSize: 12, color: "var(--text-muted)" }}>
        &quot;100 − 나이&quot; 법칙은 나이가 들수록 변동성 자산 비중을 줄이라는 고전적 경험칙입니다.
        기대수명이 길어진 요즘은 110 − 나이(공격형)를 쓰는 경우도 많습니다. 성향과 은퇴 시점에 맞게
        조정하세요.
      </p>
    </div>
  );
}
