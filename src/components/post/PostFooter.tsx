import LikePost from "@/components/post/LikePost";
import { CardFooter } from "@/components/ui/card";
import { Models } from "appwrite";
import { FC } from "react";

const PostFooter: FC<PostFooterProps> = ({postInfo}) => {

  return (
    <>
      <CardFooter className="flex justify-end gap-4 pt-5">
        <LikePost postInfo={postInfo}/>
        {/* <SavePost postInfo={postInfo} /> */}
      </CardFooter>
    </>
  );
};

export default PostFooter;

type PostFooterProps = {
  postInfo: Models.Document;
};
