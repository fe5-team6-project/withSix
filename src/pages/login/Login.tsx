import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import signupIcon from '../../assets/icons/common/icon-signup.svg';
import handleLogin from './handleLogin';
import getMyInfo from './getMyInfo';
import {
    setContent,
    setIsVisible,
    setUrl,
} from '../../store/slices/modalSlice';
import Modal from '../../components/modal/Modal';
import { setMyInfo } from '../../store/slices/userSlice';
import { validationLogin } from '../../lib/utils/validation/validation';
import SplashLogin from '../../components/common/SplashLogin';
import { ModalPropsBase } from '../../lib/utils/interface/interface';
import { FORM_EVENT } from '../../lib/utils/type/eventType';

/**
 * 로그인 요청시
 *  1. 입력 데이터 유효성 확인
 *  2. 로그인 시 유저 정보를 전역에서 사용하도록 리덕스로 관리
 *  3. 토큰은 새로고침 후에도 삭제되지 않도록 로컬 스토리지에 저장
 *
 *  >> 이메일 문제인지 비밀번호 문제인지 따로 알려주지 않음(보안)
 *  >> 토큰은 직접 삭제(로그아웃)할 때까지 저장
 */
export default function Login() {
    const dispatch = useDispatch();
    const modal = useSelector((state: ModalPropsBase) => state?.modal);
    const modalVisible = modal.display.isVisible;
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isShowSplash, setIsShowSplash] = useState(true);
    const setModalContent = (props: ModalPropsBase['modal']['content']) => {
        dispatch(
            setContent({
                state: props.state,
                message: props.message,
            })
        );
    };
    const setModalUrl = (url: string) => {
        dispatch(setUrl({ url: url }));
    };
    const setModalVisible = (isVisible: boolean) => {
        dispatch(setIsVisible({ isVisible: isVisible }));
    };

    useEffect(() => {
        setTimeout(() => {
            setIsShowSplash(false);
        }, 1500);
    }, []);

    async function handleSubmit(e: FORM_EVENT) {
        e.preventDefault();

        /**
         * 로그인 유효성
         * 데이터 입력 확인
         * 이메일, 비밀번호 형식 확인
         */
        const validLogin = validationLogin(email, password);
        if (!validLogin.state) {
            setModalContent(validLogin);
            setModalVisible(true);
            return false;
        }

        /**
         * 로그인 요청
         *  요청 시 결과와 메시지(모달)를 반환받음
         *  결과를 모달에 저장 후 결과에 따라 모달 분기 처리
         *
         * 로그인 실패
         *  모달 출력
         * 로그인 성공
         *  로그인 유저 정보를 받아와 상태에 저장
         *  home으로 이동할 수 있도록 url을 담아주고 모달 출력
         */
        const status = await handleLogin(email, password);
        setModalContent(status);

        if (!status.state) {
            setModalVisible(true);
            return false;
        }

        const user = await getMyInfo();

        if (user[0] === false) {
            setModalContent(user[1]);
            setModalVisible(true);
            return false;
        }

        dispatch(setMyInfo(user));
        setModalUrl('/home');
        setModalVisible(true);
        return status.state;
    }

    return (
        <>
            <Form
                onSubmit={async (e: FORM_EVENT) => {
                    const state = await handleSubmit(e);
                    console.log(state);
                }}
            >
                <Div>
                    <Input
                        className="font-eng"
                        id="email"
                        type="text"
                        placeholder=" "
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                    <Label className="font-eng" htmlFor="email">
                        E-mail
                    </Label>
                </Div>
                <Div>
                    <Input
                        className="font-eng"
                        id="password"
                        type="password"
                        placeholder=" "
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                    <Label className="font-eng" htmlFor="password">
                        Password
                    </Label>
                </Div>
                <Div>
                    <Button>로그인</Button>
                    <SignupLink to={'/signup'}>
                        <img src={signupIcon} alt="회원가입 아이콘" />
                        Signup
                    </SignupLink>
                </Div>
            </Form>
            {modalVisible && <Modal />}
            {isShowSplash && <SplashLogin />}
        </>
    );
}

const Form = styled.form`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
    width: 390px;
    height: calc(100vh - 550px);
    margin: 0 auto;
    padding: 40px 0;
    box-sizing: border-box;
`;

const Div = styled.div`
    position: relative;
    height: 50px;
`;

const Label = styled.label`
    position: absolute;
    top: 0;
    left: 10px;
    display: block;
    width: 240px;
    height: 50px;
    font-size: var(--fsize-l);
    font-style: italic;
    line-height: 50px;
    color: var(--color-gray);
    cursor: text;
    transition: top, height, font 0.3s, 0.3s;
`;

const Input = styled.input`
    height: 1px;
    border: 1px solid var(--color-main);
    box-sizing: border-box;
    font-style: italic;
    vertical-align: bottom;
    transition: height, border-radius 0.3s, 0.3s;

    &:focus,
    &:not(:placeholder-shown) {
        height: 50px;
        margin-top: 0;
        background-color: var(--color-main);
        border-radius: var(--radius-m);
    }

    &:focus + ${Label}, &:not(:placeholder-shown) + ${Label} {
        top: -20px;
        left: 0px;
        height: 70px;
        font-size: var(--fsize-s);
        line-height: 20px;
        z-index: -1;
    }
`;

const SignupLink = styled(Link)`
    position: absolute;
    right: 5px;
    bottom: -20px;
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
