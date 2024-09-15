import ToolTip from "@/components/ToolTip";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  useGetetPostById,
} from "@/lib/react-query/queriesAndMutations";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { FilePenLine, Trash2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Models } from "appwrite";
import ContentWrapper from "@/components/wrapper/ContentWrapper";
import { H4, P } from "@/components/typography/typography";
import { useAuthctx } from "@/context/AuthCtx";
import LikePost from "@/components/post/LikePost";
import InfinitySpinLoader from "@/components/loaders/InfinitySpinLoader";
import { DeletePostAlert } from "@/components/DeletePostAlert";

const ViewPost = () => {
  const { postId } = useParams();
  const { user } = useAuthctx();
  // const { mutate: deletePost, isPending: isDelPen } = useDeletePost();
  const { data: postInfo, isPending } = useGetetPostById(postId!);
  const userInfo: Models.Document = postInfo?.userId;

  // useEffect(() => {
  //   logInfo(postInfo, "usestate");
  // }, [postInfo]);

  // const handleDelete = () => {
  //   deletePost({ postId: postInfo?.$id!, imageId: postInfo?.imageId! });
  // };

  if (isPending) {
    return (
      <div className="flex justify-center items-center mt-10">
        <InfinitySpinLoader />
      </div>
    );
  }

  return (
    <>
      <section className="flex flex-col justify-center items-center gap-3 w-full h-full mt-5">
        <ContentWrapper>
          <Card>
            <CardHeader className="flex flex-row justify-between items-center p-8">
              <Link to={`/profile/${userInfo?.$id}`} className="flex gap-4">
                <Avatar className="size-12 ring-1 ring-orange-500/50">
                  <AvatarImage src={userInfo?.imageUrl} alt="profile picture" />
                  <AvatarFallback>O</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1">
                  <CardTitle className="text-lg">{userInfo?.name}</CardTitle>
                  <CardDescription>@{userInfo?.username}</CardDescription>
                </div>
              </Link>
              <CardTitle className="text-lg">
                <span className="text-logo">Location: </span>
                {postInfo?.location}
              </CardTitle>
            </CardHeader>
          </Card>
        </ContentWrapper>
        <ContentWrapper>
          <Card>
            <section className=" flex justify-evenly items-center ">
              {userInfo?.$id === user?.id && (
                <ToolTip tip="Delete the post">
                  <DeletePostAlert postInfo={postInfo!}>
                    <Trash2 size={"30"} />
                  </DeletePostAlert>
                </ToolTip>
              )}
              {userInfo?.$id === user?.id && (
                <ToolTip tip="Edit the post">
                  <Link
                    to={`/edit-post/${postId}`}
                    className="text-muted-foreground transition-all hover:text-primary"
                  >
                    <FilePenLine size={"30"} />
                  </Link>
                </ToolTip>
              )}
              <LikePost postInfo={postInfo!} />
              {/* <SavePost postInfo={postInfo!} /> */}
            </section>
          </Card>
        </ContentWrapper>
        <ContentWrapper>
          <Card>
            <CardContent className="space-y-5 p-0">
              <div className="p-4 text-center">
                <H4>{postInfo?.title}</H4>
              </div>
              <div className="flex justify-center p-0">
                <img
                  src={postInfo?.imageURL}
                  alt="post image"
                  className="md:h-[33rem] rounded-md"
                />
              </div>
              <P className="flex flex-wrap p-4">{postInfo?.description}</P>
            </CardContent>
          </Card>
        </ContentWrapper>
      </section>
    </>
  );
};

export default ViewPost;
