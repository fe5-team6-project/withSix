import { UploadBtn } from '../Button/button'

export const PostUploadFooter = ({ UploadPost }) => {
    return (
    <>
        <UploadBtn size='middle' UploadPost={UploadPost} text='저장' />
    </>
    );
};