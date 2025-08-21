import Alert from '@assets/images/alert.svg';
import Check from '@assets/images/check.svg';
import React from 'react';

import { Button, Dialog, Text } from '@ssoc/ui';
import type { ButtonSize } from '@ssoc/ui';

import { confirmDialogHeaderContainer } from './ConfirmDialog.style';
import type { DialogProps } from './types';

function ConfirmDialog({
    type = 'text',
    title = 'Sample Title입니다.',
    content = 'Sample Content입니다.',
    dialogSize = 'md',
    open,
    backdrop = false,
    titlePosition = 'start',
    contentPosition = 'center',
    actionPosition = 'end',
    buttonSize = 'xl',
    closeIcon,
    cancelButton = false,
    handleClose,
    actionHandler,
}: DialogProps & { buttonSize?: ButtonSize }) {
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
            <Dialog open={open} handleClose={handleClose} size={dialogSize} backdrop={backdrop}>
                <Dialog.Header
                    position={titlePosition}
                    closeIcon={closeIcon}
                    handleClose={handleClose}
                >
                    <div css={confirmDialogHeaderContainer(titlePosition, type)}>
                        {type === 'confirm' && <Check width="3rem" height="3rem" color="green" />}
                        {type === 'warning' && <Alert width="3rem" height="3rem" color="red" />}
                        <Text as="h4" type="h4Semibold">
                            {title}
                        </Text>
                    </div>
                </Dialog.Header>
                <Dialog.Content>
                    <Text textAlign={contentPosition}>{content}</Text>
                </Dialog.Content>
                <Dialog.Action position={actionPosition}>
                    {cancelButton && (
                        <Button variant="outlined" size={buttonSize} onClick={handleClose}>
                            취소
                        </Button>
                    )}
                    <Button
                        variant="primary"
                        size={buttonSize}
                        onClick={() => {
                            handleClose();
                            actionHandler?.();
                        }}
                    >
                        확인
                    </Button>
                </Dialog.Action>
            </Dialog>
        </>
    );
}
export { ConfirmDialog };
