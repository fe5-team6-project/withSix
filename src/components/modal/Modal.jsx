import React from 'react';
import { styled } from 'styled-components';
import successIcon from '../../assets/icons/modal/icon-success.svg';
import failureIcon from '../../assets/icons/modal/icon-failure.svg';

export default function Modal(props) {
    const state = props.state;
    const message = props.message;

    function closeModal() {
        props.setIsShow(false);
    }

    return (
        <CoverDiv>
            <section>
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
                    <button autoFocus={true} onClick={() => closeModal()}>
                        close
                    </button>
                </ButtonWrap>
            </section>
        </CoverDiv>
    );
}

const CoverDiv = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: var(--color-cover);

    & > section {
        position: absolute;
        bottom: 0;
        max-width: 390px;
        height: 120px;
        background-color: white;
        border-top-left-radius: var(--radius-l);
        border-top-right-radius: var(--radius-l);
        text-align: center;
    }
`;

const ImageWrap = styled.section`
    & > img {
        width: 20px;
    }
`;

const TextWrap = styled.article`
    width: 100%;
    max-width: 390px;
`;

const ButtonWrap = styled.section`
    font-family: var(--font-eng);
`;
