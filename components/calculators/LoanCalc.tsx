"use client";

import { useState } from "react";
import { fmtMan } from "@/lib/finance";
import NumberField, { num } from "./NumberField";

type Method = "annuity" | "principal" | "bullet";

export default function LoanCalc() {
  const [method, setMethod] = useState<Method>("annuity");
  const [amount, setAmount] = useState("30000");
  const [rate, setRate] = useState("4");
  const [years, setYears] = useState("30");
  const [result, setResult] = useState<React.ReactNode>(null);

  const calc = () => {
    const p = num(amount);
    const r = num(rate) / 100 / 12;
    const n = num(years) * 12;
    if (p <= 0 || n <= 0) return;

    if (method === "annuity") {
      const m = r === 0 ? p / n : (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      setResult(
        <Result
          headline="매월 상환액 (원리금균등)"
          big={fmtMan(m)}
          rows={[
            ["총 상환액", fmtMan(m * n)],
            ["총 이자", fmtMan(m * n - p)],
          ]}
        />
      );
    } else if (method === "principal") {
      const monthlyPrincipal = p / n;
      const first = monthlyPrincipal + p * r;
      const last = monthlyPrincipal + monthlyPrincipal * r;
      const totalInterest = ((p * r * (n + 1)) / 2);
      setResult(
        <Result
          headline="첫 달 상환액 (원금균등 — 매달 감소)"
          big={fmtMan(first)}
          rows={[
            ["마지막 달 상환액", fmtMan(last)],
            ["총 상환액", fmtMan(p + totalInterest)],
            ["총 이자", fmtMan(totalInterest)],
          ]}
        />
      );
    } else {
      const m = p * r;
      setResult(
        <Result
          headline="매월 이자 (만기일시 — 원금은 만기에)"
          big={fmtMan(m)}
          rows={[
            ["만기 상환 원금", fmtMan(p)],
            ["총 이자", fmtMan(m * n)],
            ["총 상환액", fmtMan(p + m * n)],
          ]}
        />
      );
    }
  };

  return (
    <div className="calc-shell">
      <div className="calc-tabs">
        <button className={method === "annuity" ? "active" : ""} onClick={() => { setMethod("annuity"); setResult(null); }}>
          원리금균등
        </button>
        <button className={method === "principal" ? "active" : ""} onClick={() => { setMethod("principal"); setResult(null); }}>
          원금균등
        </button>
        <button className={method === "bullet" ? "active" : ""} onClick={() => { setMethod("bullet"); setResult(null); }}>
          만기일시
        </button>
      </div>

      <NumberField
        label="대출 금액"
        value={amount}
        onChange={setAmount}
        unit="만 원"
        quick={[
          { label: "+1억", add: 10000 },
          { label: "+5000만", add: 5000 },
          { label: "+1000만", add: 1000 },
        ]}
      />
      <NumberField label="연 금리" value={rate} onChange={setRate} unit="%" />
      <NumberField label="대출 기간" value={years} onChange={setYears} unit="년" />
      <button className="calc-submit" onClick={calc}>
        계산하기 →
      </button>
      {result}

      <p className="hint" style={{ marginTop: 14, fontSize: 12, color: "var(--text-muted)" }}>
        원리금균등은 매달 같은 금액, 원금균등은 초반이 무겁지만 총 이자가 가장 적고, 만기일시는 월
        부담이 가장 작지만 총 이자가 가장 많습니다. 중도상환수수료·거치기간은 반영되지 않습니다.
      </p>
    </div>
  );
}

function Result({
  headline,
  big,
  rows,
}: {
  headline: string;
  big: string;
  rows: [string, string][];
}) {
  return (
    <div className="calc-result">
      <div className="headline">{headline}</div>
      <div className="big">{big}</div>
      <div className="rows">
        {rows.map(([k, v]) => (
          <div key={k}>
            <span className="k">{k}</span>
            <span className="v">{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
