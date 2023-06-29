import { React, useEffect, useState } from 'react';
import { api } from '../../lib/apis/axiosConfig';
import { styled } from 'styled-components';
import Common from '../../components/main/Common';
import TogetherList from '../../components/together/TogetherList';
import WriteButton from '../../components/writebutton/WriteButton';
import { useParams } from 'react-router';
import EmptyData from '../../components/common/EmptyData';
import { useSelector } from 'react-redux';

export default function Together() {
    const accountname = useParams().id;
    const myInfo = useSelector((state) => {
        return state.user.myInfo.accountname;
    });
    const [pages, setPages] = useState(10);
    const [togetherList, setTogetherList] = useState([]);
    const [count, setCount] = useState(0);
    const [isSplash, setIsSplash] = useState(true);

    useEffect(() => {
        async function axiosTogetherList() {
            const res = await api.get(
                `/product/${accountname}/?limit=${pages}&skip=0`
            );
            const data = res?.data?.product;
            setTogetherList([...data]);
            setCount(data.length);
        }
        axiosTogetherList();
        setIsSplash(false);
    }, [pages]);

    const page = (
        <>
            {togetherList.length ? (
                <TogetherSection>
                    <TogetherWrap>
                        {!togetherList
                            ? []
                            : togetherList.map((item) => (
                                  <TogetherList
                                      key={item.id}
                                      {...item}
                                  ></TogetherList>
                              ))}
                    </TogetherWrap>
                    {count % 10 !== 0 ? null : (
                        <MoreButton
                            onClick={() => setPages((pages) => pages + 10)}
                        >
                            더보기
                        </MoreButton>
                    )}
                    {accountname === myInfo && (
                        <WriteButton url={`/together/upload`} />
                    )}
                </TogetherSection>
            ) : (
                <>
                    <EmptyData url={'../together/upload'} />
                    {accountname === myInfo && (
                        <WriteButton url={`/together/upload`} />
                    )}
                </>
            )}
        </>
    );
    return (
        <>
            <Common page={page} isSplash={isSplash} />
        </>
    );
}

const TogetherSection = styled.section`
    margin-top: 45px;
`;

const TogetherWrap = styled.ul`
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    gap: 10px;
    width: 390px;
    height: calc(100vh - 230px);
    padding: 10px;
    box-sizing: border-box;
    overflow-x: hidden;
    overflow-y: auto;
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
