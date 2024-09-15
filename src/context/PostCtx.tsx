import { useGetRecentPosts } from "@/lib/react-query/queriesAndMutations";
import { createContext, ReactNode, useContext, useState } from "react";

const LikePostCtxProvider = ({ children }: { children: ReactNode }) => {
  const [allPosts, setAllposts] = useState<any>();
  const [likedPost, setLikedPost] = useState<string[]>([]);
  const [saveddPost, setSaveddPost] = useState<any>();

  const {} = useGetRecentPosts();
  
  const ctxValue = {
    likedPost,
    setLikedPost,
    saveddPost,
    setSaveddPost,
    allPosts,
    setAllposts,
  };
  return <PostCtx.Provider value={ctxValue}>{children}</PostCtx.Provider>;
};

export default LikePostCtxProvider;


const PostCtx = createContext<any | undefined>(undefined);

export const usePostCtx = () => {
  const ctx = useContext(PostCtx);
  if (!ctx) {
    throw new Error("useAuthctx must be used with in AuthCtxProvider");
  }
  return ctx;
};