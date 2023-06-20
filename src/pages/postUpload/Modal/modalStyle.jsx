import styled,{ keyframes } from 'styled-components';

const slideUp = keyframes`
from {
transform: translateY(0);
opacity: 0;
}
to {
transform: translateY(-120px);
opacity: 1;
}
`;

export const ModalWrap = styled.article`
display : flex;
justify-content: center;
align-items: center;
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
z-index: 999;
background-color: rgba(0, 0, 0, 0.3);
`

export const CloseWrap = styled.div`
display : flex;
justify-content: center;
align-items: center;
flex-direction: column;
width: 400px;
height: 120px;
text-align: center;
background-color: #fff;
border-radius: 20px 20px 0 0;
color: #000; 
/* position은 버튼 오른쪽으로 배치하기 위해 적용 */
position: absolute;
/* keyframes 초기값 설정 */
bottom: -120px;
opacity: 0;

transition: bottom .5s ease-in-out;
animation: ${slideUp} .5s ease-in-out forwards;

`
export const CloseBtnTitle = styled.h2`
font-size: 15px;
margin-top: 20px;
`

export const CloseBtn = styled.button`
border: 0;
background-color: transparent;
width: 50px;
height: 20px;
color: #2a2a2a;


/* 버튼 오른쪽으로 배치하기 위해 적용 */
position: absolute;
bottom: 15px;
right: 20px;

`