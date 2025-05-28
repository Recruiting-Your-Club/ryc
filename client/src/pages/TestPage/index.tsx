import React, { useState } from 'react';
import { Button } from '@components/_common/Button';
import { Tooltip } from '@components/_common/Tooltip';

function TestPage() {
    return (
        <>
            <div>
                <Tooltip content="Tooltip 예시입니다.">
                    <Button variant="outlined">hd</Button>
                </Tooltip>
            </div>
        </>
    );
}
export { TestPage };
