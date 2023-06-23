import { useCallback, useState } from 'react';

import { useParams } from 'react-router-dom';
import { api } from '../../lib/apis/axiosConfig';
import {
    returnErrorMessage,
    returnServerErrorMessage,
} from '../postDetail/utils/errorMessage';
import heart from '../../assets/icons/post/icon-heart.svg';
import heartFill from '../../assets/icons/post/icon-heart-fill.svg';
import { styled } from 'styled-components';

export default function LikeBtn({ data }) {
    console.log(data);
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
                <HeartImg onClick={() => turnOnLike()} src={heart} />
            ) : (
                <HeartImg onClick={() => turnOffLike()} src={heartFill} />
            )}
            <span>{likeCount}</span>
        </>
    );
}

const HeartImg = styled.img`
    cursor: pointer;
`;
