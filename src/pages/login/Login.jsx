import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import signupIcon from '../../assets/icons/common/icon-signup.svg';
import handleLogin from './handleLogin';
import getMyInfo from './getMyInfo';
import { validationLogin } from '../../lib/apis/validation/validation';
import {
    setContent,
    setIsVisible,
    setUrl,
} from '../../store/slices/modalSlice';
import Modal from '../../components/modal/Modal';

export default function Login() {
    const dispatch = useDispatch();
    const modal = useSelector((state) => state?.modal);
    const modalVisible = modal.display.isVisible;

    const setModalContent = (props) => {
        dispatch(
            setContent({
                state: props.state,
                message: props.message,
            })
        );
    };
    const setModalUrl = (url) => {
        dispatch(setUrl({ url: url }));
    };
    const setModalVisible = (isVisible) => {
        dispatch(setIsVisible({ isVisible: isVisible }));
    };

    async function handleSubmit(e) {
        e.preventDefault();
        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;

        const validLogin = validationLogin(email, password);
        if (!validLogin.state) {
            setModalContent(validLogin);
            setModalVisible(true);
            return false;
        }

        const status = await handleLogin();
        setModalContent(status);

        if (!status.state) {
            dispatch(setIsVisible({ isVisible: true }));
            setModalVisible(true);
            return false;
        }
        const user = await getMyInfo();
        setModalUrl('/home');
        setModalVisible(true);
        return status.state;
    }

    return (
        <>
            <Form
                onSubmit={(e) => {
                    handleSubmit(e);
                }}
            >
                <Div>
                    <Input
                        className="font-eng"
                        id="email"
                        type="text"
                        placeholder=" "
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
                    />
                    <Label className="font-eng" htmlFor="password">
                        Password
                    </Label>
                    <ForgotLink href={'/'}>forgot :(</ForgotLink>
                </Div>
                <Div>
                    <Button>로그인</Button>
                    <SignupLink to={'/signup'}>
                        <img src={signupIcon} alt="회원가입 아이콘" />
                        Signup
                    </SignupLink>
                </Div>
            </Form>
            {modalVisible ? <Modal /> : undefined}
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

const ForgotLink = styled(Link)`
    position: absolute;
    bottom: -20px;
    right: 5px;
    font-size: var(--fsize-s);
    font-style: italic;
    color: var(--color-gray);
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
