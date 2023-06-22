import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../lib/apis/axiosConfig';
import { returnErrorMessage } from './utils/errorMessage';
import { URL } from '../../lib/apis/constants';
import LikeBtn from '../../components/likeButton';
import PostSideToggle from './postSideToggle';
import Comments from './comments';
import Common from '../main/Common';
import { styled } from 'styled-components';
import iconComment from '../../assets/icons/post/icon-comment.svg';
import Slick from '../slick';

// const postId = '6478c001b2cb2056632d23f2';

export default function PostDetail() {
    const { id } = useParams();
    const [data, setData] = useState('');
    const [commentCount, setCommentCount] = useState('');

    const fetchData = async () => {
        try {
            const {
                data: { post },
            } = await api.get(`/post/${id}`);
            setData(post);
            setCommentCount(post.commentCount);
        } catch (error) {
            returnErrorMessage(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (!data) return;

    return (
        <Common
            page={
                <Div>
                    <ProfileWrap>
                        <ProfileLeft>
                            <ImgProfile src={data.author.image} />
                        </ProfileLeft>
                        <ProfileRight>
                            <UserName>{data.author.username}</UserName>
                            <UserId>@{data.author.accountname}</UserId>
                        </ProfileRight>
                        <PostSideToggle postAuthorId={data.author._id} />
                    </ProfileWrap>
                    {/* key={img}
                            src={img}
                            width={100}
                            height={100}
                            alt="이미지" */}

                    {/* 사용자가 등록한 게시글 이미지 표시 */}
                    <ImageWrap>
                        {/* {data.image.split(',').map((img) => (
                            <ImgContent
                                key={img}
                                src={img}
                                width={100}
                                height={100}
                                alt="이미지"
                            />
                        ))} */}
                        <Slick images={data.image} />
                    </ImageWrap>

                    <Content>{data.content}</Content>
                    <EtcWrap>
                        <LikeBtn data={data} />
                        <img src={iconComment} alt="댓글" />
                        <span>{commentCount}</span>
                    </EtcWrap>
                    <Comments
                        setCommentCount={setCommentCount}
                        commentCount={commentCount}
                    />
                </Div>
            }
        />
    );
}

const Div = styled.div`
    width: 350px;
    margin: 30px auto;
`;

const SectionDefault = styled.section`
    width: 100%;
    box-sizing: border-box;
`;

const ProfileWrap = styled(SectionDefault)`
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 20px;
`;
const ProfileLeft = styled.section`
    width: 30px;
    height: 30px;
    margin-right: 5px;
    border-radius: 50%;
    overflow: hidden;
`;

const ImgProfile = styled.img`
    width: 100%;
    vertical-align: middle;
`;

const ProfileRight = styled.section`
    line-height: 12px;
`;

const UserName = styled.strong`
    display: block;
    font-size: var(--fsize-m);
`;

const UserId = styled.span`
    font-family: var(--font-eng);
    font-size: var(--fsize-s);
    font-style: italic;
    color: var(--color-gray);
`;

const ImageWrap = styled(SectionDefault)`
    width: 100%;
`;

const ImgContent = styled.img`
    width: 350px;
    height: 192px;
    object-fit: cover;
`;

const Content = styled.p`
    width: 200px;
    margin: 30px 0px;
`;

const EtcWrap = styled(SectionDefault)`
    padding: 20px;
    text-align: right;

    & > img {
        width: 12px;
        margin-right: 5px;
        vertical-align: middle;
    }

    & > span {
        font-family: var(--font-eng);
        font-size: 14px;
        font-style: italic;
        color: var(--color-gray);
    }

    & > span:first-of-type {
        margin-right: 5px;
    }
`;
