import { React, useEffect, useState } from 'react'
import { api } from '../../lib/apis/axiosConfig'
import { styled } from 'styled-components';
import Common from '../../components/main/Common';
import TogetherList from '../../components/together/TogetherList';
import { useSelector } from 'react-redux';
import WriteButton from '../../components/writebutton/WriteButton'
import { useParams } from 'react-router';


export default function Together() {
    const accountname = useParams().id;
    const [pages, setPages] = useState(10);
    //추후 '더보기'추가예정

    const [togetherList, setTogetherList] = useState([]);

    useEffect(() => {
        async function axiosTogetherList() {
            const res = await api.get(`/product/${accountname}/?limit=${pages}&skip=0`);
            const abc = res?.data?.product;
            setTogetherList([...abc]);
            console.log(abc)
        }
        axiosTogetherList();
    }, [pages]);


    const page = (
        <>
            <TogetherSection>
                <TogetherWrap>
                    {!togetherList ? [] : togetherList.map((item) => (
                        //item = {item}해도 되는데 어떻게 할 지 아직은 고민
                        <TogetherList key={item.id} {...item}></TogetherList>
                    ))}
                    {/* {togetherList.map((item) => (
                        <TogetherList></TogetherList>
                    ))} */}
                </TogetherWrap>
                <MoreButton
                    onClick={() => setPages((pagse) => pages + 5)}
                >
                    더보기
                </MoreButton>
                <WriteButton url={`/together/upload`} />
            </TogetherSection>
        </>
    )
    return (
        <>
            <Common page={page} />
        </>
    )
}

const TogetherSection = styled.section`
    margin:54px 0px 10px 0px;
`

const TogetherWrap = styled.ul`
    display:flex;
    flex-wrap: wrap;
    gap:10px;
`

const MoreButton = styled.button`
    all: unset;
    display: block;
    width: 100px;
    height: 20px;
    margin: 20px auto 20px;
    border-radius: var(--radius-m);
    font-size: var(--fsize-m);
    text-align: center;
    cursor: pointer;
`;
