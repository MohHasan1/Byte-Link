import { H1 } from "@/components/typography/typography";
import Post from "../../../components/post/Post";
import { useGetPaginationPosts } from "@/lib/react-query/queriesAndMutations";
import InfinitySpinLoader from "@/components/loaders/InfinitySpinLoader";
import { Badge } from "@/components/ui/badge";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  // const { data: latestPosts, isPending } = useGetRecentPosts();
  const {
    data: latestPosts,
    fetchNextPage,
    hasNextPage,
  } = useGetPaginationPosts();
  const totalPosts = latestPosts?.pages.length;
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [fetchNextPage, inView]);

  if (!latestPosts) {
    return (
      <div className="flex justify-center items-center mt-10">
        <InfinitySpinLoader />
      </div>
    );
  }

  return (
    <>
      <Link to={"/"}>
        <H1 className="shadow-lg backdrop-blur-3xl text-center py-6 bg-gradient-to-r from-blue-950/30 via-blue-800/30 to-blue-950/30 text-blue-400 hidden xl:block font-qsand font-semibold uppercase border-b">
          Byte-Link
        </H1>
      </Link>

      <section className="flex flex-col flex-1 h-full ">
        {/* no posts */}
        {totalPosts === 0 && (
          <Badge
            variant={"secondary"}
            className="text-blue-400 text-md cursor-default mt-4"
          >
            Sorry, currently no posts available.
          </Badge>
        )}

        <div className="w-full flex flex-col justify-center items-center gap-5 xl:gap-9 p-1 xl:p-4">
          {latestPosts?.pages.map((page) =>
            page.documents.map((post) => <Post key={post.$id} post={post} />)
          )}
        </div>

        {hasNextPage && (
          <div
            ref={ref}
            className="w-full flex flex-col justify-center items-center gap-5 xl:gap-9 p-1 xl:p-4"
          >
            <InfinitySpinLoader />
          </div>
        )}

        {!hasNextPage && (
          <div className="w-full flex justify-center items-center">
            <Badge
              variant={"secondary"}
              className="text-blue-400 text-md cursor-default mt-4"
            >
              End of Posts
            </Badge>
          </div>
        )}
      </section>
    </>
  );
};

export default Home;
