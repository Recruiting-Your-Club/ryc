import XIcon from '@assets/images/xIcon.svg';
import { convertImageToBase64 } from '@utils/convertImageToBase64';
import React, { useState } from 'react';

import { Button, Dialog, Divider, Editor, Input, Text } from '@ssoc/ui';

import {
    s_action,
    s_content,
    s_contentWrapper,
    s_dialog,
    s_divider,
    s_editorRoot,
    s_editorTextarea,
    s_editorToolbar,
    s_header,
    s_input,
    s_titleInput,
    s_titleText,
    s_titleWrapper,
} from './PlainEmailDialog.style';
import type { PlainEmailDialogProps } from './types';

function PlainEmailDialog({ open, handleClose, handlePlainEmail }: PlainEmailDialogProps) {
    // prop destruction
    // lib hooks
    // initial values
    // state, ref, querystring hooks
    const [emailTitle, setEmailTitle] = useState<string>('');
    const [emailContent, setEmailContent] = useState<string>('');

    // form hooks
    // query hooks
    // calculated values
    // handlers
    const handleReset = () => {
        setEmailTitle('');
        setEmailContent('');
    };

    const handleSendPlainEmail = async () => {
        let contentToSend = emailContent;

        try {
            contentToSend = await convertImageToBase64(emailContent);
        } catch (error) {
            // 변환 실패 -> 원본 이미지 사용 (다른 이미지는 변환 계속)
            // eslint-disable-next-line no-empty
        }

        handlePlainEmail(emailTitle, contentToSend);

        if (!open && emailTitle.length !== 0 && contentToSend.length !== 0) {
            handleReset();
        }
    };

    // effects

    return (
        <Dialog open={open} handleClose={handleClose} size="full" sx={s_dialog}>
            <Dialog.Header position="start" sx={s_header}>
                <Text as="span" type="bodyBold" sx={s_titleText}>
                    전체 이메일 보내기
                </Text>
                <Button variant="transparent" size="xs" aria-label="close" onClick={handleClose}>
                    <XIcon alt="close" />
                </Button>
            </Dialog.Header>
            <Divider color="black" sx={s_divider} />
            <Dialog.Content sx={s_content}>
                <div css={s_titleWrapper}>
                    <Text as="span" type="h4Semibold" textAlign="start">
                        제목
                    </Text>
                    <Input
                        value={emailTitle}
                        onChange={(e) => setEmailTitle(e.target.value)}
                        height="4rem"
                        placeholder="이메일 제목을 입력해주세요."
                        inputSx={s_titleInput}
                        sx={s_input}
                    />
                </div>
                <div css={s_contentWrapper}>
                    <Text as="span" type="h4Semibold" textAlign="start">
                        내용
                    </Text>
                    <Editor.Root sx={s_editorRoot}>
                        <Editor.Toolbar sx={s_editorToolbar} />
                        <Editor.Textarea
                            value={emailContent}
                            onChange={setEmailContent}
                            sx={s_editorTextarea}
                        />
                    </Editor.Root>
                </div>
            </Dialog.Content>
            <Dialog.Action sx={s_action}>
                <Button onClick={handleSendPlainEmail}>이메일 보내기</Button>
            </Dialog.Action>
        </Dialog>
    );
}

export { PlainEmailDialog };
