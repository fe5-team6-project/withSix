export const returnErrorMessage = (error: unknown) => {
    const {
        response: {
            data: { message },
        },
    }: any = error;
    return alert(message);
};

export const returnServerErrorMessage = () => {
    return alert('서버와의 통신이 원활하지 않습니다!');
};
