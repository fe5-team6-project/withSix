import { useCallback, useEffect, useState } from 'react';
import CommentReq from './CommentReq';
import { useParams } from 'react-router-dom';
import { returnServerErrorMessage } from '../utils/errorMessage';
import { api } from '../../../lib/apis/axiosConfig';
import CommentSideToggle from './sideToggle';

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
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                {comment.map((item) => (
                    <div key={item.id}>
                        <img src={item.author.image}></img>
                        <p>{item.author.username}</p>
                        <p>{item.content}</p>
                        <CommentSideToggle
                            authorId={item.author._id}
                            commentId={item.id}
                            setReload={setReload}
                            setCommentCount={setCommentCount}
                        />
                    </div>
                ))}
            </div>
            <CommentReq
                setReload={setReload}
                setCommentCount={setCommentCount}
            />
        </>
    );
}
