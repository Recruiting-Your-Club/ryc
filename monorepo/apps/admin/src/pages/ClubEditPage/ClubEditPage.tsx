import { useState } from 'react';
import React from 'react';

import { Editor } from '@ssoc/ui';

function ClubEditPage() {
    const [content, setContent] = useState('');
    const handleChange = (content: string) => {
        setContent(content);
    };
    return (
        <div>
            <Editor.Root>
                <Editor.Toolbar />
                <Editor.Textarea value={content} onChange={setContent} />
            </Editor.Root>
        </div>
    );
}
export { ClubEditPage };
