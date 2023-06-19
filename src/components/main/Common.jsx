import Header from '../header/Header';
import Footer from '../footer/Footer';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMyInfo } from '../../store/slices/userSlice';
import checkToken from '../../pages/login/checkToken';
import getMyInfo from '../../pages/login/getMyInfo';

export default function Common(props) {
    const navigator = useNavigate();
    const dispatch = useDispatch();
    const autoMove = props.autoMoveIgnore ? true : false;

    const userInfo = useSelector((state) => state.user.myInfo);
    const [user, setUser] = useState(userInfo);

    useEffect(() => {
        checkLogin();
    }, [user]);

    async function checkLogin() {
        if (checkToken()) {
            const user = await getMyInfo();
            dispatch(setMyInfo(user));
        } else {
            setUser('');
            if (!autoMove) {
                navigator('/');
            }
        }
    }

    return (
        <>
            <Header />
            <StyledMain>
                {props.title ? (
                    <TitleWrap>
                        <H2>{props.title}</H2>
                        <Span>{props.desc}</Span>
                    </TitleWrap>
                ) : null}
                {props.page}
            </StyledMain>
            <Footer />
        </>
    );
}

const StyledMain = styled.main`
    position: relative;
    width: 100%;
    max-width: 900px;
    max-height: calc(100vh - 120px);
    margin: 70px auto 50px;
    padding: 0 10px;
    box-sizing: border-box;
    overflow-y: auto;
`;

const TitleWrap = styled.section`
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
`;

const H2 = styled.h2`
    width: 100%;
    height: 30px;
    margin-top: 50px;
    text-align: center;
    font-size: var(--fsize-title);
`;
const Span = styled.span`
    display: block;
    width: 100%;
    height: 20px;
    text-align: center;
    font-size: var(--fsize-m);
    color: var(--color-gray);
`;
