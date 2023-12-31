import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import initialImage from '../../assets/images/initialImage.png';
import Common from '../../components/main/Common';
import Modal from '../../components/modal/Modal';
import { api, urlApi } from '../../lib/apis/axiosConfig';
import { BASE_URL } from '../../lib/apis/constants';
import {
    validationImageSize,
    validationTogether,
} from '../../lib/utils/validation/validation';
import { setContent, setIsVisible } from '../../store/slices/modalSlice';
import {
    ModalPropsBase,
    UserInfoProps,
} from '../../lib/utils/interface/interface';
import { INPUT_EVENT } from '../../lib/utils/type/eventType';

export default function GroupUpload() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const accountname = useSelector((state: UserInfoProps) => {
        return state.user.myInfo.accountname;
    });
    const modal = useSelector((state: ModalPropsBase) => state?.modal);
    const [togetherInfo, setTogetherInfo] = useState({
        itemName: '',
        price: 0,
        link: '',
        itemImage: '',
    });
    const [img, setImg] = useState('');
    const { itemName, price, link } = togetherInfo;
    const modalVisible = modal.display.isVisible;

    const handleChange = (e: INPUT_EVENT) => {
        const { name, value } = e.target;
        if (name === 'price') {
            setTogetherInfo({
                ...togetherInfo,
                [name]: !value ? 0 : parseInt(value),
            });
        } else {
            setTogetherInfo({ ...togetherInfo, [name]: value });
        }
    };

    const handleImgChange = (e: INPUT_EVENT) => {
        const file = e.target.files![0];
        const fileSize = file.size;
        const validImageSize = validationImageSize(fileSize);
        if (!validImageSize.state) {
            setModalContent(validImageSize);
            setModalVisible(true);
            return false;
        }
        setTogetherInfo({ ...togetherInfo, itemImage: file.toString() });
        setImg(URL.createObjectURL(file));
    };

    const setModalContent = (props: ModalPropsBase['modal']['content']) => {
        dispatch(
            setContent({
                state: props.state,
                message: props.message,
            })
        );
    };

    const setModalVisible = (isVisible: boolean) => {
        dispatch(setIsVisible({ isVisible: isVisible }));
    };

    const sendTogether = async () => {
        try {
            const validTogether = validationTogether(itemName, price, link);
            if (!validTogether.state) {
                setModalContent(validTogether);
                setModalVisible(true);
                return false;
            }

            const formData = new FormData();
            formData.append('image', togetherInfo.itemImage);
            const imgRes = await urlApi.post(`/image/uploadfile`, formData);
            const img = `${BASE_URL}/${imgRes.data.filename}`;
            const togetherBody = {
                product: { ...togetherInfo, itemImage: img },
            };
            await api.post(`/product`, togetherBody, { timeout: 3000 });
            navigate(`/together/${accountname}`);
        } catch (error) {
            console.error(error);
        }
    };

    const page = (
        <>
            <Form>
                <GroupHeader>
                    <H1>모임 등록</H1>
                    <P>글과 사진을 남기고 공유할 수 있습니다.</P>
                </GroupHeader>
                <GroupInputWrapper>
                    <GroupInput
                        id="GroupName"
                        placeholder="모임명"
                        name="itemName"
                        onChange={handleChange}
                    ></GroupInput>
                    <GroupInput
                        type="number"
                        id="GroupPrice"
                        placeholder="모임비"
                        name="price"
                        step="100"
                        onChange={handleChange}
                    ></GroupInput>
                    <GroupInfo
                        id="GroupInfo"
                        placeholder="모임 소개"
                        name="link"
                        onChange={handleChange}
                    ></GroupInfo>
                    <GroupInput
                        id="GroupImage"
                        placeholder="모임 이미지"
                        type="file"
                        name="itemImage"
                        accept=".jpg, .gif, .png, .jpeg, .bmp, .tif, .heic"
                        onChange={handleImgChange}
                    ></GroupInput>
                </GroupInputWrapper>
                <GroupLabel htmlFor="GroupImage">
                    <GroupImage
                        id="PreImage"
                        src={img || initialImage}
                    ></GroupImage>
                </GroupLabel>
                <RegiButton
                    onClick={async () => {
                        await sendTogether();
                    }}
                >
                    등록
                </RegiButton>
            </Form>
            {modalVisible && <Modal />}
        </>
    );

    return (
        <>
            <Common page={page}></Common>
        </>
    );
}

const Form = styled.section`
    padding: 20px;
    text-align: center;
    margin: auto;
    min-width: 280px;
    max-width: 390px;
    box-sizing: border-box;
`;

const GroupHeader = styled.header`
    margin: 50px;
`;

const H1 = styled.h1`
    font-size: var(--fsize-title);
    color: var(--color-black);
`;

const P = styled.p`
    font-size: var(--fsize-s);
    color: var(--color-gray);
`;

const GroupInputWrapper = styled.div``;

const GroupInput = styled.input`
    width: 100%;
    height: 40px;
    background-color: white;
    color: black;
    text-align: start;
    padding-left: 10px;
    font-size: var(--fsize-desc);
    box-sizing: border-box;
    margin-top: 20px;
    border-radius: 5px;
    &#GroupImage {
        display: none;
    }
    &:focus,
    &:hover {
        border-radius: var(--radius-s);
    }
`;

interface TextareaProps {
    onChange: Function;
}

const GroupInfo = styled.textarea<TextareaProps>`
    width: 100%;
    height: 100px;
    margin-top: 20px;
    padding: 15px 10px;
    font-size: var(--fsize-desc);
    box-sizing: border-box;
    border: solid 1px var(--color-main);
    border-radius: var(--radius-s);
    resize: none; //크기조절 삭제
    font-family: inherit;
`;

const GroupLabel = styled.label``;
const GroupImage = styled.img`
    margin-top: 20px;
    width: 100%;
    height: 200px;
    background-color: #ddd;
    object-fit: cover;
    border: none;
    border-radius: var(--radius-s);
    cursor: pointer;
`;

const RegiButton = styled.button`
    margin-top: 80px;
`;
