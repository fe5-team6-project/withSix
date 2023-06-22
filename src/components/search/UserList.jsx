import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

export default function UserLIst({ showUser, searchQuery }) {
    const navigate = useNavigate();

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
            imgSrc = 'http://146.56.183.55:5050/Ellipse.png';
        }
        return (
            <UserWrapper key={item._id} onClick={() => handleRouting(item)}>
                <Img src={imgSrc}></Img>
                <Right>
                    {/* <UserName>{item.username}</UserName> */}
                    <UserName>
                        {item.username.includes(searchQuery) ? (
                            <>
                                {item.username.split(searchQuery)[0]}
                                <span style={{ color: '#F26E22' }}>
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
                                <span style={{ color: '#F26E22' }}>
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
    margin: 10px 0;
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
