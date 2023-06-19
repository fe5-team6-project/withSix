import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../../lib/apis/axiosConfig';
import {
    returnErrorMessage,
    returnServerErrorMessage,
} from '../utils/errorMessage';

function CommentReq({ setReload, setCommentCount }) {
    const [text, setText] = useState('');
    const { id } = useParams();
    const sendCommentReq = async () => {
        try {
            const a = await api.post(`/post/${id}/comments`, {
                comment: {
                    content: text,
                },
            });
            console.log(a);
            if (a.status === 200) {
                setReload((prev) => !prev);
                setCommentCount((prev) => prev + 1);
            } else {
                returnServerErrorMessage();
            }
        } catch (error) {
            returnErrorMessage(error);
        } finally {
            setText('');
        }
    };

    return (
        <div>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
            ></input>
            <button onClick={() => sendCommentReq()}>게시</button>
        </div>
    );
}

export default CommentReq;
