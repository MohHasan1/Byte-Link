import { useGetPostById } from "@/lib/react-query/queriesAndMutations";
import { useParams } from "react-router-dom";

import { H3 } from "@/components/typography/typography";
import { Images } from "lucide-react";
import CPostForm from "./components/PostForm";
import InfinitySpinLoader from "@/components/loaders/InfinitySpinLoader";
import AuthWrapper from "@/components/wrapper/AuthWrapper";

const EditPost = () => {
  const { postId } = useParams();
  const { data, isPending } = useGetPostById(postId || "");

  if (isPending) {
    return (
      <div className="flex justify-center items-center mt-10">
        <InfinitySpinLoader />
      </div>
    );
  }
  return (
    <>
      <AuthWrapper>
        <section className="flex  flex-col flex-1 px-5">
          <div className="flex justify-center items-center gap-2 py-7">
            <Images className="size-8" />
            <H3>Update Post</H3>
          </div>

          <div className="flex justify-center items-center">
            <CPostForm post={data} action="update" />
          </div>
        </section>
      </AuthWrapper>
    </>
  );
};

export default EditPost;
