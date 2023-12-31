import styled from 'styled-components';
import deleteBtn from '../../assets/icons/post/icon-delete.png';

export const UploadSec = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
    top: 0;
    left: 0;
    width: 390px;
    height: 100%;
    margin: 0 auto;
    padding: 0 20px;
    box-sizing: border-box;
`;

export const UploadSubSec = styled.section`
    position: relative;
    width: 100%;
    margin-top: 10px;
    box-sizing: border-box;
`;

export const Lable = styled.label`
    position: fixed;
    right: 0;
`;

export const Input = styled.textarea`
    width: 100%;
    height: 300px;
    margin-top: 30px;
    margin-bottom: 10px;
    padding: 10px;
    box-sizing: border-box;
    border-radius: 5px;
    resize: none;
    border: none;
    font-family: var(--font-kr);
    font-size: var(--fsize-l);
`;

// 사진 미리보기 부분
export const PostUploadImg = styled.section`
    width: 100%;
    overflow: hidden;
    overflow-x: auto;
    & ul {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        display: flex;
        width: fit-content;
        box-sizing: border-box;
    }
    & li {
        position: relative;
        width: 200px;
        height: 100px;
        margin-bottom: 10px;
        border-radius: var(--radius-s);
        box-sizing: border-box;
        overflow: hidden;
    }
`;

export const FileUpload = styled.label`
    position: absolute;
    width: 50px;
    height: 50px;
    right: 0;
    bottom: 0px;
    background-color: var(--color-main);
    border-radius: var(--radius-s);
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
    position: absolute;
    right: 10px;
    bottom: 10px;
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
    width: 200px;
    height: 100px;

    object-fit: cover;
`;

export const TitleSec = styled.div`
    position: relative;
    line-height: 20px;
`;

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
`;

export const SubTit = styled.p`
    font-size: 12px;
    font-weight: 400;
    color: #757575;
`;
