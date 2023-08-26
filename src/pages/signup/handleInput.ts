import { INPUT_EVENT } from '../../lib/utils/type/eventType';

export interface HandleInputProps {
    e: INPUT_EVENT;
    setEmail: Function;
    setPassword: Function;
    setPassword2: Function;
}

const handleInput = ({
    e,
    setEmail,
    setPassword,
    setPassword2,
}: HandleInputProps) => {
    const value = e.target.value;
    if (e.target.id === 'email') {
        setEmail(value);
    } else if (e.target.id === 'password') {
        setPassword(value);
    } else if (e.target.id === 'check_password') {
        setPassword2(value);
    }
};

export default handleInput;
