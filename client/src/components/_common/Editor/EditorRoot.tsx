import type { CSSObject } from '@emotion/react';
import type { ReactNode } from 'react';
import React, { useMemo, useState } from 'react';
import { editorListStyle, rootContainer } from './Editor.style';
import { EditorContext } from './EditorContext';
import type { Align, Format, List } from './EditorToolbar';

interface RootProps {
    children?: ReactNode;
    sx?: CSSObject;
}

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

    // form hooks
    // query hooks

    // calculated values

    ////
    const toggleFormatButton = (format: Format) => {
        setFormats((prev) => ({
            ...prev,
            [format]: !prev[format],
        }));
    };

    const toggleListButton = (list: List) => {
        setLists((prev) => {
            if (prev[list]) return prev;

            return {
                disc: list === 'disc',
                decimal: list === 'decimal',
            };
        });
    };
    //// 호이스팅 문제로 이곳으로 위치 옮김 (원래 자리는 handlers)

    const contextValue = useMemo(
        () => ({
            formats,
            setFormats,
            toggleFormatButton,
            align,
            setAlign,
            lists,
            setLists,
            toggleListButton,
        }),
        [formats, align, lists],
    );

    // handlers

    // effects

    return (
        <EditorContext.Provider value={contextValue}>
            <div css={[rootContainer, editorListStyle, sx]}>{children}</div>
        </EditorContext.Provider>
    );
}

export { EditorRoot };
