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
function ConfirmDialog({
    title,
    content,
    open,
    position = 'end',
    handleClose,
    hanlder,
}: {
    title: string;
    content: string;
    open: boolean;
    position: positionType;
    handleClose: () => void;
    handler?: () => void;
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
            <Dialog open={open}>
                <Dialog.Header>
                    <div css={confirmDialogHeaderContainer}>
                        <Check width="3rem" height="3rem" color="green" />
                        <Text as="h4" type="h4Semibold">
                            {title}
                        </Text>
                    </div>
                    <XIcon />
                </Dialog.Header>
                <Dialog.Content>
                    <Text>{content}</Text>
                </Dialog.Content>
                <Dialog.Action position={position}>
                    <Button
                        variant="primary"
                        size="xl"
                        onClick={() => {
                            handleClose();
                            hanlder();
                        }}
                    >
                        확인
                    </Button>
                    <Button variant="outlined" size="xl" onClick={handleClose}>
                        취소
                    </Button>
                </Dialog.Action>
            </Dialog>
        </>
    );
}
export { ConfirmDialog };
