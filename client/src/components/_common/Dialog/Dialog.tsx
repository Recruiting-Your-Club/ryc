import React from 'react';
import { createPortal } from 'react-dom';
import {
    backdropContainer,
    dialogContainer,
    headerContainer,
    contentContainer,
    actionContainer,
} from './Dialog.style';
import XIcon from '@assets/images/xIcon.svg';
import { Button } from '@components/_common/Button';
import type {
    DialogHeaderProps,
    DialogContentProps,
    DialogActionProps,
    BaseDialogProps,
    DialogSize,
    Size,
} from './types';
import { useDialog } from '@hooks/useDialog';

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

function BaseDialog({ children, size = 'md', sx, backdrop = true }: BaseDialogProps) {
    // prop destruction
    // lib hooks
    const { open, closeDialog } = useDialog();
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
                            onClick={() => backdrop && closeDialog()}
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
    closeIcon = false,
}: DialogHeaderProps) {
    // prop destruction
    // lib hooks
    const { closeDialog } = useDialog();
    // state, ref, querystring hooks
    // form hooks
    // query hooks
    // calculated values
    // effects
    // handlers
    return (
        <header css={[headerContainer(border, position), sx]}>
            {children}
            {closeIcon && (
                <Button
                    variant="transparent"
                    size="md"
                    aria-label="close"
                    onClick={closeDialog}
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
