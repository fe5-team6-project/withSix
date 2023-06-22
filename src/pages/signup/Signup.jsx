import { useEffect, useState } from 'react';
import EmailPassword from './EmailPassword';
import Profile from './Profile';
import Common from '../../components/main/Common';
import { useDispatch } from 'react-redux';
import {
    setContent,
    setIsVisible,
    setUrl,
} from '../../store/slices/modalSlice';

export default function Signup() {
    const dispatch = useDispatch();
    const [passStep, setPassStep] = useState(false);
    const [user, setUser] = useState({
        username: String,
        email: String,
    });

    const setModalContent = (props) => {
        dispatch(
            setContent({
                state: props.state,
                message: props.message,
            })
        );
    };
    const setModalUrl = (url) => {
        dispatch(setUrl({ path: url }));
    };
    const setModalVisible = (isVisible) => {
        dispatch(setIsVisible({ isVisible: isVisible }));
    };

    const [page, setPage] = useState(
        <EmailPassword
            passValid={setPassStep}
            userData={setUser}
            setModalContent={setModalContent}
            setModalUrl={setModalUrl}
            setModalVisible={setModalVisible}
        />
    );

    useEffect(() => {
        if (!passStep) {
            setPage(
                <EmailPassword
                    passStep={setPassStep}
                    userData={setUser}
                    setModalContent={setModalContent}
                    setModalUrl={setModalUrl}
                    setModalVisible={setModalVisible}
                />
            );
        } else {
            setPage(
                <Profile
                    userData={user}
                    setModalContent={setModalContent}
                    setModalUrl={setModalUrl}
                    setModalVisible={setModalVisible}
                />
            );
        }
    }, [passStep]);

    const pagaTitle = '회원가입';
    const pageDesc = !passStep
        ? '아이디 비밀번호를 설정합니다.'
        : `
            프로필을 등록합니다. ${(<br />)}
            언제든 수정이 가능합니다.
        `;

    return (
        <>
            <Common
                page={page}
                title={pagaTitle}
                desc={pageDesc}
                autoMoveIgnore={true}
            />
        </>
    );
}
