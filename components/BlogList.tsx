"use client";

import { useState } from "react";
import { CLUSTERS, CLUSTER_KEYS, type ClusterKey } from "@/lib/clusters";
import type { PostMeta } from "@/lib/posts";
import PostCard from "./PostCard";

/** 검색·클러스터 필터가 붙은 블로그 글 목록 */
export default function BlogList({ posts }: { posts: PostMeta[] }) {
  const [query, setQuery] = useState("");
  const [cluster, setCluster] = useState<ClusterKey | "all">("all");

  const q = query.trim().toLowerCase();
  const filtered = posts.filter((p) => {
    if (cluster !== "all" && p.cluster !== cluster) return false;
    if (!q) return true;
    return (p.title + p.description).toLowerCase().includes(q);
  });

  const grouped = CLUSTER_KEYS.map((key) => ({
    key,
    posts: filtered.filter((p) => p.cluster === key),
  })).filter((g) => g.posts.length > 0);

  return (
    <div>
      <div className="search-bar">
        <input
          type="search"
          placeholder="제목·키워드로 글 검색 (예: QQQ, 4% 룰, 배당)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="글 검색"
        />
      </div>
      <div className="filter-chips">
        <button className={cluster === "all" ? "active" : ""} onClick={() => setCluster("all")}>
          전체 {posts.length}편
        </button>
        {CLUSTER_KEYS.map((key) => (
          <button
            key={key}
            className={cluster === key ? "active" : ""}
            onClick={() => setCluster(key)}
          >
            {CLUSTERS[key].emoji} {CLUSTERS[key].label}
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="empty-note">검색 결과가 없습니다. 다른 키워드로 찾아보세요.</p>
      )}

      {grouped.map((g) => (
        <section key={g.key} className="section" style={{ marginTop: 36 }}>
          <div className="section-head">
            <h2>
              {CLUSTERS[g.key].emoji} {CLUSTERS[g.key].label}
            </h2>
          </div>
          <div className="grid cols-2">
            {g.posts.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
