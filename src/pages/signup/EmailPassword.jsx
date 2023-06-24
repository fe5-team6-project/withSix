import React from 'react';
import { styled } from 'styled-components';
import {
    validationCheckPassword,
    validationEmail,
    validationPassword,
} from '../../lib/utils/validation/validation';

export default function EmailPassword(props) {
    async function handleSubmit(e) {
        e.preventDefault();
        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;
        const password2 = document.querySelector('#check_password').value;

        const validEmail = await validationEmail(email);
        if (!validEmail.state) {
            props.setModalContent(validEmail);
            props.setModalVisible(true);
            return false;
        }

        const validPassword = validationPassword(password);
        if (!validPassword.state) {
            props.setModalContent(validPassword);
            props.setModalVisible(true);
            return false;
        }

        const validCheckPassword = validationCheckPassword(password, password2);
        if (!validCheckPassword.state) {
            props.setModalContent(validCheckPassword);
            props.setModalVisible(true);
            return false;
        }

        props.userData({
            email: email,
            password: password,
        });

        props.passStep(true);

        return true;
    }

    return (
        <>
            <Form
                onSubmit={(e) => {
                    return handleSubmit(e);
                }}
            >
                <Div>
                    <Input type="text" id="email" placeholder=" " />
                    <Label htmlFor="email">E-mail</Label>
                </Div>
                <Div>
                    <Input type="password" id="password" placeholder=" " />
                    <Label htmlFor="password">Password</Label>
                </Div>
                <Div>
                    <Input
                        type="password"
                        id="check_password"
                        placeholder=" "
                    />
                    <Label htmlFor="check_password">Check Password</Label>
                </Div>
                <Button>다음</Button>
            </Form>
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
    height: calc(100vh - 120px);
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
    font-size: var(--fsize-message);
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

const Button = styled.button`
    &:disabled {
        color: var(--color-disabled);
    }
`;
