import { useSelector } from 'react-redux';
import DeleteMent from './DeleteMent';
import ReportMent from './Report';
import {
    CommentProps,
    UserInfoProps,
} from '../../../../lib/utils/interface/interface';

const userId = '6476d7b7b2cb2056632d0093'; //나중에 전역변수로 설정
// const userId = "6476d7b7b2cb2056632d0093"; //나중에 전역변수로 설정

export default function CommentSideToggle({
    authorId,
    commentId,
    setReload,
    setCommentCount,
    setComment,
    comment,
    setPage,
}: CommentProps) {
    const {
        myInfo: { _id },
    } = useSelector((state: UserInfoProps) => state.user);
    //내가 작성한 글
    if (authorId === _id) {
        return (
            <DeleteMent
                commentId={commentId}
                setReload={setReload}
                setCommentCount={setCommentCount}
                setComment={setComment}
                comment={comment}
            />
        );
    }
    //다른 사용자가 작성한 글
    return <ReportMent commentId={commentId} />;
}
