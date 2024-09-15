import { AppwriteException } from "appwrite";
import { logCustomError } from "./log";

export const throwError = (error: any, showLog: boolean = true) => {
  // cutom appwrite error:
  if (error instanceof AppwriteException) {
    const AppwriteError = error as AppwriteException;
    if (showLog) {
      logCustomError(AppwriteError);
    }
    return AppwriteError;
  }

  if (showLog) {
    logCustomError(error);
  }
  return error;
};

/*
cutom appwrite error thrower.
*/
