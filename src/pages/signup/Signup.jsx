import { useEffect, useState } from 'react';
import EmailPassword from './EmailPassword';
import Profile from './Profile';
import Common from '../../components/main/Common';

export default function Signup() {
    const [passStep, setPassStep] = useState(false);
    const [user, setUser] = useState({
        username: String,
        email: String,
    });

    const [page, setPage] = useState(
        <EmailPassword passValid={setPassStep} userData={setUser} />
    );

    useEffect(() => {
        if (!passStep) {
            setPage(
                <EmailPassword passStep={setPassStep} userData={setUser} />
            );
        } else {
            console.log(user);
            setPage(<Profile userData={user} />);
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
