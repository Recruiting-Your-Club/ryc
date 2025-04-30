import React, { useCallback, useMemo, useState } from 'react';
import { editorListStyle, rootContainer } from './Editor.style';
import { EditorContext } from './EditorContext';
import { EditorHandlerContext } from './EditorHandlerContext';
import type { Align, Format, List, Option } from './EditorToolbar';
import type { RootProps } from './types';

function EditorRoot({ children, sx }: RootProps) {
    // prop destruction
    // lib hooks
    // initial values

    // state, ref, querystring hooks
    const [formats, setFormats] = useState<Record<Format, boolean>>({
        bold: false,
        italic: false,
        strikethrough: false,
        underline: false,
    });
    const [align, setAlign] = useState<Align>('left');
    const [lists, setLists] = useState<Record<List, boolean>>({
        disc: false,
        decimal: false,
    });
    const [options, setOptions] = useState<Record<Option, boolean>>({
        link: false,
        image: false,
        divider: false,
    });

    const contextValue = useMemo(
        () => ({
            formats,
            align,
            lists,
            options,
            setFormats,
            setAlign,
            setLists,
            setOptions,
        }),
        [formats, align, lists, options],
    );

    // form hooks
    // query hooks

    // calculated values

    // handlers
    const toggleFormatButton = useCallback((format: Format) => {
        setFormats((prev) => ({
            ...prev,
            [format]: !prev[format],
        }));
    }, []);

    const toggleListButton = useCallback((list: List) => {
        setLists((prev) => {
            if (prev[list]) return prev;

            return {
                disc: list === 'disc',
                decimal: list === 'decimal',
            };
        });
    }, []);

    const handlerContextValue = useMemo(
        () => ({ toggleFormatButton, toggleListButton }),
        [toggleFormatButton, toggleListButton],
    );

    // effects

    return (
        <EditorContext.Provider value={contextValue}>
            <EditorHandlerContext.Provider value={handlerContextValue}>
                <div css={[rootContainer, editorListStyle, sx]}>{children}</div>
            </EditorHandlerContext.Provider>
        </EditorContext.Provider>
    );
}

export { EditorRoot };
