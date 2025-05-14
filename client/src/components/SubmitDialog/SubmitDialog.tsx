import React from 'react';
import { Dialog } from '@components/_common';
import { Text } from '@components/_common/Text';
import { Button } from '@components';
import Check from '@assets/images/green-check.svg';
import {
    submitDialogButtonContainer,
    submitDialogContentContainer,
    submitDialogtTextContainer,
} from './SubmiDialog.style';
import type { SubmitDialogProps } from './types';

const SubmitDialog = ({ open, onConfirm, onClose }: SubmitDialogProps) => (
    <Dialog open={open} handleClose={onClose} size="sm">
        <Dialog.Content>
            <div css={submitDialogContentContainer}>
                <Check />
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
                <Button variant="primary" size="full" onClick={onConfirm}>
                    예
                </Button>
                <Button variant="outlined" size="full" onClick={onClose}>
                    아니오
                </Button>
            </div>
        </Dialog.Action>
    </Dialog>
);

export { SubmitDialog };
