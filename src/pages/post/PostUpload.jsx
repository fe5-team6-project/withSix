import React, { useEffect, useState } from 'react';
import Common from '../../components/main/Common';
import { styled } from 'styled-components';
import deleteIcon from '../../assets/icons/common/icon-delete.svg';

export default function PostUpload() {
    const [imageList, setImageList] = useState([]);
    const [imageSrc, setImageSrc] = useState(undefined);
    const [content, setContent] = useState(undefined);

    function handelImageUpload(e) {
        const images = e.target.files;
        if (!images.length) return;
        setImageList([...imageList, URL.createObjectURL(images[0])]);
    }

    useEffect(() => {
        console.log(imageList);
    }, [imageList]);

    function handlePostUpload(e) {}

    const page = (
        <>
            <section>
                <textarea id="content" cols="30" rows="10">
                    {/** */}
                </textarea>
            </section>

            <section>
                <h2 className="a11y-hidden">이미지 업로드</h2>
                <section></section>
                <label htmlFor="upload_image">
                    <ul>
                        {imageList.map((item, key) => {
                            return (
                                <PreviewImageWrap key={key}>
                                    <PreviewImage src={item} alt="" />
                                    <DeleteButton
                                        type="button"
                                        onClick={(e) => {
                                            e.preventDefault();
                                        }}
                                    >
                                        <img src={deleteIcon} alt="delete" />
                                    </DeleteButton>
                                </PreviewImageWrap>
                            );
                        })}
                    </ul>
                </label>
                <input
                    id="upload_image"
                    type="file"
                    multiple
                    onChange={(e) => {
                        handelImageUpload(e);
                    }}
                />
            </section>
        </>
    );

    const pagaTitle = '포스팅';
    const pageDesc = '글과 사진을 남기고 공유할 수 있습니다.';

    return <Common page={page} title={pagaTitle} desc={pageDesc} />;
}

const PreviewImageWrap = styled.li`
    position: relative;
    width: 200px;
    height: 100px;
`;

const PreviewImage = styled.img`
    width: 200px;
    height: 100px;
    object-fit: cover;
    border: 1px solid #333;
    border-radius: var(--radius-s);
`;

const DeleteButton = styled.button`
    position: absolute;
    right: 5px;
    bottom: 5px;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    line-height: 20px;
    text-align: center;

    & > img {
        object-fit: cover;
    }
`;
