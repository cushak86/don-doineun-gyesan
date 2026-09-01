import type { Metadata } from "next";
import { site } from "@/site.config";

export const metadata: Metadata = {
  title: "개인정보 처리방침",
  description: `${site.name} 개인정보 처리방침 — 쿠키·광고·댓글 서비스의 개인정보 처리 기준을 안내합니다.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="container prose">
      <h1>개인정보 처리방침</h1>
      <p>시행일: 2026년 9월 1일</p>

      <h2>1. 수집하는 개인정보</h2>
      <p>
        {site.name}(이하 &quot;사이트&quot;)은 회원가입 없이 이용할 수 있으며, 이용자의 이름·이메일 등
        개인정보를 직접 수집하지 않습니다. 계산기에 입력한 값은 이용자의 브라우저 안에서만 처리되며
        서버로 전송되거나 저장되지 않습니다.
      </p>

      <h2>2. 쿠키 및 광고</h2>
      <p>
        사이트는 운영 비용 충당을 위해 제3자 광고(구글 애드센스, 쿠팡 파트너스)를 게재할 수
        있습니다. 광고 제공 과정에서 아래와 같은 처리가 이루어질 수 있습니다.
      </p>
      <ul>
        <li>
          구글을 포함한 제3자 광고 사업자는 쿠키를 사용하여 이용자의 이전 방문 기록에 기반한 광고를
          게재할 수 있습니다.
        </li>
        <li>
          이용자는 <a href="https://adssettings.google.com">구글 광고 설정</a>에서 맞춤 광고를
          비활성화할 수 있습니다.
        </li>
        <li>브라우저 설정에서 쿠키 저장을 거부할 수 있으며, 이 경우에도 사이트 이용에는 제한이 없습니다.</li>
      </ul>

      <h2>3. 댓글 서비스</h2>
      <p>
        블로그 댓글은 GitHub 계정 기반의 giscus 서비스를 통해 제공될 수 있습니다. 댓글 작성 시
        GitHub의 개인정보 처리방침이 적용됩니다.
      </p>

      <h2>4. 개인정보 보호 문의</h2>
      <p>개인정보 처리와 관련한 문의는 사이트 하단의 소개 페이지를 통해 연락해주시기 바랍니다.</p>

      <h2>5. 방침의 변경</h2>
      <p>
        본 방침이 변경되는 경우 본 페이지를 통해 공지하며, 변경된 방침은 게시한 날부터 효력이
        발생합니다.
      </p>
    </div>
  );
}
