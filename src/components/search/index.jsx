import { useCallback, useState } from 'react';
import { debounce } from 'lodash';
import UserLIst from './UserList';
import { api } from '../../lib/apis/axiosConfig';
import Common from '../main/Common';
import { keyframes, styled } from 'styled-components';
import logo from '../../assets/logo/LOGO.svg';
import searchIconWhite from '../../assets/icons/common/search-main-white.svg';

export default function Search() {
    // console.log("Search렌더링");
    const [search, setSearch] = useState('');
    //모든 유저 목록
    const [userList, setUserList] = useState([]);
    //현재 사용자에게 보여지는 유저 목록
    const [showUser, setShowUser] = useState([]);
    //페이지 상태관리
    const [page, setPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const sendQuery = async (q) => {
        if (!isLoading) {
            setIsLoading(true);
        }
        delayLoading();
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
        debounce((q) => sendQuery(q), 400),
        []
    );

    const delayLoading = useCallback(debounce((q) => setIsLoading(false), 500));

    const handleTyping = (e) => {
        setSearch(e.target.value);
        if (e.target.value === '') {
            setUserList('');
            setShowUser('');
            return;
        }
        delayedSearch(e.target.value);
    };

    const addShowUser = () => {
        const addUserList = userList.slice(page * 10, page * 10 + 10);
        setShowUser([...showUser, ...addUserList]);
        setPage(page + 1);
    };

    const pageTitle = '유저 검색';
    const pageDesc = '유저를 검색할 수 있습니다.';

    return (
        <Common
            page={
                <SearchWrapper>
                    {isLoading && (
                        <Loading>
                            <img src={logo} alt="logo" />
                        </Loading>
                    )}
                    <Input
                        id="search_input"
                        type="text"
                        placeholder=" "
                        onChange={handleTyping}
                        value={search}
                    />
                    <List>
                        {search && showUser && (
                            <UserLIst
                                showUser={showUser}
                                searchQuery={search}
                            />
                        )}
                        {
                            //현재 보여주고 있는 데이터길이가 전체 데이터 길이보다 짧을때 더보기 생성
                            search && showUser.length < userList.length ? (
                                <AddButton onClick={addShowUser}>
                                    더보기
                                </AddButton>
                            ) : null
                        }
                    </List>
                    <SearchIcon htmlFor="search_input">
                        <img src={searchIconWhite} alt="검색 버튼" />
                    </SearchIcon>
                </SearchWrapper>
            }
            title={pageTitle}
            desc={pageDesc}
        ></Common>
    );
}

const SearchWrapper = styled.article`
    position: relative;
    width: 350px;
    height: calc(100vh - 350px);
    margin: 0px auto 20px;
    padding: 190px 0 20px;
    overflow-y: hidden;
    // background-color: red;
`;

const Input = styled.input`
    position: absolute;
    top: 0;
    left: 50%;
    width: 50px;
    height: 50px;
    margin: 130px auto;
    border: 3px solid var(--color-main);
    border-radius: 25px;
    background-color: white;
    box-sizing: border-box;
    color: #333;
    transform: translateX(-50%);

    &:focus,
    &:hover,
    &:not(:placeholder-shown) {
        width: 300px;
    }

    &:focus ~ label,
    &:hover ~ label,
    &:not(:placeholder-shown) ~ label {
        transform: translateX(100px);
    }
`;

const SearchIcon = styled.label`
    position: absolute;
    display: block;
    top: 0;
    left: 50%;
    width: 50px;
    height: 50px;
    margin: 130px auto;
    border-radius: 50%;
    box-sizing: border-box;
    background-color: var(--color-main);
    transform: translateX(-50%);
    transition: transform 0.3s;
    & > img {
        width: 50px;
        height: 50px;
        object-fit: none;
        object-position: 50% 50%;
    }
`;

const AddButton = styled.button`
    all: unset;
    display: block;
    width: 100px;
    height: 20px;
    margin: 0 auto 20px;
    border-radius: var(--radius-m);
    font-size: var(--fsize-m);
    text-align: center;
    cursor: pointer;
`;

const shakeAnimation = keyframes`
    0%{transform : translate(-50%, -50%) rotate(-20deg);}

    25%{transform : translate(-50%, -50%) rotate(20deg);}

    50%{transform : translate(-50%, -50%) rotate(-20deg);}

    75%{transform : translate(-50%, -50%) rotate(20deg);}
`;

const Loading = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    width: 70px;
    height: 70px;
    animation: ${shakeAnimation} 1s ease-in-out infinite;
    & > img {
        width: 70px;
    }
`;

const List = styled.div`
    height: 530px;
    margin-top: 10px;
    border-top: 1px solid var(--color-disabled);
    border-bottom: 1px solid var(--color-disabled);
    overflow-y: auto;
`;
