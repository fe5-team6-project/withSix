import React, { useState } from 'react';
import { styled } from 'styled-components';
import {
    validationCheckPassword,
    validationEmail,
    validationPassword,
} from '../../lib/utils/validation/validation';
import { FORM_EVENT, INPUT_EVENT } from '../../lib/utils/type/eventType';
import handleInput, { HandleInputProps } from './handleInput';

interface EmailPasswordProps {
    setUser: Function;
    setPassStep: Function;
    setModalContent: Function;
    setModalVisible: Function;
    setModalUrl?: Function;
}

export default function EmailPassword({
    setUser,
    setPassStep,
    setModalContent,
    setModalVisible,
}: EmailPasswordProps) {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [password2, setPassword2] = useState<string>('');

    const handleInputPropsBase = {
        setEmail: setEmail,
        setPassword: setPassword,
        setPassword2: setPassword2,
    };

    async function handleSubmit(e: FORM_EVENT) {
        e.preventDefault();

        const validEmail = await validationEmail(email);
        if (!validEmail?.state) {
            setModalContent(validEmail);
            setModalVisible(true);
            return false;
        }

        const validPassword = validationPassword(password);
        if (!validPassword?.state) {
            setModalContent(validPassword);
            setModalVisible(true);
            return false;
        }

        const validCheckPassword = validationCheckPassword(password, password2);
        if (!validCheckPassword?.state) {
            setModalContent(validCheckPassword);
            setModalVisible(true);
            return false;
        }

        setUser({
            email: email,
            password: password,
        });

        setPassStep(true);

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
                    <Input
                        type="text"
                        id="email"
                        placeholder=" "
                        onChange={(e: INPUT_EVENT) => {
                            handleInput({
                                e,
                                ...handleInputPropsBase,
                            });
                        }}
                    />
                    <Label htmlFor="email">E-mail</Label>
                </Div>
                <Div>
                    <Input
                        type="password"
                        id="password"
                        placeholder=" "
                        onChange={(e: INPUT_EVENT) => {
                            handleInput({
                                e,
                                ...handleInputPropsBase,
                            });
                        }}
                    />
                    <Label htmlFor="password">Password</Label>
                </Div>
                <Div>
                    <Input
                        type="password"
                        id="check_password"
                        placeholder=" "
                        onChange={(e: INPUT_EVENT) => {
                            handleInput({
                                e,
                                ...handleInputPropsBase,
                            });
                        }}
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

interface InputProps {
    onChange: Function;
}
const Input = styled.input<InputProps>`
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
