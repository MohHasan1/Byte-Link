/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppwriteException } from "appwrite";
import { logCustomError } from "./log";

export const handleAsyncOperation: HandleAsyncOperationProps = async (
  operationFn
) => {
  try {
    return await operationFn();
  } catch (error) {
    logCustomError(error);
    return false;
  }
};

export const handleAsyncAppwrite: HandleAsyncAppwrite = async (operationFn) => {
  try {
    return await operationFn();
  } catch (error) {
    logCustomError(error);

    const appwriteError = error as AppwriteException;
    return appwriteError.type;
  }
};

type operationFnProps = (...arg: any) => Promise<any>;
type HandleAsyncOperationProps = (
  operationFn: operationFnProps
) => Promise<any> | false;
type HandleAsyncAppwrite = (
  operationFn: operationFnProps
) => Promise<any> | string;

/*
This function take a callnack function and handle exceptions.
returns : promise or false (if error)


Why create this funnction?
This is to handle exception at the last stage like in jsx component. 
To avoid using try catch and also return a boolean so we can display smt in jsx or do smt if false is return.
like, a toast or delete (cleanup)
*/
