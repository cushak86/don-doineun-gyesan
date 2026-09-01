import { site } from "@/site.config";

/**
 * 광고 슬롯. 애드센스 승인 후 광고 단위의 slot ID를 넘기면 광고가 노출됩니다.
 * slot이 없으면 아무것도 렌더링하지 않습니다 (자리표시 텍스트는 색인 품질을 해침).
 */
export default function AdSlot({ slot = "" }: { slot?: string }) {
  if (!site.adsense.clientId || !slot) return null;
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
