"use client";

import { useState } from "react";
import { fireTarget, fmtMan, monthsToGoal } from "@/lib/finance";
import NumberField, { MONEY_QUICK, num } from "./NumberField";

export default function FireCalc() {
  const [spend, setSpend] = useState("250");
  const [principal, setPrincipal] = useState("5000");
  const [monthly, setMonthly] = useState("150");
  const [rate, setRate] = useState("6");
  const [withdraw, setWithdraw] = useState("4");
  const [result, setResult] = useState<{
    target: number;
    months: number | null;
  } | null>(null);

  const calc = () => {
    const w = num(withdraw);
    if (w <= 0 || num(spend) <= 0) return;
    const target = fireTarget(num(spend) * 12, w);
    setResult({
      target,
      months: monthsToGoal(target, num(principal), num(monthly), num(rate)),
    });
  };

  return (
    <div className="calc-shell">
      <NumberField
        label="은퇴 후 월 지출"
        value={spend}
        onChange={setSpend}
        unit="만 원"
        hint="은퇴 후 한 달 생활비. 통계청 기준 부부 적정 노후 생활비는 월 277만 원 수준입니다."
      />
      <NumberField
        label="현재 투자 자산"
        value={principal}
        onChange={setPrincipal}
        unit="만 원"
        quick={MONEY_QUICK}
      />
      <NumberField label="월 저축·투자액" value={monthly} onChange={setMonthly} unit="만 원" />
      <NumberField label="연 수익률" value={rate} onChange={setRate} unit="%" />
      <NumberField
        label="연 인출률"
        value={withdraw}
        onChange={setWithdraw}
        unit="%"
        hint="4% 룰: 은퇴 자산의 4%를 매년 인출하면 30년 이상 유지될 확률이 높다는 경험칙."
      />
      <button className="calc-submit" onClick={calc}>
        계산하기 →
      </button>

      {result && (
        <div className="calc-result">
          <div className="headline">경제적 자유(FIRE)에 필요한 자산</div>
          <div className="big">{fmtMan(result.target)}</div>
          <div className="rows">
            <div>
              <span className="k">연 지출</span>
              <span className="v">{fmtMan(num(spend) * 12)}</span>
            </div>
            <div>
              <span className="k">달성까지 남은 기간</span>
              <span className="v">
                {result.months === null
                  ? "100년 이상 — 저축액을 늘려보세요"
                  : result.months === 0
                    ? "이미 달성했습니다 🎉"
                    : `약 ${Math.floor(result.months / 12)}년 ${result.months % 12}개월`}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
