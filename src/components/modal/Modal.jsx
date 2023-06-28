import React from 'react';
import { keyframes, styled } from 'styled-components';
import successIcon from '../../assets/icons/modal/icon-success.svg';
import failureIcon from '../../assets/icons/modal/icon-failure.svg';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    setContent,
    setIsVisible,
    setUrl,
} from '../../store/slices/modalSlice';

export default function Modal() {
    const modal = useSelector((state) => state?.modal);
    const state = modal.content.state;
    const message = modal.content.message;
    const url = modal.url.path;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    console.log(url);

    /**
     * resetModal
     *  모달 닫을 때 모달이 가진 상태를 초기화
     * movePage
     *  url이 입력되었을 경우 해당 url로 이동
     */
    function resetModal() {
        dispatch(setContent({ state: false, message: '' }));
        dispatch(setIsVisible({ isVisible: false }));
        dispatch(setUrl({ url: '' }));
    }

    function movePage() {
        navigate(url);
    }

    return (
        <CoverDiv>
            <article>
                <ImageWrap>
                    {state ? (
                        <img src={successIcon} alt="성공 아이콘" />
                    ) : (
                        <img src={failureIcon} alt="실패 아이콘" />
                    )}
                </ImageWrap>

                <TextWrap>
                    <strong>{message}</strong>
                </TextWrap>

                <ButtonWrap>
                    <CloseButton
                        autoFocus={true}
                        onClick={() => {
                            resetModal();
                            url !== '' && movePage(url);
                        }}
                    >
                        close
                    </CloseButton>
                </ButtonWrap>
            </article>
        </CoverDiv>
    );
}

const moveUpAnimation = keyframes`
    0%{
        transform: translate(-50%, 100%);
    }

    100%{
        transform: translate(-50%, 0);
    }
`;

const CoverDiv = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: var(--color-cover);
    z-index: 999;

    & > article {
        position: absolute;
        left: 50%;
        bottom: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        width: 100%;
        max-width: 390px;
        height: 120px;
        padding: 20px 0;
        background-color: white;
        border-top-left-radius: var(--radius-l);
        border-top-right-radius: var(--radius-l);
        text-align: center;
        animation: ${moveUpAnimation} 0.5s ease-in-out forwards;
    }
`;

const ImageWrap = styled.section`
    & > img {
        width: 20px;
    }
`;

const TextWrap = styled.section`
    width: 100%;
    max-width: 390px;
`;

const ButtonWrap = styled.section`
    width: 100%;
    padding: 0 50px;
    box-sizing: border-box;
    text-align: right;
`;

const CloseButton = styled.button`
    all: unset;
    width: 100px;
    height: 25px;
    border-radius: var(--radius-l);
    background-color: transparent;
    font-family: var(--font-eng);
    font-style: italic;
    text-align: center;
    line-height: 25px;
    cursor: pointer;
`;
