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
import { ModalPropsBase } from '../../../../lib/utils/interface/interface';

export default function ReportMent({ commentId }: { commentId: string }) {
    const { id } = useParams();
    const [visible, setVisible] = useState(false);
    const {
        display: { isVisible },
    } = useSelector((state: ModalPropsBase) => state?.modal);
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
            const {
                response: {
                    data: { message },
                },
            }: any = error;
            dispatch(
                setContent({
                    state: false,
                    message: message,
                })
            );
            dispatch(setIsVisible({ isVisible: true }));
        } finally {
            setVisible(!visible);
        }
    };
    return (
        <>
            {visible && (
                <ToggleWrapper>
                    <ReportTitle onClick={() => handleReported()}>
                        신고
                    </ReportTitle>
                </ToggleWrapper>
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

const ToggleWrapper = styled.section`
    position: absolute;
    width: 100px;
    right: 70px;
    padding: 5px 0;
    background-color: white;
    border-radius: var(--radius-m);
    border-top-right-radius: 0;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    text-align: center;
    z-index: 3;
`;
