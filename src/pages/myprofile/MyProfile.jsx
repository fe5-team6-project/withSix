import React from 'react';
import Common from '../../components/design/main/Common';
import { Link } from 'react-router-dom';
import logout from '../../assets/icons/common/icon-logout.svg';
import { styled } from 'styled-components';

export default function MyProfile() {
    const page = (
        <LayoutDiv>
            <Section>
                <h2 className="a11y-hidden">프로필 이미지</h2>
                <img src="" alt="" />
            </Section>

            <Section>
                <h2 className="a11y-hidden">팔로우</h2>
                <FollowDiv className="followers">
                    <Label>Followers</Label>
                    <FollowLink to={''}>{9999}</FollowLink>
                </FollowDiv>
                <FollowDiv className="followings">
                    <Label>Followings</Label>
                    <FollowLink to={''}>{9999}</FollowLink>
                </FollowDiv>
            </Section>

            <Section>
                <h2 className="a11y-hidden">프로필</h2>
                <Div className="id">
                    <Label>ID</Label>
                    <Strong>{'ungheung'}</Strong>
                </Div>
                <Div>
                    <Label>Nickname</Label>
                    <Strong>{'ungheung'}</Strong>
                </Div>
                <Div>
                    <Label>Introduce</Label>
                    <Strong>{'자기소개입니다.'}</Strong>
                </Div>
            </Section>

            <Section>
                <span></span>
            </Section>
            <Div>
                <button>프로필 수정</button>
                <LogoutLink to={'/'}>
                    <img src={logout} alt="로그아웃 아이콘" />
                    Logout
                </LogoutLink>
            </Div>
        </LayoutDiv>
    );

    const pageTitle = '프로필';
    const pageDesc = `${'아이디'}님의 프로필을 확인합니다.`;

    return (
        <>
            <Common page={page} title={pageTitle} desc={pageDesc} />;
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
