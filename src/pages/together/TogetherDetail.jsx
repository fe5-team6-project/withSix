import { React, useEffect, useState } from 'react';
import Common from '../../components/main/Common';
import { styled } from 'styled-components';
import { api } from '../../lib/apis/axiosConfig';
import { useParams } from 'react-router-dom';
import TogetherEditButton from '../../components/together/TogetherEditButton';
import TogetherDelButton from '../../components/together/TogetherDelButton';
import { useDispatch, useSelector } from 'react-redux';
import { inputTogether } from '../../store/slices/togetherSlice';
import { handleErrorImg } from '../../lib/utils/validation/image/validationContentImage'

export default function TogetherDetail() {
    const a = useSelector((state) => { return state.together.req });
    const myAccountname = useSelector((state) => { return state.user.myInfo.accountname });
    const [userAccountname, setUserAccountname] = useState();
    const dispatch = useDispatch();

    const [togetherDetail, setTogetherDetail] = useState('');
    const [num, setNum] = useState(0)
    const idd = useParams().id; //밑에서 상태관리 id 값 보내기 위해 id에서 idd로 임시 변경

    const togetherDetails = async () => {
        const res = await api.get(`/product/detail/${idd}`);
        const detailData = res.data?.product;
        setTogetherDetail(detailData);
        const { itemImage, itemName, link, price } = detailData;
        dispatch(inputTogether({ itemImage, itemName, link, price }));
        setUserAccountname(res.data?.product?.author?.accountname);
    }

    useEffect(() => {
        togetherDetails();
    }, [num])

    const page = (
        <>
            {togetherDetail && <Form>
                <GroupHeader>
                    <H1>{togetherDetail?.itemName}</H1>
                </GroupHeader>
                <GroupWrapper>
                    <GroupImg src={togetherDetail?.itemImage} onError={handleErrorImg}></GroupImg>
                    <GroupText id="togetherPrice"><span>{togetherDetail?.price.toLocaleString('ko-KR')}</span>원</GroupText>
                    <GroupDetailInfo>{togetherDetail?.link}</GroupDetailInfo>
                </GroupWrapper>
                <GroupBtnWrap>
                    {myAccountname === userAccountname && <>
                        <TogetherEditButton />
                        <TogetherDelButton />
                    </>}
                </GroupBtnWrap>
            </Form>}
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
    margin:auto;
    min-width:280px;
    max-width:390px;
    box-sizing: border-box;
`;

const GroupHeader = styled.header`
    margin: 20px;
`;

const H1 = styled.h1`
    font-size: var(--fsize-title);
    color: var(--color-black);
`;

const GroupText = styled.p`
    font-size: var(--fsize-m);
    color: var(--color-black);
    font-weight: bold;
    text-align: left;
    margin-top:34px;
    text-indent: 10px;
    &#togetherPrice{
        text-align:right;
        & span {
            margin-right:3px;
            font-size:var(--fsize-l);
            color: var(--color-main);
            font-family: var(--font-eng);
            font-weight: 500;
        }
    }
`;

const GroupDetailInfo = styled.p`
    text-align: left;
    width: 100%; //조정예정
    height: 100px;
    margin-top: 20px;
    padding: 15px 10px;
    font-size: var(--fsize-s);
    font-weight: lighter;
    box-sizing: border-box;
    border: solid 1px var(--color-main);
    border-radius: var(--radius-s);
    resize: none; //크기조절 삭제
    font-family: inherit;
    background-color: inherit;
    margin-bottom:50px;
`

const GroupWrapper = styled.div`
    /* box-shadow: 0 0 3px 0 black; */
`;

const GroupImg = styled.img`
    width: 100%;
    height: 200px;
    /* background-color: #ddd; */
    object-fit: cover;
    border: none;
    border-radius: var(--radius-s);
`

const GroupBtnWrap = styled.div`
    display:flex;
    gap:10px;
    justify-content: space-between;
`