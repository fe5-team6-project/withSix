import { useEffect, useState } from 'react';
import EmailPassword from './EmailPassword';
import Profile from './Profile';

export default function Signup() {
    const [passStep, setPassStep] = useState(false);
    const [user, setUser] = useState({
        username: String,
        email: String,
    });

    useEffect(() => {
        if (!passStep) {
            setPage(
                <EmailPassword passStep={setPassStep} userData={setUser} />
            );
        } else {
            setPage(<Profile userData={user} />);
        }
    }, [passStep]);

    const [page, setPage] = useState(
        <EmailPassword passValid={setPassStep} userData={setUser} />
    );

    return <></>;
}
