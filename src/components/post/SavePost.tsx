import React, { type FC, useEffect, useState } from "react";
import PostButton from "./PostButton";
import { useAuthctx } from "@/context/AuthCtx";
import {
  useSavePost,
  useDeleteSavedPost,
} from "@/lib/react-query/queriesAndMutations";
import { FileHeart } from "lucide-react";
import ToolTip from "../ToolTip";
import InfinitySpinLoader from "../loaders/InfinitySpinLoader";
import { Models } from "appwrite";


const SavePost: FC<SavePostProps> = ({ postInfo }) => {
  const { user } = useAuthctx();
  const { mutate: savePost, isPending: savePen } = useSavePost();
  const { mutate: deleteSavedPost, isPending: delPen } = useDeleteSavedPost();
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const savedUser: Models.Document | undefined =
    postInfo?.savedUserId?.find(
      (doc: Models.Document) => doc?.usersavedId.$id == user?.id
    ) || undefined;

  useEffect(() => {
    if (savedUser) {
      setIsSaved(true);
    }
  }, [postInfo]);

  const handleSavePost = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isSaved) {
      setIsSaved(false);
      deleteSavedPost({ postId: savedUser?.$id! });
    } else {
      setIsSaved(true);
      savePost({ postId: postInfo?.$id, userId: user?.id! })!;
    }
  };


  return (
    <PostButton saved={isSaved} onClick={handleSavePost}>
      <ToolTip tip="Save to Library">
        {savePen && <InfinitySpinLoader size={50} />}
        {delPen && <InfinitySpinLoader size={50} />}
        {!savePen && !delPen && (
          <>
            <FileHeart size={"30"} aria-label="Tooltip text" />
          </>
        )}
      </ToolTip>
    </PostButton>
  );
};

export default SavePost;

type SavePostProps = {
  postInfo: Models.Document;
};
