"use client";

import { useState } from "react";
import NumberField, { num } from "./NumberField";

function classify(bmi: number): string {
  if (bmi < 18.5) return "저체중";
  if (bmi < 23) return "정상 ✅";
  if (bmi < 25) return "과체중 (비만 전단계)";
  if (bmi < 30) return "비만 (1단계)";
  return "고도비만 (2단계 이상)";
}

export default function BmiCalc() {
  const [height, setHeight] = useState("170");
  const [weight, setWeight] = useState("65");
  const [result, setResult] = useState<{ bmi: number; min: number; max: number } | null>(null);

  const calc = () => {
    const h = num(height) / 100;
    const w = num(weight);
    if (h <= 0 || w <= 0) return;
    setResult({ bmi: w / (h * h), min: 18.5 * h * h, max: 22.9 * h * h });
  };

  return (
    <div className="calc-shell">
      <NumberField label="키" value={height} onChange={setHeight} unit="cm" />
      <NumberField label="몸무게" value={weight} onChange={setWeight} unit="kg" />
      <button className="calc-submit" onClick={calc}>
        계산하기 →
      </button>

      {result && (
        <div className="calc-result">
          <div className="headline">체질량지수 (BMI)</div>
          <div className="big">
            {result.bmi.toFixed(1)} — {classify(result.bmi)}
          </div>
          <div className="rows">
            <div>
              <span className="k">적정 체중 범위 (BMI 18.5~22.9)</span>
              <span className="v">
                {result.min.toFixed(1)} ~ {result.max.toFixed(1)}kg
              </span>
            </div>
          </div>
          <div className="year-table-wrap">
            <table>
              <thead>
                <tr>
                  <th>BMI</th>
                  <th>판정 (아시아·태평양 기준)</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>18.5 미만</td><td>저체중</td></tr>
                <tr><td>18.5 ~ 22.9</td><td>정상</td></tr>
                <tr><td>23 ~ 24.9</td><td>과체중 (비만 전단계)</td></tr>
                <tr><td>25 ~ 29.9</td><td>비만 (1단계)</td></tr>
                <tr><td>30 이상</td><td>고도비만</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      <p className="hint" style={{ marginTop: 14, fontSize: 12, color: "var(--text-muted)" }}>
        BMI는 근육량·체지방 분포를 반영하지 못하는 참고 지표입니다. 건강 상태 판단은 의료 전문가와
        상담하세요.
      </p>
    </div>
  );
}
