import { useParams } from 'react-router-dom';

export default function PostDetail() {
    const { id } = useParams();
    console.log(id);
}
