import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import {
    overlay,
    dialogContainer,
    titleContainer,
    contentContainer,
    actionContainer,
} from './BaseDialog.style';
import type { SerializedStyles } from '@emotion/react';
import X from '@assets/images/x.svg';

function BaseDialog({
    children,
    open,
    width = '',
    height = '',
}: {
    children: React.ReactNode;
    open: boolean;
    width?: string;
    height?: string;
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
                        <div css={overlay}>
                            <div css={dialogContainer(width, height)}>{children}</div>
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
    sx?: SerializedStyles;
}) {
    return <div css={[titleContainer(border), sx]}>{children}</div>;
}

function DialogContent({ children, sx }: { children: React.ReactNode; sx?: SerializedStyles }) {
    return <div css={[contentContainer, sx]}>{children}</div>;
}

function DialogAction({ children, sx }: { children: React.ReactNode; sx?: SerializedStyles }) {
    return <div css={[actionContainer, sx]}>{children}</div>;
}

const Dialog = Object.assign(BaseDialog, {
    Header: DialogHeader,
    Content: DialogContent,
    Action: DialogAction,
});

export { Dialog };
