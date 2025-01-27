import React, { type FC, useEffect, useState } from "react";
import PostButton from "./PostButtonWrapper";
import { useAuthctx } from "@/context/AuthCtx";
import {
  useSavePost,
  useDeleteSavedPost,
} from "@/lib/react-query/queriesAndMutations";
import { FileHeart } from "lucide-react";
import ToolTip from "../../ToolTip";
import InfinitySpinLoader from "../../loaders/InfinitySpinLoader";
import { Models } from "appwrite";

const SavePostBtn: FC<SavePostProps> = ({ postInfo }) => {
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
  }, [postInfo, savedUser]);

  if (!user) return <InfinitySpinLoader size={50} />;

  const handleSavePost = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!savedUser) return;

    if (isSaved) {
      setIsSaved(false);
      deleteSavedPost({ postId: savedUser?.$id });
    } else {
      setIsSaved(true);
      savePost({ postId: postInfo?.$id, userId: user?.id })!;
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

export default SavePostBtn;

type SavePostProps = {
  postInfo: Models.Document;
};
