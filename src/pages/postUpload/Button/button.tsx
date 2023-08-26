import React from 'react';
import { Button, ButtonWrap } from '../Button/buttonStyle';

interface UploadProps {
    UploadPost: Function;
    size: string;
    text: string;
}

export const UploadBtn = ({ ...props }: UploadProps) => {
    return (
        <ButtonWrap>
            <Button onClick={props.UploadPost} size={props.size}>
                {props.text}
            </Button>
        </ButtonWrap>
    );
};
