"use client";

import { useState } from "react";
import { fmtMan, futureValue } from "@/lib/finance";
import NumberField, { num } from "./NumberField";

export default function PensionIsaTaxCalc() {
  const [monthly, setMonthly] = useState("50");
  const [years, setYears] = useState("10");
  const [rate, setRate] = useState("6");
  const [salary, setSalary] = useState("5000");
  const [result, setResult] = useState<
    { name: string; after: number; note: string }[] | null
  >(null);

  const calc = () => {
    const y = num(years);
    const m = num(monthly);
    if (y <= 0 || m <= 0) return;
    const { fv, principal } = futureValue(0, m, y, num(rate));
    const gain = fv - principal;

    // 일반계좌: 국내 상장 해외 ETF 가정, 매매차익·분배금에 배당소득세 15.4%
    const general = principal + gain * (1 - 0.154);

    // ISA(일반형): 손익 200만 원 비과세, 초과분 9.9% 분리과세 (만기 일괄 과세 가정)
    const isa = principal + Math.min(gain, 200) + Math.max(0, gain - 200) * (1 - 0.099);

    // 연금저축: 과세이연 후 55세 이후 연금 수령 시 5.5% 저율 과세 가정
    // 세액공제: 연 납입 600만 한도 × 공제율(총급여 5,500만 이하 16.5%, 초과 13.2%)
    const creditRate = num(salary) <= 5500 ? 0.165 : 0.132;
    const yearlyPay = Math.min(m * 12, 600);
    const refund = yearlyPay * creditRate * y;
    const pension = fv * (1 - 0.055) + refund;

    setResult([
      { name: "일반계좌", after: general, note: "수익에 배당소득세 15.4%" },
      { name: "ISA (일반형)", after: isa, note: "200만 비과세 + 초과 9.9%" },
      {
        name: "연금저축",
        after: pension,
        note: `연금소득세 5.5% + 세액공제 환급 ${fmtMan(refund)} 포함`,
      },
    ]);
  };

  const best = result && result.reduce((a, b) => (b.after > a.after ? b : a));

  return (
    <div className="calc-shell">
      <NumberField label="월 납입금" value={monthly} onChange={setMonthly} unit="만 원" />
      <NumberField label="납입 기간" value={years} onChange={setYears} unit="년" />
      <NumberField label="연 수익률" value={rate} onChange={setRate} unit="%" />
      <NumberField
        label="총급여 (연봉)"
        value={salary}
        onChange={setSalary}
        unit="만 원"
        hint="5,500만 원 이하는 세액공제율 16.5%, 초과는 13.2%가 적용됩니다."
      />
      <button className="calc-submit" onClick={calc}>
        계산하기 →
      </button>

      {result && best && (
        <div className="calc-result">
          <div className="headline">세후 수령액이 가장 큰 계좌</div>
          <div className="big">
            {best.name} — {fmtMan(best.after)}
          </div>
          <div className="year-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>계좌</th>
                  <th>세후 수령액</th>
                  <th>적용 세금</th>
                </tr>
              </thead>
              <tbody>
                {result.map((r) => (
                  <tr key={r.name}>
                    <td>{r.name === best.name ? `${r.name} ✅` : r.name}</td>
                    <td>{fmtMan(r.after)}</td>
                    <td>{r.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <p className="hint" style={{ marginTop: 14, fontSize: 12, color: "var(--text-muted)" }}>
        단순화 가정: 국내 상장 해외지수 ETF 투자, ISA는 일반형(서민형은 400만 비과세) 만기 일괄
        과세, 연금저축은 55세 이후 연금으로 수령(연 수령액이 사적연금 분리과세 한도 이내), 세액공제
        환급금은 재투자하지 않음. 연금저축은 55세 이전 해지 시 기타소득세 16.5%로 불리해집니다.
        정확한 계산은 세무 전문가와 상담하세요.
      </p>
    </div>
  );
}
