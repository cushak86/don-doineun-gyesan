import type { MetadataRoute } from "next";
import { CALCULATORS } from "@/lib/clusters";
import { getAllPosts } from "@/lib/posts";
import { site } from "@/site.config";

export default function sitemap(): MetadataRoute.Sitemap {
  // 계산기·정적 페이지는 실제 변경 시점을 알 수 없으므로 lastModified를 넣지 않음
  const staticPages = ["", "/blog", "/calculators", "/about", "/privacy"].map((p) => ({
    url: `${site.url}${p}`,
  }));
  const calcPages = CALCULATORS.map((c) => ({
    url: `${site.url}/calculators/${c.slug}`,
  }));
  const postPages = getAllPosts().map((p) => ({
    url: `${site.url}/blog/${p.slug}`,
    lastModified: new Date(p.date),
  }));
  return [...staticPages, ...calcPages, ...postPages];
}
