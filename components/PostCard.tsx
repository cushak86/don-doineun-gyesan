import Link from "next/link";
import { CLUSTERS } from "@/lib/clusters";
import type { PostMeta } from "@/lib/posts";

export default function PostCard({ post, showCluster = false }: { post: PostMeta; showCluster?: boolean }) {
  return (
    <Link href={`/blog/${post.slug}`} className="post-card">
      {showCluster && <span className="badge">{CLUSTERS[post.cluster].label}</span>}
      <h3>{post.title}</h3>
      <p className="desc">{post.description}</p>
      <div className="meta">
        {post.date} · 읽기 {post.readingMinutes}분
      </div>
    </Link>
  );
}
