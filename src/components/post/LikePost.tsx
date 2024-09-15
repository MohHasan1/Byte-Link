import { HandHeart } from "lucide-react";
import ToolTip from "../ToolTip";
import { P } from "../typography/typography";
import PostButton from "./PostButton";
import { useEffect, useState } from "react";
import { useAuthctx } from "@/context/AuthCtx";
import { Models } from "appwrite";
import { useLikePost } from "@/lib/react-query/queriesAndMutations";
import InfinitySpinLoader from "../loaders/InfinitySpinLoader";

const LikePost = ({ postInfo }: { postInfo: Models.Document }) => {
  const { user } = useAuthctx();
  const { mutate: likePost, isPending } = useLikePost();
  const [userLikedId, setUserLikedId] = useState<string[]>([]);


  const userLikes: string[] =
    postInfo?.userLikedId?.map((user: Models.Document) => user?.$id) ?? [];

  useEffect(() => {
    setUserLikedId(userLikes);
  }, [postInfo]);

  const handleLikePost = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user || !postInfo) return;

    let updatedUserLikedId: string[];
    if (userLikedId?.includes(user?.id!)) {
      updatedUserLikedId = userLikedId?.filter(
        (userId: string) => userId != user?.id
      );
      setUserLikedId(updatedUserLikedId);
    } else {
      updatedUserLikedId = [...userLikedId!, user?.id!];
      setUserLikedId(updatedUserLikedId);
    }

    likePost({ postId: postInfo?.$id!, likesArray: updatedUserLikedId! });
  };
  return (
    <PostButton
      liked={userLikedId.includes(user?.id!)}
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
    </PostButton>
  );
};

export default LikePost;
