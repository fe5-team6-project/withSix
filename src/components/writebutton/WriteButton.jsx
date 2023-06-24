import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import write from '../../assets/icons/common/icon-write.svg';

export default function WriteButton({ url }) {
    const navigate = useNavigate();
    return (
        <Button type="button" onClick={() => navigate(url)}>
            <img src={write} alt="글쓰기" />
        </Button>
    );
}

const Button = styled.button`
    position: fixed;
    bottom: 70px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    font-size: var(--fsize-s);
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    & > img {
        width: 25px;
        height: 25px;
        vertical-align: middle;
        object-position: 50% 50%;
    }
`;
