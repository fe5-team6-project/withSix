import { useCallback, useState } from 'react';
import { debounce } from 'lodash';
import UserLIst from './UserList';
import { api } from '../../lib/apis/axiosConfig';
import Common from '../main/Common';
import { styled } from 'styled-components';

export default function Search() {
    // console.log("Search렌더링");
    const [search, setSearch] = useState('');
    //모든 유저 목록
    const [userList, setUserList] = useState([]);
    //현재 사용자에게 보여지는 유저 목록
    const [showUser, setShowUser] = useState([]);
    //페이지 상태관리
    const [page, setPage] = useState(0);

    const sendQuery = async (q) => {
        if (q.length === 0) return;
        const { data } = await api.get(`/user/searchuser/?keyword=${q}`);
        //검색결과를 userList에 모두 저장
        setUserList(data);
        //처음에 10명의 유저만 보여주기
        setShowUser(data.slice(page * 10, page * 10 + 10));
        //다음 페이지의 유저를 보여주기 위해 미리 다음 페이지 셋팅해놈
        setPage(page + 1);
    };

    const delayedSearch = useCallback(
        debounce((q) => sendQuery(q), 500),
        []
    );

    const handleTyping = (e) => {
        setSearch(e.target.value);
        if (e.target.value === '') return;
        delayedSearch(e.target.value);
    };

    const addShowUser = () => {
        const addUserList = userList.slice(page * 10, page * 10 + 10);
        setShowUser([...showUser, ...addUserList]);
        setPage(page + 1);
    };

    return (
        <Common
            page={
                <SearchWrapper>
                    <Input
                        type="text"
                        placeholder="유저 검색"
                        onChange={handleTyping}
                        value={search}
                    />
                    {search && showUser && <UserLIst showUser={showUser} />}
                    {
                        //현재 보여주고 있는 데이터길이가 전체 데이터 길이보다 짧을때 더보기 생성
                        search && showUser.length < userList.length ? (
                            <AddButton onClick={addShowUser}>더보기</AddButton>
                        ) : null
                    }
                </SearchWrapper>
            }
        ></Common>
    );
}

const SearchWrapper = styled.div`
    width: 350px;
    margin: 50px auto 20px;
    // background-color: red;
`;

const Input = styled.input`
    width: inherit;
    margin: 0;
    color: black;
    outline: none;
`;

const AddButton = styled.button`
    margin-top: 20px;
    margin-left: 55px;
`;
