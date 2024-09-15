//use react-toastify
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { ReactNode, useEffect } from "react";
import { useDeletePost } from "@/lib/react-query/queriesAndMutations";
import { useNavigate } from "react-router-dom";
import { AlertDialogTitle } from "@radix-ui/react-alert-dialog";
import InfinitySpinLoader from "./loaders/InfinitySpinLoader";
import { Models } from "appwrite";

type Props = {
  children: ReactNode;
  postInfo: Models.Document;
  className?: string;
};

export const DeletePostAlert = ({ children, className, postInfo }: Props) => {
  const {
    mutate: deletePost,
    isPending: isDelPen,
    isSuccess,
  } = useDeletePost();
  const navigate = useNavigate();
  //   const { toast } = useToast();

  const handleDelete = () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
    deletePost({ postId: postInfo?.$id!, imageId: postInfo?.imageId! });
  };

  useEffect(() => {
    if (isSuccess) {
      //   toast({
      //     title: "Your post has been deleted",
      //     variant: "destructive",
      //   });
      navigate(0);
    }

    // toast({
    //   title: "Error deleting your post.",
    //   variant: "destructive",
    // });
  }, [isSuccess, navigate]);

  if (isDelPen) {
    return (
      <div className="flex justify-center items-center mt-10">
        <InfinitySpinLoader />
      </div>
    );
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger className={`${className}`}>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent className="flex flex-col gap-5">
        <AlertDialogTitle className="text-red-700 text-center text-xl font-bold">
          Delete Post
        </AlertDialogTitle>
        <AlertDialogDescription className="text-center">
          Are you sure you want to delete this post?
        </AlertDialogDescription>
        <AlertDialogFooter className="mx-auto gap-4">
          <AlertDialogCancel> No </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-800"
          >
            Yes
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
