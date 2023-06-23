import { useState } from 'react';
import { api } from '../../../lib/apis/axiosConfig';
import { useNavigate, useParams } from 'react-router-dom';
import {
    returnErrorMessage,
    returnServerErrorMessage,
} from '../utils/errorMessage';
import iconMoreVertical from '../../../assets/icons/post/icon-more-vertical.svg';
import { styled } from 'styled-components';
import Modal from '../../modal/Modal';
import { setContent, setUrl } from '../../../store/slices/modalSlice';
import { useDispatch } from 'react-redux';

export default function ModifyAndDelete() {
    const [visible, setVisible] = useState(false);
    const [isModal, setIsModal] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // Todo
    // 수정,삭제 기능 구현

    const handlePostRemove = async () => {
        try {
            const res = await api.delete(`/post/${id}`);
            if (res.status === 200) {
                dispatch(
                    setContent({
                        state: true,
                        message: '삭제를 완료하였습니다',
                    })
                );
                dispatch(setUrl({ path: '/home' }));
                setIsModal(!isModal);
            } else returnServerErrorMessage();
        } catch (error) {
            returnErrorMessage(error);
        }
    };

    const handlePostModify = () => {
        //TODO
        //게시글수정페이지로 라우팅
        navigate(`/post/modify/${id}`);
    };

    return (
        <>
            <Icon onClick={() => setVisible(!visible)} src={iconMoreVertical} />
            {visible && (
                <ToggleWrapper>
                    {/* <Modal /> */}
                    <ModifyTitle onClick={handlePostModify}>수정</ModifyTitle>
                    <DeleteTitle onClick={handlePostRemove}>삭제</DeleteTitle>
                </ToggleWrapper>
            )}
            {isModal && <Modal />}
        </>
    );
}

const Icon = styled.img`
    position: absolute;
    right: 0;
    cursor: pointer;
`;

const ToggleWrapper = styled.section`
    position: relative;
    margin-left: 30px;
`;

const Cursor = styled.div`
    cursor: pointer;
`;

const ModifyTitle = styled(Cursor)``;

const DeleteTitle = styled(Cursor)`
    color: red;
`;
