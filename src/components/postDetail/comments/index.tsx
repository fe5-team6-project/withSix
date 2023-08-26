import { useCallback, useEffect, useState } from 'react';
import CommentReq from './CommentReq';
import { useNavigate, useParams } from 'react-router-dom';
import { returnServerErrorMessage } from '../utils/errorMessage';
import { api } from '../../../lib/apis/axiosConfig';
import CommentSideToggle from './sideToggle';
import { styled } from 'styled-components';
import { useInView } from 'react-intersection-observer';
import { setUserInfo } from '../../../store/slices/userSlice';
import { useDispatch } from 'react-redux';
import getUserProfile from '../../../pages/profile/userprofile/getUserProfile';
import { CommentPropsBase } from '../../../lib/utils/interface/interface';

interface CommentProps {
    setCommentCount: Function;
    commentCount: number;
    accountname: string;
}

export default function Comments({
    setCommentCount,
    commentCount,
    accountname,
}: CommentProps) {
    const { id } = useParams();
    const [comment, setComment] = useState<CommentPropsBase[]>([]);
    const [reload, setReload] = useState(false);
    const [ref, inView] = useInView();
    const [page, setPage] = useState<number>(0); // 현재 페이지 번호 (페이지네이션)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const fetchComment = useCallback(async () => {
        try {
            // console.log(page);
            const {
                data: { comments },
            } = await api.get(
                `/post/${id}/comments/?limit=10&skip=${page * 10}`
            );
            // console.log(comments);
            setComment([...comment, ...comments]);
            // 요청 성공 시에 페이지에 1 카운트 해주기
            setPage((page) => page + 1);
        } catch (error) {
            returnServerErrorMessage();
        }
    }, [reload, inView]);

    useEffect(() => {
        if (inView) {
            // console.log(inView, '무한 스크롤 요청 🎃');

            fetchComment();
        }
        // fetchComment();
    }, [reload, inView, ref]);

    async function setUser(accountname: string) {
        const user = await getUserProfile(accountname);
        dispatch(setUserInfo(user));
    }

    if (!comment) return <div>Loading...</div>;
    return (
        <>
            <CommentWrapper>
                {comment.map((item, idx) => (
                    <Li key={idx}>
                        <ImgWrapper
                            onClick={async () => {
                                await setUser(item.author.accountname);
                                navigate(
                                    `../profile/${item.author.accountname}`
                                );
                            }}
                        >
                            <Img src={item.author.image} />
                        </ImgWrapper>
                        <CommentRight>
                            <RightTop>
                                <UserName
                                    onClick={async () => {
                                        await setUser(item.author.accountname);
                                        navigate(
                                            `../profile/${item.author.accountname}`
                                        );
                                    }}
                                >
                                    {item.author.username}
                                </UserName>
                                <CommentSideToggle
                                    authorId={item.author._id}
                                    commentId={item.id}
                                    setReload={setReload}
                                    setComment={setComment}
                                    setCommentCount={setCommentCount}
                                    comment={comment}
                                />
                            </RightTop>
                            <ContentWrapper>
                                <Content>{item.content}</Content>
                            </ContentWrapper>
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
    max-height: 300px;
    min-height: 250px;
    overflow: auto;
    padding: 10px;
    border-top: 1px solid var(--color-disabled);
    border-bottom: 1px solid var(--color-disabled);
    box-sizing: border-box;
`;

const Li = styled.li`
    display: flex;
    // justify-content:
    // height: 60px;
    margin-bottom: 10px;
    padding: 10px;
    background-color: white;
    border-radius: var(--radius-m);
    font-size: var(--fsize-m);
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
    align-items: center;
`;

const ImgWrapper = styled.div`
    width: 50px;
    height: 50px;
    margin-right: 5px;
    object-fit: cover;
    cursor: pointer;
`;

const UserName = styled.div`
    cursor: pointer;
    font-size: var(--fsize-s);
`;

const ContentWrapper = styled.div`
    width: 260px;
    word-break: break-all;
`;

const Content = styled.span``;
