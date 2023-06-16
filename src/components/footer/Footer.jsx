import React from "react";
import home from "../../assets/nav/home.png";
import together from "../../assets/nav/together.png";
import review from "../../assets/nav/review.png";
import chat from "../../assets/nav/chat.png";

export default function Footer() {
    return (
        <footer>
            <ul>
                <li>
                    <a href="#">
                        <img src={home} alt="홈 아이콘" />
                        <span>홈</span>
                    </a>
                </li>

                <li>
                    <a href="#">
                        <img src={together} alt="모임 아이콘" />
                        <span>모임</span>
                    </a>
                </li>

                <li>
                    <a href="#">
                        <img src={review} alt="후기 아이콘" />
                        <span>후기</span>
                    </a>
                </li>

                <li>
                    <a href="#">
                        <img src={chat} alt="채팅 아이콘" />
                        <span>채팅</span>
                    </a>
                </li>

                <li>
                    <a href="#">
                        <img src={home} alt="" />
                    </a>
                </li>
            </ul>
        </footer>
    );
}
