import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  CreateUserRequest,
  UpdateUserRequest,
  UserListResponse,
  UserPaginationRequest,
} from "./type";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "./userServices";
import { PaginationResponse } from "../auth/types";

export const createUserThunk = createAsyncThunk(
  "user/create",
  async (payload: CreateUserRequest) => {
    return await createUser(payload);
  }
);

export const updateUserThunk = createAsyncThunk(
  "user/update",
  async (payload: UpdateUserRequest) => {
    return await updateUser(payload.userId, payload);
  }
);

export const deleteUserThunk = createAsyncThunk(
  "user/delete",
  async (id: number) => {
    return await deleteUser(id);
  }
);

export const getAllUsersThunk = createAsyncThunk<
  PaginationResponse<UserListResponse>,
  UserPaginationRequest
>("users/get-all", async (data) => {
  return await getAllUsers(data);
});

export const getUserByIdThunk = createAsyncThunk(
  "user/get-by-id",
  async (id: number) => {
    return await getUserById(id);
  }
);
