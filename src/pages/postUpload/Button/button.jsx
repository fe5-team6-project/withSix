import React from 'react';
import { Button, ButtonWrap } from '../Button/buttonStyle';

export const UploadBtn = (props) => {
    return (
        <ButtonWrap>
            <Button onClick={props.UploadPost} size={props.size}>
                {props.text}
            </Button>
        </ButtonWrap>
    );
};
