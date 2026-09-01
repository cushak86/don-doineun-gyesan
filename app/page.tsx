import Link from "next/link";
import AdSlot from "@/components/AdSlot";
import PostCard from "@/components/PostCard";
import { CALCULATORS, CLUSTERS, CLUSTER_KEYS } from "@/lib/clusters";
import { getAllPosts } from "@/lib/posts";
import { site } from "@/site.config";

export default function HomePage() {
  const posts = getAllPosts();
  const recent = posts.slice(0, 6);

  return (
    <div className="container">
      <section className="hero">
        <span className="eyebrow">한국 투자자를 위한 무료 재테크 도구</span>
        <h1>
          계산기로 확인하고,
          <br />
          데이터로 투자하세요
        </h1>
        <p className="lead">
          {site.name}은 복리·목표금액·FIRE·배당 계산기와 {posts.length}편의 데이터 기반 투자
          가이드를 무료로 제공합니다. 감이 아니라 숫자로 자산 계획을 세워보세요.
        </p>
        <div className="stat-row">
          <div className="stat">
            <div className="k">계산기</div>
            <div className="v">{CALCULATORS.length}종</div>
          </div>
          <div className="stat">
            <div className="k">투자 가이드</div>
            <div className="v">{posts.length}편</div>
          </div>
          <div className="stat">
            <div className="k">주제 클러스터</div>
            <div className="v">{CLUSTER_KEYS.length}개</div>
          </div>
          <div className="stat">
            <div className="k">가격</div>
            <div className="v">무료</div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>투자 계산기</h2>
          <Link className="more" href="/calculators">
            전체 보기 →
          </Link>
        </div>
        <div className="grid cols-4">
          {CALCULATORS.map((c) => (
            <Link key={c.slug} href={`/calculators/${c.slug}`} className="card">
              <span className="emoji">{c.emoji}</span>
              <h3>{c.title}</h3>
              <p>{c.short}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>주제별 가이드</h2>
          <Link className="more" href="/blog">
            블로그 전체 →
          </Link>
        </div>
        <div className="grid cols-4">
          {CLUSTER_KEYS.map((key) => (
            <Link key={key} href="/blog" className="card">
              <span className="emoji">{CLUSTERS[key].emoji}</span>
              <h3>{CLUSTERS[key].label}</h3>
              <p>{CLUSTERS[key].description}</p>
            </Link>
          ))}
        </div>
      </section>

      <AdSlot />

      <section className="section">
        <div className="section-head">
          <h2>최신 글</h2>
        </div>
        <div className="grid cols-2">
          {recent.map((p) => (
            <PostCard key={p.slug} post={p} showCluster />
          ))}
        </div>
      </section>
    </div>
  );
}
