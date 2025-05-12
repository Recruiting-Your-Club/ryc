import React, { useState } from 'react';
import { Calendar, Button } from '@components';
import dayjs from 'dayjs';
import { MainCard } from '@components';
import { Toggle, TextToggle } from '@components';
import { useToggle } from '@hooks/useToggle';

function TestPage() {
    const [text, setText] = useState('');
    const { isChecked, handleToggle } = useToggle();

    return (
        <>
            <br />
            <Toggle isChecked={isChecked} handleToggle={handleToggle} size="sm" />
            <br />
            <Toggle isChecked={isChecked} handleToggle={handleToggle} size="md" />
            <br />
            <Toggle isChecked={isChecked} handleToggle={handleToggle} size="lg" />
            <br />
            <TextToggle
                isChecked={isChecked}
                handleToggle={handleToggle}
                size="sm"
                leftText="안녕하세요"
            />
            <br />
            <TextToggle isChecked={isChecked} handleToggle={handleToggle} size="md" />
            <br />
            <TextToggle isChecked={isChecked} handleToggle={handleToggle} size="lg" />
        </>
    );
}
export { TestPage };
