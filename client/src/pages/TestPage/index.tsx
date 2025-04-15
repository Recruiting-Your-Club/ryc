import React, { useState } from 'react';
import { SpinSpinner, Button, PulseSpinner } from '@components';
import { Spin } from '@components/_common/LoadingSpinner/LoadingSpinner.stories';
import theme from '@styles/theme';

function TestPage() {
    return (
        <>
            <Button loading={true}></Button>
            <SpinSpinner size="xs" />
            <br />
            <SpinSpinner size="s" />
            <br />
            <SpinSpinner size="md" />
            <br />
            <SpinSpinner size="lg" />
            <br />
            <SpinSpinner size="xl" />
            <br />

            <PulseSpinner color={theme.colors.blue[100]} size="xs" />
            <br />
            <PulseSpinner color="black" size="s" />
            <br />
            <PulseSpinner color="black" size="md" />
            <br />
            <PulseSpinner color="black" size="lg" />
            <br />
            <PulseSpinner color="black" size="xl" />
            <br />
        </>
    );
}
export { TestPage };
