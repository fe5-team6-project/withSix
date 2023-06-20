import { useEffect, useState } from "react";
import { ModalWrap, CloseWrap, CloseBtnTitle, CloseBtn } from "./modalStyle"

export function Modal(){
    const [modalShow, setModalShow] = useState(false);
    // useEffect(() => {
    //     console.log('useEffect')
    //     const closeWrap = document.querySelector('.closeWrap');
    //     //modalshow가 트루일떄는 바텀이 0이여야해
        
    //     if (!closeWrap) return;
        
    //     if (modalShow){
    //         // closeWrap.classList.toggle('up');
    //         closeWrap.setAttribute('style','bottom:0px')
    //         // closeWrap.setAttribute('style','transition: bottom 2s ease-in-out 0s')
    //     }
    //     //폴스일떄는 바텀이 마이너스120해야됨
    //     else {
    //         // closeWrap.classList.toggle('up');
    //         closeWrap.setAttribute('style','bottom:-120px');
    //         // closeWrap.setAttribute('style','transition: bottom 2s ease-in-out 0s');
    //     }
    // },[modalShow])

    function modalOpen(){
        setModalShow(true);
    }

    return (
        <div>
            <button type="button" onClick={modalOpen}>모달테스트</button>
            {
                modalShow && 
                <ModalWrap>
                    <CloseWrap up={modalShow}> 
                        <img src="" alt="성공 및 실패 여부 이미지" />
                        <CloseBtnTitle> 이미 사용 중인 아이디입니다. </CloseBtnTitle>
                        <CloseBtn onClick={(e)=>{
                            e.target.parentElement.setAttribute('style', 'bottom: -240px')
                            setTimeout(()=>{
                                setModalShow((prev) => !prev)
                            }, 500)
                        }}>close
                        </CloseBtn> 
                    </CloseWrap>
                </ModalWrap>
            }
        </div>
    );

    // return (
    //     <div>
    //         <button type="button" onClick={modalOpen}>모달테스트</button>
    //         {
    //             modalShow && <Modal setModalShow={setModalShow}/>
    //         }
    //         <ModalWrap>
    //             <CloseWrap> 
    //                 <img src="" alt="성공 및 실패 여부 이미지" />
    //                 <CloseBtnTitle> 이미 사용 중인 아이디입니다. </CloseBtnTitle>
    //                 <CloseBtn
    //                 onClick={()=>setModalShow(prev => !prev)} >
    //                     close
    //                 </CloseBtn> 
    //             </CloseWrap>
    //         </ModalWrap>
    //     </div>
    // );
}