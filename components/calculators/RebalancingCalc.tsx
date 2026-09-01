"use client";

import { useState } from "react";
import { fmtMan } from "@/lib/finance";

interface Asset {
  name: string;
  amount: string;
  target: string;
}

export default function RebalancingCalc() {
  const [assets, setAssets] = useState<Asset[]>([
    { name: "주식 ETF", amount: "7000", target: "60" },
    { name: "채권·현금", amount: "3000", target: "40" },
  ]);
  const [result, setResult] = useState<
    { name: string; current: number; goal: number; diff: number }[] | null
  >(null);

  const update = (i: number, key: keyof Asset, v: string) => {
    setAssets(assets.map((a, idx) => (idx === i ? { ...a, [key]: v } : a)));
  };

  const targetSum = assets.reduce((s, a) => s + (parseFloat(a.target) || 0), 0);

  const calc = () => {
    const total = assets.reduce((s, a) => s + (parseFloat(a.amount) || 0), 0);
    if (total <= 0 || Math.abs(targetSum - 100) > 0.5) return;
    setResult(
      assets.map((a) => {
        const current = parseFloat(a.amount) || 0;
        const goal = (total * (parseFloat(a.target) || 0)) / 100;
        return { name: a.name || "자산", current, goal, diff: goal - current };
      })
    );
  };

  return (
    <div className="calc-shell">
      {assets.map((a, i) => (
        <div className="rb-row" key={i}>
          <input
            type="text"
            className="rb-name"
            value={a.name}
            placeholder="자산 이름"
            onChange={(e) => update(i, "name", e.target.value)}
          />
          <input
            type="number"
            className="rb-num"
            value={a.amount}
            placeholder="현재 금액(만원)"
            onChange={(e) => update(i, "amount", e.target.value)}
          />
          <input
            type="number"
            className="rb-num rb-pct"
            value={a.target}
            placeholder="목표 %"
            onChange={(e) => update(i, "target", e.target.value)}
          />
          {assets.length > 2 && (
            <button
              type="button"
              className="rb-del"
              aria-label="자산 삭제"
              onClick={() => setAssets(assets.filter((_, idx) => idx !== i))}
            >
              ✕
            </button>
          )}
        </div>
      ))}
      <div className="rb-meta">
        <button
          type="button"
          className="rb-add"
          disabled={assets.length >= 8}
          onClick={() => setAssets([...assets, { name: "", amount: "0", target: "0" }])}
        >
          + 자산 추가
        </button>
        <span style={{ color: Math.abs(targetSum - 100) > 0.5 ? "#b91c1c" : "var(--accent-strong)" }}>
          목표 비중 합계: {targetSum}%{Math.abs(targetSum - 100) > 0.5 && " → 100%가 되어야 합니다"}
        </span>
      </div>
      <button className="calc-submit" onClick={calc}>
        계산하기 →
      </button>

      {result && (
        <div className="calc-result">
          <div className="headline">
            총 자산 {fmtMan(result.reduce((s, r) => s + r.current, 0))} 기준 리밸런싱
          </div>
          <div className="year-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>자산</th>
                  <th>현재</th>
                  <th>목표</th>
                  <th>매수(+)/매도(−)</th>
                </tr>
              </thead>
              <tbody>
                {result.map((r) => (
                  <tr key={r.name + r.current}>
                    <td>{r.name}</td>
                    <td>{fmtMan(r.current)}</td>
                    <td>{fmtMan(r.goal)}</td>
                    <td style={{ color: r.diff >= 0 ? "var(--accent-strong)" : "#b91c1c", fontWeight: 700 }}>
                      {r.diff >= 0 ? "+" : "−"}
                      {fmtMan(Math.abs(r.diff))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <p className="hint" style={{ marginTop: 14, fontSize: 12, color: "var(--text-muted)" }}>
        매도 시에는 세금·수수료가 발생할 수 있습니다. 새로 넣는 적립금을 부족한 자산에 몰아주는
        &quot;매수만으로 하는 리밸런싱&quot;이 세금 면에서 유리합니다.
      </p>
    </div>
  );
}
