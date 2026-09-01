"use client";

import { useState } from "react";
import { fmtMan } from "@/lib/finance";
import NumberField, { MONEY_QUICK, num } from "./NumberField";

export default function DepositCalc() {
  const [principal, setPrincipal] = useState("10000");
  const [rate, setRate] = useState("3.5");
  const [months, setMonths] = useState("12");
  const [mode, setMode] = useState<"simple" | "compound">("simple");
  const [result, setResult] = useState<{ interest: number; tax: number; total: number } | null>(
    null
  );

  const calc = () => {
    const p = num(principal);
    const r = num(rate) / 100;
    const n = num(months);
    if (p <= 0 || n <= 0) return;
    const interest =
      mode === "simple" ? p * r * (n / 12) : p * (Math.pow(1 + r / 12, n) - 1);
    const tax = interest * 0.154;
    setResult({ interest, tax, total: p + interest - tax });
  };

  return (
    <div className="calc-shell">
      <div className="calc-tabs">
        <button className={mode === "simple" ? "active" : ""} onClick={() => { setMode("simple"); setResult(null); }}>
          단리 (일반 예금)
        </button>
        <button className={mode === "compound" ? "active" : ""} onClick={() => { setMode("compound"); setResult(null); }}>
          월복리
        </button>
      </div>
      <NumberField
        label="예치 금액"
        value={principal}
        onChange={setPrincipal}
        unit="만 원"
        quick={MONEY_QUICK}
      />
      <NumberField label="연 이자율" value={rate} onChange={setRate} unit="%" />
      <NumberField label="예치 기간" value={months} onChange={setMonths} unit="개월" />
      <button className="calc-submit" onClick={calc}>
        계산하기 →
      </button>

      {result && (
        <div className="calc-result">
          <div className="headline">만기 세후 수령액</div>
          <div className="big">{fmtMan(result.total)}</div>
          <div className="rows">
            <div>
              <span className="k">세전 이자</span>
              <span className="v">+{fmtMan(result.interest)}</span>
            </div>
            <div>
              <span className="k">이자소득세 (15.4%)</span>
              <span className="v">-{fmtMan(result.tax)}</span>
            </div>
          </div>
        </div>
      )}

      <p className="hint" style={{ marginTop: 14, fontSize: 12, color: "var(--text-muted)" }}>
        일반 과세(15.4%) 기준입니다. 물가상승률이 이자율보다 높으면 실질 구매력은 오히려 줄어들 수
        있습니다 — 인플레이션 계산기로 확인해보세요.
      </p>
    </div>
  );
}
