import { useState } from 'react';
import { api } from '../../../lib/apis/axiosConfig';
import { useParams } from 'react-router-dom';
import {
    returnErrorMessage,
    returnServerErrorMessage,
} from '../utils/errorMessage';
import iconMoreVertical from '../../../assets/icons/post/icon-more-vertical.svg';
import { styled } from 'styled-components';

export default function Report() {
    const [visible, setVisible] = useState(false);
    const { id } = useParams();
    // Todo
    // 신고하기 기능구현

    const handleReport = async () => {
        try {
            const res = await api.post(`/post/${id}/report`);
            if (res.status === 200) {
                alert('신고완료');
            } else returnServerErrorMessage();
        } catch (error) {
            returnErrorMessage(error);
        } finally {
            setVisible(false);
        }
    };

    return (
        <>
            <Icon onClick={() => setVisible(!visible)} src={iconMoreVertical} />
            {visible && <button onClick={handleReport}>신고하기</button>}
        </>
    );
}

const Icon = styled.img`
    position: absolute;
    right: 0;
    cursor: pointer;
`;
