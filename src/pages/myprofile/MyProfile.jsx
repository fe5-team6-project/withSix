import React from 'react';
import Common from '../../components/design/main/Common';
import { Link } from 'react-router-dom';
import logout from '../../assets/icons/common/icon-logout.svg';

export default function MyProfile() {
    const page = (
        <>
            <section>
                <h2 className="a11y-hidden">프로필 이미지</h2>
                <img src="" alt="" />
            </section>

            <section>
                <h2 className="a11y-hidden">팔로우</h2>
                <h3>Followers</h3>
                <Link to={''}>{9999}</Link>
                <h3>Followings</h3>
                <Link to={''}>{9999}</Link>
            </section>

            <section>
                <h2 className="a11y-hidden">프로필</h2>
                <div>
                    <span>ID</span>
                    <strong></strong>
                </div>
                <div>
                    <span>Nickname</span>
                    <strong></strong>
                </div>
                <div>
                    <span>Introduce</span>
                    <strong></strong>
                </div>
            </section>

            <section>
                <span></span>
            </section>
            <button>프로필 수정</button>
            <Link to={'/'}>
                <img src={logout} alt="로그아웃 아이콘" />
                Logout
            </Link>
        </>
    );

    const pageTitle = '프로필';
    const pageDesc = `${'아이디'}님의 프로필을 확인합니다.`;

    return (
        <>
            <Common page={page} title={pageTitle} desc={pageDesc} />;
        </>
    );
}
