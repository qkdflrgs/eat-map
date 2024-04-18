import { StoreType } from "@/interface";
import { Dispatch, SetStateAction, useCallback, useEffect } from "react";

interface MarkersProps {
  map: any;
  stores: StoreType[];
  setCurrentStore: Dispatch<SetStateAction<any>>;
}

export default function Markers({
  map,
  stores,
  setCurrentStore,
}: MarkersProps) {
  const loadKakaoMarkers = useCallback(() => {
    if (map) {
      // 식당 데이터 마커 띄위기
      stores?.map((store) => {
        var imageSrc = store?.bizcnd_code_nm
            ? `/images/markers/${store?.bizcnd_code_nm}.png`
            : "/images/markers/default.png", // 마커이미지의 주소입니다
          imageSize = new window.kakao.maps.Size(40, 40), // 마커이미지의 크기입니다
          imageOption = { offset: new window.kakao.maps.Point(27, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

        // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
        var markerImage = new window.kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imageOption
        );

        let markerPosition = new window.kakao.maps.LatLng(
          store?.y_dnts,
          store?.x_cnts
        );

        let marker = new window.kakao.maps.Marker({
          position: markerPosition,
          image: markerImage,
        });

        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(map);

        // hover 되었을 경우, 인포윈도우 생성
        let content = `<div class='info-window'>${store.upso_nm}</div>`;

        let customOverlay = new window.kakao.maps.CustomOverlay({
          position: markerPosition,
          content: content,
          xAnchor: 0.6,
          yAnchor: 0.91,
        });

        window.kakao.maps.event.addListener(marker, "mouseover", function () {
          customOverlay.setMap(map);
        });

        window.kakao.maps.event.addListener(marker, "mouseout", function () {
          customOverlay.setMap(null);
        });

        // 선택한 가게 저장
        window.kakao.maps.event.addListener(marker, "click", function () {
          setCurrentStore(store);
        });
      });
    }
  }, [map, setCurrentStore, stores]);

  useEffect(() => {
    loadKakaoMarkers();
  }, [loadKakaoMarkers, map]);

  return <></>;
}
