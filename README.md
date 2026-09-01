# 돈되는계산

계산기 + 투자 블로그 통합 사이트. Next.js(App Router), 마크다운 파일 기반.

## 실행

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # 배포용 빌드
```

## 글 추가하는 법

`content/posts/` 폴더에 `.md` 파일 하나 = 글 하나. 파일명이 URL이 됩니다.

```markdown
---
title: "글 제목"
description: "목록·검색결과에 보이는 한 줄 요약"
date: "2026-09-15"
cluster: "etf"        # etf | fire | dividend | basics
calculator: "compound" # 글 하단 CTA로 연결할 계산기 (compound|goal|fire|dividend, 생략 가능)
---

본문은 마크다운으로. 표·인용·목록 모두 지원됩니다.
```

저장 후 재배포하면 목록·사이트맵에 자동 반영됩니다.

## 설정 (site.config.ts 한 곳에서 관리)

- **사이트 이름·설명·주소**: `site.name`, `site.url` (배포 후 실제 주소로 변경)
- **애드센스**: 승인받은 `ca-pub-...` ID를 `adsense.clientId`에 입력 → 광고 슬롯이 실제 광고로 전환
- **giscus 댓글**: GitHub 공개 저장소에서 Discussions 활성화 → https://giscus.app 에서 발급받은 4개 값을 `giscus`에 입력 → 글 하단에 댓글창 표시

## 구조

- `app/` — 페이지 (홈, 블로그, 계산기 4종, 소개, 개인정보처리방침, sitemap/robots)
- `content/posts/` — 블로그 글 (마크다운)
- `components/` — 계산기·글카드·검색·광고·댓글 컴포넌트
- `lib/finance.ts` — 계산 로직 (만원 단위)
