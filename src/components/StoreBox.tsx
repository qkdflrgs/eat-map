import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import {
  AiOutlineClose,
  AiOutlineInfoCircle,
  AiOutlinePhone,
} from "react-icons/ai";
import { HiOutlineCheck, HiOutlineMapPin } from "react-icons/hi2";

interface StoreBoxProps {
  store: any;
  setStore: Dispatch<SetStateAction<any>>;
}

export default function StoreBox({ store, setStore }: StoreBoxProps) {
  return (
    <div className="fixed transition ease-in-out delay-150 inset-x-0 mx-auto bottom-20 rounded-lg shadow-lg max-w-sm md:max-w-xl z-10 w-full bg-white">
      {store && (
        <>
          <div className="p-8">
            <div className="flex justify-between items-start">
              <div className="flex gap-4 items-center">
                <Image
                  src={
                    store?.bizcnd_code_nm
                      ? `/images/markers/${store.bizcnd_code_nm}.png`
                      : "/images/markers/default.png"
                  }
                  alt="아이콘 이미지"
                  width={100}
                  height={100}
                />
                <div>
                  <div className="font-semibold">{store?.upso_nm}</div>
                  <div className="text-sm">{store?.cob_code_nm}</div>
                </div>
              </div>
              <button type="button" onClick={() => setStore(null)}>
                <AiOutlineClose />
              </button>
            </div>
            {store.rdn_code_nm && (
              <div className="mt-2 flex gap-2 items-center">
                <HiOutlineMapPin />
                {store?.rdn_code_nm}
              </div>
            )}
            {store.tel_no && (
              <div className="mt-2 flex gap-2 items-center">
                <AiOutlinePhone />
                {store.tel_no}
              </div>
            )}
            {store.crtfc_gbn_nm && (
              <div className="mt-2 flex gap-2 items-center">
                <AiOutlineInfoCircle />
                {store.crtfc_gbn_nm}
              </div>
            )}
            {store.bizcnd_code_nm && (
              <div className="mt-2 flex gap-2 items-center">
                <HiOutlineCheck />
                {store.bizcnd_code_nm}
              </div>
            )}
          </div>
          <button
            type="button"
            className="w-full bg-blue-700 hover:bg-blue-500 focus:bg-blue-500 py-3 text-white font-semibold rounded-b-lg"
            onClick={() => {
              // 상세보기 작업 중
            }}
          >
            상세보기
          </button>
        </>
      )}
    </div>
  );
}
