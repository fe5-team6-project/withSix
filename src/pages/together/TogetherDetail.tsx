import { useEffect, useState } from 'react';
import Common from '../../components/main/Common';
import { styled } from 'styled-components';
import { api } from '../../lib/apis/axiosConfig';
import { useParams } from 'react-router-dom';
import TogetherEditButton from '../../components/together/TogetherEditButton';
import TogetherDelButton from '../../components/together/TogetherDelButton';
import { useDispatch, useSelector } from 'react-redux';
import { inputTogether } from '../../store/slices/togetherSlice';
import { handleErrorImg } from '../../lib/utils/validation/image/validationContentImage';
import {
    TogetherPropsBase,
    UserInfoProps,
} from '../../lib/utils/interface/interface';

export default function TogetherDetail() {
    const myAccountname = useSelector((state: UserInfoProps) => {
        return state.user.myInfo.accountname;
    });
    const [userAccountname, setUserAccountname] = useState();
    const dispatch = useDispatch();

    const [togetherDetail, setTogetherDetail] =
        useState<TogetherPropsBase['together']['together']>();
    const [num, setNum] = useState(0);
    const togetherId = useParams().id;

    const togetherDetails = async () => {
        const res = await api.get(`/product/detail/${togetherId}`);
        const detailData = res.data?.product;
        setTogetherDetail(detailData);
        const { itemImage, itemName, link, price } = detailData;
        dispatch(inputTogether({ itemImage, itemName, link, price }));
        setUserAccountname(res.data?.product?.author?.accountname);
    };

    useEffect(() => {
        togetherDetails();
    }, [num]);

    const page = (
        <>
            {togetherDetail && (
                <Form>
                    <GroupHeader>
                        <H1>{togetherDetail?.itemName}</H1>
                    </GroupHeader>
                    <GroupWrapper>
                        <GroupImg
                            src={togetherDetail?.itemImage}
                            onError={handleErrorImg}
                        ></GroupImg>
                        <GroupText id="togetherPrice">
                            <span>
                                {togetherDetail?.price.toLocaleString('ko-KR')}
                            </span>
                            원
                        </GroupText>
                        <GroupDetailInfo>
                            {togetherDetail?.link}
                        </GroupDetailInfo>
                    </GroupWrapper>
                    <GroupBtnWrap>
                        {myAccountname === userAccountname && (
                            <>
                                <TogetherEditButton />
                                <TogetherDelButton />
                            </>
                        )}
                    </GroupBtnWrap>
                </Form>
            )}
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
    margin-top: 34px;
    text-indent: 10px;
    &#togetherPrice {
        text-align: right;
        & span {
            margin-right: 3px;
            font-size: var(--fsize-title);
            color: var(--color-main);
            font-family: var(--font-eng);
            font-weight: bold;
            font-style: italic;
        }
    }
`;

const GroupDetailInfo = styled.p`
    text-align: left;
    width: 100%; //조정예정
    height: 100px;
    margin-top: 20px;
    padding: 15px 10px;
    font-family: var(--font-kr);
    font-size: var(--fsize-l);
    box-sizing: border-box;
    border-radius: var(--radius-s);
    resize: none; //크기조절 삭제
    font-family: inherit;
    background-color: inherit;
    margin-bottom: 50px;
`;

const GroupWrapper = styled.div``;

const GroupImg = styled.img`
    width: 100%;
    height: 200px;
    object-fit: cover;
    border: none;
    border-radius: var(--radius-s);
`;

const GroupBtnWrap = styled.div`
    display: flex;
    gap: 10px;
    justify-content: space-between;

    & > button:nth-of-type(1) {
        width: calc(100% - 80px);
    }

    & > button:nth-of-type(2) {
        width: 70px;
    }
`;
