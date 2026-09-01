"use client";

import { useState } from "react";
import NumberField, { num } from "./NumberField";

const fmtWon = (man: number) => `${Math.round(man * 10000).toLocaleString()}원`;

// 근로소득공제 (만원)
function earnedIncomeDeduction(g: number): number {
  if (g <= 500) return g * 0.7;
  if (g <= 1500) return 350 + (g - 500) * 0.4;
  if (g <= 4500) return 750 + (g - 1500) * 0.15;
  if (g <= 10000) return 1200 + (g - 4500) * 0.05;
  return 1475 + (g - 10000) * 0.02;
}

// 종합소득세 산출세액 (만원)
function incomeTax(base: number): number {
  if (base <= 0) return 0;
  if (base <= 1400) return base * 0.06;
  if (base <= 5000) return 84 + (base - 1400) * 0.15;
  if (base <= 8800) return 624 + (base - 5000) * 0.24;
  if (base <= 15000) return 1536 + (base - 8800) * 0.35;
  if (base <= 30000) return 3706 + (base - 15000) * 0.38;
  if (base <= 50000) return 9406 + (base - 30000) * 0.4;
  if (base <= 100000) return 17406 + (base - 50000) * 0.42;
  return 38406 + (base - 100000) * 0.45;
}

// 근로소득 세액공제 (만원)
function taxCredit(calculated: number, gross: number): number {
  const credit = calculated <= 130 ? calculated * 0.55 : 71.5 + (calculated - 130) * 0.3;
  let cap: number;
  if (gross <= 3300) cap = 74;
  else if (gross <= 7000) cap = Math.max(74 - (gross - 3300) * 0.008, 66);
  else if (gross <= 12000) cap = Math.max(66 - (gross - 7000) * 0.5, 50);
  else cap = Math.max(50 - (gross - 12000) * 0.5, 20);
  return Math.min(credit, cap);
}

export default function SalaryCalc() {
  const [salary, setSalary] = useState("5000");
  const [nonTax, setNonTax] = useState("20");
  const [result, setResult] = useState<{
    monthlyNet: number;
    pension: number;
    health: number;
    care: number;
    employment: number;
    tax: number;
    localTax: number;
  } | null>(null);

  const calc = () => {
    const s = num(salary);
    if (s <= 0) return;
    const gross = Math.max(0, s - num(nonTax) * 12); // 연 과세 급여
    const grossM = gross / 12;

    const pension = Math.min(grossM, 617) * 0.045; // 기준소득월액 상한 617만 가정
    const health = grossM * 0.03545;
    const care = health * 0.1295;
    const employment = grossM * 0.009;
    const insuranceYear = (pension + health + care + employment) * 12;

    const taxBase = Math.max(
      0,
      gross - earnedIncomeDeduction(gross) - 150 /* 본인 기본공제 */ - insuranceYear
    );
    const calculated = incomeTax(taxBase);
    const finalTax = Math.max(0, calculated - taxCredit(calculated, gross));
    const taxM = finalTax / 12;
    const localTaxM = taxM * 0.1;

    setResult({
      monthlyNet: s / 12 - pension - health - care - employment - taxM - localTaxM,
      pension,
      health,
      care,
      employment,
      tax: taxM,
      localTax: localTaxM,
    });
  };

  return (
    <div className="calc-shell">
      <NumberField
        label="연봉 (세전)"
        value={salary}
        onChange={setSalary}
        unit="만 원"
        quick={[
          { label: "3000만", set: 3000 },
          { label: "5000만", set: 5000 },
          { label: "8000만", set: 8000 },
          { label: "1억", set: 10000 },
        ]}
      />
      <NumberField
        label="월 비과세액"
        value={nonTax}
        onChange={setNonTax}
        unit="만 원"
        hint="식대 등 비과세 수당. 보통 월 20만 원(식대 한도)입니다."
      />
      <button className="calc-submit" onClick={calc}>
        계산하기 →
      </button>

      {result && (
        <div className="calc-result">
          <div className="headline">월 예상 실수령액</div>
          <div className="big">{fmtWon(result.monthlyNet)}</div>
          <div className="rows">
            <div>
              <span className="k">국민연금 (4.5%)</span>
              <span className="v">-{fmtWon(result.pension)}</span>
            </div>
            <div>
              <span className="k">건강보험 (3.545%)</span>
              <span className="v">-{fmtWon(result.health)}</span>
            </div>
            <div>
              <span className="k">장기요양보험</span>
              <span className="v">-{fmtWon(result.care)}</span>
            </div>
            <div>
              <span className="k">고용보험 (0.9%)</span>
              <span className="v">-{fmtWon(result.employment)}</span>
            </div>
            <div>
              <span className="k">소득세</span>
              <span className="v">-{fmtWon(result.tax)}</span>
            </div>
            <div>
              <span className="k">지방소득세</span>
              <span className="v">-{fmtWon(result.localTax)}</span>
            </div>
            <div>
              <span className="k">연 실수령액</span>
              <span className="v">{fmtWon(result.monthlyNet * 12)}</span>
            </div>
          </div>
        </div>
      )}

      <p className="hint" style={{ marginTop: 14, fontSize: 12, color: "var(--text-muted)" }}>
        1인 가구(본인 기본공제만) 기준 근사치입니다. 부양가족, 신용카드·연금저축 공제 등에 따라 실제
        실수령액은 달라지며, 회사의 간이세액표 원천징수와도 차이가 있을 수 있습니다.
      </p>
    </div>
  );
}
