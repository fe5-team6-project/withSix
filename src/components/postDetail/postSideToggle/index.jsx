import { useSelector } from 'react-redux';
import ModifyAndDelete from './ModfifyAndDelete';
import Report from './Report';

const userId = '6476d7b7b2cb2056632d009'; //나중에 전역변수로 설정
// const userId = '6476d7b7b2cb2056632d0093'; //나중에 전역변수로 설정

export default function PostSideToggle({ postAuthorId }) {
    // const userId = useSelector((state) => state.user);
    // console.log(userId);
    //내가 작성한 글
    if (postAuthorId === userId) {
        return <ModifyAndDelete />;
    }
    //다른 사용자가 작성한 글
    return <Report />;
}
