import type { Metadata } from "next";
import Link from "next/link";
import { CALC_CATEGORIES, CALC_CATEGORY_KEYS, CALCULATORS } from "@/lib/clusters";

export const metadata: Metadata = {
  title: "투자 계산기 모음 — 복리·FIRE·배당·대출·연봉 등 21종",
  description:
    "복리, 목표금액, FIRE, 배당, MDD, 리밸런싱, 연봉 실수령, 대출, 적금 등 21종의 계산기를 무료로 사용해보세요. 회원가입 없이 바로 계산할 수 있습니다.",
  alternates: { canonical: "/calculators" },
};

export default function CalculatorsPage() {
  return (
    <div className="container">
      <section className="hero">
        <span className="eyebrow">회원가입 없이 무료 · {CALCULATORS.length}종</span>
        <h1>투자 계산기 모음</h1>
        <p className="lead">
          내 자산의 미래를 숫자로 확인해보세요. 모든 계산은 브라우저 안에서 즉시 처리되며, 입력한
          값은 어디에도 저장되지 않습니다.
        </p>
      </section>

      {CALC_CATEGORY_KEYS.map((key) => {
        const items = CALCULATORS.filter((c) => c.category === key);
        return (
          <section key={key} className="section" style={{ marginTop: 40 }}>
            <div className="section-head">
              <h2>
                {CALC_CATEGORIES[key].emoji} {CALC_CATEGORIES[key].label}
              </h2>
            </div>
            <div className="grid cols-2">
              {items.map((c) => (
                <Link key={c.slug} href={`/calculators/${c.slug}`} className="card">
                  <span className="emoji">{c.emoji}</span>
                  <h3>{c.title}</h3>
                  <p>{c.description}</p>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
