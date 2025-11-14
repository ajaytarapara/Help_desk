import React, { useCallback } from "react";
import { Box, Typography } from "@mui/material";
import { ChevronRight } from "@mui/icons-material";
import { ReplyContextBox } from "./styles";
import { Comments } from "../../../features/ticket/types";

interface ReplyContextProps {
  parentComment: Comments;
}

const ReplyContext: React.FC<ReplyContextProps> = ({ parentComment }) => {
  const handleScrollToParent = useCallback(() => {
    const parentElement = document.getElementById(
      `comment-${parentComment.commentId}`
    );
    if (parentElement) {
      parentElement.scrollIntoView({ behavior: "smooth", block: "center" });
      parentElement.style.transition = "box-shadow 0.5s, background-color 0.5s";
      parentElement.style.boxShadow = "0 0 0 4px #db2777 inset";
      setTimeout(() => {
        parentElement.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
      }, 1500);
    }
  }, [parentComment.commentId]);

  return (
    <ReplyContextBox onClick={handleScrollToParent}>
      <ChevronRight sx={{ color: "#db2777" }} fontSize="small" />

      <Box sx={{ minWidth: 0 }}>
        <Typography variant="caption" fontWeight={600} color="#db2777">
          Replying to {parentComment.createdBy}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          noWrap
          sx={{ fontSize: "0.8rem" }}>
          {parentComment.message}
        </Typography>
      </Box>
    </ReplyContextBox>
  );
};

export default ReplyContext;
