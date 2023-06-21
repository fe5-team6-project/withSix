import styled from 'styled-components';
// 나중에 백이미지로 넣을 것들 
// import imgBtn from '../../assets/upload-file.png'
// import deleteBtn from '../../assets/icon/icon-delete.png';


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

export const Lable = styled.label`
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
gap: 20px;
`;

export const FileUpload = styled.label`
width: 360px;
height: 90px;
background-color: #DDDDDD ;
border-color: none;
cursor: pointer;
border-radius: 5px;
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

export const FileTxt = styled.p`
color: #FFFFFF;
font-size: 16px;
font-weight: 700;
margin-top: 20px;
`

export const FileSubTxt = styled.p`
color: #FFFFFF;
font-size: 12px;
font-weight: 700;
`

export const SingleImg = styled.img`

`;

export const DeleteBtn = styled.button`
width: 15px;
height: 15px;

background-position: center;
background-repeat: no-repeat;
background-size: cover;
border: none;
`;

export const Img = styled.img`

`;

export const PostHeaderSec = styled.section`

`;

export const TitleSec = styled.div`
position: relative;
line-height: 20px;
`

// export const BackBtn = styled.button`
// width: 20px;
// height: 20px;
// background-image: url('../../assets/icon/icon-back.png');
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