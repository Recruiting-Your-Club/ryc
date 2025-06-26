import { createContext, useContext } from 'react';
export const EditorContext = createContext(undefined);
export const useEditorContext = () => {
    const context = useContext(EditorContext);
    if (context === undefined) {
        throw new Error('useEditorContext는 useEditorContext.Provider 내부에서만 사용할 수 있습니다.');
    }
    return context;
};
//# sourceMappingURL=EditorContext.js.map