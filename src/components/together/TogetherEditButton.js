import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { styled } from 'styled-components'


export default function TogetherEditButton() {
    const id = useParams().id
    const navigate = useNavigate();
    return (
        <>
            <EditButton id="editBtn" onClick={() => { navigate(`/together/edit/${id}`) }}>수정</EditButton>
        </>
    )
}

const EditButton = styled.button`
    &#editBtn{
        background-color: var(--color-main);
    }
`
