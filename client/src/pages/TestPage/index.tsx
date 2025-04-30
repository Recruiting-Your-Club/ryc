import React, { useState } from 'react';
import { Calendar, Button } from '@components';
import dayjs from 'dayjs';
import { MainCard } from '@components';

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
