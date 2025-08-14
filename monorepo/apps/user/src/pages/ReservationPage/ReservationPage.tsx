import { useState, useEffect } from 'react';
import { Avatar, Button, Calendar, Divider, Text, ConfirmDialog, useToast } from '@ssoc/ui';
import type { InterviewSlot } from '@api/domain/club/types';
import {
    s_calendarContainer,
    s_clubInfoWrapper,
    s_clubTextWrapper,
    s_descriptionWrapper,
    s_impossibleBox,
    s_leftContainer,
    s_possibleBox,
    s_reservationContainer,
    s_reserveButtonWrapper,
    s_rightContainer,
    s_selectedDateWrapper,
    s_selectExampleWrapper,
    s_temp,
    s_timeButton,
    s_timeContainer,
} from './Reservation.style';

import { useQuery } from '@tanstack/react-query';
import { clubQueries } from '@api/queryFactory/clubQueries';
import { useParams } from 'react-router-dom';
import { getCategory } from '@utils/changeCategory';
import { useSubmitInterviewReservation } from '@api/mutaionFactory';
import type { InterviewReservationError } from '@api/mutaionFactory';

import dayjs from 'dayjs';

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
    // form hooks   
    // query hooks
    const { data: clubReservation } = useQuery(clubQueries.getClubReservation(clubId ?? '', announcementId ?? '', applicantId ?? ''));
    console.log(clubReservation)
    const { mutateAsync: submitInterviewReservation } = useSubmitInterviewReservation();
    // calculated values

    // handlers
    const handleCalendar = (selectDate: string[]) => {
        setSelectDate(selectDate);
        setInterviewSlots(clubReservation?.slotByDateResponses.find((slot) => slot.date === selectDate.toString())?.interviewSlots ?? []);
        setInterviewDuration(clubReservation?.slotByDateResponses.find((slot) => slot.date === selectDate.toString())?.interviewDuration ?? 0);
    }
    const handleTimeButton = (slot: InterviewSlot) => {
        setSelectedInterviewSlot(slot)
    }
    const handleConfirmDialog = () => {
        if(!selectedInterviewSlot) {
            toast('날짜와 시간을 선택해주세요', {
                type: 'error',
            });
            return;
        }
        setOpenConfirmDialog(true);
    }

    const submitReservation = async () => {
        try {
            await submitInterviewReservation({
                clubId,
                announcementId,
                applicantId,
                slotId: selectedInterviewSlot?.id ?? ''
            });
            toast('예약이 완료되었습니다.', {
                type: 'success',
            });
        } catch (error) {
            if(error instanceof Error){
                toast(error.message, {
                    type: 'error'
                })
                console.log('error', error);
            }
        }
        setOpenConfirmDialog(false);
    }
    // effects
    useEffect(() => {
        if (clubReservation) {
            setPossibleReservationDate(clubReservation.slotByDateResponses.map((slot) => slot.date));
        }
    }, [clubReservation]);
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
                            <Text as="div" type="h4Semibold" textAlign='start' noWrap cropped>
                                {clubReservation?.clubName}
                            </Text>
                            <Text as="div" type="captionSemibold" color="caption" textAlign="start">
                                {getCategory(clubReservation?.clubCategory ?? '')}
                            </Text>
                        </div>
                    </div>

                    <div css={s_descriptionWrapper}>
                        <Text type="h4Semibold">이메일: {clubReservation?.applicantEmail}</Text>
                        <Text type="bodySemibold" color="caption" textAlign='start'>면접 진행 시간: {interviewDuration}분</Text>
                    </div>
                </div>
                <div css={s_rightContainer}>
                    <div css={s_calendarContainer}>
                        <Calendar size="md" mode='custom'
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
                            {selectedInterviewSlot ? `남은인원: ${selectedInterviewSlot?.currentNumberOfPeople} / ${selectedInterviewSlot?.maxNumberOfPeople}` : '시간을 선택해주세요'}
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
                        <Button size="full" onClick={handleConfirmDialog}>예약하기</Button>
                    </div>
                </div>
            </div>
            {openConfirmDialog && 
            <ConfirmDialog
                type='confirm'
                open={true}
                handleClose={() => setOpenConfirmDialog(false)}
                actionHandler={() => submitReservation()}
                title="예약하기"
                dialogSize='sm'
                cancelButton={true}
                content={`${dayjs(selectedInterviewSlot?.period.startDate).format('YYYY년 MM월 DD일 HH:mm시\n')} 예약하시겠습니까?`}
            />}
        </div>
    );
}
export { ReservationPage };
