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
                        <ImgWrapper>
                            <Img src={item.author.image} />
                        </ImgWrapper>
                        <CommentRight>
                            <RightTop>
                                <div>{item.author.username}</div>
                                <CommentSideToggle
                                    authorId={item.author._id}
                                    commentId={item.id}
                                    setReload={setReload}
                                    setCommentCount={setCommentCount}
                                />
                            </RightTop>
                            <Content>{item.content}</Content>
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
    // justify-content:
    // height: 60px;
    margin: 10px 0px;
`;

const Img = styled.img`
    // display: inline-block;
    width: 50px;
    height: 50px;
    border-radius: 50%;
`;

const CommentRight = styled.div`
    width: 200px;
    flex-grow: 1;
    // background-color: red;
`;

const RightTop = styled.div`
    display: flex;
    justify-content: space-between;
`;

const ImgWrapper = styled.div`
    width: 50px;
    height: 30px;
    object-fit: cover;
`;

const Content = styled.div`
    width: 260px;
    word-break: break-all;
`;
