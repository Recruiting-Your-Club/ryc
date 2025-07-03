import React, { useState } from 'react';
import { Button } from '@components/_common/Button';
import { Tooltip } from '@components/_common/Tooltip';
import { MainCard } from '@components';
import { MainLoadingPage, DetailLoadingPage } from '@pages/LoadingPage';

function TestPage() {
    const [value, setValue] = useState('');
    return (
        <>
            <DetailLoadingPage />
        </>
    );
}
export { TestPage };

//<Calendar selectedDate={[clicked, ...select]} setClickedDate={setClicked} />
