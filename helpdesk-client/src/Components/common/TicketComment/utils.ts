import { Comments } from "../../../features/comments/types";

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
    (a, b) =>
      new Date(b.createdDate).valueOf() - new Date(a.createdDate).valueOf()
  );

  return { flatList, commentMap };
};
