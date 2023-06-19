import React from 'react';
import { styled } from 'styled-components';
import logo from '../../assets/logo/LOGO-negative.svg';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import prevPage from '../../assets/icons/common/icon-back.svg';

export default function Header() {
    const user = useSelector((state) => state.user.myInfo);

    return (
        <StyledHeader>
            <Div>
                <H1>
                    <Link to={'/home'}>
                        <Img src={logo} alt="로고" />
                    </Link>
                </H1>

                <Article>
                    <Strong>{user.username}</Strong>
                </Article>
            </Div>
            <BackLink>
                <img src={prevPage} alt="뒤로가기 아이콘" />
            </BackLink>
        </StyledHeader>
    );
}

const StyledHeader = styled.header`
    position: fixed;
    top: 0;
    left: 50%;
    width: 100vw;
    background-color: var(--color-main);
    border-bottom-left-radius: var(--radius-l);
    border-bottom-right-radius: var(--radius-l);
    line-height: 70px;
    transform: translateX(-50%);
    z-index: 1;
`;

const Div = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    /* max-width: var(--cont-width-max); */
    height: 70px;
    margin: 0 auto;
    padding: 0 10px;
    box-sizing: border-box;
    font-size: 0;
`;

const H1 = styled.h1`
    display: inline-block;
    width: 50px;
    height: 70px;
`;

const Img = styled.img`
    width: 50px;
    margin: 10px 0 0 10px;
`;

const Article = styled.article`
    display: inline-block;
    width: 200px;
    text-align: right;
`;

const Strong = styled.strong`
    margin-right: 10px;
    font-size: var(--fsize-l);
    color: white;

    &::after {
        content: '님';
        font-weight: 500;
        font-size: var(--fsize-m);
    }
`;

const BackLink = styled(Link)`
    position: absolute;
    top: 60px;
    left: 50%;
    display: block;
    width: 390px;
    padding: 0 20px;
    box-sizing: border-box;
    transform: translate(-50%);
    /* z-index: ; */
`;
