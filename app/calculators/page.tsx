import type { Metadata } from "next";
import Link from "next/link";
import { CALCULATORS } from "@/lib/clusters";

export const metadata: Metadata = {
  title: "투자 계산기 모음 — 복리·목표금액·FIRE·배당",
  description:
    "복리 계산기, 목표금액 계산기, FIRE 계산기, 배당 계산기를 무료로 사용해보세요. 회원가입 없이 바로 계산할 수 있습니다.",
};

export default function CalculatorsPage() {
  return (
    <div className="container">
      <section className="hero">
        <span className="eyebrow">회원가입 없이 무료</span>
        <h1>투자 계산기 모음</h1>
        <p className="lead">
          내 자산의 미래를 숫자로 확인해보세요. 모든 계산은 브라우저 안에서 즉시 처리되며, 입력한
          값은 어디에도 저장되지 않습니다.
        </p>
      </section>

      <div className="grid cols-2">
        {CALCULATORS.map((c) => (
          <Link key={c.slug} href={`/calculators/${c.slug}`} className="card">
            <span className="emoji">{c.emoji}</span>
            <h3>{c.title}</h3>
            <p>{c.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
