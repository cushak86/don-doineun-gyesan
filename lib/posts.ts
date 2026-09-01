import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import type { ClusterKey } from "./clusters";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  cluster: ClusterKey;
  calculator?: string; // 관련 계산기 slug
  readingMinutes: number;
}

export interface Post extends PostMeta {
  html: string;
}

function readingMinutes(content: string): number {
  // ponytail: 분당 600자 근사치, 정밀 측정 필요해지면 교체
  return Math.max(1, Math.ceil(content.replace(/\s/g, "").length / 600));
}

export function getAllPosts(): PostMeta[] {
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));
  const posts = files.map((file) => {
    const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf-8");
    const { data, content } = matter(raw);
    return {
      slug: file.replace(/\.md$/, ""),
      title: data.title as string,
      description: data.description as string,
      date: data.date as string,
      cluster: data.cluster as ClusterKey,
      calculator: data.calculator as string | undefined,
      readingMinutes: readingMinutes(content),
    };
  });
  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): Post | null {
  const file = path.join(POSTS_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf-8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title as string,
    description: data.description as string,
    date: data.date as string,
    cluster: data.cluster as ClusterKey,
    calculator: data.calculator as string | undefined,
    readingMinutes: readingMinutes(content),
    html: marked.parse(content) as string,
  };
}
