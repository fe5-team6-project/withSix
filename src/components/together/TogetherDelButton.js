import React from 'react'
import { styled } from 'styled-components'
import { api } from '../../lib/apis/axiosConfig'
import { useNavigate, useParams } from 'react-router-dom'

export default function TogetherDelButton() {
    const id = useParams().id
    const TogetherDeleteButton = async () => {
        await api.delete(`/product/${id}`);
    }
    const navigate = useNavigate();

    return (
        <>
            <DeleteButton id="delBtn" onClick={() => {
                TogetherDeleteButton();
                navigate('/together');
            }}>삭제</DeleteButton>
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
