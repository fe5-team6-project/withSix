import { UploadBtn } from '../Button/button'

export const PostUploadFooter = ({ isActive, UploadPost, disabled }) => {
    return (
    <>
        <UploadBtn size='middle-sm' isActive={isActive} UploadPost={UploadPost} disabled={disabled} text='저장' />
    </>
    );
};