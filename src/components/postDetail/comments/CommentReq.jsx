import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../../lib/apis/axiosConfig';
import {
    returnErrorMessage,
    returnServerErrorMessage,
} from '../utils/errorMessage';
import { styled } from 'styled-components';

function CommentReq({ setReload, setCommentCount, setComment }) {
    const [text, setText] = useState('');
    const { id } = useParams();
    const sendCommentReq = async () => {
        try {
            const a = await api.post(`/post/${id}/comments`, {
                comment: {
                    content: text,
                },
            });
            if (a.status === 200) {
                // setReload((prev) => !prev);
                setCommentCount((prev) => prev + 1);
                // console.log(a.data);
                setComment((prev) => [...prev, a.data.comment]);
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
        <WriteForm onSubmit={(e) => e.preventDefault()}>
            <Input
                type="text"
                value={text}
                placeholder="댓글 입력"
                onChange={(e) => setText(e.target.value)}
            />
            <Button onClick={() => sendCommentReq()}>게시</Button>
        </WriteForm>
    );
}

export default CommentReq;

const WriteForm = styled.form`
    position: relative;
    display: flex;
    width: 350px;
    // background-color: red;
`;
const Input = styled.input`
    width: 275px;
    margin: 0;
    background-color: white;
    color: black;
    &:focus {
        outline: none;
        &::placeholder {
            color: transparent;
        }
    }
`;

const Button = styled.button`
    position: absolute;
    width: 75px;
    height: 25px;
    right: 0;
    bottom: 0;
`;
