import styled, { css } from 'styled-components';

const setSize = (size) => {
    switch (size) {

    case 'middle-sm':
        return css`
        width: 236px;
        height: 50px;
        font-size: 14px;
        padding: 0;
        `;
    default:
        return null;
    }
};

export const Button = styled.button`
margin-top: 80px;
padding: 20px;
border-radius: 5px;
font-size: 16px;
font-weight: 700;
color: white;
background-color: #77CBD6;

cursor: ${(props) => {
return props.disabled === 'disabled' ? 'not-allowed' : 'pointer';
}};

/* 사이즈 설정 */
${({ size }) => {
return setSize(size);
}}
`;