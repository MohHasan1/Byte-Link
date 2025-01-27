// This component renders post(s) in Home page //

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { H4, P } from "@/components/typography/typography";
import { useNavigate } from "react-router-dom";

import { Models } from "appwrite";

import AuthWrapper from "../wrapper/AuthWrapper";
import OtherPostUserInfo from "./OtherPostUserInfo";
import PostFooter from "./post-footer/PostFooter";
import EditPostBtn from "./post-buttons/EditPostBtn";
// import PostFooter from "./PostFooter";

const Post = ({ post }: PostProps) => {
  const navigate = useNavigate();

  const {
    $id: postId,
    title,
    description: dec,
    location,
    imageURL: imgUrl,
  } = post;

  const USER_ID = post?.userId;
  const { $id: userId, name, username, imageUrl: userimg } = USER_ID;

  return (
    <Card className="w-full p-0 md:w-[85%] space-y-4 border-none">
      <CardHeader className="flex flex-row justify-between items-center p-8 border-b">
        {/* Post's user info */}
        <OtherPostUserInfo
          name={name}
          username={username}
          location={location}
          userimg={userimg}
        />
        {/* Edit post btn */}
        <AuthWrapper>
          <EditPostBtn userId={userId} postId={postId} />
        </AuthWrapper>
      </CardHeader>

      <CardContent className="space-y-2 p-0 pb-2">
        <div className="p-4 space-y-3 pointer-events-none">
          <H4 className="text-blue-300 text-base w-fit py-1 px-3 rounded-xl backdrop-blur-3xl bg-black/20 shadow-2xl">
            {title}
          </H4>
          <P className="flex flex- font-qsand px-3">{dec}</P>
        </div>
        <div
          className="flex justify-center p-0 cursor-pointer"
          onClick={() => navigate(`/posts/${postId}`)}
        >
          <img
            src={imgUrl}
            alt="post image"
            className="md:h-[33rem] rounded-md object-contain"
          />
        </div>
      </CardContent>

      <PostFooter postInfo={post!} />
    </Card>
  );
};

export default Post;

type PostProps = {
  post: Models.Document;
};
