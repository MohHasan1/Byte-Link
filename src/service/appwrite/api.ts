/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  account,
  avatars,
  db,
  DB_ID,
  POST_COL_ID,
  SAVE_COL_ID,
  storage,
  STORAGE_ID,
  USER_COL_ID,
} from "./config";
import { ID, Query } from "appwrite";
import {
  SignInValidationProps,
  SignUpValidationProps,
} from "@/lib/zod/validation";
import { NewUserProps } from "@/types/userType";
import { NewPostProps, UpdatePostProps } from "@/types/postTypes";
import { throwError } from "@/utils/throwError";

//--------------------------------Auth-------------------------------------//

export async function checkIfUserLoggedIn() {
  try {
    await account.get();
    // const user = await account.get();
    // logInfo("User is logged in:", user);
    return true;
  } catch {
    // logInfo("User is not logged in:");
    return false;
  }
}

/*
Note: 
  1. when a user sign up for the first time, user cant choose a profile picture,
  a image of initial letter of their is created using appwrite.
*/
export async function signUpUser(user: SignUpValidationProps) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );

    // This is unnecessary, as create will either return a promise or throw an error.
    // if (!newAccount) {
    //   logError(newAccount);
    //   throw new Error("Account creation failed - Appwrite Auth.");
    // }

    const avatarUrl = avatars.getInitials(user.name);

    const newUser = saveUserInfo({
      authId: newAccount.$id,
      name: newAccount.name,
      email: newAccount.email,
      username: user.username,
      imageUrl: avatarUrl,
    });

    return newUser;
  } catch (error) {
    throw throwError(error);
  }
}

export async function saveUserInfo(user: NewUserProps) {
  try {
    const saveNewUser = await db.createDocument(
      DB_ID,
      USER_COL_ID,
      ID.unique(),
      user
    );

    return saveNewUser;
  } catch (error) {
    throw throwError(error);
  }
}

export async function signInUser(user: SignInValidationProps) {
  try {
    const session = await account.createEmailPasswordSession(
      user.email,
      user.password
    );

    return session;
  } catch (error) {
    throw throwError(error);
  }
}

export async function getCurrentUser() {
  try {
    const currentAccount = await account.get();

    const currentUser = await db.listDocuments(DB_ID, USER_COL_ID, [
      Query.equal("authId", currentAccount.$id),
    ]);

    return currentUser.documents[0];
  } catch (error) {
    throw throwError(error);
  }
}

export async function signOutUser() {
  try {
    await account.deleteSessions();
  } catch (error) {
    throw throwError(error);
  }
}

//--------------------------------Post-------------------------------------//
let deleteImg: any;
export async function createPost(postInfo: NewPostProps) {
  try {
    // upload file and get url:
    const uploadedFile = await uploadFile(postInfo.file[0]);
    const fileUrl = getFilePreview(uploadedFile.$id);

    deleteImg = uploadedFile;

    // Convert tags into array
    const tags = postInfo.tags?.replace(/ /g, "").split(",") || [];

    // Create post
    const newPost = await db.createDocument(DB_ID, POST_COL_ID, ID.unique(), {
      userId: postInfo.userId,
      title: postInfo.title,
      description: postInfo.desc,
      location: postInfo.location,
      tags: tags,
      imageId: uploadedFile.$id,
      imageURL: fileUrl,
    });
    deleteImg = null;
    return newPost;
  } catch (error) {
    await deleteFile(deleteImg.$id);
    deleteImg = null;
    throw throwError(error);
  }
}

export async function uploadFile(file: File) {
  try {
    const uploadedFile = await storage.createFile(
      STORAGE_ID,
      ID.unique(),
      file
    );

    return uploadedFile;
  } catch (error) {
    throw throwError(error);
  }
}

export function getFilePreview(fileId: string) {
  try {
    const fileUrl = storage.getFilePreview(STORAGE_ID, fileId);

    return fileUrl;
  } catch (error) {
    throw throwError(error);
  }
}

