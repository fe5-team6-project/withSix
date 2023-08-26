import { useSelector } from 'react-redux';
import ModifyAndDelete from './ModfifyAndDelete';
import Report from './Report';
import { UserInfoProps } from '../../../lib/utils/interface/interface';

// const userId = '6476d7b7b2cb2056632d009'; //나중에 전역변수로 설정
// const userId = '6476d7b7b2cb2056632d0093'; //나중에 전역변수로 설정

export default function PostSideToggle({
    postAuthorId,
}: {
    postAuthorId: string;
}) {
    const {
        myInfo: { _id },
    } = useSelector((state: UserInfoProps) => state.user);
    //내가 작성한 글
    if (postAuthorId === _id) {
        return <ModifyAndDelete />;
    }
    //다른 사용자가 작성한 글
    return <Report />;
}
