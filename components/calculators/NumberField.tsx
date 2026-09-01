"use client";

export interface QuickBtn {
  label: string;
  add?: number; // 현재 값에 더하기
  set?: number; // 값 지정
}

export default function NumberField({
  label,
  value,
  onChange,
  unit,
  hint,
  quick,
  step,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  unit: string;
  hint?: string;
  quick?: QuickBtn[];
  step?: string;
}) {
  return (
    <div className="field">
      <label>{label}</label>
      <div className="input-wrap">
        <input
          type="number"
          inputMode="decimal"
          step={step ?? "any"}
          min={0}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <span className="unit">{unit}</span>
      </div>
      {quick && (
        <div className="quick-btns">
          {quick.map((b) => (
            <button
              key={b.label}
              type="button"
              onClick={() => {
                const cur = parseFloat(value) || 0;
                onChange(String(b.set !== undefined ? b.set : cur + (b.add ?? 0)));
              }}
            >
              {b.label}
            </button>
          ))}
          <button type="button" onClick={() => onChange("0")}>
            초기화
          </button>
        </div>
      )}
      {hint && <div className="hint">{hint}</div>}
    </div>
  );
}

export const MONEY_QUICK: QuickBtn[] = [
  { label: "+1억", add: 10000 },
  { label: "+1000만", add: 1000 },
  { label: "+100만", add: 100 },
];

export const GOAL_QUICK: QuickBtn[] = [
  { label: "+10억", add: 100000 },
  { label: "+1억", add: 10000 },
  { label: "+1000만", add: 1000 },
];

export const num = (v: string) => {
  const n = parseFloat(v);
  return Number.isFinite(n) && n >= 0 ? n : 0;
};
