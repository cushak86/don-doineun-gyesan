import { site } from "@/site.config";

/**
 * 광고 슬롯. 애드센스 승인 전에는 점선 자리표시자를 보여주고,
 * site.config.ts 에 clientId·slot 값을 넣으면 실제 광고가 노출됩니다.
 */
export default function AdSlot({ slot = "" }: { slot?: string }) {
  if (site.adsense.clientId && slot) {
    return (
      <ins
        className="adsbygoogle"
        style={{ display: "block", margin: "32px 0" }}
        data-ad-client={site.adsense.clientId}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    );
  }
  return <div className="ad-slot">광고 영역 — 애드센스·쿠팡 파트너스 승인 후 노출됩니다</div>;
}
