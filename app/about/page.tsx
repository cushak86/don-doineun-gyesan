import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/site.config";

export const metadata: Metadata = {
  title: "소개",
  description: `${site.name} 소개 — 계산기와 데이터 기반 투자 가이드를 무료로 제공합니다.`,
};

export default function AboutPage() {
  return (
    <div className="container prose">
      <h1>{site.name} 소개</h1>
      <p>
        {site.name}은 한국 투자자를 위한 무료 재테크 도구 사이트입니다. 복리·목표금액·FIRE·배당
        계산기와 ETF·은퇴설계·배당·재테크 기초 4개 주제의 데이터 기반 가이드를 제공합니다.
      </p>
      <h2>이 사이트가 지키는 원칙</h2>
      <ul>
        <li>모든 계산기와 글은 무료이며, 회원가입을 요구하지 않습니다.</li>
        <li>계산은 브라우저 안에서 처리되며, 입력한 자산 정보는 어디에도 저장·전송되지 않습니다.</li>
        <li>글의 수치는 공개 데이터를 근거로 하며, 기준 시점을 함께 표기합니다.</li>
        <li>특정 상품의 매수·매도를 권유하지 않습니다. 투자 판단과 책임은 본인에게 있습니다.</li>
      </ul>
      <h2>이렇게 활용해보세요</h2>
      <p>
        <Link href="/blog">블로그</Link>에서 원리와 전략을 읽고,{" "}
        <Link href="/calculators">계산기</Link>에 내 숫자를 넣어 나만의 시뮬레이션을 돌려보세요.
        글마다 관련 계산기가 연결되어 있습니다.
      </p>
      <h2>운영·광고 안내</h2>
      <p>
        사이트 운영 비용을 위해 구글 애드센스와 쿠팡 파트너스 광고가 게재될 수 있습니다. 쿠팡
        파트너스 활동의 일환으로 일정액의 수수료를 제공받을 수 있으며, 이는 사이트 운영에
        사용됩니다.
      </p>
    </div>
  );
}
