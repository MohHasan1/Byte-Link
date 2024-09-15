import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { H4, P } from "@/components/typography/typography";
import { FilePenLine } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthctx } from "@/context/AuthCtx";

import PostFooter from "./PostFooter";
import { Models } from "appwrite";
import ToolTip from "@/components/ToolTip";

const Post = ({ post }: PostProps) => {


  const { user } = useAuthctx();
  const navigate = useNavigate();

  const {
    $id: postId,
    title,
    description: dec,
    location,
    imageURL: imgurl,
  } = post;

  const USER_ID = post?.userId;
  const { $id: userId, name, username, imageUrl: userimg } = USER_ID;

  return (
    <Card className="w-full p-0 md:w-[85%] space-y-4 border-none">
      <CardHeader className="flex flex-row justify-between items-center p-8">
        <Link to={``} className="flex gap-4">
          <Avatar className="size-12 ring-1 ring-orange-500/50">
            <AvatarImage src={userimg} alt="profile picture" />
            <AvatarFallback>O</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <CardTitle className="text-lg">{name}</CardTitle>
            <CardDescription>
              @{username}, {location}
            </CardDescription>
          </div>
        </Link>

        {userId === user?.id && (
          <ToolTip tip="Edit the post">
            <Link
              to={`edit-post/${postId}`}
              className="text-muted-foreground transition-all hover:text-primary"
            >
              <FilePenLine />
            </Link>
          </ToolTip>
        )}
      </CardHeader>

      <CardContent
        className="space-y-5 p-0 cursor-pointer"
        onClick={() => navigate(`/posts/${postId}`)}
      >
        <div className="p-4 space-y-6">
          <H4>{title}</H4>
          <P className="flex flex-wrap">{dec}</P>
        </div>
        <div className="flex justify-center p-0">
          <img
            src={imgurl}
            alt="post image"
            className="md:h-[33rem] rounded-md"
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
