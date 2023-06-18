import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../lib/apis/axiosConfig';
import { returnErrorMessage } from './utils/errorMessage';
import { URL } from '../../lib/apis/constants';

const postId = '6478c001b2cb2056632d23f2';

export default function PostDetail() {
    const { id } = useParams();
    const [data, setData] = useState('');
    const [commentCount, setCommentCount] = useState('');

    const fetchData = async () => {
        try {
            const {
                data: { post },
            } = await api.get(`/post/${id}`);
            setData(post);
            setCommentCount(post.commentCount);
        } catch (error) {
            returnErrorMessage(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (!data) return <h1>Loading</h1>;

    return (
        <>
            <p>{data.content}</p>
            <img src={data.author.image}></img>
            {data.image.split(', ').map((img) => (
                <img
                    key={img}
                    src={URL + '/' + img}
                    width={100}
                    height={100}
                    alt="이미지"
                ></img>
            ))}
            <p>{data.author.username} </p>
            <p>@{data.author.accountname}</p>
            <h3>댓글 개수 : {commentCount}</h3>
            {/* todo
                생성날짜변환 ex)2020년_10월_21일 */}
            <p>{data.createdAt}</p>
        </>
    );
}
