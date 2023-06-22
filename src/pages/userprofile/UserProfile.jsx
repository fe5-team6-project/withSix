import React, { useEffect, useState } from 'react';
import Common from '../../components/main/Common';
import { Link, useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import getUserProfile from './getUserProfile';
import { validationProfileImage } from '../../components/post/validationProfileImage';

export default function UserProfile() {
    const accountname = useParams().id;
    console.log(accountname);
    const [profile, setProfile] = useState(undefined);

    useEffect(() => {
        getProfile();
    }, []);

    async function getProfile() {
        const user = await getUserProfile(accountname);
        setProfile(user);
    }

    console.log(profile);

    const page = (
        <LayoutDiv>
            <ImageWrap>
                <h2 className="a11y-hidden">프로필 이미지</h2>
                <Img
                    src={validationProfileImage(profile?.image)}
                    alt="유저 프로필 이미지"
                />
            </ImageWrap>

            <Section>
                <h2 className="a11y-hidden">팔로우</h2>
                <FollowDiv className="followers">
                    <Label>Followers</Label>
                    <FollowLink to={''}>{profile?.followerCount}</FollowLink>
                </FollowDiv>
                <FollowDiv className="followings">
                    <Label>Followings</Label>
                    <FollowLink to={`/profile/${accountname}/following`}>{profile?.followingCount}</FollowLink>
                </FollowDiv>
            </Section>

            <Section>
                <h2 className="a11y-hidden">프로필</h2>
                <Div className="id">
                    <Label>ID</Label>
                    <Strong>{profile?.accountname}</Strong>
                </Div>
                <Div>
                    <Label>Nickname</Label>
                    <Strong>{profile?.username}</Strong>
                </Div>
                <Div>
                    <Label>Introduce</Label>
                    <Strong>{profile?.intro}</Strong>
                </Div>
            </Section>

            <Section>
                <span></span>
            </Section>
            <Div>
                <Button>팔로우 수정</Button>
            </Div>
        </LayoutDiv>
    );

    const pageTitle = '프로필';
    const pageDesc = `${profile?.username}님의 프로필을 확인합니다.`;

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

const Button = styled.button`
    &:disabled {
        color: var(--color-disabled);
    }
`;
