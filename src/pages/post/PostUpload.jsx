import React, { useEffect, useState } from 'react';
import Common from '../../components/main/Common';
import { styled } from 'styled-components';
import deleteIcon from '../../assets/icons/common/icon-delete.svg';
import imageIcon from '../../assets/icons/common/icon-image.svg';

export default function PostUpload() {
    const [imageList, setImageList] = useState([]);
    const [imageSrc, setImageSrc] = useState(undefined);
    const [content, setContent] = useState(undefined);

    function handelImageUpload(e) {
        const images = e.target.files;
        if (!images.length) return;
        setImageList([...imageList, URL.createObjectURL(images[0])]);
    }

    function deleteImage(key) {
        setImageList(
            imageList.filter((item, idx) => {
                if (key === idx) {
                    return undefined;
                }
                return item;
            })
        );
    }

    useEffect(() => {
        console.log(imageList);
    }, [imageList]);

    function handlePostUpload(e) {}

    const page = (
        <PostUploadWrap>
            <section>
                <h2 className="a11y-hidden">내용 입력</h2>
                <TextArea
                    id="content"
                    cols="30"
                    rows="10"
                    onChange={(e) => {
                        setContent(e.target.value);
                    }}
                ></TextArea>
            </section>

            <section>
                <h2 className="a11y-hidden">이미지 업로드</h2>
                <PreviewImageWrap>
                    <ul>
                        {imageList.map((item, key) => {
                            return (
                                <li key={key}>
                                    <PreviewImage src={item} alt="" />
                                    <DeleteButton
                                        type="button"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            deleteImage(key);
                                        }}
                                    >
                                        <img src={deleteIcon} alt="delete" />
                                    </DeleteButton>
                                </li>
                            );
                        })}
                    </ul>
                </PreviewImageWrap>
                <InputWrap>
                    <InputLabel htmlFor="upload_image">
                        <img src={imageIcon} alt="" />
                    </InputLabel>
                    <ImageInput
                        id="upload_image"
                        type="file"
                        multiple
                        onChange={(e) => {
                            handelImageUpload(e);
                        }}
                    />
                </InputWrap>
            </section>
        </PostUploadWrap>
    );

    const pagaTitle = '포스팅';
    const pageDesc = '글과 사진을 남기고 공유할 수 있습니다.';

    return <Common page={page} title={pagaTitle} desc={pageDesc} />;
}
const PostUploadWrap = styled.section`
    position: relative;
    max-width: 390px;
    margin: 150px auto 0;
`;

const TextArea = styled.textarea`
    width: 100%;
    height: 200px;
    border: none;
    margin-bottom: 10px;
    resize: none;
`;

const InputWrap = styled.section`
    position: relative;
    width: 100%;
    height: 50px;
    margin-top: 20px;
`;

const InputLabel = styled.label`
    position: absolute;
    right: 0;
    bottom: 10px;
    width: 100%;
    height: 50px;
    background-color: var(--color-main);
    border-radius: var(--radius-m);
    text-align: center;
    line-height: 46px;
    cursor: pointer;

    &:focus,
    &:hover {
        outline: 3px solid var(--color-focus);
    }

    & > img {
        width: 30px;
        height: 30px;
        vertical-align: middle;
    }
`;

const ImageInput = styled.input`
    display: none;
`;

const PreviewImageWrap = styled.section`
    width: 100%;
    overflow: hidden;
    overflow-x: auto;
    & ul {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        width: fit-content;
        /* padding: 10px 0; */
    }

    & li {
        position: relative;
        width: 200px;
        height: 100px;
        margin-bottom: 10px;
        border-radius: var(--radius-s);
        overflow: hidden;
    }
`;

const PreviewImage = styled.img`
    width: 200px;
    height: 100px;
    object-fit: cover;
`;

const DeleteButton = styled.button`
    position: absolute;
    right: 5px;
    bottom: 5px;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    text-align: center;
    line-height: 27px;
`;
