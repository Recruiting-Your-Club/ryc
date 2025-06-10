import React from 'react';
import {
    s_calendarContainer,
    s_clubInfoWrapper,
    s_leftContainer,
    s_reservationContainer,
    s_rightContainer,
    s_temp,
    s_clubTextWrapper,
    s_timeContainer,
    s_timeButton,
    s_reserveButtonWrapper,
    s_descriptionWrapper,
    s_selectedDateWrapper,
    s_selectExampleWrapper,
    s_possibleBox,
    s_impossibleBox,
} from './Reservation.style';
import { Text, Calendar, Avatar, Divider, Button } from '@components';

const data = [
    { id: 1, time: '10:00' },
    { id: 2, time: '10:30' },
    { id: 3, time: '11:00' },
    { id: 4, time: '11:30' },
    { id: 5, time: '12:00' },
    { id: 6, time: '12:30' },
    { id: 7, time: '13:00' },
    { id: 8, time: '13:30' },
    { id: 9, time: '14:00' },
    { id: 10, time: '14:30' },
    { id: 11, time: '15:00' },
    { id: 12, time: '15:30' },
    { id: 13, time: '16:00' },
    { id: 14, time: '16:30' },
];
function ReservationPage() {
    return (
        <div css={s_temp}>
            <div css={s_reservationContainer}>
                <div css={s_leftContainer}>
                    <Text type="h3Semibold" noWrap sx={{ marginBottom: '2rem' }}>
                        동아리 면접 예약
                    </Text>
                    <div css={s_clubInfoWrapper}>
                        <Avatar radius="10px" />
                        <div css={s_clubTextWrapper}>
                            <Text as="div" type="h4Semibold" noWrap cropped>
                                EN#(Enjoy C#)
                            </Text>
                            <Text as="div" type="captionSemibold" color="caption" textAlign="start">
                                학술동아리
                            </Text>
                        </div>
                    </div>

                    <div css={s_descriptionWrapper}>
                        <Text type="h4Semibold">zzuni3423@naver.com</Text>
                        <div>면접 진행 시간: 60분</div>
                    </div>
                </div>
                <div css={s_rightContainer}>
                    <div css={s_calendarContainer}>
                        <Calendar size="md" shadow={false} />
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
                            2025.6.22(일) 10:00
                        </Text>
                    </div>
                    <Divider width="full" color="gray" weight="1" />
                    <div css={s_timeContainer}>
                        {data.map((item) => (
                            <Button key={item.id} sx={s_timeButton} variant="outlined">
                                {item.time}
                            </Button>
                        ))}
                    </div>
                    <div css={s_reserveButtonWrapper}>
                        <Button size="full">예약하기</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export { ReservationPage };
