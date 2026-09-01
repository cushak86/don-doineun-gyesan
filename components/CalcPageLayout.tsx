import fs from "fs";
import path from "path";
import Link from "next/link";
import { marked } from "marked";
import AdSlot from "@/components/AdSlot";
import PostCard from "@/components/PostCard";
import { CALCULATORS } from "@/lib/clusters";
import { getAllPosts } from "@/lib/posts";

/** 계산기 페이지 공통 틀: 제목 + 계산기 + 설명 콘텐츠 + 관련 글 + 다른 계산기 */
export default function CalcPageLayout({
  slug,
  children,
}: {
  slug: string;
  children: React.ReactNode;
}) {
  const calc = CALCULATORS.find((c) => c.slug === slug)!;
  const related = getAllPosts().filter((p) => p.calculator === slug).slice(0, 4);

  // 같은 카테고리 내에서 자기 다음 순서부터 순환해 링크가 특정 계산기에 몰리지 않게 분산
  const sameCat = CALCULATORS.filter((c) => c.category === calc.category);
  const selfIdx = sameCat.findIndex((c) => c.slug === slug);
  const rotated = sameCat.slice(selfIdx + 1).concat(sameCat.slice(0, selfIdx));
  const others = [
    ...rotated,
    ...CALCULATORS.filter((c) => c.category !== calc.category && c.featured),
  ].slice(0, 4);

  // content/calculators/{slug}.md 가 있으면 계산기 아래에 설명 콘텐츠로 렌더링
  const contentFile = path.join(process.cwd(), "content", "calculators", `${slug}.md`);
  const contentHtml = fs.existsSync(contentFile)
    ? (marked.parse(fs.readFileSync(contentFile, "utf-8")) as string)
    : null;

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

      {contentHtml && (
        <article
          className="post-body"
          style={{ margin: "48px 0 0", maxWidth: 720 }}
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      )}

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
