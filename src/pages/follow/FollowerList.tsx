import React, { useEffect, useState } from 'react';
import Common from '../../components/main/Common';
import { styled } from 'styled-components';
import FollowList from '../../components/follow/FollowList';
import { api } from '../../lib/apis/axiosConfig';
import { useParams } from 'react-router-dom';
import EmptyData from '../../components/common/EmptyData';
import { FollowerProps } from '../../lib/utils/interface/interface';

export default function Follower() {
    const [followerList, setFollowerList] = useState<
        FollowerProps['follower'][]
    >([]);
    const accountName = useParams().accountname;
    const [pages, setPages] = useState(10);
    const [count, setCount] = useState(0);

    const FollowerList = async () => {
        const res = await api.get(
            `profile/${accountName}/follower/?limit=${pages}&skip=0`
        );
        console.log(res.data);
        const data = res.data;
        setFollowerList([...data]);
        setCount(data.length);
    };

    useEffect(() => {
        FollowerList();
    }, [pages]);

    const page = (
        <>
            <Main>
                {followerList.length ? (
                    <>
                        <FollowWrap>
                            {followerList.map(
                                (item: FollowerProps['follower']) => (
                                    <FollowList
                                        key={item._id}
                                        {...item}
                                    ></FollowList>
                                )
                            )}
                        </FollowWrap>
                        {count % 10 !== 0 ? null : (
                            <MoreButton
                                onClick={() => setPages((pages) => pages + 5)}
                            >
                                더보기
                            </MoreButton>
                        )}
                    </>
                ) : (
                    <EmptyData url={'../together/upload'} />
                )}
            </Main>
        </>
    );

    return (
        <>
            <Common page={page}></Common>
        </>
    );
}

const Main = styled.main`
    margin: 50px 0px;
`;

const FollowWrap = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: auto;
    min-width: 300px;
    max-width: 390px;
    padding: 20px;
`;

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
