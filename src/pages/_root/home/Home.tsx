import { H1 } from "@/components/typography/typography";
import Post from "../../../components/post/Post";
import { useGetRecentPosts } from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";
import InfinitySpinLoader from "@/components/loaders/InfinitySpinLoader";
import { logInfo } from "@/utils/log";
import { Badge } from "@/components/ui/badge";

const Home = () => {
  const { data: latestPosts, isPending } = useGetRecentPosts();
  const totalPosts = latestPosts?.total;

  if (isPending) {
    return (
      <div className="flex justify-center items-center mt-10">
        <InfinitySpinLoader />
      </div>
    );
  }
  logInfo(latestPosts?.total);
  return (
    <>
      <H1 className="text-center pt-6 text-blue-400 hidden xl:block font-poppins font-semibold">
        Byte-Link
      </H1>

      <section className="flex flex-1 h-full">
        <div className="w-full flex flex-col justify-center items-center gap-5 xl:gap-9 p-1 xl:p-4">
          {latestPosts?.documents.map((post: Models.Document) => (
            <Post key={post.$id} post={post} />
          ))}

          {totalPosts === 0 && (
            <Badge
              variant={"secondary"}
              className="text-blue-400 text-md cursor-default mt-4"
            >
              Sorry, currently no posts available.
            </Badge>
          )}
        </div>
      </section>
    </>
  );
};

export default Home;
