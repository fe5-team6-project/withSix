import { useCallback, useEffect, useState } from 'react';
import CommentReq from './CommentReq';
import { useParams } from 'react-router-dom';
import { returnServerErrorMessage } from '../utils/errorMessage';
import { api } from '../../../lib/apis/axiosConfig';
import CommentSideToggle from './sideToggle';
import { styled } from 'styled-components';

export default function Comments({ setCommentCount }) {
    const { id } = useParams();
    const [comment, setComment] = useState([]);
    const [reload, setReload] = useState(false);

    const fetchComment = useCallback(async () => {
        try {
            const {
                data: { comments },
            } = await api.get(`/post/${id}/comments`);
            setComment(comments);
        } catch (error) {
            returnServerErrorMessage(error);
        }
    }, [reload]);

    useEffect(() => {
        fetchComment();
    }, [reload]);

    if (!comment) return <div>Loading...</div>;
    return (
        <>
            <CommentWrapper>
                {comment.map((item) => (
                    <Li key={item.id}>
                        <Img src={item.author.image} />
                        <CommentRight>
                            <span>{item.author.username}</span>
                            <CommentSideToggle
                                authorId={item.author._id}
                                commentId={item.id}
                                setReload={setReload}
                                setCommentCount={setCommentCount}
                            />
                            <p>{item.content}</p>
                        </CommentRight>
                    </Li>
                ))}
            </CommentWrapper>
            <CommentReq
                setReload={setReload}
                setCommentCount={setCommentCount}
            />
        </>
    );
}

const CommentWrapper = styled.ul`
    // background-color: var(--color-gray);
`;

const Li = styled.li`
    display: flex;
    margin: 10px 0px;
`;

const Img = styled.img`
    display: inline-block;
`;

const CommentRight = styled.div`
    width: 200px;
    background-color: red;
`;
