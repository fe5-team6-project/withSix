import { useState } from 'react';
import { api } from '../../../lib/apis/axiosConfig';
import { useNavigate, useParams } from 'react-router-dom';
import {
    returnErrorMessage,
    returnServerErrorMessage,
} from '../utils/errorMessage';

export default function ModifyAndDelete() {
    const [visible, setVisible] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    // Todo
    // 수정,삭제 기능 구현

    const handlePostRemove = async () => {
        try {
            const res = await api.delete(`/post/${id}`);
            if (res.status === 200) {
                alert('삭제완료');
                navigate(-1);
            } else returnServerErrorMessage();
        } catch (error) {
            returnErrorMessage(error);
        }
    };

    const handlePostModify = () => {
        //TODO
        //게시글수정페이지로 라우팅
    };

    return (
        <>
            <button onClick={() => setVisible(!visible)}>수정,삭제 버튼</button>
            {visible && (
                <>
                    <button onClick={handlePostModify}>수정</button>
                    <button onClick={handlePostRemove}>삭제</button>
                </>
            )}
        </>
    );
}
