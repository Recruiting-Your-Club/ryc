import { jsx as _jsx, Fragment as _Fragment } from "@emotion/react/jsx-runtime";
import { useEffect } from 'react';
import { textareaContainer } from './Editor.style';
import { useEditorContext } from './EditorContext';
function EditorTextarea({ height, radius, sx }) {
    const { editorRef, setSavedRange } = useEditorContext();
    useEffect(() => {
        const handleMouseDown = () => {
            const selection = window.getSelection();
            if (selection &&
                selection.rangeCount > 0 &&
                editorRef.current?.contains(selection.anchorNode)) {
                const range = selection.getRangeAt(0).cloneRange();
                setSavedRange(range);
            }
        };
        document.addEventListener('mousedown', handleMouseDown);
        return () => document.removeEventListener('mousedown', handleMouseDown);
    }, []);
    return (_jsx(_Fragment, { children: _jsx("div", { contentEditable: true, suppressContentEditableWarning: true, css: [textareaContainer(height, radius), sx], ref: editorRef }) }));
}
export { EditorTextarea };
//# sourceMappingURL=EditorTextarea.js.map