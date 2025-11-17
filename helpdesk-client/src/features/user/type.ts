import { PaginationRequest } from "../auth/types";

export interface CreateUserRequest {
  fullName: string;
  email: string;
  roleId: number;
  isActive: boolean;
}

export interface UpdateUserRequest {
  userId: number;
  fullName: string;
  email: string;
  roleId: number;
  isActive: boolean;
}

export interface UserListResponse {
  userId: number;
  fullName: string;
  email: string;
  role: string;
  isActive: boolean;
  roleId: number;
}

export interface UserPaginationRequest extends PaginationRequest {
  isActive?: boolean;
  roleId?: number;
}
