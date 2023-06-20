import React from 'react'
import { api } from '../../lib/apis/axiosConfig'
import { styled } from 'styled-components';
import Common from '../../components/main/Common';


export default function Together() {
    const togetherList = async () => {
        const res = api.get(`/product/hailey_ha`)
        console.log(res);
    }

    const page = (
        <>
            <TogetherSection>
                <TogetherList>
                    <div onClick={togetherList}>together</div>
                </TogetherList>
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

const TogetherList = styled.ul`
    display:flex;
    gap:10px;
`