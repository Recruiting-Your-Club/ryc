import type { ChangeEvent } from 'react';
import React, { useState } from 'react';
import { Button } from '@components/_common/Button';
import { Tooltip } from '@components/_common/Tooltip';
import { MainCard } from '@components';
import { MainLoadingPage, DetailLoadingPage } from '@pages/LoadingPage';

function TestPage() {
    return (
        <>
            <DetailLoadingPage />
        </>
    );
}
export { TestPage };
