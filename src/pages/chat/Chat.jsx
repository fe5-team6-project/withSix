import React, { useState } from 'react';
import Common from '../../components/main/Common';
import { styled } from 'styled-components';
import { useSelector } from 'react-redux';
import { DEFAULT_IMAGE } from '../../lib/apis/constant/path';

export default function Chat() {
    const user = useSelector((state) => state.user?.myInfo);
    console.log(user);
    const [chatList, setChatList] = useState([
        {
            image: DEFAULT_IMAGE,
            username: '하비투게더',
            message: '안녕하세요 반갑습니다!',
            _id: '012345',
        },
    ]);

    const [chat, setChat] = useState({
        image: user?.image,
        username: user?.username,
        message: '',
        _id: user?._id,
    });

    const resetChat = () => {
        setChat({
            image: user?.image,
            username: user?.username,
            message: '',
            _id: user?._id,
        });
    };

    const setMessage = (e) => {
        const message = e.target.value;
        setChat({
            image: user?.image,
            username: user?.username,
            message: message,
            _id: user?._id,
        });
    };

    const page = (
        <ChatWrap>
            <h2 className="a11y-hidden">채팅 페이지</h2>

            <ChatList>
                {chatList.map((chat, idx) => {
                    return (
                        <ChatItem
                            key={idx}
                            state={user._id === chat._id ? true : false}
                        >
                            <Profile>
                                <img src={chat?.image} alt="프로필" />
                                <strong>{chat?.username}</strong>
                            </Profile>
                            <Message>{chat?.message}</Message>
                        </ChatItem>
                    );
                })}
            </ChatList>

            <Form>
                <InputMessage
                    id="chat_input"
                    type="text"
                    value={chat.message}
                    onChange={(e) => setMessage(e)}
                />
                <SendMessage
                    onClick={(e) => {
                        e.preventDefault();
                        setChatList([...chatList, chat]);
                        resetChat();
                    }}
                >
                    전송
                </SendMessage>
            </Form>
        </ChatWrap>
    );

    const pageTitle = '채팅';
    const pageDesc = '상대방과 채팅을 주고받을 수 있습니다.';

    return <Common page={page} title={pageTitle} desc={pageDesc} />;
}

const ChatWrap = styled.section`
    width: 100%;
    padding-top: 120px;
`;

const ChatList = styled.ul`
    width: 320px;
    margin: 0px auto;
`;

const ChatItem = styled.li`
    display: flex;
    flex-wrap: wrap;
    flex-direction: ${(props) => (props.state ? 'row-reverse' : 'row')};
    width: 100%;
    padding: 5px 0;

    & > section {
        display: flex;
        flex-direction: ${(props) => (props.state ? 'row-reverse' : 'row')};
    }
`;

const Profile = styled.section`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: 30px;
    margin-bottom: 10px;

    & > img {
        width: 30px;
        height: 30px;
        object-fit: cover;
    }

    & > strong {
        display: inline-block;
        height: 30px;
        margin-left: 3px;
        line-height: 30px;
        vertical-align: top;
        font-size: var(--fsize-s);
        color: var(--color-gray);
    }
`;

const Message = styled.p`
    padding: 10px;
    background-color: white;
    border-radius: var(--radius-l);
`;

const Form = styled.form`
    position: fixed;
    left: 50%;
    bottom: 60px;
    width: 100%;
    max-width: 390px;
    padding: 0 20px;
    box-sizing: border-box;
    transform: translateX(-50%);
`;

const InputMessage = styled.input`
    width: calc(100% - 60px);
    height: 50px;
    background-color: white;
    margin-right: 10px;
    border-radius: var(--radius-m);
    color: var(--color-black);
`;

const SendMessage = styled.button`
    width: 50px;
    height: 50px;
`;
