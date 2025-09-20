import type { InterviewSlot } from '@api/domain/interview/types';
import AttentionTriangle from '@assets/images/attention-triangle.svg';
import Info from '@assets/images/info.svg';
import { convertImageToBase64 } from '@utils/convertImageToBase64';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import React, { useEffect, useState } from 'react';

import { useRouter } from '@ssoc/hooks';
import { Button, Dialog, Divider, Editor, Input, Text, Tooltip } from '@ssoc/ui';

import {
    s_allSlotContainer,
    s_buttonToMove,
    s_contentWrapper,
    s_dateHeader,
    s_dialog,
    s_dialogAction,
    s_dialogContent,
    s_divider,
    s_editorRoot,
    s_editorTextarea,
    s_editorToolbar,
    s_emailContainer,
    s_header,
    s_iconContainer,
    s_informSvg,
    s_informSvgWrapper,
    s_input,
    s_perSlotContainer,
    s_scheduleContainer,
    s_scheduleContentContainer,
    s_slotInfo,
    s_slotRow,
    s_slotText,
    s_slotTitle,
    s_textAndTooltipContainer,
    s_timeAndNumberContainer,
    s_titleInput,
    s_titleText,
    s_titleWrapper,
    s_tooltipContent,
    s_verticalDivider,
    s_warningContainer,
    s_warningIcon,
    s_warningIconWrapper,
} from './InterviewEmailDialog.style';
import type { InterviewEmailDialogProps } from './types';

