/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeletePostAlert } from "@/components/DeletePostAlert";
import LikePostBtn from "@/components/post/post-buttons/LikePostBtn";
import { Models } from "appwrite";
import ToolTip from "@/components/ToolTip";
import { Card } from "@/components/ui/card";
import ContentWrapper from "@/components/wrapper/ContentWrapper";
import { useAuthctx } from "@/context/AuthCtx";
import { Trash2, FilePenLine } from "lucide-react";
import { FC } from "react";
import { Link } from "react-router-dom";

const PostActions: FC<Props> = ({ postInfo }) => {
  const { user } = useAuthctx();
  const userInfo: Models.Document = postInfo?.userId;

  return (
    <ContentWrapper>
      <Card>
        <section className=" flex justify-evenly items-center">
          {/* Delete */}
          {userInfo?.$id === user?.id && (
            <ToolTip tip="Delete the post">
              <DeletePostAlert postInfo={postInfo!}>
                <Trash2 size={"30"} />
              </DeletePostAlert>
            </ToolTip>
          )}

          {/* Edit  */}
          {userInfo?.$id === user?.id && (
            <ToolTip tip="Edit the post">
              <Link
                to={`/edit-post/${postInfo.$id}`}
                className="text-muted-foreground transition-all hover:text-primary"
              >
                <FilePenLine size={"30"} />
              </Link>
            </ToolTip>
          )}

          {/* Love */}
          <LikePostBtn postInfo={postInfo!} />
          {/* <SavePostBtn postInfo={postInfo!} /> */}
        </section>
      </Card>
    </ContentWrapper>
  );
};

export default PostActions;

type Props = {
  postInfo: Models.Document;
};
