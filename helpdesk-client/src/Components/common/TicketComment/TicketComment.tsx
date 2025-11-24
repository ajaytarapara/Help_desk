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
import { CommentSignalRService } from "../../../services/commentSignalRService";

const TicketComments: React.FC<TicketCommentsProps> = ({ ticketId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [comments, setComments] = useState<Comments[]>([]);

  // -------------------------------
  // ⭐ Create SignalR Service
  // -------------------------------
  const [signalRService] = useState(
    () => new CommentSignalRService("http://localhost:5214/hubs/comments")
  );

  // -------------------------------
  // Fetch comments initially
  // -------------------------------
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
    if (ticketId) fetchComments();
  }, [fetchComments, ticketId]);

  // -------------------------------
  // Insert comment (new)
  // -------------------------------
  const findAndInsert = useCallback(
    (rootComments: Comments[], commentToInsert: Comments) => {
      // Root comment
      if (!commentToInsert.parentCommentId) {
        if (
          !rootComments.some((c) => c.commentId === commentToInsert.commentId)
        ) {
          return [commentToInsert, ...rootComments];
        }
        return rootComments;
      }

      const insertRec = (list: Comments[]): Comments[] => {
        return list.map((c) => {
          if (c.commentId === commentToInsert.parentCommentId) {
            const replies = c.replies || [];
            if (
              !replies.some((r) => r.commentId === commentToInsert.commentId)
            ) {
              return { ...c, replies: [commentToInsert, ...replies] };
            }
            return c;
          }
          return { ...c, replies: insertRec(c.replies || []) };
        });
      };

      return insertRec(rootComments);
    },
    []
  );

  // -------------------------------
  // Update comment (edit)
  // -------------------------------
  const findAndUpdate = useCallback((root: Comments[], updated: Comments) => {
    const rec = (list: Comments[]): Comments[] => {
      return list.map((c) => {
        if (c.commentId === updated.commentId) {
          return { ...c, ...updated };
        }
        return { ...c, replies: rec(c.replies || []) };
      });
    };
    return rec(root);
  }, []);

  // -------------------------------
  // Delete comments
  // -------------------------------
  const removeByIds = useCallback(
    (root: Comments[], idsToRemove: number[]): Comments[] => {
      const rec = (list: Comments[]): Comments[] => {
        return list
          .filter((c) => !idsToRemove.includes(c.commentId))
          .map((c) => ({ ...c, replies: rec(c.replies || []) }));
      };
      return rec(root);
    },
    []
  );

  // -------------------------------
  // ⭐ SIGNALR - Connect + Handlers
  // -------------------------------
  useEffect(() => {
    if (!ticketId) return;

    // Connect to SignalR
    signalRService.connect(ticketId, {
      onCreated: (comment: Comments) => {
        setComments((prev) => findAndInsert(prev, comment));
      },
      onEdited: (comment: Comments) => {
        setComments((prev) => findAndUpdate(prev, comment));
      },
      onDeleted: ({ ticketId: tId, deletedIds }) => {
        if (tId === ticketId) {
          setComments((prev) => removeByIds(prev, deletedIds));
        }
      },
    });

    return () => {
      signalRService.disconnect(ticketId);
    };
  }, [ticketId, signalRService, findAndInsert, findAndUpdate, removeByIds]);

  // -------------------------------
  // Add a comment
  // -------------------------------
  const handleAddComment = async (content: string, parentId: number | null) => {
    try {
      await dispatch(
        createCommentThunk({
          ticketId,
          commentMessage: content,
          parentCommentId: parentId,
        })
      ).unwrap();
      // SignalR will handle UI update
    } catch {}
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

// -------------------------------
// Styles
// -------------------------------
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
