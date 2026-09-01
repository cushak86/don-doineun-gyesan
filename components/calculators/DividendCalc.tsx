"use client";

import { useState } from "react";
import { dividendAssetNeeded, fmtMan } from "@/lib/finance";
import NumberField, { num } from "./NumberField";

const YIELD_PRESETS = [
  { label: "SCHD 3.5%", set: 3.5 },
  { label: "VYM 3%", set: 3 },
  { label: "JEPI 7%", set: 7 },
  { label: "QYLD 11%", set: 11 },
];

export default function DividendCalc() {
  const [target, setTarget] = useState("100");
  const [yld, setYld] = useState("4");
  const [tax, setTax] = useState("15.4");
  const [result, setResult] = useState<number | null>(null);

  const calc = () => {
    if (num(target) <= 0 || num(yld) <= 0) return;
    setResult(dividendAssetNeeded(num(target), num(yld), num(tax)));
  };

  return (
    <div className="calc-shell">
      <NumberField
        label="목표 월 배당금 (세후)"
        value={target}
        onChange={setTarget}
        unit="만 원"
        hint="실제로 통장에 들어오길 원하는 월 배당금."
      />
      <NumberField
        label="배당수익률"
        value={yld}
        onChange={setYld}
        unit="%"
        quick={YIELD_PRESETS}
        hint="보유할 ETF·주식의 연 배당수익률. 프리셋은 대표 배당 ETF의 대략적인 수준입니다."
      />
      <NumberField
        label="배당소득세율"
        value={tax}
        onChange={setTax}
        unit="%"
        hint="국내 배당소득세 15.4% 기준. 미국 주식 원천징수는 15%입니다."
      />
      <button className="calc-submit" onClick={calc}>
        계산하기 →
      </button>

      {result !== null && Number.isFinite(result) && (
        <div className="calc-result">
          <div className="headline">세후 월 {fmtMan(num(target))} 배당에 필요한 자산</div>
          <div className="big">{fmtMan(result)}</div>
          <div className="rows">
            <div>
              <span className="k">세전 연 배당금</span>
              <span className="v">{fmtMan((result * num(yld)) / 100)}</span>
            </div>
            <div>
              <span className="k">연 배당 세금</span>
              <span className="v">-{fmtMan((result * num(yld)) / 100 * (num(tax) / 100))}</span>
            </div>
            <div>
              <span className="k">세후 연 배당금</span>
              <span className="v">{fmtMan(num(target) * 12)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
