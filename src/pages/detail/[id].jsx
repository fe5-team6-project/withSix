import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../lib/apis/axiosConfig';
import { returnErrorMessage } from './utils/errorMessage';

const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzZkN2I3YjJjYjIwNTY2MzJkMDA5MyIsImV4cCI6MTY5MDgxNzQyOCwiaWF0IjoxNjg1NjMzNDI4fQ.fuRi1qVjgU4C7my-RPJrPOoBFjAvSHauogh8alP9mbI';
const postId = '6478c001b2cb2056632d23f2';

export default function PostDetail() {
    const { id } = useParams();
    const [data, setData] = useState('');

    const fetchData = async () => {
        try {
            const {
                data: { post },
            } = await api.get(`/post/${id}`);
            setData(post);
        } catch (error) {
            returnErrorMessage(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (!data) return <h1>Loading</h1>;

    return <div>Detail Page</div>;
}
