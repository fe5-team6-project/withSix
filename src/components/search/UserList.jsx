import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import getUserProfile from '../../pages/userprofile/getUserProfile';
import { setUserInfo } from '../../store/slices/userSlice';
import { DEFAULT_IMAGE } from '../../lib/apis/constant/path';

export default function UserLIst({ showUser, searchQuery }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    async function setUser(accountname) {
        const user = await getUserProfile(accountname);
        dispatch(setUserInfo(user));
    }

    const handleRouting = useCallback((item) => {
        // console.log(item);
        navigate(`/profile/${item.accountname}`);
    }, []);

    return showUser.map((item) => {
        let imgSrc = item.image;
        if (
            !item.image.includes('https://api.mandarin') ||
            item.image.includes('/undefined') ||
            item.image.includes('/null')
        ) {
            imgSrc = DEFAULT_IMAGE;
        }
        return (
            <UserWrapper
                key={item._id}
                onClick={async () => {
                    await setUser(item?.accountname);
                    navigate(`../profile/${item?.accountname}`);
                }}
            >
                <Img src={imgSrc}></Img>
                <Right>
                    {/* <UserName>{item.username}</UserName> */}
                    <UserName>
                        {item.username.includes(searchQuery) ? (
                            <>
                                {item.username.split(searchQuery)[0]}
                                <span style={{ color: 'var(--color-main)' }}>
                                    {searchQuery}
                                </span>
                                {item.username.split(searchQuery)[1]}
                            </>
                        ) : (
                            item.username
                        )}
                    </UserName>
                    <AccountName>
                        @
                        {item.accountname.includes(searchQuery) ? (
                            <>
                                {item.accountname.split(searchQuery)[0]}
                                <span style={{ color: 'var(--color-main)' }}>
                                    {searchQuery}
                                </span>
                                {item.accountname.split(searchQuery)[1]}
                            </>
                        ) : (
                            item.accountname
                        )}
                    </AccountName>
                </Right>
            </UserWrapper>
        );
    });
}

const UserWrapper = styled.div`
    display: flex;
    margin: 10px 10px;
    box-sizing: border-box;
    background-color: rgba(255, 255, 255, 0.95);
    border-radius: var(--radius-m);
    cursor: pointer;
    // background-color: blue;
`;

const Right = styled.div`
    flex-grow: 1;
    // background-color: red;
`;

const Img = styled.img`
    width: 50px;
    height: 50px;
    margin-right: 10px;
    border-radius: 50%;
`;

const UserName = styled.p``;

const AccountName = styled.p``;
