/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
import { getCurrentUser } from "@/service/appwrite/api";
import { CurrentUserProps } from "@/types/userType";
import { Models } from "appwrite";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

const AuthCtx = createContext<AuthCtxProps | undefined>(undefined);

export const useAuthctx = () => {
  const ctx = useContext(AuthCtx);
  if (!ctx) {
    throw new Error("useAuthctx must be used within AuthCtxProvider");
  }
  return ctx;
};

const AuthCtxProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<CurrentUserProps | undefined>(undefined);
  const [loggedInUser, setLoggedInUser] = useState<Models.Document | undefined>(
    undefined
  );
  const [isAuth, setIsAuth] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (
      localStorage.getItem("cookieFallback") === "[]" ||
      localStorage.getItem("cookieFallback") === null
    ) {
      setUser(undefined);
      setLoggedInUser(undefined);
      setIsAuth(false);
    } else {
      if (!user) {
        checkAuthUser();
      }
    }
  }, [navigate]);

  const checkAuthUser = async () => {
    try {
      const currentAccount = await getCurrentUser();

      if (currentAccount) {
        setUser({
          id: currentAccount.$id,
          name: currentAccount.name,
          email: currentAccount.email,
          username: currentAccount.username,
          imageUrl: currentAccount.imageUrl,
          bio: currentAccount.bio,
        });
        setIsAuth(true);
        setLoggedInUser(currentAccount);
        return true;
      } else {
        handleLogout();
        return false;
      }
    } catch (error) {
      handleLogout();
      return false;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("cookieFallback");
    setIsAuth(false);
    navigate("/auth/sign-in");
  };

  const ctxValue = {
    user,
    setUser,
    loggedInUser,
    isAuth,
    setIsAuth,
    checkAuthUser,
  };

  return <AuthCtx.Provider value={ctxValue}>{children}</AuthCtx.Provider>;
};

export default AuthCtxProvider;

type AuthCtxProps = {
  user: CurrentUserProps | undefined;
  setUser: React.Dispatch<React.SetStateAction<CurrentUserProps | undefined>>;
  loggedInUser: Models.Document | undefined;
  isAuth: boolean;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
};

// useEffect(() => {
//   if (
//     localStorage.getItem("cookieFallback") === "[]" ||
//     localStorage.getItem("cookieFallback") === null
//   ) {
//     // navigate("/auth/sign-in");
//     // localStorage.removeItem("cookieFallback");
//   } else {
//     if (!user) {
//       checkAuthUser();
//     }
//   }
// }, [navigate]);
