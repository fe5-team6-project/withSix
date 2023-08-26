import React from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

export default function EmptyData({ url }: { url: string }) {
    return (
        <Li>
            등록된 글이 없습니다. <br />
            <Link to={url}>글을 등록</Link>하거나{' '}
            <Link to={'../search'}>팔로우</Link>를 추가해주세요
        </Li>
    );
}

const Li = styled.li`
    width: 350px;
    margin: 50px auto;
    text-align: center;
    font-size: var(--fsize-m);
    list-style: none;

    & > a {
        display: inline-block;
        padding: 2px;
        border-bottom: 2px solid var(--color-main);
        color: var(--color-main);
        transition: background-color, color 0.3s, 0.3s;

        &:hover {
            background-color: var(--color-main);
            color: white;
        }
    }
`;
