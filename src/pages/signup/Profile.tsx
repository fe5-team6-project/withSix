import { useState } from 'react';
import { styled } from 'styled-components';
import handleFileUpload from './handleFileUload';
import handleSignup from './handleSignup';
import {
    validationId,
    validationName,
} from '../../lib/utils/validation/validation';
import { DEFAULT_IMAGE } from '../../lib/apis/constant/path';
import { FORM_EVENT, INPUT_EVENT } from '../../lib/utils/type/eventType';
import { SignPropsBase } from '../../lib/utils/interface/interface';

interface ProfileProps {
    userData: SignPropsBase['user'];
    setModalContent: Function;
    setModalVisible: Function;
    setModalUrl: Function;
}

export default function Profile(props: ProfileProps) {
    const userData = props?.userData;
    const [image, setImage] = useState<string | undefined>(DEFAULT_IMAGE);
    const [id, setId] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [intro, setIntro] = useState<string>('');

    async function handleSubmit(e: FORM_EVENT) {
        e.preventDefault();
        const validId = await validationId(id);
        if (!validId?.state) {
            props.setModalContent(validId);
            props.setModalVisible(true);
            return false;
        }

        const validName = validationName(name);
        if (!validName?.state) {
            props.setModalContent(validName);
            props.setModalVisible(true);
            return false;
        }

        const status = await handleSignup(userData, image, id, name, intro);
        if (status?.state) {
            props.setModalContent(status);
            props.setModalVisible(true);
            props.setModalUrl('/');
        }
        return status?.state;
    }

    return (
        <>
            <Form
                onSubmit={(e: FORM_EVENT) => {
                    handleSubmit(e);
                }}
            >
                <ImageWrap>
                    <Img
                        src={image}
                        alt={'기본 회원 이미지'}
                        id="profile_image"
                    />
                    <ImageInputLabel htmlFor="image">사진 등록</ImageInputLabel>
                    <ImageInput
                        type="file"
                        id="image"
                        onChange={async (e: INPUT_EVENT) => {
                            setImage(await handleFileUpload(e));
                        }}
                    />
                </ImageWrap>
                <Div className="id_wrap">
                    <Input
                        type="text"
                        id="id"
                        placeholder=" "
                        onChange={(e: INPUT_EVENT) => setId(e.target.value)}
                    />
                    <Label htmlFor="id">ID</Label>
                </Div>
                <Div>
                    <Input
                        type="text"
                        id="name"
                        placeholder=" "
                        onChange={(e: INPUT_EVENT) => setName(e.target.value)}
                    />
                    <Label htmlFor="name">Nickname</Label>
                </Div>
                <Div>
                    <Input
                        type="text"
                        id="intro"
                        placeholder=" "
                        onChange={(e) => setIntro(e.target.value)}
                    />
                    <Label htmlFor="intro">Introduce</Label>
                </Div>
                <Button>시작하기</Button>
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

const ImageWrap = styled.section`
    position: relative;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
`;

interface ImgProps {
    src: string | boolean | undefined;
}
const Img = styled.img<ImgProps>`
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
