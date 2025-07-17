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
import { logInfo } from "@/utils/log";

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
    // const fileUrl = getFilePreview(uploadedFile.$id);
    const fileUrl = getFileView(uploadedFile.$id);

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

// uses transformation internally - for pro plan only
export function getFilePreview(fileId: string) {
  try {
    const fileUrl = storage.getFilePreview(STORAGE_ID, fileId);

    return fileUrl;
  } catch (error) {
    throw throwError(error);
  }
}

export function getFileView(fileId: string) {
  // console.log("Image URL", storage.getFileView(STORAGE_ID, fileId).href);

  try {
    const fileUrl = storage.getFileView(STORAGE_ID, fileId);
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
// we are using appwrite cursor to paginate - specifically post id, (we need to pass last post id, so it can continue after)
export async function getPaginatedPosts({ pageParam }: { pageParam?: string }) {
  const queries: string[] = [Query.orderDesc("$createdAt"), Query.limit(10)];
  if (pageParam) queries.push(Query.cursorAfter(pageParam));

  try {
    const paginatedPosts = await db.listDocuments(DB_ID, POST_COL_ID, queries);
    if (!paginatedPosts) throw new Error("Failed to fetch posts");

    const safePosts = paginatedPosts.documents.map((post) => ({
      ...post,
      imageURL: post.imageURL?.replace("/preview", "/view"),
    }));

    return {
      ...paginatedPosts,
      documents: safePosts,
    };
  } catch (error) {
    throw throwError(error);
  }
}

export async function getPostById(postId: string) {
  try {
    const res = await db.getDocument(DB_ID, POST_COL_ID, postId);

    // Replace /preview with /view
    const safeImageUrl = res.imageURL?.replace("/preview", "/view");
    res.imageURL = safeImageUrl;

    logInfo(res);

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
      // const fileUrl = getFilePreview(uploadedFile.$id);
      const fileUrl = getFileView(uploadedFile.$id);

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

// {
//     "title": "My Cat - linda!!!",
//     "description": "Linda!",
//     "location": "Toronto, ON, CAN",
//     "tags": [
//         "cat"
//     ],
//     "imageId": "687980120024b2c1ec47",
//     "imageURL": "https://cloud.appwrite.io/v1/storage/buckets/668dd39b000000f60640/files/6879800d003cbc586ac0/view?project=668b42b1003c657affdb",
//     "links": [],
//     "$sequence": "68",
//     "$id": "687980120024b2c1ec47",
//     "$createdAt": "2025-07-17T22:58:27.277+00:00",
//     "$updatedAt": "2025-07-17T23:07:50.515+00:00",
//     "$permissions": [
//         "read(\"user:68797fab00385868450c\")",
//         "update(\"user:68797fab00385868450c\")",
//         "delete(\"user:68797fab00385868450c\")"
//     ],
//     "userId": {
//         "authId": "68797fab00385868450c",
//         "name": "Jessica james",
//         "username": "Jessica",
//         "email": "jessica34@gmail.com",
//         "bio": null,
//         "imageId": null,
//         "imageUrl": "https://cloud.appwrite.io/v1/avatars/initials?name=Jessica+james&project=668b42b1003c657affdb",
//         "$sequence": "45",
//         "$id": "68797fac0035dcd083bf",
//         "$createdAt": "2025-07-17T22:56:45.534+00:00",
//         "$updatedAt": "2025-07-17T22:56:45.534+00:00",
//         "$permissions": [],
//         "likedPostId": [
//             {
//                 "title": "My Cat - linda!!!",
//                 "description": "Linda!",
//                 "location": "Toronto, ON, CAN",
//                 "tags": [
//                     "cat"
//                 ],
//                 "imageId": "687980120024b2c1ec47",
//                 "imageURL": "https://cloud.appwrite.io/v1/storage/buckets/668dd39b000000f60640/files/6879800d003cbc586ac0/view?project=668b42b1003c657affdb",
//                 "links": [],
//                 "$sequence": "68",
//                 "$id": "687980120024b2c1ec47",
//                 "$createdAt": "2025-07-17T22:58:27.277+00:00",
//                 "$updatedAt": "2025-07-17T23:07:50.515+00:00",
//                 "$permissions": [
//                     "read(\"user:68797fab00385868450c\")",
//                     "update(\"user:68797fab00385868450c\")",
//                     "delete(\"user:68797fab00385868450c\")"
//                 ],
//                 "$databaseId": "668dd43300289f203b8e",
//                 "$collectionId": "6696d95e0013382b9ce5"
//             },
//             {
//                 "title": "Work vibes",
//                 "description": "Best day of work",
//                 "location": "Toronto, ON",
//                 "tags": [
//                     ""
//                 ],
//                 "imageId": "685aeba3002115a7da81",
//                 "imageURL": "https://cloud.appwrite.io/v1/storage/buckets/668dd39b000000f60640/files/685aeba3002115a7da81/preview?project=668b42b1003c657affdb",
//                 "links": [],
//                 "$sequence": "67",
//                 "$id": "685aeba500395d319553",
//                 "$createdAt": "2025-06-24T18:17:10.224+00:00",
//                 "$updatedAt": "2025-07-17T23:06:47.104+00:00",
//                 "$permissions": [
//                     "read(\"user:685aea8a002c749cd953\")",
//                     "update(\"user:685aea8a002c749cd953\")",
//                     "delete(\"user:685aea8a002c749cd953\")"
//                 ],
//                 "$databaseId": "668dd43300289f203b8e",
//                 "$collectionId": "6696d95e0013382b9ce5"
//             }
//         ],
//         "savedPostId": [],
//         "$databaseId": "668dd43300289f203b8e",
//         "$collectionId": "6696dbf1002e6ca584b3"
//     },
//     "userLikedId": [
//         {
//             "authId": "68797fab00385868450c",
//             "name": "Jessica james",
//             "username": "Jessica",
//             "email": "jessica34@gmail.com",
//             "bio": null,
//             "imageId": null,
//             "imageUrl": "https://cloud.appwrite.io/v1/avatars/initials?name=Jessica+james&project=668b42b1003c657affdb",
//             "$sequence": "45",
//             "$id": "68797fac0035dcd083bf",
//             "$createdAt": "2025-07-17T22:56:45.534+00:00",
//             "$updatedAt": "2025-07-17T22:56:45.534+00:00",
//             "$permissions": [],
//             "postId": [
//                 {
//                     "title": "My Cat - linda!!!",
//                     "description": "Linda!",
//                     "location": "Toronto, ON, CAN",
//                     "tags": [
//                         "cat"
//                     ],
//                     "imageId": "687980120024b2c1ec47",
//                     "imageURL": "https://cloud.appwrite.io/v1/storage/buckets/668dd39b000000f60640/files/6879800d003cbc586ac0/view?project=668b42b1003c657affdb",
//                     "links": [],
//                     "$id": "687980120024b2c1ec47",
//                     "$sequence": "68",
//                     "$createdAt": "2025-07-17T22:58:27.277+00:00",
//                     "$updatedAt": "2025-07-17T23:07:50.515+00:00",
//                     "$permissions": [
//                         "read(\"user:68797fab00385868450c\")",
//                         "update(\"user:68797fab00385868450c\")",
//                         "delete(\"user:68797fab00385868450c\")"
//                     ],
//                     "$databaseId": "668dd43300289f203b8e",
//                     "$collectionId": "6696d95e0013382b9ce5"
//                 }
//             ],
//             "savedPostId": [],
//             "$databaseId": "668dd43300289f203b8e",
//             "$collectionId": "6696dbf1002e6ca584b3"
//         },
//         {
//             "authId": "685aec2a0002848b8cb4",
//             "name": "hasan",
//             "username": "hasan-123",
//             "email": "hemailhasan88@gmail.com",
//             "bio": null,
//             "imageId": null,
//             "imageUrl": "https://cloud.appwrite.io/v1/avatars/initials?name=hasan&project=668b42b1003c657affdb",
//             "$sequence": "44",
//             "$id": "685aec2a00301f2bb1f4",
//             "$createdAt": "2025-06-24T18:19:23.113+00:00",
//             "$updatedAt": "2025-06-24T18:19:23.113+00:00",
//             "$permissions": [],
//             "postId": [],
//             "savedPostId": [],
//             "$databaseId": "668dd43300289f203b8e",
//             "$collectionId": "6696dbf1002e6ca584b3"
//         }
//     ],
//     "savedUserId": [],
//     "$databaseId": "668dd43300289f203b8e",
//     "$collectionId": "6696d95e0013382b9ce5"
// }
