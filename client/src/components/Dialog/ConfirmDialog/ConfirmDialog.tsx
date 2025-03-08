import React from 'react';
import { useDialog } from '@hooks/useDialog';
import { Dialog } from '@components/Dialog';
import { Text } from '@components/Text';
import Alert from '@assets/images/alert.svg';
import Check from '@assets/images/check.svg';
import XIcon from '@assets/images/xIcon.svg';
import { Button } from '@components/Button';
import { confirmDialogHeaderContainer } from './ConfirmDialog.style';
import type { positionType } from '../BaseDialog';
import type { ButtonSize } from '@components/Button';

type DialogType = 'text' | 'confirm' | 'warning';

function ConfirmDialog({
    type = 'text',
    title = '알림',
    content = 'Sample Content입니다.',
    open,
    titlePosition = 'center',
    contentPosition = 'center',
    actionPosition = 'end',
    buttonSize = 'xl',
    closeIcon = false,
    handleClose,
    actionHandler,
}: {
    type?: DialogType;
    title: string;
    content: string;
    open: boolean;
    closeIcon?: boolean;
    buttonSize?: ButtonSize;
    titlePosition?: positionType;
    contentPosition?: positionType;
    actionPosition?: positionType;
    handleClose: () => void;
    actionHandler?: () => void;
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
            <Dialog open={open} handleClose={handleClose}>
                <Dialog.Header>
                    {titlePosition === 'center' && <div />}
                    <div css={confirmDialogHeaderContainer}>
                        {type === 'confirm' && <Check width="3rem" height="3rem" color="green" />}
                        {type === 'warning' && <Alert width="3rem" height="3rem" color="red" />}
                        <Text as="h4" type="h4Semibold">
                            {title}
                        </Text>
                    </div>
                    <Button
                        variant="transparent"
                        size="xs"
                        aria-label="close"
                        onClick={handleClose}
                    >
                        {closeIcon && <XIcon />}
                    </Button>
                </Dialog.Header>
                <Dialog.Content>
                    <Text textAlign={contentPosition}>{content}</Text>
                </Dialog.Content>
                <Dialog.Action position={actionPosition}>
                    <Button variant="outlined" size={buttonSize} onClick={handleClose}>
                        취소
                    </Button>
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
