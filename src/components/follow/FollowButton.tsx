import { styled } from 'styled-components';
import { api } from '../../lib/apis/axiosConfig';

interface followButtonOptions {
    id: string;
    accountname: string;
    isfollow: boolean;
}

export default function FollowButton({
    id,
    accountname,
    isfollow,
}: followButtonOptions) {
    const handleFollow = async () => {
        if (isfollow) {
            await api.delete(`/profile/${accountname}/unfollow`).then((res) => {
                console.log(res);
            });
        } else {
            await api.post(`profile/${accountname}/follow`, []).then((res) => {
                console.log(res);
            });
        }
    };

    return (
        <FollowUnButton onClick={handleFollow}>
            {isfollow ? '언팔로우' : '팔로우'}
        </FollowUnButton>
    );
}

const FollowUnButton = styled.button``;
