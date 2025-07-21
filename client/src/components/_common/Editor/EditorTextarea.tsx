import React, { useEffect } from 'react';
import { textareaContainer } from './Editor.style';
import { useEditorContext } from './EditorContext';
import type { TextareaProps } from './types';

function EditorTextarea({ height, radius, value, onChange, sx }: TextareaProps) {
    // prop destruction
    // lib hooks
    // initial values
    // state, ref, querystring hooks
    const { editorRef, setSavedRange } = useEditorContext();

    // form hooks
    // query hooks
    // calculated values
    // handlers
    const handleInput = () => {
        const html = editorRef.current?.innerHTML || '';
        onChange?.(html);
    };
    // effects
    useEffect(() => {
        // textarea 내에 존재한 마지막 커서 기억을 위한 함수
        const handleMouseDown = () => {
            const selection = window.getSelection();
            if (
                selection &&
                selection.rangeCount > 0 &&
                editorRef.current?.contains(selection.anchorNode)
            ) {
                const range = selection.getRangeAt(0).cloneRange();
                setSavedRange(range);
            }
        };

        document.addEventListener('mousedown', handleMouseDown);
        return () => document.removeEventListener('mousedown', handleMouseDown);
    }, []);

    useEffect(() => {
        if (editorRef.current && value !== undefined && editorRef.current.innerHTML !== value) {
            editorRef.current.innerHTML = value;
        }
    }, [value]);

    return (
        <>
            <div
                contentEditable
                suppressContentEditableWarning
                onInput={handleInput}
                css={[textareaContainer(height, radius), sx]}
                ref={editorRef}
            />
        </>
    );
}

export { EditorTextarea };
