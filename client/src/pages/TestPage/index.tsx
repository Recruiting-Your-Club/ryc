import React, { useState } from 'react';
import { SpinSpinner, Button, PulseSpinner } from '@components';
function TestPage() {
    return (
        <>
            <Button loading={true}></Button>
            <SpinSpinner />
            <PulseSpinner color="black" />
        </>
    );
}
export { TestPage };
