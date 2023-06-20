import React from 'react'
import { api } from '../../lib/apis/axiosConfig'
import { styled } from 'styled-components';
import Common from '../../components/main/Common';
import TogetherList from '../../components/together/TogetherList';
import { useSelector } from 'react-redux';


export default function Together() {
    const myInfo = useSelector((state) => { return state.user.myInfo })

    const togetherList = async () => {
        const res = api.get(`/product/${myInfo.accountname}/?limit=Number&skip=Number`)
        console.log(res);
    }

    const page = (
        <>
            <TogetherSection>
                <TogetherWrap>
                    <TogetherList></TogetherList>
                    <div onClick={togetherList}>together</div>
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