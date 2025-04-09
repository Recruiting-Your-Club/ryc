import type { Dispatch, SetStateAction} from 'react';
import { createContext, useContext } from 'react';
import type { Align, Format } from './EditorToolbar';

interface EditorContextType {
    formats: Record<Format, boolean>;
    setFormats: Dispatch<SetStateAction<Record<Format, boolean>>>;
    align: Align;
    setAlign: Dispatch<SetStateAction<Align>>;
}

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
