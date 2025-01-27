// You have to be authenticated (logged in) to access the children //

import { useCheckIfUserLoggedIn } from "@/lib/react-query/queriesAndMutations";
import { FC, ReactNode } from "react";
import LoadingSpinner from "../loaders/LoadingSpinner";

const AuthWrapper: FC<Props> = ({ children }) => {
  const { data, isLoading, isError } = useCheckIfUserLoggedIn();

  if (isLoading) {
    // Show a loading state while the query is in progress
    return (
      <div className="flex justify-center items-center w-full">
        <LoadingSpinner isFetching={isLoading} />
      </div>
    );
  }

  if (isError || !data) {
    return undefined;
  }

  // If the user is logged in, render the children
  return <>{children}</>;
};

type Props = {
  children: ReactNode;
};

export default AuthWrapper;
