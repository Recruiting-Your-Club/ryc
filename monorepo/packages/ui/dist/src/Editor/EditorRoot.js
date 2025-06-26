import { jsx as _jsx } from "@emotion/react/jsx-runtime";
import { useMemo, useRef, useState } from 'react';
import { editorListStyle, rootContainer } from './Editor.style';
import { EditorContext } from './EditorContext';
function EditorRoot({ children, sx }) {
    const editorRef = useRef(null);
    const [savedRange, setSavedRange] = useState(null);
    const contextValue = useMemo(() => ({
        editorRef,
        savedRange,
        setSavedRange,
    }), [savedRange]);
    return (_jsx(EditorContext.Provider, { value: contextValue, children: _jsx("div", { css: [rootContainer, editorListStyle, sx], children: children }) }));
}
export { EditorRoot };
//# sourceMappingURL=EditorRoot.js.map