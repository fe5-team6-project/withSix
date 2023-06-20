import { useState } from 'react';

import { api } from '../../../../lib/apis/axiosConfig';
import { useParams } from 'react-router-dom';
import {
    returnErrorMessage,
    returnServerErrorMessage,
} from '../../utils/errorMessage';

export default function ReportMent({ commentId }) {
    const { id } = useParams();
    const [visible, setVisible] = useState(false);
    // Todo
    // 신고하기 기능구현

    const handleReported = async () => {
        try {
            const data = await api.post(
                `/post/${id}/comments/${commentId}/report`
            );
            if (data.status === 200) {
                alert('신고완료!');
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
            <button onClick={() => setVisible(!visible)}>신고 버튼</button>
            {visible && (
                <button onClick={() => handleReported()}>신고하기</button>
            )}
        </>
    );
}
