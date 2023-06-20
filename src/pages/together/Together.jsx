import React from 'react'
import { api } from '../../lib/apis/axiosConfig'
import { styled } from 'styled-components';
import Common from '../../components/main/Common';
import TogetherList from '../../components/together/TogetherList';


export default function Together() {
    const togetherList = async () => {
        const res = api.get(`/product/hailey_ha`)
        console.log(res);
    }

    const page = (
        <>
            <TogetherSection>
                <TogetherWrap>
                    <TogetherList></TogetherList>
                    {/* <div onClick={togetherList}>together</div> */}
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