export async function deleteFile(fileId: string) {
  try {
    await storage.deleteFile(STORAGE_ID, fileId);
    return true;
  } catch (error) {
    throw throwError(error);
  }
}

export async function getRecentPosts() {
  try {
    const recentPosts = await db.listDocuments(DB_ID, POST_COL_ID, [
      Query.orderDesc("$updatedAt"),
      // Query.limit(20),
    ]);
    return recentPosts;
  } catch (error) {
    throw throwError(error);
  }
}

// __ Paginated Fetching Function __ //
export async function getPaginatedPosts({ pageParam }: { pageParam?: string }) {
  // we are using appwrite cursor to paginate - specifically post id, (we need to pass last post id, so it can continue after)
  
  const queries: string[] = [Query.orderDesc("$createdAt"), Query.limit(10)];
  if (pageParam) queries.push(Query.cursorAfter(pageParam));

  try {
    const paginatedPosts = await db.listDocuments(DB_ID, POST_COL_ID, queries);
    if (!paginatedPosts) throw new Error("Failed to fetch posts");
    return paginatedPosts;
  } catch (error) {
    throw throwError(error);
  }
}

export async function getPostById(postId: string) {
  try {
    const res = await db.getDocument(DB_ID, POST_COL_ID, postId);

    return res;
  } catch (error) {
    throw throwError(error);
  }
}

export async function updatePost(postInfo: UpdatePostProps) {
  const updateFile = postInfo.file.length > 0;
  try {
    let image = {
      imageURL: postInfo?.imageUrl,
      imageId: postInfo.postId,
    };

    if (updateFile) {
      // upload file and get url:
      const uploadedFile = await uploadFile(postInfo.file[0]);
      const fileUrl = getFilePreview(uploadedFile.$id);

      deleteImg = uploadedFile;
      image = { ...image, imageId: uploadedFile.$id, imageURL: fileUrl };
      await deleteFile(postInfo.imageId);
    }

    // Convert tags into array
    const tags = postInfo.tags?.replace(/ /g, "").split(",") || [];

    // Create post
    const updatedPost = await db.updateDocument(
      DB_ID,
      POST_COL_ID,
      postInfo.postId,
      {
        title: postInfo.title,
        description: postInfo.desc,
        location: postInfo.location,
        tags: tags,
        imageId: image.imageId,
        imageURL: image.imageURL,
      }
    );

    deleteImg = null;
    return updatedPost;
  } catch (error) {
    await deleteFile(deleteImg.$id);
    deleteImg = null;
    throw throwError(error);
  }
}

export async function deletePostByID(postID: string, imageId: string) {
  if (!imageId || !postID) throw Error("deletePostByID - params missing");
  try {
    const res = await db.deleteDocument(DB_ID, POST_COL_ID, postID);
    await deleteFile(imageId);
    return res;
  } catch (error) {
    throw throwError(error);
  }
}

export async function likePost(postId: string, likedArray: string[]) {
  try {
    const res = await db.updateDocument(DB_ID, POST_COL_ID, postId, {
      userLikedId: likedArray,
    });
    return res;
  } catch (error) {
    throw throwError(error);
  }
}

export async function savePost(postId: string, userId: string) {
  try {
    const res = await db.createDocument(DB_ID, SAVE_COL_ID, ID.unique(), {
      usersavedId: userId,
      savePostId: postId,
    });
    return res;
  } catch (error) {
    throw throwError(error);
  }
}

export async function deleteSavedPost(savedPostId: string) {
  try {
    const res = await db.deleteDocument(DB_ID, SAVE_COL_ID, savedPostId);
    return res;
  } catch (error) {
    throw throwError(error);
  }
}

export async function getSavedPosts(postId: string) {
  const currentAccount = await getCurrentUser();
  try {
    const allSavedPosts = await db.listDocuments(DB_ID, SAVE_COL_ID, [
      Query.and([
        Query.equal("usersavedId", currentAccount.$id),
        Query.equal("savePostId", postId),
      ]),
    ]);

    return allSavedPosts;
  } catch (error) {
    throw throwError(error);
  }
}
