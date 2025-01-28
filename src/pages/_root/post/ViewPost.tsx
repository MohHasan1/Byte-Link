// Post page that renders info about a single post //

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetPostById } from "@/lib/react-query/queriesAndMutations";
import { useParams } from "react-router-dom";
import { Models } from "appwrite";
import ContentWrapper from "@/components/wrapper/ContentWrapper";
import { H4, P } from "@/components/typography/typography";
import InfinitySpinLoader from "@/components/loaders/InfinitySpinLoader";
import PostActions from "./components/PostActions";
import AuthWrapper from "@/components/wrapper/AuthWrapper";
import OtherPostUserInfo from "@/components/post/OtherPostUserInfo";

const ViewPost = () => {
  const { postId } = useParams();

  const { data: postInfo, isPending } = useGetPostById(postId!);
  const userInfo: Models.Document = postInfo?.userId;

  // const { mutate: deletePost, isPending: isDelPen } = useDeletePost();
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
              <OtherPostUserInfo
                name={userInfo?.name}
                username={userInfo?.username}
                location={""}
                userimg={userInfo?.imageUrl}
              />

              <CardTitle className="text-lg cursor-default">
                <span className="text-logo">Location: </span>
                {postInfo?.location}
              </CardTitle>
            </CardHeader>
          </Card>
        </ContentWrapper>

        {/* post action */}
        <AuthWrapper>
          <PostActions postInfo={postInfo!} />
        </AuthWrapper>
        {/* post action */}

        <ContentWrapper>
          <Card>
            <CardContent className="space-y-5 p-0">
              <div className="p-3 text-center backdrop-blur-lg bg-black/20 rounded-t-xl">
                <H4>{postInfo?.title}</H4>
              </div>
              <div className="flex justify-center p-0">
                <img
                  src={postInfo?.imageURL}
                  alt="post image"
                  className="md:h-[33rem] rounded-md"
                  loading="lazy" 
                />
              </div>
              <P className="flex flex-wrap p-4 font-qsand backdrop-blur-lg bg-black/20 rounded-b-xl">{postInfo?.description}</P>
            </CardContent>
          </Card>
        </ContentWrapper>
      </section>
    </>
  );
};

export default ViewPost;
