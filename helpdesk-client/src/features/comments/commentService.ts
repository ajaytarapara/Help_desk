import axiosClient from "../../core/api/axiosInstance";
import { ApiResponse } from "../auth/types";
import { CommentCreateRequest, Comments, EditCommentRequest } from "./types";

// Fetch comments by ticket
export const getCommentsByTicket = async (
  ticketId: number
): Promise<ApiResponse<Comments[]>> => {
  const response = await axiosClient.get<ApiResponse<Comments[]>>(
    `/comment/ticket/${ticketId}/comments`,
    {
      headers: {
        showToast: false,
      },
    }
  );
  return response.data;
};

export const createComment = async (
  data: CommentCreateRequest
): Promise<ApiResponse<string>> => {
  const response = await axiosClient.post<ApiResponse<string>>(
    `/comment/create`,
    data,
    {
      headers: {
        showToast: false,
      },
    }
  );
  return response.data;
};

export const editComment = async (
  data: EditCommentRequest
): Promise<ApiResponse<string>> => {
  const response = await axiosClient.put<ApiResponse<string>>(
    `/comment/${data.commentId}`,
    { commentMessage: data.commentMessage },
    {
      headers: {
        showToast: false,
      },
    }
  );
  return response.data;
};

export const deleteComment = async (
  commentId: number
): Promise<ApiResponse<string>> => {
  const response = await axiosClient.delete<ApiResponse<string>>(
    `/comment/${commentId}`,
    {
      headers: {
        showToast: false,
      },
    }
  );
  return response.data;
};
