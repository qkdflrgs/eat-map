import { StoreType } from "@/interface";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { toast } from "react-toastify";

interface LikeProps {
  storeId: number;
}

export default function Like({ storeId }: LikeProps) {
  const { data: session, status } = useSession();

  const fetchStore = async () => {
    const { data } = await axios(`/api/stores?id=${storeId}`);

    return data as StoreType;
  };

  const { data: store, refetch } = useQuery({
    queryKey: [`like-store-${storeId}`],
    queryFn: fetchStore,
    enabled: !!storeId,
    refetchOnWindowFocus: false,
  });

  const toggleLike = async () => {
    if (session?.user && store) {
      try {
        const like = await axios.post("/api/likes", {
          storeId: store.id,
        });
        if (like.status === 201) {
          toast.success("찜 목록에 추가했습니다");
        } else {
          toast.warn("찜을 취소했습니다");
        }
        refetch();
      } catch (e) {
        console.log(e);
      }
    } else if (status === "unauthenticated") {
      toast.warn("로그인 후 이용해주세요");
    }
  };

  return (
    <button type="button" onClick={toggleLike}>
      {status === "authenticated" && store?.likes?.length ? (
        <AiFillHeart className="hover:text-red-600 focus:text-red-600 text-red-500" />
      ) : (
        <AiOutlineHeart className="hover:text-red-600 focus:text-red-600 text-red-500" />
      )}
    </button>
  );
}
