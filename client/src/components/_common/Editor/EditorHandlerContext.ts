import { createContext, useContext } from 'react';
import type { EditorHandlerContextType } from './types';

export const EditorHandlerContext = createContext<EditorHandlerContextType | undefined>(undefined);

export const useEditorHandlerContext = () => {
    const context = useContext(EditorHandlerContext);

    if (context === undefined) {
        throw new Error(
            'useEditorHnalderContext는 useEditorHandlerContext.Provider 내부에서만 사용할 수 있습니다.',
        );
    }

    return context;
};
