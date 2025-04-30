import { createContext, useContext } from 'react';
import type { EditorContextType } from './types';

export const EditorContext = createContext<EditorContextType | undefined>(undefined);

export const useEditorContext = () => {
    const context = useContext(EditorContext);

    if (context === undefined) {
        throw new Error(
            'useEditorContext는 useEditorContext.Provider 내부에서만 사용할 수 있습니다.',
        );
    }

    return context;
};
