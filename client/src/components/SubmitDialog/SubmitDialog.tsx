import React from 'react';
import { Dialog } from '@components/_common';
import { Text } from '@components/_common/Text';
import { Button } from '@components';

interface SubmitDialogProps {
    open: boolean;
    onConfirm: () => void;
    onClose: () => void;
}

const SubmitDialog = ({ open, onConfirm, onClose }: SubmitDialogProps) => (
    <Dialog open={open} handleClose={onClose} size="sm">
        <Dialog.Header border closeIcon handleClose={onClose}>
            <Text type="h3Bold">제출하시겠습니까?</Text>
        </Dialog.Header>
        <Dialog.Content>
            <Text type="bodyRegular">제출 후엔 수정할 수 없습니다~~</Text>
            <Text type="bodyRegular" color="helper">
                제출 후 결과가 메일로 발송됩니다.
            </Text>
        </Dialog.Content>
        <Dialog.Action border>
            <Button variant="primary" onClick={onConfirm}>
                예
            </Button>
            <Button variant="text" onClick={onClose}>
                아니요
            </Button>
        </Dialog.Action>
    </Dialog>
);

export default SubmitDialog;
