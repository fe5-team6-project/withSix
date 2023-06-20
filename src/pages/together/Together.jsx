import { React, useEffect, useState } from 'react'
import { api } from '../../lib/apis/axiosConfig'
import { styled } from 'styled-components';
import Common from '../../components/main/Common';
import TogetherList from '../../components/together/TogetherList';
import { useSelector } from 'react-redux';


export default function Together() {
    const myInfo = useSelector((state) => { return state.user.myInfo });
    const [pages, setPages] = useState(10)
    const [togetherList, setTogetherList] = useState([]);

    useEffect(() => {
        async function axiosTogetherList() {
            const res = await api.get(`/product/${myInfo.accountname}`);
            console.log(res);
            const abc = res.data.product;
            console.log(abc);
            setTogetherList([...abc]);
            console.log(togetherList);
        }
        console.log(myInfo);
        axiosTogetherList();
    }, [pages]);


    const page = (
        <>
            <TogetherSection>
                <TogetherWrap>
                    {!togetherList ? [] : togetherList.map((item) => (
                        <TogetherList key={item.id} {...item}></TogetherList>
                    ))}
                    {/* {togetherList.map((item) => (
                        <TogetherList></TogetherList>
                    ))} */}
                </TogetherWrap>
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