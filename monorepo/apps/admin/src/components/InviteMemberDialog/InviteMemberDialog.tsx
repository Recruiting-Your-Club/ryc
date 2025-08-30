import React from 'react';

import { Button, Dialog, Divider, Input, Text, useToast } from '@ssoc/ui';

import {
    s_dialogContentInputAndButtonContainer,
    s_dialogContentText,
    s_inputSx,
} from './InviteMemberDialog.style';
import type { InviteMemberDialogProps } from './types';

const InviteMemberDialog = ({ open, handleClose, inviteUrl }: InviteMemberDialogProps) => {
    const { toast } = useToast();
    const handleCopy = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            toast.success('초대 링크가 복사되었습니다!');
        } catch {
            toast.error('초대 링크 복사에 실패했습니다.');
        }
    };
    return (
        <>
            <Dialog open={open} handleClose={handleClose} size="md">
                <Dialog.Header position="start" handleClose={handleClose} closeIcon>
                    <Text type="h4Semibold" textAlign="left">
                        멤버 초대
                    </Text>
                </Dialog.Header>
                <Divider />
                <Dialog.Content sx={{ marginBottom: '2rem' }}>
                    <div css={s_dialogContentText}>
                        <Text textAlign="left" type="bodyRegular">
                            초대 링크를 복사하여 동아리원에게 공유해주세요.
                        </Text>
                        <div css={s_dialogContentInputAndButtonContainer}>
                            <Input value={inviteUrl} readOnly sx={s_inputSx} />
                            <Button
                                variant="primary"
                                size="md"
                                onClick={() => handleCopy(inviteUrl)}
                            >
                                초대 링크 복사
                            </Button>
                        </div>
                    </div>
                </Dialog.Content>
            </Dialog>
        </>
    );
};

export { InviteMemberDialog };
