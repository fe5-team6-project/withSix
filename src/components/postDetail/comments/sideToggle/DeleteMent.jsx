import { useState } from 'react';

import { api } from '../../../../lib/apis/axiosConfig';
import { useParams } from 'react-router-dom';
import {
    returnErrorMessage,
    returnServerErrorMessage,
} from '../../utils/errorMessage';

const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzZkN2I3YjJjYjIwNTY2MzJkMDA5MyIsImV4cCI6MTY5MDgxNzQyOCwiaWF0IjoxNjg1NjMzNDI4fQ.fuRi1qVjgU4C7my-RPJrPOoBFjAvSHauogh8alP9mbI';
const postId = '6478c001b2cb2056632d23f2'; //post 아이디가 필요하기 때문에 전역변수로 설정하던지 context 사용해야 할듯
//Comment 컴포넌트에는 게시글 아이디가 없다

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
            <button onClick={() => setVisible(!visible)}>삭제 버튼</button>
            {visible && <button onClick={() => handleRemoved()}>삭제</button>}
        </>
    );
}
