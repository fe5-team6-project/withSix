import { useState } from 'react';

import { api } from '../../../../lib/apis/axiosConfig';
import { useParams } from 'react-router-dom';
import {
    returnErrorMessage,
    returnServerErrorMessage,
} from '../../utils/errorMessage';
import { styled } from 'styled-components';
import iconMoreVertical from '../../../../assets/icons/post/icon-more-vertical.svg';

export default function DeleteMent({ commentId, setReload, setCommentCount }) {
    const { id } = useParams();
    const [visible, setVisible] = useState(false);
    // Todo
    // 삭제 기능 구현

    const handleRemoved = async () => {
        try {
            const data = await api.delete(`/post/${id}/comments/${commentId}`);
            if (data.status === 200) {
                //메세지 삭제 문구 띄워저
                const {
                    data: { message },
                } = data;
                alert(message);
                setReload((prev) => !prev);
                setCommentCount((prev) => prev - 1);
            } else {
                returnServerErrorMessage();
            }
        } catch (error) {
            console.log(error);
            // returnErrorMessage(error);
        } finally {
            setVisible(!visible);
        }
    };

    return (
        <>
            <Img onClick={() => setVisible(!visible)} src={iconMoreVertical} />
            {visible && <button onClick={() => handleRemoved()}>삭제</button>}
        </>
    );
}

const Img = styled.img`
    cursor: pointer;
`;
