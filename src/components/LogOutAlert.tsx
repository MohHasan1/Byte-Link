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
import { toast } from "sonner";
// import { logInfo } from "@/utils/log";

type LogoutProps = {
  children: ReactNode;
  className?: string;
};

export const LogoutAlert = ({ children, className }: LogoutProps) => {
  const { mutate: signOut, isSuccess, isError } = useSignOutUser();
  const navigate = useNavigate();

  useEffect(() => {
    // logInfo(error)
    if (isSuccess) {
      toast.info("You've logged you.");
      navigate(0);
    } else if (isError) {
      navigate("/auth/sign-in");
    }
  }, [isError, isSuccess, navigate]);

  return (
    <AlertDialog>
      <AlertDialogTrigger className={`${className}`}>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent className="flex flex-col gap-3 font-qsand">
        <AlertDialogTitle className="text-red-500 text-center text-xl font-bold">
          Log-Out
        </AlertDialogTitle>
        <AlertDialogDescription className="text-center text-sky-300">
          Are you sure you want to log out?
        </AlertDialogDescription>
        <AlertDialogFooter className="mx-auto gap-4">
          <AlertDialogCancel> Cancel </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => signOut()}
            className="bg-red-700 hover:bg-red-800"
          >
            <span className="text-white">Logout</span>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
