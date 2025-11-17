export interface CreateCategoryRequest {
  categoryName: string;
}

export interface CategoryResponse {
  id: number;
  categoryName: string;
}

export interface UpdateCategoryPayload {
  categoryId: number;
  payload: CreateCategoryRequest;
}
