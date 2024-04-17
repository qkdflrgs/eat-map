import * as stores from "@/data/store_data.json";
import Map from "@/components/Map";
import { useState } from "react";
import Markers from "@/components/Markers";
import StoreBox from "@/components/StoreBox";

export default function Home() {
  const [map, setMap] = useState(null);
  const [currentStore, setCurrentStore] = useState(null);
  const storeData = stores.DATA;
  return (
    <>
      <Map setMap={setMap} />
      <Markers
        map={map}
        storeData={storeData}
        setCurrentStore={setCurrentStore}
      />
      <StoreBox store={currentStore} setStore={setCurrentStore} />
    </>
  );
}
