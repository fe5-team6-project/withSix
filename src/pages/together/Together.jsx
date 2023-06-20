import { React, useState } from 'react'
import { api } from '../../lib/apis/axiosConfig'
import { styled } from 'styled-components';
import Common from '../../components/main/Common';
import TogetherList from '../../components/together/TogetherList';
import { useSelector } from 'react-redux';


export default function Together() {
    const myInfo = useSelector((state) => { return state.user.myInfo })

    const [togetherList, setTogetherList] = useState([]);

    const axiosTogetherList = async () => {
        const res = await api.get(`/product/${myInfo.accountname}/?limit=Number&skip=Number`);
        setTogetherList([...res.data.product]);
        console.log(togetherList);
    }

    const page = (
        <>
            <TogetherSection>
                <TogetherWrap>
                    <TogetherList>
                        {togetherList}
                    </TogetherList>
                    <div onClick={axiosTogetherList}>together</div>
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