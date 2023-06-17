import React from 'react';
import { styled } from 'styled-components';

const DEFAULT_IMAGE = 'http://146.56.183.55:5050/Ellipse.png';

export default function Profile(props) {
    return (
        <Form>
            <ImageWrap>
                <Img
                    src={DEFAULT_IMAGE}
                    alt={'기본 회원 이미지'}
                    id="profile_image"
                />
                <ImageInputLabel htmlFor="image">사진 등록</ImageInputLabel>
                <ImageInput type="file" id="image" />
            </ImageWrap>
            <Div className="id_wrap">
                <Input type="text" id="id" placeholder=" " />
                <Label htmlFor="id">ID</Label>
            </Div>
            <Div>
                <Input type="text" id="name" placeholder=" " />
                <Label htmlFor="name">Nickname</Label>
            </Div>
            <Div>
                <Input type="text" id="intro" placeholder=" " />
                <Label htmlFor="intro">Introduce</Label>
            </Div>
            <Button>시작하기</Button>
        </Form>
    );
}

const URL = 'https://api.mandarin.weniv.co.kr';

async function handleSignup(user) {
    const img = document.querySelector('#image').file;
    const id = document.querySelector('#id').value;
    const nickname = document.querySelector('#name').value;
    const intro = document.querySelector('#intro').value;

    const email = user.email;
    const password = user.password;

    const requestPath = '/user';
    const requestUrl = `${URL}${requestPath}`;

    const userData = {
        user: {
            username: nickname,
            email: email,
            password: password,
            accountname: id,
            intro: intro,
            image: img,
        },
    };

    const response = await fetch(requestUrl, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    const json = response.json();
    const message = response.message;

    alert(message);
    return json;
}

async function validation() {
    const input = document.querySelector('#id');
    const id = input.value;
    console.log(id);

    const requestPath = '/user/accountnamevalid';
    const requestUrl = `${URL}${requestPath}`;

    const userData = {
        user: {
            accountname: id,
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
    const message = json.message;

    if (!response.ok) {
        alert(message);
        input.focus();
        return false;
    } else {
        if (message.match('이미 가입된')) {
            alert(message);
            input.focus();
            return false;
        }
    }

    alert(message);
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
    height: calc(100vh - 120px);
    margin: 0 auto;
    padding: 40px 0;
    box-sizing: border-box;
`;

const ImageWrap = styled.section`
    position: relative;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
`;

const Img = styled.img`
    width: 100px;
`;

const ImageInput = styled.input`
    display: none;
`;

const ImageInputLabel = styled.label`
    position: absolute;
    bottom: 0px;
    left: 50%;
    width: 100px;
    height: 40px;
    background-color: rgba(0, 0, 0, 0.4);
    font-size: var(--fsize-s);
    color: white;
    text-align: center;
    line-height: 30px;
    transform: translateX(-50%);
    cursor: pointer;
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

const Div = styled.div`
    position: relative;
    height: 50px;

    &.id_wrap > label {
        left: 25px;
    }

    &.id_wrap::before {
        content: '@';
        position: absolute;
        top: 14px;
        left: 10px;
        font-family: var(--font-eng);
        font-size: var(--font-l);
        font-style: italic;
        font-weight: bold;
        color: var(--color-gray);
    }
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
