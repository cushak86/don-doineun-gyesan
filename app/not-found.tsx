import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container prose">
      <h1>페이지를 찾을 수 없습니다</h1>
      <p>
        주소가 바뀌었거나 삭제된 페이지입니다. 아래에서 찾으시는 내용으로 이동할 수 있습니다.
      </p>
      <ul>
        <li>
          <Link href="/">홈으로</Link>
        </li>
        <li>
          <Link href="/calculators">투자 계산기 모음</Link> — 복리·FIRE·배당·대출·연봉 등 21종
        </li>
        <li>
          <Link href="/blog">투자 블로그</Link> — ETF·은퇴설계·배당·재테크 기초 가이드
        </li>
        <li>
          <Link href="/contact">문의</Link> — 링크가 잘못됐다면 알려주세요
        </li>
      </ul>
    </div>
  );
}
