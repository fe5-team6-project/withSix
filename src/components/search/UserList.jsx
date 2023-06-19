export default function UserLIst({ showUser }) {
    return showUser.map((item) => {
        let imgSrc = item.image;
        if (
            !item.image.includes('https://api.mandarin') ||
            item.image.includes('/undefined')
        ) {
            imgSrc = 'http://146.56.183.55:5050/Ellipse.png';
        }
        return (
            <div key={item._id}>
                <p>{item.accountname}</p>
                <p>{item.username}</p>
                <img src={imgSrc}></img>
            </div>
        );
    });
}
