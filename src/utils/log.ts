/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppwriteException } from "appwrite";

export function logError(...errors: any[]) {
  console.error("DEBUG-ERROR: ", ...errors);
}

export function logInfo(...info: any[]) {
  console.info("DEBUG-INFO: ", ...info);
}

export function logCustomError(
  error: AppwriteException | Error | any,
  showStack: boolean = false
) {
  if (error instanceof AppwriteException) {
    return console.error(
      `${error.name}: \n\n code: ${error.code} \n\n message: ${
        error.message
      } \n\n type: ${error.type} \n\n response: ${error.response} \n\n stack: ${
        showStack ? error.stack : ""
      } `
    );
  }
  return console.error(
    `${error.name}: \n\n  message: ${error.message} \n\n  stack: 
    ${showStack ? error.stack : ""} `
  );
}

/*
Instead of using console.log everywhere during dev, using this function makes it easier to debug, 
as in prod, we can simply remove the log in one place.
we can also connect a log system here later, easy to manage!
*/
