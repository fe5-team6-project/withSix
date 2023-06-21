import React from 'react'
import { styled } from 'styled-components'


export default function TogetherEditButton() {
    return (
        <>
            <EditButton id="editBtn">수정</EditButton>
        </>
    )
}

const EditButton = styled.button`
    &#editBtn{
        background-color: var(--color-main);
    }
`
