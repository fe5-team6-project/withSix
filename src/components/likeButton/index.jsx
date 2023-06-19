import { useCallback, useState } from 'react';

import { useParams } from 'react-router-dom';
import { api } from '../../lib/apis/axiosConfig';
import {
    returnErrorMessage,
    returnServerErrorMessage,
} from '../postDetail/utils/errorMessage';

export default function LikeBtn({ data }) {
    const { id } = useParams();
    const [isLike, setIsLike] = useState(data.hearted);
    const [likeCount, setLikeCount] = useState(data.heartCount);

    const turnOnLike = useCallback(async () => {
        try {
            const res = await api.post(`/post/${id}/heart`);
            if (res.status === 200) {
                setIsLike(res.data.post.hearted);
                setLikeCount(res.data.post.heartCount);
            } else {
                returnServerErrorMessage();
            }
        } catch (error) {
            returnErrorMessage(error);
        }
    }, [isLike, likeCount]);

    const turnOffLike = useCallback(async () => {
        try {
            const res = await api.delete(`/post/${id}/unheart`);
            if (res.status === 200) {
                setIsLike(res.data.post.hearted);
                setLikeCount(res.data.post.heartCount);
            } else {
                returnServerErrorMessage();
            }
        } catch (error) {
            returnErrorMessage(error);
        }
    }, [isLike, likeCount]);

    return (
        <>
            {!isLike ? (
                <button onClick={() => turnOnLike()}>좋아요</button>
            ) : (
                <button onClick={() => turnOffLike()}>좋아요취소</button>
            )}
            <h3>{likeCount}</h3>
        </>
    );
}
