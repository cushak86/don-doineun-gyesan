// 사이트 전역 설정 — 이름·주소·광고·댓글 설정을 여기 한 곳에서 관리합니다.
export const site = {
  name: "돈되는계산",
  tagline: "계산기로 확인하고, 데이터로 투자하는 재테크 가이드",
  description:
    "복리·FIRE·배당 계산기와 ETF·은퇴설계·배당·재테크 기초 4개 클러스터의 데이터 기반 투자 가이드를 무료로 제공합니다.",
  url: "https://dongyesan.com",
  author: "돈되는계산",

  // 애드센스 승인 후 ca-pub-XXXXXXXX 형식의 클라이언트 ID를 입력하면 광고가 노출됩니다.
  adsense: {
    clientId: "",
  },

  // 쿠팡 파트너스 위젯 ID·트래킹 코드를 입력하면 쿠팡 배너가 노출됩니다.
  coupang: {
    widgetId: "",
    trackingCode: "",
  },

  // giscus 댓글: https://giscus.app 에서 저장소 연결 후 4개 값을 채우면 활성화됩니다.
  giscus: {
    repo: "", // 예: "cushak86/don-doineun-gyesan"
    repoId: "",
    category: "Comments",
    categoryId: "",
  },
};
