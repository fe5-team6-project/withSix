interface authorProps9 {
    _id: string;
    username: string;
    accountname: string;
    intro: string;
    image: string;
    following: string[];
    follower: string[];
    followerCount: number;
    followingCount: number;
}

interface authorProps10 {
    _id: string;
    username: string;
    isfollow: boolean;
    intro: string;
    image: string;
    followingCount: number;
    following: string[];
    followerCount: number;
    follower: string[];
    accountname: string;
}

export interface UserInfoProps {
    user: {
        myInfo: authorProps10;
        userInfo: authorProps10;
    };
}

export interface ModalPropsBase {
    modal: {
        content: {
            state: boolean;
            message: string;
            url?: string;
        };
        display: {
            isVisible: boolean;
        };

        url: {
            path: string;
        };
    };
}

export interface TogetherPropsBase {
    together: {
        together: {
            id: string;
            itemName: string;
            price: number;
            link: string;
            itemImage: string;
            author: authorProps9;
        };
        req: {
            itemName: string;
            price: number;
            link: string;
            itemImage: string;
        };
        detail: {
            id: string;
            itemName: string;
            price: number;
            link: string;
            itemImage: string;
        };
    };
}

export interface DataProps {
    id: string;
    accountname: string;
    username: string;
    image: string;
    isfollow: boolean;
}

export interface FollowerProps {
    follower: authorProps10;
}

export interface PostItemProps {
    item: {
        id: string;
        _id?: string;
        content: string;
        image: string;
        createdAt: string;
        updatedAt: string;
        hearted: boolean;
        heartCount: number;
        comments?: string;
        commentCount: number;
        author: authorProps10;
    };
}

export interface PostProps {
    category: string;
    accountname: string;
    skip: number;
    isMyPost: boolean;
    item?: PostItemProps['item'];
}

export interface CommentPropsBase {
    id: string;
    content: string;
    createdAt: Date;
    author: authorProps10;
}

export interface CommentProps {
    authorId?: string;
    commentId: string;
    setReload: Function;
    setCommentCount: Function;
    setComment: Function;
    comment: CommentPropsBase[];
    setPage?: Function;
}

export interface CommentReqProps {
    setReload: Function;
    setCommentCount: Function;
    setComment: Function;
}