function InterviewEmailDialog({
    open,
    handleClose,
    handleInterviewEmail,
    interviewSlots,
    clubId,
    announcementId,
}: InterviewEmailDialogProps) {
    // prop destruction
    // lib hooks
    const { goTo } = useRouter();

    // initial values
    dayjs.locale('ko');

    // state, ref, querystring hooks
    const [emailTitle, setEmailTitle] = useState<string>('');
    const [emailContent, setEmailContent] = useState<string>('');
    // form hooks
    // query hooks
    // calculated values
    const groupedByDate = interviewSlots.reduce<Record<string, InterviewSlot[]>>(
        (groupedSlots, slot) => {
            const date = dayjs(slot.period.startDate).format('YYYY.MM.DD');
            if (!groupedSlots[date]) groupedSlots[date] = [];
            groupedSlots[date].push(slot);
            return groupedSlots;
        },
        {},
    );
    // handler
    const handleResetContent = () => {
        setEmailTitle('');
        setEmailContent('');
    };

    const handleSendEmail = async () => {
        let contentToSend = emailContent;

        try {
            contentToSend = await convertImageToBase64(emailContent);
        } catch (error) {
            // 변환 실패 -> 원본 이미지 사용 (다른 이미지는 변환 계속)
            // eslint-disable-next-line no-empty
        }

        if (await handleInterviewEmail(emailTitle, contentToSend)) {
            handleResetContent();
            handleClose();
        }
    };

    // effects
    useEffect(() => {
        if (!emailContent) return;

        convertImageToBase64(emailContent).then((convertedHtml) => {
            setEmailContent(convertedHtml);
        });
    }, [emailContent]);

    //etc
    const InterviewEmailPreview = (
        <div
            style={{
                fontFamily: 'Arial, sans-serif',
                padding: '20px',
                backgroundColor: '#f9f9f9',
                borderRadius: '10px',
            }}
        >
            <Text type="h4Bold" textAlign="start">
                📩 면접 일정 선택 안내
            </Text>
            <p style={{ marginTop: '1.5rem', fontSize: '14px', color: '#555' }}>
                아래 버튼을 클릭하여 면접 일정을 선택해주세요. 선착순으로 면접 일정이 배정되어 조기
                마감이 될 수 있습니다.
            </p>
            <button
                style={{
                    display: 'inline-block',
                    padding: '12px 24px',
                    marginTop: '10px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '6px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                }}
            >
                ✅ 면접 일정 선택하러 가기
            </button>
        </div>
    );

    return (
        <>
            <Dialog open={open} handleClose={handleClose} size="full" sx={s_dialog}>
                <Dialog.Header position="start" sx={s_header} handleClose={handleClose} closeIcon>
                    <span css={s_textAndTooltipContainer}>
                        <Text as="span" type="bodyBold" sx={{ paddingTop: '0.3rem' }}>
                            면접 일정 보내기
                        </Text>
                    </span>
                </Dialog.Header>
                <Divider color="black" sx={{ borderTop: '1px solid' }} />
                <Dialog.Content sx={s_dialogContent}>
                    <div css={s_scheduleContainer}>
                        <div css={s_scheduleContentContainer}>
                            <div css={s_slotTitle}>
                                <Text
                                    as="span"
                                    type="bodySemibold"
                                    textAlign="start"
                                    sx={s_titleText}
                                >
                                    면접 일정
                                </Text>
                                <Divider sx={s_divider} />
                            </div>
                            {interviewSlots.length > 0 ? (
                                <div css={s_allSlotContainer}>
                                    {Object.entries(groupedByDate).map(([date, slots]) => {
                                        const dayOfWeek = dayjs(slots[0].period.startDate).format(
                                            'ddd',
                                        );
                                        return (
                                            <div key={date} css={s_perSlotContainer}>
                                                <span>
                                                    <Text
                                                        as="span"
                                                        textAlign="start"
                                                        type="captionSemibold"
                                                        sx={s_dateHeader}
                                                    >{`${date} (${dayOfWeek})`}</Text>
                                                </span>
                                                <span css={s_timeAndNumberContainer}>
                                                    {slots.map((slot) => {
                                                        const startTime = dayjs(
                                                            slot.period.startDate,
                                                        ).format('HH:mm');
                                                        const endTime = dayjs(
                                                            slot.period.endDate,
                                                        ).format('HH:mm');
                                                        return (
                                                            <div key={slot.id} css={s_slotRow}>
                                                                <div css={s_slotInfo}>
                                                                    <Text
                                                                        sx={s_slotText}
                                                                        type="captionRegular"
                                                                    >
                                                                        {`${startTime} - ${endTime}`}
                                                                    </Text>
                                                                    <Text
                                                                        sx={s_slotText}
                                                                        type="captionRegular"
                                                                    >
                                                                        {`총 ${slot.maxNumberOfPeople}명`}
                                                                    </Text>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div css={s_warningContainer}>
                                    <div css={s_iconContainer}>
                                        <div css={s_warningIconWrapper}>
                                            <AttentionTriangle css={s_warningIcon} />
                                        </div>
                                    </div>
                                    <Text as="span" type="bodySemibold">
                                        면접 일정이 없어요. 먼저 면접 일정을 추가해주세요!
                                    </Text>
                                    <Button
                                        onClick={() =>
                                            goTo(`/schedule-addition/${clubId}/${announcementId}`)
                                        }
                                        size="md"
                                        sx={s_buttonToMove}
                                    >
                                        일정 추가 하기
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                    <span css={s_verticalDivider} />
                    <div css={s_emailContainer}>
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
                            <span css={s_textAndTooltipContainer}>
                                <Text as="span" type="h4Semibold" textAlign="start">
                                    내용
                                </Text>
                                <Tooltip
                                    content={
                                        '이메일 내용 상단에는 아래 안내 문구와 버튼이 추가돼요.'
                                    }
                                    direction="right"
                                    wrapperSx={s_informSvgWrapper}
                                    tooltipSx={s_tooltipContent}
                                >
                                    <Info css={s_informSvg} />
                                </Tooltip>
                            </span>
                            {InterviewEmailPreview}
                            <Editor.Root sx={s_editorRoot}>
                                <Editor.Toolbar sx={s_editorToolbar} />
                                <Editor.Textarea
                                    sx={s_editorTextarea}
                                    value={emailContent}
                                    onChange={setEmailContent}
                                />
                            </Editor.Root>
                        </div>
                    </div>
                </Dialog.Content>
                <Dialog.Action position="end" sx={s_dialogAction}>
                    <Button onClick={handleSendEmail} disabled={interviewSlots.length <= 0}>
                        이메일 보내기
                    </Button>
                </Dialog.Action>
            </Dialog>
        </>
    );
}

export { InterviewEmailDialog };
