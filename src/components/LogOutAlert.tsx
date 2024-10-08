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
import { useSignOutUser } from "@/lib/react-query/queriesAndMutations";
import { useNavigate } from "react-router-dom";
// import { useToast } from "./ui/use-toast";
import { AlertDialogTitle } from "@radix-ui/react-alert-dialog";
// import { logInfo } from "@/utils/log";

type LogoutProps = {
  children: ReactNode;
  className?: string;
};

export const LogoutAlert = ({ children, className }: LogoutProps) => {
  const { mutate: signOut, isSuccess, error } = useSignOutUser();
  const navigate = useNavigate();
  // const {toast}= useToast();

  useEffect(() => {

    // logInfo(error)
    if (isSuccess) {
      navigate(0);
    }
    else if (!isSuccess && error) {
      navigate("/auth/sign-in");
    }

    // toast({
    //   title: "You have logged out!",
    //   variant: "destructive",
    // });
    
  }, [error, isSuccess, navigate]);

  return (
    <AlertDialog>
      <AlertDialogTrigger className={`${className}`}>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent className="flex flex-col gap-5">
        <AlertDialogTitle className="text-red-700 text-center text-xl font-bold">Log-Out</AlertDialogTitle>
        <AlertDialogDescription className="text-center">
          Are you sure you want to log out?
        </AlertDialogDescription>
        <AlertDialogFooter className="mx-auto gap-4">
          <AlertDialogCancel> Cancel </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => signOut()}
            className="bg-red-600 hover:bg-red-800"
          >
            Logout
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
