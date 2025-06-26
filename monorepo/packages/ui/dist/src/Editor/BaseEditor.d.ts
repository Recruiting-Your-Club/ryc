import { EditorRoot } from './EditorRoot';
import { EditorTextarea } from './EditorTextarea';
import { EditorToolbar } from './EditorToolbar';
declare function BaseEditor(): import("@emotion/react/jsx-runtime").JSX.Element;
declare const Editor: typeof BaseEditor & {
    Root: typeof EditorRoot;
    Toolbar: typeof EditorToolbar;
    Textarea: typeof EditorTextarea;
};
export { Editor };
//# sourceMappingURL=BaseEditor.d.ts.map