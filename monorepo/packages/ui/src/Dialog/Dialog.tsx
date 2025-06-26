import React from 'react';
import { createPortal } from 'react-dom';

import XIcon from '@ssoc/assets/images/xIcon.svg';

import { Button } from '../Button';
import {
    actionContainer,
    backdropContainer,
    contentContainer,
    dialogContainer,
    headerContainer,
} from './Dialog.style';
import type {
    BaseDialogProps,
    DialogActionProps,
    DialogContentProps,
    DialogHeaderProps,
    DialogSize,
    Size,
} from './types';

const dialogSize: Record<DialogSize, Size> = {
    sm: {
        width: '35rem',
    },
    md: {
        width: '50rem',
    },
    lg: {
        width: '70rem',
    },
    xl: {
        width: '90rem',
    },
    full: {
        width: '100%',
        height: '100%',
    },
};

function BaseDialog({
    children,
    open,
    size = 'md',
    sx,
    backdrop = true,
    handleClose,
}: BaseDialogProps) {
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
                        <div
                            css={backdropContainer}
                            onClick={() => backdrop && handleClose?.()}
                            aria-hidden="true"
                        />
                        <div css={[dialogContainer, dialogSize[size], sx]}>{children}</div>
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
    position = 'start',
    handleClose,
    closeIcon = false,
}: DialogHeaderProps) {
    return (
        <header css={[headerContainer(border, position), sx]}>
            {children}
            {closeIcon && (
                <Button
                    variant="transparent"
                    size="md"
                    aria-label="close"
                    onClick={handleClose}
                    sx={{ position: 'absolute', right: '2rem' }}
                >
                    <XIcon />
                </Button>
            )}
        </header>
    );
}

function DialogContent({ children, sx }: DialogContentProps) {
    return <div css={[contentContainer, sx]}>{children}</div>;
}

function DialogAction({ children, sx, border = false, position = 'center' }: DialogActionProps) {
    return <div css={[actionContainer(border, position), sx]}>{children}</div>;
}

const Dialog = Object.assign(BaseDialog, {
    Header: DialogHeader,
    Content: DialogContent,
    Action: DialogAction,
});

export { Dialog };
