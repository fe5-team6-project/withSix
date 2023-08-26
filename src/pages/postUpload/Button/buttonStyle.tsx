import styled, { css } from 'styled-components';

const setSize = (size: string) => {
    switch (size) {
        case 'middle':
            return css`
                width: calc(100% - 80px);
                height: 50px;
                font-size: 14px;
                padding: 0;
            `;
        // default:
    }
};

export const ButtonWrap = styled.section`
    width: 370px;
`;

interface ButtonProps {
    onClick: Function;
    size: string;
}

export const Button = styled.button<ButtonProps>`
    /* margin-top: 20px; */
    /* margin-right: 40px; */
    margin-right: 80px;
    padding: 20px;
    border-radius: 5px;
    font-size: 16px;
    font-weight: 700;
    color: white;
    background-color: #77cbd6;

    /* 사이즈 설정 */
    ${({ size }) => {
        return setSize(size);
    }}
`;
