import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/site.config";

export const metadata: Metadata = {
  title: "문의",
  description: `${site.name}에 계산 오류 제보, 수치·세법 정정 요청, 계산기 제안, 제휴 문의를 보내는 방법을 안내합니다.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="container prose">
      <h1>문의</h1>
      <p>
        계산 결과의 오류, 바뀐 세법이나 제도, 새로 필요한 계산기, 제휴·광고 문의를 받습니다. 특히
        수치나 세법이 잘못된 부분을 알려주시면 확인 후 본문을 고치고 수정 사실을 밝힙니다.
      </p>

      <h2>연락 방법</h2>
      <ul>
        <li>
          <strong>GitHub 이슈</strong> —{" "}
          <a href={site.contact.github} target="_blank" rel="noopener noreferrer">
            이슈 남기기
          </a>
          . 이 사이트는 소스가 공개되어 있어, 오류 제보와 개선 제안을 이슈로 남기면 가장 빠르게
          확인됩니다. GitHub 계정이 필요하며 내용은 공개됩니다.
        </li>
        {site.contact.email && (
          <li>
            <strong>이메일</strong> —{" "}
            <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>. 공개되면 곤란한
            내용이나 제휴 문의는 이메일을 이용해주세요.
          </li>
        )}
      </ul>

      <h2>제보할 때 함께 적어주시면 좋은 것</h2>
      <ul>
        <li>해당 페이지 주소 (예: /calculators/loan)</li>
        <li>입력한 값과, 기대한 결과 / 실제로 나온 결과</li>
        <li>근거가 되는 자료의 링크 (국세청·금융감독원 등 1차 출처면 더 좋습니다)</li>
      </ul>

      <h2>주의</h2>
      <p>
        GitHub 이슈는 누구나 볼 수 있는 공개 공간입니다. 계좌번호, 주민등록번호, 구체적인 자산
        내역처럼 민감한 개인 정보는 적지 마세요. 또한 이 사이트는 개별 투자·세무 상담을 제공하지
        않습니다. 개인의 상황에 맞는 판단은 금융·세무 전문가와 상의해주세요.
      </p>

      <h2>답변까지 걸리는 시간</h2>
      <p>
        1인이 운영하는 사이트라 보통 며칠 정도 걸립니다. 계산 오류처럼 다른 이용자에게 영향을 주는
        제보는 먼저 확인해 수정합니다.
      </p>

      <p>
        사이트의 운영 원칙과 콘텐츠 작성 방식은 <Link href="/about">소개 페이지</Link>에, 개인정보
        처리 기준은 <Link href="/privacy">개인정보 처리방침</Link>에 정리해두었습니다.
      </p>
    </div>
  );
}
