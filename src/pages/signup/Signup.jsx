import { useState } from 'react';
import EmailPassword from './EmailPassword';

export default function Signup() {
    const [passStep, setPassStep] = useState(false);
    const [user, setUser] = useState({
        username: String,
        email: String,
    });

    const [page, setPage] = useState(
        <EmailPassword passValid={setPassStep} userData={setUser} />
    );

    return <></>;
}
