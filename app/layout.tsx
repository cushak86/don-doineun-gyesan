import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { site } from "@/site.config";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    siteName: site.name,
    type: "website",
    locale: "ko_KR",
  },
  verification: {
    google: "ZjcG7KEWeN-nmCldcgeZe9lJZCaozm5FXZMEgHv7kpU",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
        {site.adsense.clientId && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${site.adsense.clientId}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
      </head>
      <body>
        <header className="site-header">
          <div className="container">
            <Link href="/" className="logo">
              <span className="coin">💰</span>
              {site.name}
            </Link>
            <nav className="main-nav">
              <Link href="/calculators">계산기</Link>
              <Link href="/blog">블로그</Link>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="site-footer">
          <div className="container">
            <div className="links">
              <Link href="/about">소개</Link>
              <Link href="/privacy">개인정보 처리방침</Link>
              <Link href="/blog">블로그</Link>
              <Link href="/calculators">계산기</Link>
            </div>
            <div>© 2026 {site.name}. All rights reserved.</div>
            <p className="disclaimer">
              * 본 사이트의 모든 콘텐츠와 계산 결과는 투자 참고용 정보이며, 특정 상품의 매수·매도
              추천이 아닙니다. 투자의 최종 판단과 책임은 이용자 본인에게 있습니다.
              <br />* 본 사이트는 무료로 운영되며, 쿠팡 파트너스 활동 및 광고를 통해 수수료를
              제공받을 수 있습니다.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
