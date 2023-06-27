import styled from 'styled-components';
import deleteBtn from '../../assets/icons/post/icon-delete.png';


export const UploadSec = styled.section`
display : flex;
justify-content: center;
align-items: center;
flex-direction: column;
text-align: center;
top: 0;
left: 0;
width: 390px;
height: 100%;
margin: 0 auto;
`;

export const UploadSubSec = styled.section`
position: relative;
width: 390px;
margin: 0 auto;
margin-top: 20px;
`

export const Lable = styled.label`
position: fixed;
left: 20px;
`;

export const Input = styled.textarea`
width: 350px;
height: 300px;
border-radius: 5px;
resize: none;
border: none;
margin-top: 40px;
margin-bottom: 10px;
`;

// 사진 미리보기 부분 
export const PostUploadImg = styled.section`
width: 100%;
margin-top: 20px;
    overflow: hidden;
    overflow-x: auto;
    & ul {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        width: fit-content;
        /* padding: 10px 0; */
    }
    & li {
        position: relative;
        width: 200px;
        height: 100px;
        margin-bottom: 10px;
        border-radius: var(--radius-s);
        overflow: hidden;
    }
`;

export const FileUpload = styled.label`
position: absolute;
    width: 50px;
    height: 50px;
    right: 20px;
    bottom: 0px;
    background-color: var(--color-main);
    border-radius: var(--radius-m);
    line-height: 46px;
    cursor: pointer;
    &:focus,
    &:hover {
        outline: 3px solid var(--color-focus);
    }
    & > img {
        width: 30px;
        height: 30px;
        vertical-align: middle;
    }
`;

// 파일 선택 버튼 숨김 처리
export const FileInput = styled.input`
/* position: absolute;
width: 1px;
height: 1px;
padding: 0;
margin: -1px;
overflow: hidden;
clip:rect(0,0,0,0);
border: 0; */
display: none;
`;

export const DeleteBtn = styled.button`
background-image: url(${deleteBtn});
background-position: center;
background-repeat: no-repeat;
background-size: cover;
border: none;
height: 20px;
margin-left: 15px;
width: 20px;
`;  

export const Img = styled.img`
width: 80px;
height: 80px;
object-fit: cover;
`;

export const TitleSec = styled.div`
position: relative;
line-height: 20px;
`

// export const BackBtn = styled.button`
// width: 50px;
// height: 50px;
// background-image: url('../../assets/icons/post/icon-delete.png');
// background-repeat: no-repeat;
// background-position: center;
// background-size: cover;
// /* 버튼 오른쪽 상단 고정 */
// position: absolute;
// left: -70px;
// top: -30px;
// `;

export const Tit = styled.p`
margin-top: 50px;
font-size: 18px;
font-weight: 700;
color: #333333;
`

export const SubTit = styled.p`
font-size: 12px;
font-weight: 400;
color: #757575;
`