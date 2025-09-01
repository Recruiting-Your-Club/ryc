import type { InterviewSlot } from '@api/domain/club/types';
import { useSubmitInterviewReservation } from '@api/hooks';
import { clubQueries } from '@api/queryFactory/clubQueries';
import Clock from '@assets/images/clock.svg';
import User from '@assets/images/user.svg';
import { ErrorDialog } from '@components';
import { useQuery } from '@tanstack/react-query';
import { getCategory } from '@utils/changeCategory';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import CalendarIcon from '@ssoc/assets/images/calendar.svg';
import Check from '@ssoc/assets/images/check.svg';
import theme from '@ssoc/styles';
import { Avatar, Button, Calendar, ConfirmDialog, Divider, Text, useToast } from '@ssoc/ui';

import {
    s_buttonContainer,
    s_calendarContainer,
    s_checkIcon,
    s_checkIconWrapper,
    s_clubInfoWrapper,
    s_clubTextWrapper,
    s_descriptionWrapper,
    s_impossibleBox,
    s_infoBox,
    s_infoContainer,
    s_infoTextWrapper,
    s_leftContainer,
    s_possibleBox,
    s_reservationContainer,
    s_reserveButtonWrapper,
    s_rightContainer,
    s_selectedDateWrapper,
    s_selectExampleWrapper,
    s_successContainer,
    s_successTitleWrapper,
    s_svgWrapper,
    s_temp,
    s_timeButton,
    s_timeContainer,
} from './Reservation.style';

