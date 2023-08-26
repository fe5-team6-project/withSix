import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Main from '../pages/main/Main';
import Home from '../pages/home/Home';
import TogetherUpload from '../pages/together/TogetherUpload';
import TogetherEdit from '../pages/together/TogetherEdit';
import Signup from '../pages/signup/Signup';
import FollowingList from '../pages/follow/FollowingList';
import FollowerList from '../pages/follow/FollowerList';
import PostDetail from '../components/postDetail';
import Search from '../components/search';
import PostUpload from '../pages/postUpload/postUpload';
import Together from '../pages/together/Together';
import TogetherDetail from '../pages/together/TogetherDetail';
import PostModify from '../pages/postUpload/postModify';
import Chat from '../pages/chat/Chat';
import UserProfile from '../pages/profile/userprofile/UserProfile';
import MyProfile from '../pages/profile/myprofile/MyProfile';
import UpdateProfile from '../pages/profile/myprofile/UpdateProfile';

export default function MyRouter() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/home/:id" element={<Home />} />
                    <Route path="/together/:id" element={<Together />} />
                    <Route
                        path="/together/upload"
                        element={<TogetherUpload />}
                    />
                    <Route
                        path="/together/edit/:id"
                        element={<TogetherEdit />}
                    />
                    <Route
                        path="/together/detail/:id"
                        element={<TogetherDetail />}
                    />
                    <Route path="/signup" element={<Signup />} />
                    <Route
                        path="/profile/:accountname/following"
                        element={<FollowingList />}
                    />
                    <Route
                        path="/profile/:accountname/follower"
                        element={<FollowerList />}
                    />
                    <Route path="/myprofile" element={<MyProfile />} />
                    <Route
                        path="/myprofile/update"
                        element={<UpdateProfile />}
                    />
                    <Route path="/post/upload" element={<PostUpload />} />
                    <Route path="/post/modify/:id" element={<PostModify />} />
                    <Route path="/post/detail/:id" element={<PostDetail />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/profile/:id" element={<UserProfile />} />
                    <Route path="/chat" element={<Chat />} />
                </Routes>
            </Router>
        </>
    );
}
