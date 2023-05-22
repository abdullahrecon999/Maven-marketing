import React, {useState} from 'react';
import { Input } from 'antd';

export function TitleComponent(props) {
    return (
        <div>
            <Input ref={props.ref} required placeholder="Title" showCount maxLength={300} value={props.value} onChange={props.onChange} />
        </div>
    )
}