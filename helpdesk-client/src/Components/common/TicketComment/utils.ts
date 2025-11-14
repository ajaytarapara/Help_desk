import dayjs from "dayjs";
import { Comments } from "../../../features/ticket/types";

export const flattenComments = (
  comments: Comments[]
): { flatList: Comments[]; commentMap: Map<number, Comments> } => {
  const flatList: Comments[] = [];
  const commentMap = new Map<number, Comments>();

  const traverse = (currentComments: Comments[]) => {
    currentComments.forEach((comment) => {
      commentMap.set(comment.commentId, comment);
      flatList.push(comment);
      if (comment.replies && comment.replies.length > 0) {
        traverse(comment.replies);
      }
    });
  };

  traverse(comments);

  flatList.sort(
    (a, b) => dayjs(b.createdDate).valueOf() - dayjs(a.createdDate).valueOf()
  );

  return { flatList, commentMap };
};
