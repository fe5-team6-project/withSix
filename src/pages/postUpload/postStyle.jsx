import styled from 'styled-components';
import deleteBtn from '../../assets/icons/post/icon-delete.png';
import ImgUploadBtn from '../../assets/icons/post/icon-image.png'


export const UploadSec = styled.section`
display : flex;
justify-content: center;
align-items: center;
flex-direction: column;
text-align: center;
top: 0;
left: 0;
width: 100%;
height: 100%;
`;

export const UploadSubSec = styled.section`
display: flex;
gap: 20px;
width: 450px;
margin: 0 auto;
margin-top: 20px;
`

export const Lable = styled.label`
position: fixed;
left: 20px;
`;

export const Input = styled.textarea`
margin-top: 40px;
width: 350px;
height: 300px;
vertical-align: middle;
border-color: #77CBD6;
border-radius: 5px;
resize: none;
`;

// 사진 미리보기 부분
export const PostUploadImg = styled.div`
display: flex;
margin-top: 20px;
gap: 25px;
`;

export const FileUpload = styled.label`
width: 90px;
height: 90px;
background-image: url(${ImgUploadBtn});
background-repeat: no-repeat;
background-size: 50px 50px;
background-color: #77CBD6;;
background-position: 50% 50%;
cursor: pointer;
border-radius: 30px;
`;

// 파일 선택 버튼 숨김 처리
export const FileInput = styled.input`
position: absolute;
width: 1px;
height: 1px;
padding: 0;
margin: -1px;
overflow: hidden;
clip:rect(0,0,0,0);
border: 0;
`;

export const DeleteBtn = styled.button`
width: 20px;
height: 20px;
margin-left: 10px;
background-image: url(${deleteBtn});
background-position: center;
background-repeat: no-repeat;
background-size: cover;
border: none;
`;

export const Img = styled.img`
width: 80px;
height: 80px;
background-size: cover;
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