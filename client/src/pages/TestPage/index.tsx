import type { ChangeEvent } from 'react';
import React, { useState } from 'react';
import { Button } from '@components/_common/Button';
import { Tooltip } from '@components/_common/Tooltip';
import React, { TextareaHTMLAttributes, useState } from 'react';
import { MainCard } from '@components';

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
