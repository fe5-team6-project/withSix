import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { handleErrorImg } from '../../lib/utils/validation/image/validationContentImage'

export default function TogetherList({ id, itemName, price, link, itemImage }) {
    const navigate = useNavigate();

    return (
        <>
            <TogetherItem onClick={() => {
                navigate(`/together/detail/${id}`);
            }}>
                <TogetherImage src={itemImage} onError={handleErrorImg} />
                <TogetherName>{itemName}</TogetherName>
                <TogetherPrice><span>{price.toLocaleString('ko-KR')}</span>원</TogetherPrice>
            </TogetherItem>
        </>
    );
}

const TogetherItem = styled.li`
    display: flex;
    justify-content: space-between;
    flex-wrap:wrap;
    flex:1;
    min-width:170px;
    height:130px;
    background: #fff;
    align-items: center;
    gap: 10px;
    border-radius: 5px;
    padding:10px;
    cursor: pointer;
    &:nth-of-type(1){
        flex-basis: 100%;
        height:240px;
        & img {
            height:200px;
        }
        & p {
            font-size: var(--fsize-s);
            color: var(--color-gray);
            & > span {
                overflow: hidden;
                text-overflow: ellipsis;
                max-width:100px;
                display:inline-block;
            }
        }
        & strong {
            overflow: hidden;
            text-overflow: ellipsis;
            max-width:230px;
        }
    }
`

const TogetherImage = styled.img`
    width:100%;
    height: 100px;
    background: yellow;
    border-radius: 5px;
    object-fit: cover;
`
const TogetherName = styled.strong`
    font-size: var(--fsize-m);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width:100px;
`;

const TogetherPrice = styled.p`
    font-size: var(--fsize-s);
    color: var(--color-gray);
    display:inline-block;
    line-height:13px;

    & > span {
        display:inline-block;
        color: var(--color-main);
        overflow: hidden;
        text-overflow: ellipsis;
        max-width:40px;
        white-space: nowrap;
        line-height: 13px;
        vertical-align: bottom;
        margin-right:2px;
    }
`;
