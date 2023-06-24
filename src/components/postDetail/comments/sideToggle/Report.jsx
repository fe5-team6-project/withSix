import { useState } from 'react';

import { api } from '../../../../lib/apis/axiosConfig';
import { useParams } from 'react-router-dom';
import {
    returnErrorMessage,
    returnServerErrorMessage,
} from '../../utils/errorMessage';
import iconMoreVertical from '../../../../assets/icons/post/icon-more-vertical.svg';
import { styled } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { setContent, setIsVisible } from '../../../../store/slices/modalSlice';
import Modal from '../../../modal/Modal';

export default function ReportMent({ commentId }) {
    const { id } = useParams();
    const [visible, setVisible] = useState(false);
    const {
        display: { isVisible },
    } = useSelector((state) => state?.modal);
    const dispatch = useDispatch();
    // Todo
    // 신고하기 기능구현

    const handleReported = async () => {
        try {
            const data = await api.post(
                `/post/${id}/comments/${commentId}/report`
            );
            if (data.status === 200) {
                dispatch(
                    setContent({
                        state: true,
                        message: '신고 완료!',
                    })
                );
                dispatch(setIsVisible({ isVisible: true }));
            } else {
                returnServerErrorMessage();
            }
        } catch (error) {
            returnErrorMessage(error);
        } finally {
            setVisible(!visible);
        }
    };
    return (
        <>
            {visible && (
                <ReportTitle onClick={() => handleReported()}>신고</ReportTitle>
            )}
            <Img onClick={() => setVisible(!visible)} src={iconMoreVertical} />
            {isVisible && <Modal />}
        </>
    );
}

const Img = styled.img`
    cursor: pointer;
`;

const ReportTitle = styled.div`
    cursor: pointer;
`;
