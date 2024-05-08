import { useSession } from "next-auth/react";
import CommentForm from "./CommentForm";
import axios from "axios";

import { CommentApiResponse } from "@/interface";
import { useQuery } from "@tanstack/react-query";
import CommentsList from "./CommentsList";
import Pagination from "../Pagination";

interface CommentsProps {
  storeId: number;
  params?: {
    page?: string;
  };
}

export default function Comments({ storeId, params }: CommentsProps) {
  const { status } = useSession();
  const page = params?.page || "1";

  const fetchComments = async () => {
    const { data } = await axios(
      `/api/comments?storeId=${storeId}&limit=10&page=${page}`
    );

    return data as CommentApiResponse;
  };

  const { data: comments, refetch } = useQuery({
    queryKey: [`comments-${storeId}-${page}`],
    queryFn: fetchComments,
  });

  return (
    <div className="md:max-w-2xl py-8 px-2 mb-20 mx-auto">
      {status === "authenticated" && (
        <CommentForm storeId={storeId} refetch={refetch} />
      )}
      <CommentsList comments={comments} refetch={refetch} />
      <Pagination
        total={comments?.totalPage}
        page={page}
        pathname={`/stores/${storeId}`}
      />
    </div>
  );
}
