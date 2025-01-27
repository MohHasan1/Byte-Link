/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  signUpUser,
  signInUser,
  signOutUser,
  createPost,
  getRecentPosts,
  likePost,
  savePost,
  deleteSavedPost,
  getSavedPosts,
  getPostById,
  updatePost,
  deletePostByID,
  checkIfUserLoggedIn,
} from "@/service/appwrite/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SignUpValidationProps } from "../zod/validation";
import { NewPostProps, UpdatePostProps } from "@/types/postTypes";
import { QUERY_KEYS } from "./queryKeys";
import { useNavigate } from "react-router-dom";

// Auth //
export function useSignUpUser() {
  return useMutation({
    mutationFn: (user: SignUpValidationProps) => signUpUser(user),
  });
}

export function useSigninUser() {
  return useMutation({
    mutationFn: (user: any) => signInUser(user),
  });
}

export function useSignOutUser() {
  return useMutation({
    mutationFn: signOutUser,
  });
}

export function useCheckIfUserLoggedIn() {
  return useQuery({
    queryKey: [QUERY_KEYS.CHECK_IF_USER_lOGGED_IN],
    queryFn: checkIfUserLoggedIn,
    staleTime: 5000,
  })
}

// Post //
// __ Create Posts __ //
export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (post: NewPostProps) => createPost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.POST_KEY],
      });
    },
  });
};

// __ Get Latest Posts __ //
export const useGetRecentPosts = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.POST_KEY],
    queryFn: getRecentPosts,
    staleTime: 5000,
  });
};

// __ Like Post __ //
export const useLikePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postId, likesArray }: LikePostProps) =>
      likePost(postId, likesArray),
    onSuccess: (_, { postId }) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.POST_KEY, postId],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.POST_KEY],
      });
    },
  });
};
type LikePostProps = {
  postId: string;
  likesArray: string[];
};

// // __ Save Post __ //
export const useSavePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, userId }: { postId: string; userId: string }) =>
      savePost(postId, userId),
    onSuccess: (_, { postId }) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.POST_KEY, postId],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.POST_KEY],
      });
    },
  });
};

// __ Delete Saved Post __ //
export const useDeleteSavedPost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postId }: { postId: string }) => deleteSavedPost(postId),
    onSuccess: (_, { postId }) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.POST_KEY, postId],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.POST_KEY],
      });
    },
  });
};

// __ Get Saved Post __ //
export const useGetSavedPosts = (postId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.SAVED_POSTS_KEY, postId],
    queryFn: () => getSavedPosts(postId),
    staleTime: 100000,
  });
};

// __ Get Post By Id __ //
export const useGetPostById = (postId: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.POST_KEY, postId],
    queryFn: () => getPostById(postId),
    enabled: postId !== undefined && postId !== "",
    // staleTime: 100000,
  });
};

// __ Update Post By Id __ //
export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (postInfo: UpdatePostProps) => updatePost(postInfo),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.POST_KEY],
      });
    },
  });
};

// __ delete Post By Id __ //
export const useDeletePost = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: ({ postId, imageId }: deletePostById) =>
      deletePostByID(postId, imageId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.POST_KEY],
        refetchType: "none",
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.SAVED_POSTS_KEY],
        refetchType: "none",
      });

      navigate("/");
    },
  });
};
type deletePostById = { postId: string; imageId: string };
