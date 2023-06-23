import { useState } from 'react';

import { api } from '../../../../lib/apis/axiosConfig';
import { useParams } from 'react-router-dom';
import {
    returnErrorMessage,
    returnServerErrorMessage,
} from '../../utils/errorMessage';
import { styled } from 'styled-components';
import iconMoreVertical from '../../../../assets/icons/post/icon-more-vertical.svg';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../../modal/Modal';
import { setContent, setIsVisible } from '../../../../store/slices/modalSlice';

export default function DeleteMent({
    commentId,
    setReload,
    setCommentCount,
    setComment,
    comment,
}) {
    const { id } = useParams();
    const [visible, setVisible] = useState(false);
    const {
        display: { isVisible },
    } = useSelector((state) => state?.modal);
    const dispatch = useDispatch();
    // Todo
    // 삭제 기능 구현
    // console.log(comment);
    const handleRemoved = async () => {
        try {
            const data = await api.delete(`/post/${id}/comments/${commentId}`);
            if (data.status === 200) {
                //메세지 삭제 문구 띄워저
                const {
                    data: { message },
                } = data;
                // alert(message);
                const newComments = comment.filter((el) => el.id !== commentId);
                setComment(newComments);
                setReload((prev) => !prev);
                // setPage((prev) => prev - 1);
                setCommentCount((prev) => prev - 1);
                dispatch(
                    setContent({
                        state: true,
                        message: message,
                    })
                );
                dispatch(setIsVisible({ isVisible: true }));
            } else {
                returnServerErrorMessage();
            }
        } catch (error) {
            // console.log(error);
            returnErrorMessage(error);
        } finally {
            setVisible(!visible);
        }
    };

    return (
        <>
            {visible && (
                <DeleteTitle onClick={() => handleRemoved()}>삭제</DeleteTitle>
            )}
            <Img onClick={() => setVisible(!visible)} src={iconMoreVertical} />
            {isVisible && <Modal />}
        </>
    );
}

const Img = styled.img`
    cursor: pointer;
`;
const DeleteTitle = styled.div`
    color: red;
    cursor: pointer;
`;
