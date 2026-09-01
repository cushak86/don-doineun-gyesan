import Link from "next/link";
import AdSlot from "@/components/AdSlot";
import PostCard from "@/components/PostCard";
import { CALCULATORS } from "@/lib/clusters";
import { getAllPosts } from "@/lib/posts";

/** 계산기 페이지 공통 틀: 제목 + 계산기 + 관련 글 + 다른 계산기 */
export default function CalcPageLayout({
  slug,
  children,
}: {
  slug: string;
  children: React.ReactNode;
}) {
  const calc = CALCULATORS.find((c) => c.slug === slug)!;
  const related = getAllPosts().filter((p) => p.calculator === slug).slice(0, 4);
  const others = CALCULATORS.filter((c) => c.slug !== slug);

  return (
    <div className="container">
      <section className="hero" style={{ paddingBottom: 28 }}>
        <span className="eyebrow">
          {calc.emoji} {calc.short}
        </span>
        <h1>{calc.title}</h1>
        <p className="lead">{calc.description}</p>
      </section>

      <div style={{ maxWidth: 640 }}>{children}</div>

      <AdSlot />

      {related.length > 0 && (
        <section className="section">
          <div className="section-head">
            <h2>함께 읽으면 좋은 글</h2>
          </div>
          <div className="grid cols-2">
            {related.map((p) => (
              <PostCard key={p.slug} post={p} showCluster />
            ))}
          </div>
        </section>
      )}

      <section className="section">
        <div className="section-head">
          <h2>다른 계산기</h2>
        </div>
        <div className="grid cols-4">
          {others.map((c) => (
            <Link key={c.slug} href={`/calculators/${c.slug}`} className="card">
              <span className="emoji">{c.emoji}</span>
              <h3>{c.title}</h3>
              <p>{c.short}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
