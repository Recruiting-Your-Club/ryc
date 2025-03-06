import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import {
    overlay,
    dialogContainer,
    headerContainer,
    contentContainer,
    actionContainer,
} from './BaseDialog.style';
import type { CSSObject } from '@emotion/react';

export type positionType = 'start' | 'center' | 'end';

function BaseDialog({
    children,
    open,
    width = '',
    height = '',
    sx,
    onClose,
}: {
    children: React.ReactNode;
    open: boolean;
    width?: string;
    height?: string;
    sx?: CSSObject;
    onClose?: () => void;
}) {
    // prop destruction
    // lib hooks
    // state, ref, querystring hooks
    // form hooks
    // query hooks
    // calculated values
    // effects
    // handlers
    return (
        <>
            {open &&
                createPortal(
                    <>
                        <div css={overlay} onClick={onClose} aria-hidden="true">
                            <div css={[dialogContainer(width, height), sx]}>{children}</div>
                        </div>
                    </>,
                    document.body,
                )}
        </>
    );
}

function DialogHeader({
    border = false,
    children,
    sx,
}: {
    border?: boolean;
    children: React.ReactNode;
    sx?: CSSObject;
}) {
    return <div css={[headerContainer(border), sx]}>{children}</div>;
}

function DialogContent({ children, sx }: { children: React.ReactNode; sx?: CSSObject }) {
    return <header css={[contentContainer, sx]}>{children}</header>;
}

function DialogAction({
    children,
    sx,
    border = false,
    position = 'center',
}: {
    children: React.ReactNode;
    sx?: CSSObject;
    border?: boolean;
    position?: positionType;
}) {
    return <div css={[actionContainer(border, position), sx]}>{children}</div>;
}

const Dialog = Object.assign(BaseDialog, {
    Header: DialogHeader,
    Content: DialogContent,
    Action: DialogAction,
});

export { Dialog };
