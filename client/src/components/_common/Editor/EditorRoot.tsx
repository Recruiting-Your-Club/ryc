import { DEFAULT_FONT_SIZE } from '@constants/Editor';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { editorListStyle, rootContainer } from './Editor.style';
import { EditorContext } from './EditorContext';
import { EditorHandlerContext } from './EditorHandlerContext';
import type { Align, Format, List, Option, RootProps, Size } from './types';

function EditorRoot({ children, sx }: RootProps) {
    // prop destruction
    // lib hooks
    // initial values

    // state, ref, querystring hooks
    const editorRef = useRef<HTMLDivElement>(null);
    const [savedRange, setSavedRange] = useState<Range | null>(null);
    const [size, setSize] = useState<Size>(DEFAULT_FONT_SIZE);
    const [formats, setFormats] = useState<Record<Format, boolean>>({
        bold: false,
        italic: false,
        underline: false,
        strikethrough: false,
    });
    const [align, setAlign] = useState<Align>('inherit');
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
            savedRange,
            setSavedRange,
            editorRef,
            size,
            formats,
            align,
            lists,
            options,
            setSize,
            setFormats,
            setAlign,
            setLists,
            setOptions,
        }),
        [size, formats, align, lists, options],
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

    const toggleAlignButton = useCallback((alignment: Align) => {
        setAlign(alignment);
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
        () => ({
            toggleFormatButton,
            toggleAlignButton,
            toggleListButton,
        }),
        [toggleFormatButton, toggleAlignButton, toggleListButton],
    );

    // effects
    useEffect(() => {
        // textarea 내에 존재한 마지막 커서 기억을 위한 함수
        const handleMouseDown = () => {
            const selection = window.getSelection();
            if (
                selection &&
                selection.rangeCount > 0 &&
                editorRef.current?.contains(selection.anchorNode)
            ) {
                const range = selection.getRangeAt(0).cloneRange();
                setSavedRange(range);
            }
        };

        document.addEventListener('mousedown', handleMouseDown);
        return () => document.removeEventListener('mousedown', handleMouseDown);
    }, []);

    return (
        <EditorContext.Provider value={contextValue}>
            <EditorHandlerContext.Provider value={handlerContextValue}>
                <div css={[rootContainer, editorListStyle, sx]}>{children}</div>
            </EditorHandlerContext.Provider>
        </EditorContext.Provider>
    );
}

export { EditorRoot };
