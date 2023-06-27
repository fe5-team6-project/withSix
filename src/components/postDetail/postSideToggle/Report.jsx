import { useState } from 'react';
import { api } from '../../../lib/apis/axiosConfig';
import { useParams } from 'react-router-dom';
import {
    returnErrorMessage,
    returnServerErrorMessage,
} from '../utils/errorMessage';
import iconMoreVertical from '../../../assets/icons/post/icon-more-vertical.svg';
import { styled } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../modal/Modal';
import { setContent, setIsVisible } from '../../../store/slices/modalSlice';

export default function Report() {
    const [visible, setVisible] = useState(false);
    const {
        display: { isVisible },
    } = useSelector((state) => state?.modal);
    const dispatch = useDispatch();
    // console.log(isVisible);
    const { id } = useParams();
    // Todo
    // 신고하기 기능구현

    const handleReport = async () => {
        try {
            const res = await api.post(`/post/${id}/report`);
            if (res.status === 200) {
                dispatch(
                    setContent({
                        state: true,
                        message: '신고 완료!',
                    })
                );
                dispatch(setIsVisible({ isVisible: true }));
            } else returnServerErrorMessage();
        } catch (error) {
            const {
                response: {
                    data: { message },
                },
            } = error;
            dispatch(
                setContent({
                    state: false,
                    message: message,
                })
            );
            dispatch(setIsVisible({ isVisible: true }));
        } finally {
            setVisible(false);
        }
    };

    return (
        <>
            <Icon onClick={() => setVisible(!visible)} src={iconMoreVertical} />
            {visible && (
                <ReportTitle onClick={handleReport}>신고하기</ReportTitle>
            )}
            {isVisible && <Modal />}
        </>
    );
}

const Icon = styled.img`
    position: absolute;
    right: 0;
    cursor: pointer;
`;

const ReportTitle = styled.div`
    margin: 0 auto;
    cursor: pointer;
`;
