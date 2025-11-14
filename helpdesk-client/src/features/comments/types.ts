export interface CommentCreateRequest {
  ticketId: number;
  commentMessage: string;
  parentCommentId?: number | null;
}

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

export interface TicketCommentsProps {
  ticketId: number;
}

export interface EditCommentRequest {
  commentId: number;
  commentMessage: string;
}
