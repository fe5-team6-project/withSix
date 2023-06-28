import Header from '../header/Header';
import Footer from '../footer/Footer';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMyInfo } from '../../store/slices/userSlice';
import checkToken from '../../pages/login/checkToken';
import getMyInfo from '../../pages/login/getMyInfo';
import Modal from '../modal/Modal';
import Splash from '../common/Splash';
import NotFound from '../common/NotFound';

export default function Common(props) {
    const navigator = useNavigate();
    const dispatch = useDispatch();
    // 비로그인시 자동이동을 무시해야할 페이지에 사용
    const autoMove = props.autoMoveIgnore ? true : false;
    const [isSplash, setIsSplash] = useState(props.isSplash);
    const [isNotFound, setIsNotFound] = useState(true);

    const userInfo = useSelector((state) => state.user?.myInfo);
    const [user, setUser] = useState(userInfo);

    useEffect(() => {
        setTimeout(() => {
            setIsSplash(false);
        }, 600);
    }, [isSplash]);

    useEffect(() => {
        checkLogin();
    }, [user]);

    async function checkLogin() {
        if (checkToken()) {
            const user = await getMyInfo();
            dispatch(setMyInfo(user));
        } else {
            setUser('');
            // 자동이동 무시 여부 체크
            if (!autoMove) {
                navigator('/');
            }
        }
    }

    const modal = useSelector((state) => state?.modal);
    const modalVisible = modal.display.isVisible;

    return (
        <>
            <Header />
            <StyledMain>
                <FixedLayout>
                    {props.title ? (
                        <TitleWrap>
                            <H2>{props.title}</H2>
                            <Span>{props.desc}</Span>
                        </TitleWrap>
                    ) : null}
                    {props.page}
                </FixedLayout>
            </StyledMain>
            <Footer />
            {/* 모달 표시 위치 */}
            {modalVisible && <Modal />}
            {isSplash && <Splash />}
            {isNotFound && <NotFound />}
        </>
    );
}

const StyledMain = styled.main`
    /* position: relative; */
    width: 100%;
    max-width: 900px;
    max-height: calc(100vh - 120px);
    margin: 70px auto 50px;
    padding: 0 10px;
    box-sizing: border-box;
    overflow-x: hidden;
    overflow-y: auto;
`;

const FixedLayout = styled.div`
    position: relative;
    width: 390px;
    margin: 0 auto;
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
    font-size: var(--fsize-s);
    color: var(--color-gray);
`;
