import { H3 } from "@/components/typography/typography";
import { ImagePlus } from "lucide-react";
import CPostForm from "./components/PostForm";

const CreatePost = () => {
  return (
    <>
      <section className="flex  flex-col flex-1 px-5">
        <div className="flex justify-center items-center gap-2 py-7">
          <ImagePlus className="size-8" />
          <H3>Create Post</H3>
        </div>

        <div className="flex justify-center items-center">
          <CPostForm />
        </div>
      </section>
    </>
  );
};

export default CreatePost;
