import React, { useState } from 'react';
import { Button } from '@components/_common/Button';
import { Text } from '@components/_common/Text';
function TestPage() {
    return (
        <>
            <div>
                <Button variant="outlined">hd</Button>
                <Button variant="text">hd</Button>
                <Button variant="transparent">hd</Button>
                <Button variant="primary">hd</Button>
                <Text type="h1Bold">
                    <Text.HighLignt text="하이" />
                    하이요
                </Text>
            </div>
        </>
    );
}
export { TestPage };
