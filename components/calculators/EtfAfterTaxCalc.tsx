"use client";

import { useState } from "react";
import { fmtMan, futureValue } from "@/lib/finance";
import NumberField, { MONEY_QUICK, num } from "./NumberField";

export default function EtfAfterTaxCalc() {
  const [principal, setPrincipal] = useState("1000");
  const [monthly, setMonthly] = useState("50");
  const [years, setYears] = useState("10");
  const [priceGrowth, setPriceGrowth] = useState("7");
  const [divYield, setDivYield] = useState("1.5");
  const [fee, setFee] = useState("0.1");
  const [result, setResult] = useState<{
    gross: number;
    net: number;
    tax: number;
    paid: number;
  } | null>(null);

  const calc = () => {
    const y = num(years);
    if (y <= 0) return;
    const months = y * 12;
    const priceM = (num(priceGrowth) - num(fee)) / 100 / 12; // 보수 차감 후 주가 수익
    const divM = num(divYield) / 100 / 12;
    const DIV_TAX = 0.15; // 미국 배당 원천징수
    const CG_TAX = 0.22; // 양도소득세
    const CG_DEDUCT = 250; // 연 250만 기본공제 (매도 연도 1회 적용 가정, 만원)

    let value = num(principal);
    let basis = num(principal); // 납입 원금 + 세후 재투자 배당 (취득가액)
    const m = num(monthly);
    for (let k = 1; k <= months; k++) {
      const divNet = value * divM * (1 - DIV_TAX);
      value = value * (1 + priceM) + m + divNet;
      basis += m + divNet;
    }
    // 매도 시 양도세 (전량 매도, 기본공제 1회 가정)
    const gain = Math.max(0, value - basis);
    const cgTax = Math.max(0, gain - CG_DEDUCT) * CG_TAX;
    const net = value - cgTax;

    // 비용 0 가정(보수·세금 없음)의 세전 자산
    const gross = futureValue(num(principal), m, y, num(priceGrowth) + num(divYield)).fv;
    setResult({ gross, net, tax: gross - net, paid: num(principal) + m * months });
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
      <NumberField label="투자 기간" value={years} onChange={setYears} unit="년" />
      <NumberField label="주가 상승률 (연)" value={priceGrowth} onChange={setPriceGrowth} unit="%" />
      <NumberField
        label="배당수익률 (연)"
        value={divYield}
        onChange={setDivYield}
        unit="%"
        quick={[
          { label: "QQQ 0.6", set: 0.6 },
          { label: "SPY 1.3", set: 1.3 },
          { label: "SCHD 3.5", set: 3.5 },
        ]}
      />
      <NumberField
        label="총보수 (연)"
        value={fee}
        onChange={setFee}
        unit="%"
        hint="ETF 운용보수. 예: SPY 0.09%, QQQ 0.20%, SCHD 0.06%"
      />
      <button className="calc-submit" onClick={calc}>
        계산하기 →
      </button>

      {result && (
        <div className="calc-result">
          <div className="headline">{years}년 후 전량 매도 기준 세후 자산</div>
          <div className="big">{fmtMan(result.net)}</div>
          <div className="rows">
            <div>
              <span className="k">총 납입 원금</span>
              <span className="v">{fmtMan(result.paid)}</span>
            </div>
            <div>
              <span className="k">세금·보수 없다고 가정한 자산</span>
              <span className="v">{fmtMan(result.gross)}</span>
            </div>
            <div>
              <span className="k">세금·보수로 사라지는 금액</span>
              <span className="v">-{fmtMan(result.tax)}</span>
            </div>
          </div>
        </div>
      )}

      <p className="hint" style={{ marginTop: 14, fontSize: 12, color: "var(--text-muted)" }}>
        모델: 배당은 15% 원천징수 후 재투자, 보수는 수익률에서 차감, 마지막에 전량 매도하며
        양도소득세 22%(기본공제 250만 원 1회)를 적용한 근사치입니다. 분할 매도로 공제를 매년 활용하면
        실제 세금은 이보다 줄일 수 있습니다.
      </p>
    </div>
  );
}
