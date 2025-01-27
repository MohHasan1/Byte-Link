import FormTextArea from "@/components/form/FormTextArea";
import {
  CPostValidationProps,
  CreatePostValidation,
} from "@/lib/zod/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import FormFileUpload from "@/components/form/FormFileUpload";
import FormInputField from "@/components/form/FormInputField";
import { Button } from "@/components/ui/button";
import {
  useCreatePost,
  useUpdatePost,
} from "@/lib/react-query/queriesAndMutations";
import { useAuthctx } from "@/context/AuthCtx";
import { useNavigate } from "react-router-dom";
import { Models } from "appwrite";
import { handleAsyncOperation } from "@/utils/handleOperations";
import InfinitySpinLoader from "@/components/loaders/InfinitySpinLoader";

const PostForm = ({
  post,
  action = "create",
}: {
  post?: Models.Document | undefined;
  action?: "create" | "update";
}) => {
  // 1. Define your form.
  const form = useForm<CPostValidationProps>({
    resolver: zodResolver(CreatePostValidation),
    defaultValues: {
      title: post ? post.title : "",
      desc: post ? post.description : "",
      file: [],
      location: post ? post?.location : "",
      tags: post ? post?.tags.join(",") : "",
    },
  });

  const { mutateAsync: createPost, isPending } = useCreatePost();
  const { mutateAsync: updatePost, isPending: isUpdatePending } =
    useUpdatePost();
  const { user } = useAuthctx();
  const navigate = useNavigate();

  // 2. Define a submit handler.
  async function onSubmit(postInfo: CPostValidationProps) {
    if (!user) return;

    if (post && action == "update") {
      await handleAsyncOperation(() =>
        updatePost({
          ...postInfo,
          postId: post.$id,
          imageId: post.imageId,
          imageUrl: post.imageURL,
        })
      );
      return navigate(`/posts/${post.$id}`);
    }

    await handleAsyncOperation(() =>
      createPost({
        ...postInfo,
        userId: user?.id,
      })
    );

    // if (!newPost) {
    //   return toast({
    //     title: "please try again!",
    //     variant: "destructive",
    //   });
    // }

    return navigate("/");
  }

  if (isPending) {
    return (
      <div className="flex justify-center items-center mt-10">
        <InfinitySpinLoader />
      </div>
    );
  }

  return (
    <>
      {!isPending && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col w-full max-w-5xl gap-3"
          >
            <FormInputField
              form={form}
              label="Title"
              name="title"
              placeholder="Add a post title."
            />
            <FormTextArea
              form={form}
              label="Description"
              name="desc"
              placeholder="Add a description for your post."
            />
            <FormFileUpload
              form={form}
              label="Photos"
              name="file"
              imageUrl={post?.imageURL}
            />
            <FormInputField
              form={form}
              name="location"
              label="Loacation"
              placeholder="eg: Dhaka, Bangladesh"
            />
            <FormInputField
              form={form}
              label="Tags"
              name="tags"
              placeholder="eg: Software, React, Node"
              description="Tags are seperated by commas."
            />

            <div className="flex justify-end items-center gap-4 mt-4">
              {action === "create" ? (
                <Button variant={"secondary"}>Upload Post</Button>
              ) : (
                <>
                  <Button disabled={isUpdatePending} variant={"secondary"}>
                    Update Post
                  </Button>
                  <Button
                    disabled={isUpdatePending}
                    variant={"destructive"}
                    onClick={() => navigate(-1)}
                  >
                    Go Back
                  </Button>
                </>
              )}
            </div>
          </form>
        </Form>
      )}
    </>
  );
};

export default PostForm;
