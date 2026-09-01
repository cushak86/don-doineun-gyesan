"use client";

import { useEffect, useRef } from "react";
import { site } from "@/site.config";

/** giscus 댓글. site.config.ts 의 giscus 값이 채워지면 자동 활성화됩니다. */
export default function Comments() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!site.giscus.repo || !ref.current || ref.current.hasChildNodes()) return;
    const s = document.createElement("script");
    s.src = "https://giscus.app/client.js";
    s.async = true;
    s.crossOrigin = "anonymous";
    s.setAttribute("data-repo", site.giscus.repo);
    s.setAttribute("data-repo-id", site.giscus.repoId);
    s.setAttribute("data-category", site.giscus.category);
    s.setAttribute("data-category-id", site.giscus.categoryId);
    s.setAttribute("data-mapping", "pathname");
    s.setAttribute("data-reactions-enabled", "1");
    s.setAttribute("data-input-position", "top");
    s.setAttribute("data-theme", "light");
    s.setAttribute("data-lang", "ko");
    ref.current.appendChild(s);
  }, []);

  if (!site.giscus.repo) return null;
  return <div className="comments-wrap" ref={ref} />;
}
