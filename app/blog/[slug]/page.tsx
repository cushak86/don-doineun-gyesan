import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AdSlot from "@/components/AdSlot";
import Comments from "@/components/Comments";
import { CALCULATORS, CLUSTERS } from "@/lib/clusters";
import { getAllPosts, getPost } from "@/lib/posts";
import { site } from "@/site.config";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const calc = CALCULATORS.find((c) => c.slug === post.calculator);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name },
    mainEntityOfPage: `${site.url}/blog/${post.slug}`,
    inLanguage: "ko",
  };

  return (
    <div className="container">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="post-header">
        <span className="badge">
          {CLUSTERS[post.cluster].emoji} {CLUSTERS[post.cluster].label}
        </span>
        <h1>{post.title}</h1>
        <div className="meta">
          {post.date} · 읽기 {post.readingMinutes}분 · {site.name}
        </div>
      </header>

      <article className="post-body" dangerouslySetInnerHTML={{ __html: post.html }} />

      {calc && (
        <Link href={`/calculators/${calc.slug}`} className="calc-cta">
          <span className="emoji">{calc.emoji}</span>
          <div>
            <h3>{calc.title}로 직접 계산해보세요</h3>
            <p>{calc.description}</p>
          </div>
        </Link>
      )}

      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <AdSlot />
      </div>

      <Comments />

      <div style={{ maxWidth: 760, margin: "40px auto 0" }}>
        <Link href="/blog" className="more" style={{ color: "var(--accent)", fontWeight: 600 }}>
          ← 블로그 목록으로
        </Link>
      </div>
    </div>
  );
}
