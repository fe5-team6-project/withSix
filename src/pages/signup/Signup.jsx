import React from 'react';
import IdPassword from './IdPassword';
import Profile from './Profile';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
    const navigator = useNavigate();

    const movePage = () => {
        if (!checkToken) {
            return false;
        } else {
            navigator('/');
        }
    };

    return (
        <>
            <IdPassword />
            <Profile />
        </>
    );
}

function checkToken() {
    const token = localStorage.token;
    if (!token) {
        return false;
    }
    return true;
}
