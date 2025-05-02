import type { ChangeEvent } from 'react';
import React, { useState } from 'react';
import { Button } from '@components/_common/Button';
import { Tooltip } from '@components/_common/Tooltip';
function TestPage() {
    const [text, setText] = useState('');
    const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    };
    return (
        <>
            <div>
                <Tooltip content="Tooltip 예시입니다." direction="bottomRight">
                    <Button variant="outlined">hd</Button>
                </Tooltip>
            </div>
        </>
    );
}
export { TestPage };
