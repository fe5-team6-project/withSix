import React from 'react';
import { styled } from 'styled-components';
import iconHeart from '../../assets/icons/post/icon-heart.svg';
import iconHeartFill from '../../assets/icons/post/icon-heart-fill.svg';
import iconComment from '../../assets/icons/post/icon-comment.svg';

const URL = 'https://api.mandarin.weniv.co.kr';
const DEFALUT_IMAGE = 'http://146.56.183.55:5050/Ellipse.png';

export default function Post(props) {
    const user = props.item.author;
    const { item } = props;
    console.log(item);

    return (
        <Li>
            <a href="#">
                <ProfileWrap>
                    <ProfileLeft>
                        <ImgProfile
                            src={checkProfileImage(user.image)}
                            alt="유저 프로필"
                        />
                    </ProfileLeft>
                    <ProfileRight>
                        <UserName>{user.username}</UserName>
                        <UserId>@ {user.accountname}</UserId>
                    </ProfileRight>
                </ProfileWrap>
                <ImageWrap>
                    {item.image ? (
                        <ImgContent
                            src={item.image}
                            onError={(e) => emptyImage(e)}
                            alt="등록된이미지"
                        />
                    ) : null}
                </ImageWrap>
                <ContentWrap>
                    <p>{item.content}</p>
                    <span>{}</span>
                </ContentWrap>
                <EtcWrap>
                    <img
                        src={item.hearted ? iconHeartFill : iconHeart}
                        alt="좋아요"
                    />
                    <span>{item.heartCount}</span>
                    <img src={iconComment} alt="댓글" />
                    <span>{item.comments.length}</span>
                </EtcWrap>
            </a>
        </Li>
    );
}

function checkProfileImage(image) {
    let src = image;

    if (!src) {
        src = DEFALUT_IMAGE;
        return src;
    }

    src = `${URL}/${image}`;
    return src;
}

function emptyImage(e) {
    e.currentTarget.style.display = 'none';
}

const Li = styled.li`
    width: 350px;
    margin: 20px auto;
    background-color: white;
    border-radius: var(--radius-m);
    color: var(--color-gray);
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

const SectionDefault = styled.section`
    width: 100%;
    box-sizing: border-box;
`;

const ProfileWrap = styled(SectionDefault)`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 20px;
`;

const ProfileLeft = styled.section`
    width: 30px;
    border-radius: 50%;
    overflow: hidden;
`;

const ImgProfile = styled.img`
    width: 30px;
    margin-right: 5px;
    vertical-align: middle;
`;

const ProfileRight = styled.section`
    line-height: 12px;
`;

const ImageWrap = styled(SectionDefault)`
    width: 100%;
`;

const ImgContent = styled.img`
    width: 350px;
    height: 192px;
    object-fit: cover;
`;

const ContentWrap = styled(SectionDefault)`
    display: -webkit-box;
    max-height: 60px;
    padding: 20px;
    font-size: var(--fsize-m);
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
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
