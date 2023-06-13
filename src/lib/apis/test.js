import customAxios from "../utils/axios";

/**
 * 댓글작성 API
 * POST /post/:post_id/comments
 */

export const axiosCommentReq = (postId, token, ment) => {
    return customAxios.post(
        `post/${postId}/comments`,
        {
            comment: {
                content: ment,
            },
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-type": "application/json",
            },
        }
    );
};

/**
 * 댓글리스트 API
 * GET /post/:post_id/comments
 */

export const axiosCommentsList = (postId, token) => {
    return customAxios.get(`post/${postId}/comments`, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
};

/**
 * 댓글삭제 API
 * DELETE /post/:post_id/comments/:comment_id
 */
export const axiosCommentRemove = (postId, commentId, token) => {
    return customAxios.delete(`post/${postId}/comments/${commentId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json",
        },
    });
};

/**
 * 댓글신고 API
 * POST /post/:post_id/comments/:comment_id/report
 */
export const axiosCommentReport = (postId, commentId, token) => {
    return customAxios.post(
        `post/${postId}/comments/${commentId}/report`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-type": "application/json",
            },
        }
    );
};
