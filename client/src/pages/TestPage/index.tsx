import React from 'react';
import { BaseInput } from '@components/Input';

function TestPage() {
    return (
        <>
            <div>기본 input</div>
            <BaseInput variant="primary" />
            <div>밑에만 있는 input</div>
            <BaseInput variant="lined" />
        </>
    );
}
export { TestPage };
