import XIcon from '@assets/images/xIcon.svg';
import { Button, Dialog, Divider, Input, Text } from '@components/_common';
import { TextArea } from '@components/_common/TextArea';
import React from 'react';
import {
    actionCss,
    contentCss,
    contentWrapper,
    dialogCss,
    headerCss,
    inputCss,
    s_divider,
    s_textareaInner,
    s_textareaOutside,
    s_titleText,
    titleInputCss,
    titleWrapper,
} from './PlainEmailDialog.style';
import type { PlainEmailDialogProps } from './types';
function PlainEmailDialog({ open, handleClose }: PlainEmailDialogProps) {
    // prop destruction
    // lib hooks
    // initial values
    // state, ref, querystring hooks
    // form hooks
    // query hooks
    // calculated values
    // handlers
    // effects
    return (
        <Dialog open={open} handleClose={handleClose} size="full" sx={dialogCss}>
            <Dialog.Header position="start" sx={headerCss}>
                <Text as="span" type="bodyBold" sx={s_titleText}>
                    전체 이메일 보내기
                </Text>
                <Button variant="transparent" size="xs" aria-label="close" onClick={handleClose}>
                    <XIcon alt="close" />
                </Button>
            </Dialog.Header>
            <Divider color="black" sx={s_divider} />
            <Dialog.Content sx={contentCss}>
                <div css={titleWrapper}>
                    <Text as="span" type="h4Semibold" textAlign="start">
                        제목
                    </Text>
                    <Input
                        height="4rem"
                        placeholder="이메일 제목을 입력해주세요."
                        inputSx={titleInputCss}
                        sx={inputCss}
                    />
                </div>
                <div css={contentWrapper}>
                    <Text as="span" type="h4Semibold" textAlign="start">
                        내용
                    </Text>
                    <TextArea
                        size="md"
                        placeholder="이메일 내용을 입력해주세요."
                        sx={s_textareaInner}
                        textAreaSx={s_textareaOutside}
                    />
                </div>
            </Dialog.Content>
            <Dialog.Action sx={actionCss}>
                <Button>이메일 보내기</Button>
            </Dialog.Action>
        </Dialog>
    );
}

export { PlainEmailDialog };
