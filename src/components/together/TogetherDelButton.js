import React from 'react';
import { styled } from 'styled-components';
import { api } from '../../lib/apis/axiosConfig';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function TogetherDelButton() {
    const id = useParams().id;
    const accountname = useSelector((state) => {
        return state.user.myInfo.accountname;
    });
    const TogetherDeleteButton = async () => {
        await api.delete(`/product/${id}`);
    };
    const navigate = useNavigate();

    return (
        <>
            <DeleteButton
                id="delBtn"
                onClick={async () => {
                    await TogetherDeleteButton();
                    navigate(`/together/${accountname}`);
                }}
            >
                삭제
            </DeleteButton>
        </>
    );
}

const DeleteButton = styled.button`
    &#delBtn {
        background-color: var(--color-red);
    }
`;
