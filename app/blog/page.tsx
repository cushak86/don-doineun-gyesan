import type { Metadata } from "next";
import Link from "next/link";
import AdSlot from "@/components/AdSlot";
import BlogList from "@/components/BlogList";
import { CALCULATORS, CLUSTER_KEYS } from "@/lib/clusters";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "투자 블로그 — ETF·FIRE·배당·복리 가이드",
  description:
    "ETF·미국주식, FIRE·은퇴설계, 배당·커버드콜, 재테크 기초까지 데이터 기반 투자 가이드를 무료로 읽어보세요. 모든 글은 관련 계산기와 연결되어 있습니다.",
  alternates: { canonical: "/blog" },
};

const FAQ = [
  {
    q: "어떤 글부터 읽으면 좋나요?",
    a: "투자를 시작하는 단계라면 '재테크 기초·복리' 클러스터의 복리 글부터, 미국 ETF에 관심이 있다면 QQQ vs SPY 비교 글부터 읽는 것을 추천합니다. 각 글 하단의 관련 계산기로 내 숫자를 직접 확인해보세요.",
  },
  {
    q: "계산기와 블로그는 어떻게 연결되나요?",
    a: "모든 글은 관련 계산기와 연결되어 있습니다. 글에서 원리를 이해하고, 계산기에 내 자산·적립금·수익률을 넣어 나만의 시뮬레이션을 바로 돌려볼 수 있습니다.",
  },
  {
    q: "데이터와 수치는 어디서 오나요?",
    a: "각 운용사 공식 자료, 지수 데이터, 국내 세법 기준을 바탕으로 작성하며 글마다 기준 시점을 표기합니다. 수익률 데이터는 시점에 따라 달라질 수 있으니 참고용으로 활용해주세요.",
  },
  {
    q: "이 사이트는 유료인가요?",
    a: "아니요, 모든 계산기와 글은 무료입니다. 사이트 운영을 위해 광고(애드센스·쿠팡 파트너스)가 게재될 수 있으며, 이는 서버·개발 비용에 사용됩니다.",
  },
];

export default function BlogPage() {
  const posts = getAllPosts();
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="container">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <section className="hero">
        <span className="eyebrow">한국 투자자를 위한 데이터 기반 가이드</span>
        <h1>투자 블로그</h1>
        <p className="lead">
          ETF·FIRE·배당·재테크 기초 4개 클러스터, {posts.length}편의 가이드. 계산기로는 알 수 없는
          맥락과 전략, 실전 사례를 숫자로 풀어드립니다.
        </p>
      </section>

      <BlogList posts={posts} />

      <AdSlot />

      <section className="section faq">
        <div className="section-head">
          <h2>자주 묻는 질문</h2>
        </div>
        {FAQ.map((f) => (
          <details key={f.q}>
            <summary>Q. {f.q}</summary>
            <p>{f.a}</p>
          </details>
        ))}
      </section>

      <section className="section">
        <div className="section-head">
          <h2>글을 읽었다면, 직접 계산해보세요</h2>
          <Link className="more" href="/calculators">
            전체 {CALCULATORS.length}종 보기 →
          </Link>
        </div>
        <div className="grid cols-4">
          {CALCULATORS.filter((c) => c.featured).map((c) => (
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
