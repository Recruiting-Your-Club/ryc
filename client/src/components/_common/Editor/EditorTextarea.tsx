import type { CSSObject } from '@emotion/react';
import React from 'react';
import { textareaContainer } from './Editor.style';
import { useEditorContext } from './EditorContext';

interface EditorProps {
    height?: string;
    radius?: string;
    sx?: CSSObject;
}
function EditorTextarea({ height, radius, sx }: EditorProps) {
    const { formats, align } = useEditorContext();
    const tempFontSize: string = '10px'; // 임시 변수 (추후 변경 예정)

    return (
        <>
            <div
                contentEditable
                suppressContentEditableWarning
                css={[textareaContainer(height, radius), sx]}
            ></div>
        </>
    );
}

export { EditorTextarea };
