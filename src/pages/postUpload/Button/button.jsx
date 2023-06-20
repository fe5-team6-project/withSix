import React from 'react';
import { Button } from '../Button/buttonStyle'

export const UploadBtn = (props) => {
    return (
        <Button onClick={props.UploadPost} size={props.size} disabled={props.disabled}>
        {props.text}
        </Button>
    );
};