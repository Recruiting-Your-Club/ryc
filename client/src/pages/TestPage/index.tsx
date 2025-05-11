import type { ChangeEvent } from 'react';
import React, { TextareaHTMLAttributes, useState } from 'react';
import { Button } from '@components/_common/Button';
import { Text } from '@components/_common/Text';
import { Input } from '@components/_common/Input';
import { TextArea } from '@components/_common/TextArea/TextArea';
function TestPage() {
    const [text, setText] = useState('');
    const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    };
    return (
        <>
            <MainCard />
        </>
    );
}
export { TestPage };
