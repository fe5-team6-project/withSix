import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { setUser } from '../../store/slices/userSlice';

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const movePage = (url) => {
        if (!checkToken) {
            return false;
        }

        navigate(url);
    };

    return (
        <Form
            onSubmit={async (e) => {
                e.preventDefault();
                const status = await handleLogin();
                const user = await getMyInfo();
                dispatch(setUser(user));

                movePage('/home');
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
                <ForgotLInk href={'/'}>forgot :(</ForgotLInk>
            </Div>
            <Button>로그인</Button>
        </Form>
    );
}

const URL = 'https://api.mandarin.weniv.co.kr';

async function handleLogin() {
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    const requestPath = '/user/login';
    const requestUrl = `${URL}${requestPath}`;

    const userData = {
        user: {
            email: email,
            password: password,
        },
    };

    const response = await fetch(requestUrl, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    const json = await response.json();
    const token = json.user.token;
    localStorage.setItem('token', token);

    if (!localStorage.token.length) {
        return false;
    }

    return true;
}

async function getMyInfo() {
    const requestPath = '/user/myinfo';
    const requestUrl = `${URL}${requestPath}`;

    const token = await localStorage.token;
    const bearerToken = `Bearer ${token}`;

    const response = await fetch(requestUrl, {
        method: 'GET',
        headers: {
            Authorization: bearerToken,
            'Content-type': 'application/json',
        },
        body: JSON.stringify(),
    });

    const json = await response.json();

    return json.user;
}

function checkToken() {
    const token = localStorage.token;

    if (!token) {
        return false;
    }

    return true;
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
    font-size: var(--fsize-placeholder);
    font-style: italic;
    line-height: 50px;
    color: var(--color-gray);
    cursor: text;
    transition: top, height, font 0.3s, 0.3s;
`;

const Input = styled.input`
    font-style: italic;
    border: 1px solid var(--color-main);
    box-sizing: border-box;

    &:focus + ${Label}, &:not(:placeholder-shown) + ${Label} {
        top: -20px;
        left: 0px;
        height: 70px;
        font-size: var(--fsize-input-title);
        line-height: 20px;
        z-index: -1;
    }
`;

const ForgotLInk = styled.a`
    position: absolute;
    bottom: -20px;
    right: 0;
    font-size: var(--fsize-button-sub);
    color: var(--color-gray);
`;

const Button = styled.button`
    &:disabled {
        color: var(--color-disabled);
    }
`;
