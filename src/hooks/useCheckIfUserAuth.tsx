import { useCheckIfUserLoggedIn } from "@/lib/react-query/queriesAndMutations";

const useCheckIfUserAuth = () => {
  const { data, isError } = useCheckIfUserLoggedIn();

  if (isError || !data) {
    return false;
  }

  return true;
};

export default useCheckIfUserAuth;
