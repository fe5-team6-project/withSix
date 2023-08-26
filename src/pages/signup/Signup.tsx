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
import {
    ModalPropsBase,
    SignPropsBase,
} from '../../lib/utils/interface/interface';

export default function Signup() {
    const dispatch = useDispatch();
    const [passStep, setPassStep] = useState<boolean>(false);
    const [user, setUser] = useState<SignPropsBase['user']>({
        username: '',
        email: '',
    });

    const setModalContent = (props: ModalPropsBase['modal']['content']) => {
        dispatch(
            setContent({
                state: props.state,
                message: props.message,
            })
        );
    };
    const setModalUrl = (url: string) => {
        dispatch(setUrl({ path: url }));
    };
    const setModalVisible = (isVisible: boolean) => {
        dispatch(setIsVisible({ isVisible: isVisible }));
    };

    const [page, setPage] = useState(
        <EmailPassword
            setPassStep={setPassStep}
            setUser={setUser}
            setModalContent={setModalContent}
            setModalUrl={setModalUrl}
            setModalVisible={setModalVisible}
        />
    );

    useEffect(() => {
        if (!passStep) {
            setPage(
                <EmailPassword
                    setPassStep={setPassStep}
                    setUser={setUser}
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
            프로필을 등록합니다.
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
