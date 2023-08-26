import { UploadBtn } from '../Button/button';

export const PostUploadFooter = ({ UploadPost }: { UploadPost: Function }) => {
    return (
        <>
            <UploadBtn size="middle" UploadPost={UploadPost} text="저장" />
        </>
    );
};
