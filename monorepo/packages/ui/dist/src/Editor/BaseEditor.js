import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@emotion/react/jsx-runtime";
import { EditorRoot } from './EditorRoot';
import { EditorTextarea } from './EditorTextarea';
import { EditorToolbar } from './EditorToolbar';
function BaseEditor() {
    return (_jsx(_Fragment, { children: _jsxs(EditorRoot, { children: [_jsx(EditorToolbar, {}), _jsx(EditorTextarea, {})] }) }));
}
const Editor = Object.assign(BaseEditor, {
    Root: EditorRoot,
    Toolbar: EditorToolbar,
    Textarea: EditorTextarea,
});
export { Editor };
//# sourceMappingURL=BaseEditor.js.map