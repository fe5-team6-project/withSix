import React, { useEffect, useState } from 'react'
import Common from '../../components/main/Common';
import { styled } from "styled-components";
import FollowList from '../../components/follow/FollowList';
import { api } from '../../lib/apis/axiosConfig';
import { useParams } from 'react-router-dom';
import EmptyData from '../../components/common/EmptyData';


export default function Following() {
    const [followList, setFollowList] = useState([]);
    const accountName = useParams().accountname;
    const [pages, setPages] = useState(10);
    const [count, setCount] = useState(0);
    const [count2, setCount2] = useState(0);

    const FollowingList = async () => {
        const res = await api.get(`profile/${accountName}/following/?limit=${pages}&skip=0`);
        console.log(res.data);
        const data = res.data
        setFollowList([...data]);
        console.log(data.length)
        setCount(data.length);
    }

    useEffect(() => {
        FollowingList();
    }, [pages])

    const handleLoad = () => {
        setPages((pages) => pages + 10);
        setCount2(count + 1);
        console.log(count2)
    }

    const page = (
        <>
            <Main>
                {followList.length ? (
                    <>
                        <FollowWrap>
                            {followList.map((item) => (
                                <FollowList key={item.id} {...item}></FollowList>
                            ))}
                        </FollowWrap>
                        {/* {count % 10 !== 0 ? null : (<MoreButton onClick={() => setPages((pages) => pages + 10)}>더보기</MoreButton>)} */}
                        {count % 10 !== 0 || count + 1 === count2 ? null : (<MoreButton onClick={handleLoad}>더보기</MoreButton>)}
                    </>
                ) : (
                    <EmptyData url={'../together/upload'} />
                )}
            </Main>
        </>
    )

    return (
        <>
            <Common page={page}></Common>
        </>
    )
}

const Main = styled.main`
    margin: 50px 0px;
`

const FollowWrap = styled.ul`
    display:flex;
    flex-direction: column;
    gap:10px;
    margin:auto;
    min-width:300px;
    max-width:390px;
    padding:20px;
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