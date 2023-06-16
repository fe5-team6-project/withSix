import React from "react";
import logo from "../../assets/logo/LOGO-negative.svg";

export default function Header() {
    return (
        <header>
            <h1>
                <img src={logo} alt="로고" />
            </h1>

            <article>
                <strong>아이디</strong>
            </article>
        </header>
    );
}
