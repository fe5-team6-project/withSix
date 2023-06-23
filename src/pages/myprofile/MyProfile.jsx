import React from 'react';
import Common from '../../components/main/Common';
import { Link, useNavigate } from 'react-router-dom';
import logout from '../../assets/icons/common/icon-logout.svg';
import { styled } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { setMyInfo } from '../../store/slices/userSlice';

export default function MyProfile() {
    const user = useSelector((state) => state.user?.myInfo);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function logoutHandle() {
        localStorage.clear();
        (function resetUser() {
            dispatch(
                setMyInfo({
                    _id: String,
                    username: String,
                    isfollow: false,
                    intro: String,
                    image: String,
                    followingCount: Number,
                    following: Array,
                    followerCount: Number,
                    follower: Array,
                    accountname: String,
                })
            );
        })();
    }

    const page = (
        <LayoutDiv>
            <ImageWrap>
                <h2 className="a11y-hidden">프로필 이미지</h2>
                <Img src={user?.image} alt="" />
            </ImageWrap>

            <Section>
                <h2 className="a11y-hidden">팔로우</h2>
                <FollowDiv className="followers">
                    <Label>Followers</Label>
                    <FollowLink to={`/profile/${user.accountname}/follower`}>
                        {user?.followerCount}
                    </FollowLink>
                </FollowDiv>
                <FollowDiv className="followings">
                    <Label>Followings</Label>
                    <FollowLink to={`/profile/${user.accountname}/following`}>
                        {user?.followingCount}
                    </FollowLink>
                </FollowDiv>
            </Section>

            <Section>
                <h2 className="a11y-hidden">프로필</h2>
                <Div className="id">
                    <Label>ID</Label>
                    <Strong>{user?.accountname}</Strong>
                </Div>
                <Div>
                    <Label>Nickname</Label>
                    <Strong>{user?.username}</Strong>
                </Div>
                <Div>
                    <Label>Introduce</Label>
                    <Strong>{user?.intro}</Strong>
                </Div>
            </Section>

            <Section>
                <span></span>
            </Section>
            <Div>
                <Button
                    onClick={() => {
                        navigate('./update');
                    }}
                >
                    프로필 수정
                </Button>
                <LogoutLink onClick={() => logoutHandle()} to={'/'}>
                    <img src={logout} alt="로그아웃 아이콘" />
                    Logout
                </LogoutLink>
            </Div>
        </LayoutDiv>
    );

    const pageTitle = '프로필';
    const pageDesc = `${user?.username}님의 프로필을 확인합니다.`;

    return (
        <>
            <Common page={page} title={pageTitle} desc={pageDesc} />
        </>
    );
}

const LayoutDiv = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
    width: 390px;
    height: calc(100vh - 120px);
    margin: 0 auto;
    padding: 40px 0;
    box-sizing: border-box;
`;

const Section = styled.section`
    width: 240px;
`;

const ImageWrap = styled.section`
    position: relative;
    width: 100px;
    height: 100px;
    margin-top: 50px;
    border-radius: 50%;
    overflow: hidden;
`;

const Img = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 50% 50%;
`;

const Div = styled.div`
    position: relative;
    height: 70px;
    text-align: center;
`;

const FollowDiv = styled(Div)`
    width: 50%;

    &.followers {
        float: left;
    }

    &.followings {
        float: right;
    }
`;

const FollowLink = styled(Link)`
    font-size: var(--fsize-title);
    font-style: italic;
    font-weight: bold;
    color: var(--color-main);
`;

const Label = styled.label`
    display: block;
    width: 240px;
    font-size: var(--fsize-s);
    font-style: italic;
    font-weight: lighter;
    color: var(--color-gray);
    text-align: left;
`;

const Strong = styled.strong`
    color: var(--color-main);

    ${Div}.id > & {
        font-family: var(--font-eng);
        font-style: italic;
    }
    ${Div}.id > &::before {
        content: '@';
    }
`;

const LogoutLink = styled(Link)`
    position: absolute;
    right: 5px;
    bottom: 0;
    font-size: var(--fsize-s);
    color: var(--color-gray);

    & > img {
        margin-right: 5px;
    }
`;

const Button = styled.button`
    &:disabled {
        color: var(--color-disabled);
    }
`;
