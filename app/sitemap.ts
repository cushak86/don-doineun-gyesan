import type { MetadataRoute } from "next";
import { CALCULATORS } from "@/lib/clusters";
import { getAllPosts } from "@/lib/posts";
import { site } from "@/site.config";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["", "/blog", "/calculators", "/about", "/privacy"].map((p) => ({
    url: `${site.url}${p}`,
    lastModified: new Date(),
  }));
  const calcPages = CALCULATORS.map((c) => ({
    url: `${site.url}/calculators/${c.slug}`,
    lastModified: new Date(),
  }));
  const postPages = getAllPosts().map((p) => ({
    url: `${site.url}/blog/${p.slug}`,
    lastModified: new Date(p.date),
  }));
  return [...staticPages, ...calcPages, ...postPages];
}
