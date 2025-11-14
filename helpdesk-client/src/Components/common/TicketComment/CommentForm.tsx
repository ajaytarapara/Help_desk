import React, { useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import { StyledButton } from "./styles";

interface CommentFormProps {
  parentId: number | null;
  onAddComment: (content: string, parentId: number | null) => void;
  onCancelReply?: () => void;
  isReply?: boolean;
}

const CommentForm: React.FC<CommentFormProps> = ({
  parentId,
  onAddComment,
  onCancelReply,
  isReply = false,
}) => {
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    onAddComment(content, parentId);
    setContent("");
    onCancelReply?.();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ mt: 2, mb: isReply ? 0 : 3 }}>
      <TextField
        fullWidth
        multiline
        minRows={isReply ? 2 : 3}
        placeholder={isReply ? "Write a reply..." : "Add a new comment..."}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        variant="outlined"
        sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px" } }}
        inputProps={{ maxLength: 1000 }}
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
        {content.length}/1000
      </Typography>
      <Box display="flex" justifyContent="flex-end" mt={1.5} gap={1}>
        {isReply && (
          <StyledButton
            variant="outlined"
            color="secondary"
            onClick={onCancelReply}>
            Cancel
          </StyledButton>
        )}
        <StyledButton
          variant="contained"
          color="primary"
          type="submit"
          disabled={!content.trim() || content.length > 1000}>
          {isReply ? "Send Reply" : "Post Comment"}
        </StyledButton>
      </Box>
    </Box>
  );
};

export default CommentForm;
