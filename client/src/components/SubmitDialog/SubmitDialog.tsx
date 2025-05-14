import React from 'react';
import { Dialog } from '@components/_common';
import { Text } from '@components/_common/Text';
import { Button } from '@components';
import Alert from '@assets/images/red-alert.svg';
import {
    submitDialogButtonContainer,
    submitDialogContentContainer,
    submitDialogtTextContainer,
} from './SubmiDialog.style';

interface SubmitDialogProps {
    open: boolean;
    onConfirm: () => void;
    onClose: () => void;
}

const SubmitDialog = ({ open, onConfirm, onClose }: SubmitDialogProps) => (
    <Dialog open={open} handleClose={onClose} size="sm">
        <Dialog.Header closeIcon handleClose={onClose}>
            <Text type="h3Bold">제출 확인</Text>
        </Dialog.Header>
        <Dialog.Content>
            <div css={submitDialogContentContainer}>
                <Alert />
                <div css={submitDialogtTextContainer}>
                    <Text type="h4Bold" color="black" textAlign="center">
                        제출하시겠습니까?
                    </Text>
                    <Text type="bodyRegular" color="caption" textAlign="center">
                        제출 후에는 수정할 수 없습니다
                    </Text>
                    <Text type="bodyRegular" color="subCaption" textAlign="center">
                        제출 후 결과가 메일로 발송됩니다
                    </Text>
                </div>
            </div>
        </Dialog.Content>
        <Dialog.Action>
            <div css={submitDialogButtonContainer}>
                <Button variant="primary" onClick={onConfirm} sx={{ flex: 1 }}>
                    예
                </Button>
                <Button variant="outlined" onClick={onClose} sx={{ flex: 1 }}>
                    아니오
                </Button>
            </div>
        </Dialog.Action>
    </Dialog>
);

export { SubmitDialog };
