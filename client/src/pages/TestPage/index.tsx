import { Editor } from '@components/_common/Editor';
import React, { useState } from 'react';
function TestPage() {
    return (
        <div>
            <div css={{ width: '100rem', marginBottom: '20px' }}>
                <Editor />
            </div>
        </div>
    );
}
export { TestPage };
