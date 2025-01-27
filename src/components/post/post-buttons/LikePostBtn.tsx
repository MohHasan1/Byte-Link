import InfinitySpinLoader from "@/components/loaders/InfinitySpinLoader";
import ToolTip from "@/components/ToolTip";
import { P } from "@/components/typography/typography";
import { useAuthctx } from "@/context/AuthCtx";
import { useLikePost } from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";
import { HandHeart } from "lucide-react";
import { useState, useEffect } from "react";
import PostButtonWrapper from "./PostButtonWrapper";

const LikePostBtn = ({ postInfo }: { postInfo: Models.Document }) => {
  const { user } = useAuthctx();

  const { mutate: likePost, isPending } = useLikePost();
  const [userLikedId, setUserLikedId] = useState<string[]>([]);

  useEffect(() => {
    const userLikes: string[] =
      postInfo?.userLikedId?.map((user: Models.Document) => user?.$id) ?? [];
      
    setUserLikedId(userLikes);
  }, [postInfo]);

  if (!user) return  <InfinitySpinLoader size={50} />;

  const handleLikePost = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user || !postInfo) return;

    let updatedUserLikedId: string[];
    if (userLikedId?.includes(user?.id)) {
      updatedUserLikedId = userLikedId?.filter(
        (userId: string) => userId != user?.id
      );
      setUserLikedId(updatedUserLikedId);
    } else {
      updatedUserLikedId = [...userLikedId!, user?.id];
      setUserLikedId(updatedUserLikedId);
    }

    likePost({ postId: postInfo?.$id, likesArray: updatedUserLikedId! });
  };

  return (
    <PostButtonWrapper
      liked={userLikedId.includes(user?.id)}
      onClick={handleLikePost}
    >
      <ToolTip tip="Show some love to the post">
        <div className="flex gap-3">
          {isPending && <InfinitySpinLoader size={50} />}
          {!isPending && (
            <>
              <HandHeart size={"30"} />
              <P className="text-lg">{userLikedId?.length ?? 0}</P>
            </>
          )}
        </div>
      </ToolTip>
    </PostButtonWrapper>
  );
};

export default LikePostBtn;
