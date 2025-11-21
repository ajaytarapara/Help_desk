import { PaginationRequest } from "../auth/types";

export interface CreateTicketRequest {
  title: string;
  description: string;
  priorityId: number;
  categoryId: number;
  ticketId?: number;
}

export interface Ticket {
  ticketId?: number;
  title: string;
  description: string;
  priorityId: number | string;
  categoryId: number | string;
  statusId?: number | string;
  createdAt?: string;
}

export interface TicketPaginationRequest extends PaginationRequest {
  statusId?: number;
  priorityId?: number;
  fromDate?: string;
  toDate?: string;
}

export interface TicketAttr {
  ticketId: number;
  title: string;
  description: string;
  priority: {
    id: number;
    priorityName: string;
  };
  status: {
    id: number;
    statusName: string;
  };
  category: {
    id: number;
    categoryName: string;
  };
  createdBy: {
    id: number;
    fullName: string;
  };
  assignedTo: {
    id: number;
    fullName: string;
  };
  createdDate: string;
  updatedDate: string | null;
}

// src/types/comment.ts
export type UserRole = "user" | "agent" | "admin";

/** Who created a comment */
export interface CommentAuthor {
  name: string;
  email: string;
  department?: string;
  role: UserRole;
}

/** A comment or nested reply */
export interface Comments {
  commentId: number;
  message: string;
  createdBy: string;
  createdDate: string;
  parentCommentId: number | null;
  replies: Comments[];
  editedDate: string | null;
  createdByUserId: number;
}

export interface FunAgentResolutionTimeResponse {
  averageResolutionHours: number;
}

export interface TicketSummaryResponse {
  open: number;
  inProgress: number;
  closed: number;
  totalTickets: number;
}

export interface CommentCreateRequest {
  ticketId: number;
  commentMessage: string;
  parentCommentId: number | null;
}
