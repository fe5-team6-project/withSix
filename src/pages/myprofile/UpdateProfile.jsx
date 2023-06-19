import React, { useState } from 'react';
import Common from '../../components/main/Common';
import { styled } from 'styled-components';
import handleFileUpload from '../signup/handleFileUload';
import { useNavigate } from 'react-router-dom';
import {
    validationId,
    validationName,
} from '../../lib/apis/validation/validation';
import { useSelector } from 'react-redux';
import handleProfileUpdate from './handleProfileUpdate';

export default function UpdateProfile() {
    const user = useSelector((state) => state.user.myInfo);
    const navigate = useNavigate();
    const [accountname, setAccountname] = useState(user.accountname);
    const [username, setUsername] = useState(user.username);
    const [intro, setIntro] = useState(user.intro);
    const [image, setImage] = useState(user.image);

    async function handleSubmit(e) {
        e.preventDefault();
        const id = document.querySelector('#id').value;
        const name = document.querySelector('#name').value;

        if (!(await validationId(id))) {
            return false;
        }

        if (!validationName(name)) {
            return false;
        }

        const status = await handleProfileUpdate();

        navigate('/myprofile');
        return status;
    }

    const page = (
        <Form
            onSubmit={(e) => {
                handleSubmit(e);
            }}
        >
            <ImageWrap>
                <Img src={image} alt={'회원 이미지'} id="profile_image" />
                <ImageInputLabel htmlFor="image">사진 변경</ImageInputLabel>
                <ImageInput
                    type="file"
                    id="image"
                    onChange={(e) => {
                        setImage(handleFileUpload(e));
                    }}
                />
            </ImageWrap>
            <Div className="id_wrap">
                <Input
                    type="text"
                    id="id"
                    placeholder=" "
                    value={accountname}
                    onChange={(e) => {
                        setAccountname(e.currentTarget.value);
                    }}
                />
                <Label htmlFor="id">ID</Label>
            </Div>
            <Div>
                <Input
                    type="text"
                    id="name"
                    placeholder=" "
                    value={username}
                    onChange={(e) => {
                        setUsername(e.currentTarget.value);
                    }}
                />
                <Label htmlFor="name">Nickname</Label>
            </Div>
            <Div>
                <Input
                    type="text"
                    id="intro"
                    placeholder=" "
                    value={intro}
                    onChange={(e) => {
                        setIntro(e.currentTarget.value);
                    }}
                />
                <Label htmlFor="intro">Introduce</Label>
            </Div>
            <Button>프로필 저장</Button>
        </Form>
    );

    const pagaTitle = '프로필 수정';
    const pageDesc = '프로필을 수정합니다.';

    return (
        <>
            <Common
                page={page}
                title={pagaTitle}
                desc={pageDesc}
                autoMoveIgnore={true}
            />
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

const ImageWrap = styled.section`
    position: relative;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
`;

const Img = styled.img`
    width: 100px;
    object-fit: contain;
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
