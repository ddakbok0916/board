// Map.js
import { useEffect } from "react";

export default function Map() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const { kakao } = window; // 브라우저 환경에서만 실행
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };
      const map = new kakao.maps.Map(container, options);
    }
  }, []);

  return (
    <div
      id="map"
      className="w-full h-[calc(100vh-7rem)] border border-sky-200 rounded-lg shadow-lg bg-sky-50"
    ></div>
  );
}
