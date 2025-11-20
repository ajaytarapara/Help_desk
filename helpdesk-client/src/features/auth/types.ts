export interface User {
  id: string;
  username: string;
  role: string;
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  errors?: string[];
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface UserData {
  userId: number;
  fullName: string;
  email: string;
  roleId: number;
  isActive: boolean;
  createdDate: string;
}

export interface PaginationRequest {
  pageNumber: number;
  pageSize: number;
  search?: string;
  orderBy?: string;
  isDescending?: boolean;
}

export interface PaginationResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    items: T[];
    pageNumber: number;
    totalCount: number;
    totalPages: number;
    pageSize: number;
  };
  errors?: string[];
}

export interface UserInfo {
  userId: string;
  fullName: string;
  role: string;
  email: string;
}
