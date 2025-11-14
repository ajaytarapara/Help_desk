import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Box, Paper, styled, Typography } from "@mui/material";
import { useDispatch } from "react-redux";

import { flattenComments } from "./utils";
import { EmptyState } from "./styles";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import {
  Comments,
  TicketCommentsProps,
} from "../../../features/comments/types";
import { AppDispatch } from "../../../core/store";
import {
  createCommentThunk,
  getCommentsByTicketThunk,
} from "../../../features/comments/commentThunk";

const TicketComments: React.FC<TicketCommentsProps> = ({ ticketId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [comments, setComments] = useState<Comments[]>([]);

  const fetchComments = useCallback(async () => {
    try {
      const response = await dispatch(
        getCommentsByTicketThunk(ticketId)
      ).unwrap();
      setComments(response.data || []);
    } catch {
      setComments([]);
    }
  }, [dispatch, ticketId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleAddComment = async (content: string, parentId: number | null) => {
    await dispatch(
      createCommentThunk({
        ticketId,
        commentMessage: content,
        parentCommentId: parentId,
      })
    );
    fetchComments();
  };

  const { flatList, commentMap } = useMemo(
    () => flattenComments(comments),
    [comments]
  );

  return (
    <Box sx={{ margin: "0 auto" }}>
      <CommentFormPaper>
        <CommentFormTitle variant="h6">Leave a Comment</CommentFormTitle>
        <CommentForm parentId={null} onAddComment={handleAddComment} />
      </CommentFormPaper>

      {flatList.length === 0 ? (
        <EmptyState>
          <Typography color="#64748b">
            No comments yet. Be the first!
          </Typography>
        </EmptyState>
      ) : (
        flatList.map((comment) => (
          <CommentItem
            key={comment.commentId}
            comment={comment}
            onAddComment={handleAddComment}
            commentMap={commentMap}
            fetchComments={fetchComments}
          />
        ))
      )}
    </Box>
  );
};

export default TicketComments;

const CommentFormPaper = styled(Paper)({
  padding: 24,
  marginBottom: 24,
  borderRadius: "16px",
  background: "linear-gradient(180deg, #fef2f2 0%, #ffffff 100%)",
  border: "1px solid #fbcfe8",
  boxShadow: "0 4px 12px -2px rgba(190, 24, 93, 0.15)",
});

const CommentFormTitle = styled(Typography)({
  fontWeight: 700,
  color: "#9d174d",
});
