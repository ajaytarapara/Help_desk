import React, { useState } from "react";
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
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
import CommentForm from "./CommentForm";
import ReplyContext from "./ReplyContext";
import { CommentCard, StyledButton } from "./styles";
import { Comments } from "../../../features/comments/types";
import { AppDispatch } from "../../../core/store";
import { getUserId } from "../../../utils/authUtils";
import {
  deleteCommentThunk,
  editCommentThunk,
} from "../../../features/comments/commentThunk";
import DeleteDialog from "../DeleteDialog";

interface CommentItemProps {
  comment: Comments;
  onAddComment: (content: string, parentId: number | null) => void;
  commentMap: Map<number, Comments>;
  fetchComments: () => Promise<void>;
}

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  onAddComment,
  commentMap,
  fetchComments,
}) => {
  const [replyBox, setReplyBox] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.message);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const currentUserId = Number(getUserId() ?? 0);

  const parentComment = comment.parentCommentId
    ? commentMap.get(comment.parentCommentId)
    : null;

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
    <CommentCard id={`comment-${comment.commentId}`}>
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
          onClick={() => setReplyBox(!replyBox)}
          sx={{
            textTransform: "none",
            color: "#9d174d",
            "&:hover": {
              backgroundColor: "rgba(244, 114, 182, 0.1)",
            },
          }}>
          Reply
        </Button>

        {currentUserId === comment.createdByUserId && !editMode && (
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
                <Edit fontSize="small" sx={{ marginRight: "10px" }} /> Edit
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setDeleteDialogOpen(true);
                  setAnchorEl(null);
                }}
                sx={{ color: "error.main" }}>
                <Delete fontSize="small" sx={{ marginRight: "10px" }} /> Delete
              </MenuItem>
            </Menu>
          </>
        )}
      </Box>

      {parentComment && <ReplyContext parentComment={parentComment} />}

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
            sx={{
              display: "block",
              textAlign: "right",
              fontWeight: 500,
              paddingRight: 1,
              fontSize: 16,
            }}>
            {editedContent.length}/1000
          </Typography>
          <Box display="flex" justifyContent="flex-end" mt={1} gap={1}>
            <StyledButton variant="outlined" onClick={() => setEditMode(false)}>
              Cancel
            </StyledButton>
            <StyledButton
              variant="contained"
              onClick={handleSaveEdit}
              disabled={!editedContent.trim() || editedContent.length > 1000}>
              Save
            </StyledButton>
          </Box>
        </Box>
      )}

      {replyBox && !editMode && (
        <CommentForm
          isReply
          parentId={comment.commentId}
          onAddComment={onAddComment}
          onCancelReply={() => setReplyBox(false)}
        />
      )}

      <DeleteDialog
        open={deleteDialogOpen}
        title="Delete Comment"
        message="Deleting this comment will also remove its replies. Are you sure?"
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </CommentCard>
  );
};

export default CommentItem;

const StyledCommentTextField = styled(TextField)({
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#db2777",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#db2777",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#db2777",
  },
});