function ReservationPage() {
    // prop destruction
    // lib hooks
    const { toast } = useToast();
    const { clubId, announcementId, applicantId } = useParams();
    // initial values
    // state, ref, querystring hooks
    const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);
    const [possibleReservationDate, setPossibleReservationDate] = useState<string[]>([]);
    const [selectDate, setSelectDate] = useState<string[]>([]);
    const [interviewSlots, setInterviewSlots] = useState<InterviewSlot[]>([]);
    const [interviewDuration, setInterviewDuration] = useState<number>(0);
    const [selectedInterviewSlot, setSelectedInterviewSlot] = useState<InterviewSlot | null>(null);
    const [isSuccessReservation, setIsSuccessReservation] = useState<boolean>(false);
    const [errorDialogOpen, setErrorDialogOpen] = useState<boolean>(false);

    // form hooks
    // query hooks
    const { data: clubReservation } = useQuery({
        ...clubQueries.getClubReservation(clubId ?? '', announcementId ?? '', applicantId ?? ''),
        throwOnError: true,
    });
    const { mutateAsync: submitInterviewReservation } =
        useSubmitInterviewReservation(setErrorDialogOpen);
    // calculated values

    // handlers
    const handleCalendar = (selectDate: string[]) => {
        setSelectDate(selectDate);
        setInterviewSlots(
            clubReservation?.slotByDateResponses.find((slot) => slot.date === selectDate.toString())
                ?.interviewSlots ?? [],
        );
        setInterviewDuration(
            clubReservation?.slotByDateResponses.find((slot) => slot.date === selectDate.toString())
                ?.interviewDuration ?? 0,
        );
    };
    const handleTimeButton = (slot: InterviewSlot) => {
        setSelectedInterviewSlot(slot);
    };
    const handleConfirmDialog = () => {
        if (!selectedInterviewSlot) {
            toast('날짜와 시간을 선택해주세요', {
                type: 'error',
            });
            return;
        }
        setOpenConfirmDialog(true);
    };

    const submitReservation = async () => {
        try {
            await submitInterviewReservation({
                clubId,
                announcementId,
                applicantId,
                slotId: selectedInterviewSlot?.id ?? '',
            });
            toast('예약이 완료되었습니다.', {
                type: 'success',
            });
            setIsSuccessReservation(true);
        } catch (error) {
            if (error instanceof Error) {
                toast(error.message, {
                    type: 'error',
                });
            }
        }
        setOpenConfirmDialog(false);
    };
    // effects
    useEffect(() => {
        if (clubReservation) {
            setPossibleReservationDate(
                clubReservation.slotByDateResponses.map((slot) => slot.date),
            );
            //setIsSuccessReservation(clubReservation.isReserved)
        }
    }, [clubReservation]);

    if (isSuccessReservation) {
        return (
            <div css={s_temp}>
                <div css={s_successContainer}>
                    <div css={s_successTitleWrapper}>
                        <div css={s_checkIconWrapper}>
                            <Check css={s_checkIcon} />
                        </div>
                        <Text type="h2Semibold" color="primary">
                            예약 완료!
                        </Text>
                        <Text type="bodyRegular" color="caption">
                            자세한 내용은 메일을 확인해주세요.
                        </Text>
                    </div>
                    <div css={s_infoContainer}>
                        <div css={s_infoBox(true)}>
                            <div css={s_svgWrapper}>
                                <CalendarIcon
                                    width="100%"
                                    height="100%"
                                    css={{ color: theme.colors.default }}
                                />
                            </div>
                            <div css={s_infoTextWrapper}>
                                <Text type="bodyRegular" textAlign="start" color="primary">
                                    예약 날짜
                                </Text>
                                <Text type="h4Semibold" textAlign="start" color="primary">
                                    {dayjs(selectedInterviewSlot?.period.startDate).format(
                                        'YYYY년 MM월 DD일 dddd',
                                    )}
                                </Text>
                            </div>
                        </div>
                        <div css={s_infoBox(false)}>
                            <div css={s_svgWrapper}>
                                <Clock width="100%" height="100%" />
                            </div>
                            <div css={s_infoTextWrapper}>
                                <Text type="bodyRegular" textAlign="start">
                                    시간
                                </Text>
                                <Text type="bodySemibold">{`${dayjs(selectedInterviewSlot?.period.startDate).format('HH:mm')} ~ ${dayjs(
                                    selectedInterviewSlot?.period.endDate,
                                ).format('HH:mm')}`}</Text>
                            </div>
                        </div>
                        <div css={s_infoBox(false)}>
                            <div css={s_svgWrapper}>
                                <User width="100%" height="100%" />
                            </div>
                            <div css={s_infoTextWrapper}>
                                <Text type="bodyRegular" textAlign="start">
                                    면접자
                                </Text>
                                <Text type="bodySemibold">
                                    {clubReservation?.applicantSummary.applicantName}
                                </Text>
                            </div>
                        </div>
                    </div>
                    <div css={s_buttonContainer}>
                        <Button size="full" onClick={() => window.close()}>
                            확인
                        </Button>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div css={s_temp}>
                <div css={s_reservationContainer}>
                    <div css={s_leftContainer}>
                        <Text type="h3Semibold" noWrap sx={{ marginBottom: '2rem' }}>
                            동아리 면접 예약
                        </Text>
                        <div css={s_clubInfoWrapper}>
                            <Avatar radius="10px" imageURL={clubReservation?.clubImageUrl} />
                            <div css={s_clubTextWrapper}>
                                <Text as="div" type="h4Semibold" textAlign="start" noWrap cropped>
                                    {clubReservation?.clubName}
                                </Text>
                                <Text
                                    as="div"
                                    type="captionSemibold"
                                    color="caption"
                                    textAlign="start"
                                >
                                    {getCategory(clubReservation?.clubCategory ?? '')}
                                </Text>
                            </div>
                        </div>

                        <div css={s_descriptionWrapper}>
                            <Text type="h4Semibold" textAlign="start">
                                이메일: {clubReservation?.applicantSummary.applicantEmail}
                            </Text>
                            <Text type="bodySemibold" color="caption" textAlign="start">
                                면접 진행 시간: {interviewDuration}분
                            </Text>
                        </div>
                    </div>
                    <div css={s_rightContainer}>
                        <div css={s_calendarContainer}>
                            <Calendar
                                size="md"
                                mode="custom"
                                shadow={false}
                                selectedDate={possibleReservationDate}
                                onSelect={handleCalendar}
                                onlySelected={true}
                                highlightedDate={selectDate}
                            />
                        </div>
                        <div css={s_selectedDateWrapper}>
                            <div css={s_selectExampleWrapper}>
                                <div css={s_possibleBox} />
                                <Text type="captionRegular" noWrap>
                                    선택
                                </Text>
                                <div css={s_impossibleBox} />
                                <Text type="captionRegular" noWrap>
                                    불가
                                </Text>
                            </div>
                            <Text type="captionSemibold" textAlign="end" noWrap>
                                {selectedInterviewSlot
                                    ? `잔여여석: ${(selectedInterviewSlot?.maxNumberOfPeople ?? 0) - (selectedInterviewSlot?.currentNumberOfPeople ?? 0)} / ${selectedInterviewSlot?.maxNumberOfPeople ?? 0}`
                                    : '시간을 선택해주세요'}
                            </Text>
                        </div>
                        <Divider width="full" color="gray" weight="1" />
                        <div css={s_timeContainer}>
                            {interviewSlots.map((slot) => (
                                <button
                                    key={slot.id}
                                    onClick={() => handleTimeButton(slot)}
                                    css={s_timeButton(selectedInterviewSlot?.id === slot.id)}
                                >
                                    {dayjs(slot.period.startDate).format('HH:mm')}
                                </button>
                            ))}
                        </div>
                        <div css={s_reserveButtonWrapper}>
                            <Button size="full" onClick={handleConfirmDialog}>
                                예약하기
                            </Button>
                        </div>
                    </div>
                </div>
                {openConfirmDialog && (
                    <ConfirmDialog
                        type="confirm"
                        open={true}
                        handleClose={() => setOpenConfirmDialog(false)}
                        actionHandler={() => submitReservation()}
                        title="예약하기"
                        dialogSize="sm"
                        cancelButton={true}
                        content={`${dayjs(selectedInterviewSlot?.period.startDate).format('YYYY년 MM월 DD일 HH:mm\n')} 예약하시겠습니까?`}
                    />
                )}
                <ErrorDialog
                    open={errorDialogOpen}
                    handleClose={() => setErrorDialogOpen(false)}
                    errorStatusCode={500}
                />
            </div>
        );
    }
}
export { ReservationPage };
