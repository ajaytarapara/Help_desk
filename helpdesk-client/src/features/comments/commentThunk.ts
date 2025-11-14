// src/features/comments/commentThunk.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiResponse } from "../auth/types";
import { CommentCreateRequest, Comments, EditCommentRequest } from "./types";
import {
  createComment,
  deleteComment,
  editComment,
  getCommentsByTicket,
} from "./commentService";

// Get comments by ticket
export const getCommentsByTicketThunk = createAsyncThunk<
  ApiResponse<Comments[]>,
  number
>("comments/getByTicket", async (ticketId) => {
  const response = await getCommentsByTicket(ticketId);
  return response;
});

// Create comment
export const createCommentThunk = createAsyncThunk<
  ApiResponse<string>,
  CommentCreateRequest
>("comments/create", async (data) => {
  const response = await createComment(data);
  return response;
});

export const editCommentThunk = createAsyncThunk<
  ApiResponse<string>,
  EditCommentRequest
>("comments/edit", async (data) => {
  const response = await editComment(data);
  return response;
});

export const deleteCommentThunk = createAsyncThunk<ApiResponse<string>, number>(
  "comments/delete",
  async (commentId) => {
    const response = await deleteComment(commentId);
    return response;
  }
);
