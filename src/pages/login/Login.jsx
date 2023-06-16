import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <Form>
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
