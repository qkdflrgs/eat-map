import { StoreType } from "@/interface";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import {
  AiOutlineClose,
  AiOutlineInfoCircle,
  AiOutlinePhone,
} from "react-icons/ai";
import { HiOutlineCheck, HiOutlineMapPin } from "react-icons/hi2";

interface StoreBoxProps {
  store: StoreType;
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
                    store?.category
                      ? `/images/markers/${store.category}.png`
                      : "/images/markers/default.png"
                  }
                  alt="아이콘 이미지"
                  width={100}
                  height={100}
                />
                <div>
                  <div className="font-semibold">{store?.name}</div>
                  <div className="text-sm">{store?.storeType}</div>
                </div>
              </div>
              <button type="button" onClick={() => setStore(null)}>
                <AiOutlineClose />
              </button>
            </div>
            {store.address && (
              <div className="mt-2 flex gap-2 items-center">
                <HiOutlineMapPin />
                {store?.address}
              </div>
            )}
            {store.phone && (
              <div className="mt-2 flex gap-2 items-center">
                <AiOutlinePhone />
                {store.phone}
              </div>
            )}
            {store.foodCertifyName && (
              <div className="mt-2 flex gap-2 items-center">
                <AiOutlineInfoCircle />
                {store.foodCertifyName}
              </div>
            )}
            {store.category && (
              <div className="mt-2 flex gap-2 items-center">
                <HiOutlineCheck />
                {store.category}
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
