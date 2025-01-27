import { CardFooter } from "@/components/ui/card";
import { Models } from "appwrite";
import { FC } from "react";
import AuthWrapper from "../../wrapper/AuthWrapper";

import LikePostBtn from "../post-buttons/LikePostBtn";
// import SavePostBtn from "../post-buttons/SavePostBtn";

const PostFooter: FC<PostFooterProps> = ({ postInfo }) => {
  return (
    <>
      <AuthWrapper>
        <CardFooter className="flex justify-end gap-4 pt-5">
          <LikePostBtn postInfo={postInfo} />
          {/* <SavePostBtn postInfo={postInfo} /> */}
        </CardFooter>
      </AuthWrapper>
    </>
  );
};

export default PostFooter;

type PostFooterProps = {
  postInfo: Models.Document;
};
