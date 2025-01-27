/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppwriteException } from "appwrite";
import { logCustomError } from "./log";

export const throwError = (error: any, showLog: boolean = true) => {
  // custom appwrite error:
  if (error instanceof AppwriteException) {
    const AppwriteError = error as AppwriteException;
    if (showLog) {
      logCustomError(AppwriteError);
    }
    return AppwriteError;
  }

  // normal error
  if (showLog) {
    logCustomError(error);
  }
  return error;
};

/*
  Custom appwrite error thrower.
*/
