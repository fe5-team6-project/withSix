import { useCallback, useEffect, useState } from 'react';
import CommentReq from './CommentReq';
import { useParams } from 'react-router-dom';
import { returnServerErrorMessage } from '../utils/errorMessage';
import { api } from '../../../lib/apis/axiosConfig';
import CommentSideToggle from './sideToggle';
import { styled } from 'styled-components';
import { useInView } from 'react-intersection-observer';

export default function Comments({ setCommentCount, commentCount }) {
    const { id } = useParams();
    const [comment, setComment] = useState([]);
    const [reload, setReload] = useState(false);
    const [ref, inView] = useInView();
    const [page, setPage] = useState(0); // 현재 페이지 번호 (페이지네이션)
    const fetchComment = useCallback(async () => {
        try {
            // console.log(page);
            const {
                data: { comments },
                // https://api.mandarin.weniv.co.kr/post/648fa8f9b2cb2056633a809c/comments?limit=3&skip=9
            } = await api.get(`/post/${id}/comments/?limit=5&skip=${page * 5}`);
            // 리스트 뒤로 붙여주기
            // console.log(page);
            // console.log(comments);
            // console.log(page);
            // console.log(comment, comments);
            setComment([...comment, ...comments]);
            // 요청 성공 시에 페이지에 1 카운트 해주기
            setPage((page) => page + 1);
        } catch (error) {
            returnServerErrorMessage(error);
        }
    }, [reload, inView]);

    useEffect(() => {
        if (inView) {
            // console.log(inView, '무한 스크롤 요청 🎃');

            fetchComment();
        }
        // fetchComment();
    }, [reload, inView, ref]);

    if (!comment) return <div>Loading...</div>;
    return (
        <>
            <CommentWrapper>
                {/* {console.log(comment)} */}
                {comment.map((item, idx) => (
                    <Li key={idx}>
                        <ImgWrapper>
                            <Img src={item.author.image} />
                        </ImgWrapper>
                        <CommentRight>
                            <RightTop>
                                <UserName>{item.author.username}</UserName>
                                <CommentSideToggle
                                    authorId={item.author._id}
                                    commentId={item.id}
                                    setReload={setReload}
                                    setComment={setComment}
                                    setCommentCount={setCommentCount}
                                    comment={comment}
                                />
                            </RightTop>
                            <Content>{item.content}</Content>
                        </CommentRight>
                    </Li>
                ))}
                {commentCount > comment.length ? <div ref={ref}></div> : null}
            </CommentWrapper>
            <CommentReq
                setComment={setComment}
                setReload={setReload}
                setCommentCount={setCommentCount}
            />
        </>
    );
}

const CommentWrapper = styled.ul`
    // background-color: var(--color-gray);
    height: 300px;
    overflow: auto;
    padding: 10px;
`;

const Li = styled.li`
    display: flex;
    // justify-content:
    // height: 60px;
    margin-bottom: 20px;
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
    height: 50px;
    margin-right: 5px;
    object-fit: cover;
`;

const UserName = styled.div`
    margin-bottom: 3px;
`;

const Content = styled.div`
    width: 260px;
    word-break: break-all;
`;
