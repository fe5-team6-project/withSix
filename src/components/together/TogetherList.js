import React from 'react'
import { styled } from 'styled-components';

export default function TogetherList({ id, itemName, price, link, itemImage }) {
    return (
        <>
            <TogetherItem>
                <TogetherImage src={itemImage} />
                <TogetherName>{itemName}</TogetherName>
                <TogetherPrice><span>{price}</span>원</TogetherPrice>
            </TogetherItem>
        </>
    )
}

const TogetherItem = styled.li`
    display:flex;
    justify-content: space-between;
    flex-wrap:wrap;
    flex:auto;
    min-width:180px;
    height:130px;
    background: #fff;
    align-items: center;
    gap:10px;
    border-radius: 5px;
    padding:10px;
`

const TogetherImage = styled.img`
    width:100%;
    height: 90px;
    background: yellow;
    border-radius: 5px;
    object-fit: cover;
`

const TogetherName = styled.strong`
    font-size: var(--fsize-m);
`

const TogetherPrice = styled.p`
    font-size: var(--fsize-s);
    color: var(--color-gray);
    span{
        color: var(--color-main);
    }
`