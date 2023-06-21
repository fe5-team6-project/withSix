import React from 'react'
import { styled } from 'styled-components'

export default function TogetherDelButton() {
    return (
        <>
            <DeleteButton id="delBtn">삭제</DeleteButton>
        </>
    )
}

const DeleteButton = styled.button`
    &#delBtn{
        background-color: var(--color-disabled);
        &:hover{
            background-color: red;
        }
    }
`
