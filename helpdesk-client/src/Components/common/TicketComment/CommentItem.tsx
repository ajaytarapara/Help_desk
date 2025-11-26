import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Avatar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  styled,
} from "@mui/material";
import {
  Reply as ReplyIcon,
  MoreVert,
  Edit,
  Delete,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import CommentForm from "./CommentForm";
import ReplyContext from "./ReplyContext";
import { CommentCard, StyledButton } from "./styles";
import { AppDispatch, RootState } from "../../../core/store";
import {
  deleteCommentThunk,
  editCommentThunk,
} from "../../../features/comments/commentThunk";
import DeleteDialog from "../DeleteDialog";
import { Comments } from "../../../features/ticket/types";

const REPLIES_PAGE = 2; // default visible replies
const MAX_INDENT = 3;

interface CommentItemProps {
  comment: Comments;
  onAddComment: (content: string, parentId: number | null) => void;
  commentMap: Map<number, Comments>;
  fetchComments: () => Promise<void>;
  depth?: number;
}

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  onAddComment,
  commentMap,
  fetchComments,
  depth = 0,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);

  const [replyBox, setReplyBox] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.message);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const parentComment = comment.parentCommentId
    ? commentMap.get(comment.parentCommentId)
    : null;

  const replies = comment.replies || [];

  // track expanded state per comment
  const [expanded, setExpanded] = useState(replies.length <= REPLIES_PAGE);

  useEffect(() => {
    if (replies.length <= REPLIES_PAGE) setExpanded(true);
  }, [replies.length]);

  // auto-expand if user opens reply box
  useEffect(() => {
    if (replyBox && replies.length > REPLIES_PAGE) setExpanded(true);
  }, [replyBox]);

  const visibleReplies = expanded ? replies : replies.slice(0, REPLIES_PAGE);
  const hiddenCount = Math.max(0, replies.length - visibleReplies.length);

  const handleSaveEdit = async () => {
    await dispatch(
      editCommentThunk({
        commentId: comment.commentId,
        commentMessage: editedContent,
      })
    );
    await fetchComments();
    setEditMode(false);
  };

  const handleDeleteConfirm = async () => {
    await dispatch(deleteCommentThunk(comment.commentId));
    await fetchComments();
    setDeleteDialogOpen(false);
  };

  return (
    <Box sx={{ ml: Math.min(depth, MAX_INDENT) * 3, mb: 2 }}>
      <CommentCard id={`comment-${comment.commentId}`}>
        {/* Header */}
        <Box display="flex" alignItems="center" gap={1}>
          <Avatar sx={{ bgcolor: "#9d174d", width: 36, height: 36 }}>
            {comment.createdBy[0]?.toUpperCase()}
          </Avatar>
          <Box flex={1}>
            <Typography fontWeight={600}>
              {comment.createdBy}
              {comment.editedDate && (
                <Typography
                  component="span"
                  sx={{ ml: 1, fontSize: "0.7rem", color: "#64748b" }}>
                  (Edited)
                </Typography>
              )}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {dayjs(comment.createdDate).format("DD MMM YYYY, HH:mm")}
            </Typography>
          </Box>

          <Button
            size="small"
            startIcon={<ReplyIcon fontSize="small" />}
            onClick={() => setReplyBox((p) => !p)}
            sx={{
              textTransform: "none",
              color: "#9d174d",
              "&:hover": { backgroundColor: "#fce7f3" },
            }}>
            Reply
          </Button>

          {Number(user?.userId ?? 0) === comment.createdByUserId &&
            !editMode && (
              <>
                <IconButton
                  onClick={(e) => setAnchorEl(e.currentTarget)}
                  size="small">
                  <MoreVert />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={() => setAnchorEl(null)}>
                  <MenuItem
                    onClick={() => {
                      setEditMode(true);
                      setAnchorEl(null);
                    }}>
                    <Edit fontSize="small" sx={{ mr: 1 }} /> Edit
                  </MenuItem>
                  <MenuItem
                    sx={{ color: "error.main" }}
                    onClick={() => {
                      setDeleteDialogOpen(true);
                      setAnchorEl(null);
                    }}>
                    <Delete fontSize="small" sx={{ mr: 1 }} /> Delete
                  </MenuItem>
                </Menu>
              </>
            )}
        </Box>

        {/* Parent reference */}
        {parentComment && <ReplyContext parentComment={parentComment} />}

        {/* Message */}
        {!editMode ? (
          <Typography sx={{ mt: 1.5 }}>{comment.message}</Typography>
        ) : (
          <Box mt={1}>
            <StyledCommentTextField
              fullWidth
              multiline
              minRows={2}
              value={editedContent}
              inputProps={{ maxLength: 1000 }}
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <Typography
              variant="caption"
              sx={{ display: "block", textAlign: "right" }}>
              {editedContent.length}/1000
            </Typography>
            <Box display="flex" justifyContent="flex-end" mt={1} gap={1}>
              <StyledButton onClick={() => setEditMode(false)}>
                Cancel
              </StyledButton>
              <StyledButton
                variant="contained"
                onClick={handleSaveEdit}
                disabled={!editedContent.trim()}>
                Save
              </StyledButton>
            </Box>
          </Box>
        )}

        {/* Reply Form */}
        {replyBox && !editMode && (
          <CommentForm
            isReply
            parentId={comment.commentId}
            onAddComment={onAddComment}
            onCancelReply={() => setReplyBox(false)}
          />
        )}

        {/* Replies */}
        {replies.length > 0 && (
          <Box mt={2}>
            {visibleReplies.map((r) => (
              <CommentItem
                key={r.commentId}
                comment={r}
                onAddComment={onAddComment}
                commentMap={commentMap}
                fetchComments={fetchComments}
                depth={depth + 1}
              />
            ))}

            {/* Show More */}
            {!expanded && replies.length > REPLIES_PAGE && (
              <Box textAlign="center" mt={1}>
                <Button
                  size="small"
                  onClick={() => setExpanded(true)}
                  sx={{ color: "#6b21a8", textTransform: "none" }}>
                  Show more replies ({hiddenCount} left)
                </Button>
              </Box>
            )}

            {/* Hide */}
            {expanded && replies.length > REPLIES_PAGE && (
              <Box textAlign="center" mt={1}>
                <Button
                  size="small"
                  onClick={() => setExpanded(false)}
                  sx={{ color: "#6b21a8", textTransform: "none" }}>
                  Hide replies
                </Button>
              </Box>
            )}
          </Box>
        )}

        <DeleteDialog
          open={deleteDialogOpen}
          title="Delete Comment"
          message="Deleting this comment will also delete its replies. Are you sure?"
          onClose={() => setDeleteDialogOpen(false)}
          onConfirm={handleDeleteConfirm}
        />
      </CommentCard>
    </Box>
  );
};

export default CommentItem;

const StyledCommentTextField = styled(TextField)(() => ({
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#db2777",
  },
  "& .MuiInputLabel-root.Mui-focused": { color: "#db2777" },
}));
