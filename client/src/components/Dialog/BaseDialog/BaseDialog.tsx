import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
    backdrop,
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
    sx,
    handleClose,
}: {
    children: React.ReactNode;
    open: boolean;
    sx?: CSSObject;
    handleClose?: () => void;
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
                        <div css={backdrop} onClick={handleClose} aria-hidden="true" />
                        <div css={[dialogContainer, sx]}>{children}</div>
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
    position = 'center',
}: {
    position?: positionType;
    border?: boolean;
    children: React.ReactNode;
    sx?: CSSObject;
}) {
    return <header css={[headerContainer(position, border), sx]}>{children}</header>;
}

function DialogContent({ children, sx }: { children: React.ReactNode; sx?: CSSObject }) {
    return <div css={[contentContainer, sx]}>{children}</div>;
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
