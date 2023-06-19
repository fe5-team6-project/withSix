import { useState } from 'react';

export default function ModifyAndDelete() {
    const [visible, setVisible] = useState(false);
    // Todo
    // 수정,삭제 기능 구현
    return (
        <>
            <button onClick={() => setVisible(!visible)}>수정,삭제 버튼</button>
            {visible && (
                <>
                    <button>수정</button>
                    <button>삭제</button>
                </>
            )}
        </>
    );
}
