import type { InterviewRequest, InterviewSlot } from '@api/domain/interview/types';
import { useInterviewMutations } from '@api/hooks';
import { interviewQueries } from '@api/queryFactory';
import Info from '@assets/images/info.svg';
import PolygonLeft from '@assets/images/polygon-left.svg';
import PolygonRight from '@assets/images/polygon-right.svg';
import { ErrorDialog, InterviewSettingDialog, ManageInterviewSlotDialog } from '@components';
import { useSuspenseQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import weekday from 'dayjs/plugin/weekday';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Button, Divider, Radio, Text, Tooltip, useToast } from '@ssoc/ui';

import {
    s_allSlotContainer,
    s_buttonContainer,
    s_dateHeader,
    s_informSvg,
    s_informSvgWrapper,
    s_pageContainer,
    s_perSlotContainer,
    s_polygonSvg,
    s_radios,
    s_remindContainer,
    s_remindTitleContainer,
    s_scheduleContentContainer,
    s_slotCellEmpty,
    s_slotCellFilled,
    s_slotInfo,
    s_slotNumberText,
    s_slotRow,
    s_slotText,
    s_slotTitle,
    s_slotTitleTextContainer,
    s_table,
    s_tableContainer,
    s_td,
    s_th,
    s_timeAndNumberContainer,
    s_timeHeaderCell,
    s_titleAdditionText,
    s_titleText,
    s_tooltipContent,
    s_warningContainer,
    s_weekMover,
} from './InterviewSchedulePage.style';
import type { SelectedInterviewSlot } from './types';

function InterviewSchedulePage() {
    // prop destruction
    // lib hooks
    const { toast } = useToast();
    const { announcementId, clubId } = useParams();
    dayjs.locale('ko');
    dayjs.extend(weekday);

    // initial values
    // state, ref, querystring hooks
    const [isInterviewOpen, setIsInterviewOpen] = useState<boolean>(false);
    const [currentWeekStart, setCurrentWeekStart] = useState(() => getMonday(dayjs()));
    const [value, setValue] = useState('');
    const [errorDialogOpen, setErrorDialogOpen] = useState<boolean>(false);
    const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);
    const [openPatchDialog, setOpenPatchDialog] = useState<boolean>(false);
    const [selectedInterviewSlot, setSelectedInterviewSlot] = useState<SelectedInterviewSlot>({
        id: '',
        date: '',
        time: '',
        number: 0,
    });

    // form hooks
    // query hooks
    const { data: interviewSlots = [] } = useSuspenseQuery(
        interviewQueries.interviewSlot(announcementId!, clubId!),
    );

    const { mutateAsync: postInterviewSlot } = useInterviewMutations.usePostInterviewSlot();
    const { mutateAsync: deleteInterviewSlot } = useInterviewMutations.useDeleteInterviewSlot(
        announcementId!,
        setErrorDialogOpen,
    );
    const { mutateAsync: patchInterviewSlotPeople } =
        useInterviewMutations.usePatchInterviewSlotPeople(announcementId!);

    const { data: interviewReminder } = useSuspenseQuery(
        interviewQueries.interviewReminder(announcementId!, clubId!),
    );

    const { mutate: patchInterviewReminder } =
        useInterviewMutations.usePatchInterviewReminder(setErrorDialogOpen);
    const { mutate: deleteInterviewReminder } =
        useInterviewMutations.useDeleteInterviewReminder(setErrorDialogOpen);

    // calculated values
    function getMonday(date: dayjs.Dayjs) {
        const day = date.day();
        return day === 0 ? date.subtract(6, 'day') : date.subtract(day - 1, 'day');
    }

    const { timeHeaders, scheduleGrid } = useMemo(() => {
        if (!interviewSlots || interviewSlots.length === 0) {
            return { timeHeaders: [], scheduleGrid: new Map() };
        }

        const timeHeaders = [
            ...new Set(interviewSlots.map((slot) => dayjs(slot.period.startDate).format('HH:mm'))),
        ].sort();

        const grid = new Map<string, Map<string, InterviewSlot>>();
        interviewSlots.forEach((slot) => {
            const timeKey = dayjs(slot.period.startDate).format('HH:mm');
            const dateKey = dayjs(slot.period.startDate).format('YYYY-MM-DD');

            if (!grid.has(timeKey)) {
                grid.set(timeKey, new Map<string, InterviewSlot>());
            }
            grid.get(timeKey)?.set(dateKey, slot);
        });

        return { timeHeaders, scheduleGrid: grid };
    }, [interviewSlots]);

    const weekDates = useMemo(() => {
        return Array.from({ length: 7 }).map((_, i) => currentWeekStart.add(i, 'day'));
    }, [currentWeekStart]);

    const groupedByDate = interviewSlots.reduce<Record<string, InterviewSlot[]>>(
        (groupedSlots, slot) => {
            const date = dayjs(slot.period.startDate).format('YYYY.MM.DD');
            if (!groupedSlots[date]) groupedSlots[date] = [];
            groupedSlots[date].push(slot);
            return groupedSlots;
        },
        {},
    );

    const initialTimePeriod = useMemo(() => {
        if (interviewSlots.length === 0) return '';

        const start = dayjs(interviewSlots[0].period.startDate);
        const end = dayjs(interviewSlots[0].period.endDate);

        return end.diff(start, 'minute').toString();
    }, [interviewSlots]);

    // handlers
    const handlePrevWeek = () => {
        setCurrentWeekStart((prev) => prev.subtract(1, 'week'));
    };

    const handleNextWeek = () => {
        setCurrentWeekStart((prev) => prev.add(1, 'week'));
    };

    const handleInterviewSettingClose = () => {
        setIsInterviewOpen(false);
    };

    const handlePostInterviewSlot = async (
        interviewRequest: InterviewRequest,
    ): Promise<boolean> => {
        if (interviewRequest.slotDetailRequests.length === 0) {
            toast('면접 일정을 선택해주세요!', { toastTheme: 'colored', type: 'error' });
            return false;
        }
        try {
            await postInterviewSlot({
                announcementId: announcementId!,
                clubId: clubId!,
                requestBody: interviewRequest,
            });
            return true;
        } catch {
            return false;
        }
    };

    const handleDeleteInterviewSlot = async (): Promise<boolean> => {
        try {
            await deleteInterviewSlot({
                interviewSlotId: selectedInterviewSlot.id,
                clubId: clubId!,
            });
            return true;
        } catch {
            return false;
        }
    };

    const handlePatchInterviewSlotPeople = async (maxPeopleCount: number): Promise<boolean> => {
        try {
            await patchInterviewSlotPeople({
                interviewSlotId: selectedInterviewSlot.id,
                clubId: clubId!,
                maxPeopleCount: maxPeopleCount,
            });
            return true;
        } catch {
            return false;
        }
    };

    const handleChangeReminder = (newValue: string) => {
        const previousValue = value;
        setValue(newValue);

        if (newValue === '24' || newValue === '3') {
            patchInterviewReminder(
                {
                    announcementId: announcementId!,
                    clubId: clubId!,
                    reminderTime: Number(newValue),
                },
                { onError: () => setValue(previousValue) },
            );
        } else if (newValue === '0') {
            deleteInterviewReminder(
                { announcementId: announcementId!, clubId: clubId! },
                { onError: () => setValue(previousValue) },
            );
        }
    };

    // effects
    useEffect(() => {
        if (interviewSlots && interviewSlots.length > 0) {
            const firstSlotDate = dayjs(interviewSlots[0].period.startDate);
            setCurrentWeekStart(getMonday(firstSlotDate));
        }
    }, [interviewSlots]);

    useEffect(() => {
        if (value === '') {
            setValue(
                interviewReminder.reminderTime === null
                    ? '0'
                    : interviewReminder.reminderTime.toString(),
            );
        }
    }, [value, interviewReminder]);

    return (
        <div css={s_pageContainer}>
            <div css={s_weekMover}>
                <PolygonLeft onClick={handlePrevWeek} css={s_polygonSvg} />
                <Text as="span" type="bodyRegular">
                    {currentWeekStart.format('YYYY.MM.DD')} -{' '}
                    {currentWeekStart.add(6, 'day').format('YYYY.MM.DD')}
                </Text>
                <PolygonRight onClick={handleNextWeek} css={s_polygonSvg} />
            </div>

            <div css={s_tableContainer}>
                <table css={s_table}>
                    <thead>
                        <tr>
                            <th css={s_th}></th>
                            {weekDates.map((date) => (
                                <th key={date.format('YYYY-MM-DD')} css={s_th}>
                                    <Text as="span" type="captionRegular">
                                        {date.format('MM.DD')}
                                    </Text>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {timeHeaders.map((time) => (
                            <tr key={time}>
                                <td css={[s_td, s_timeHeaderCell]}>
                                    <Text as="span" type="captionRegular">
                                        {time}
                                    </Text>
                                </td>
                                {weekDates.map((date) => {
                                    const dateKey = date.format('YYYY-MM-DD');
                                    const slot = scheduleGrid.get(time)?.get(dateKey);

                                    return slot ? (
                                        <td key={dateKey} css={[s_td, s_slotCellFilled]}>
                                            <Text
                                                as="span"
                                                type="subCaptionRegular"
                                                sx={s_slotNumberText}
                                            >{`${slot.currentNumberOfPeople}명/${slot.maxNumberOfPeople}명`}</Text>
                                        </td>
                                    ) : (
                                        <td key={dateKey} css={[s_td, s_slotCellEmpty]}></td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div css={s_scheduleContentContainer}>
                <div css={s_slotTitle}>
                    <div css={s_slotTitleTextContainer}>
                        <Text as="span" type="bodySemibold" textAlign="start" sx={s_titleText}>
                            면접 일정
                        </Text>
                        <Button
                            variant="text"
                            sx={s_titleAdditionText}
                            onClick={() => setIsInterviewOpen(true)}
                        >
                            일정 추가
                        </Button>
                    </div>
                    <Divider />
                </div>
                {interviewSlots.length > 0 ? (
                    <div css={s_allSlotContainer}>
                        {Object.entries(groupedByDate).map(([date, slots]) => {
                            const dayOfWeek = dayjs(slots[0].period.startDate).format('ddd');
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
                                            const startTime = dayjs(slot.period.startDate).format(
                                                'HH:mm',
                                            );
                                            const endTime = dayjs(slot.period.endDate).format(
                                                'HH:mm',
                                            );
                                            return (
                                                <div key={slot.id} css={s_slotRow}>
                                                    <div css={s_slotInfo}>
                                                        <Text sx={s_slotText} type="captionRegular">
                                                            {`${startTime} - ${endTime}`}
                                                        </Text>
                                                        <Text sx={s_slotText} type="captionRegular">
                                                            {`총 ${slot.maxNumberOfPeople}명`}
                                                        </Text>
                                                    </div>
                                                    <div css={s_buttonContainer}>
                                                        <Button
                                                            size="xs"
                                                            variant="outlined"
                                                            onClick={() => {
                                                                setSelectedInterviewSlot({
                                                                    id: slot.id,
                                                                    date: `${date} (${dayOfWeek})`,
                                                                    time: `${startTime} - ${endTime}`,
                                                                    number: slot.maxNumberOfPeople,
                                                                });
                                                                setOpenPatchDialog(true);
                                                            }}
                                                        >
                                                            수정
                                                        </Button>
                                                        <Button
                                                            size="xs"
                                                            variant="outlined"
                                                            onClick={() => {
                                                                setSelectedInterviewSlot({
                                                                    id: slot.id,
                                                                    date: `${date} (${dayOfWeek})`,
                                                                    time: `${startTime} - ${endTime}`,
                                                                    number: slot.maxNumberOfPeople,
                                                                });
                                                                setOpenConfirmDialog(true);
                                                            }}
                                                        >
                                                            삭제
                                                        </Button>
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
                        <Text as="span" type="captionSemibold">
                            면접 일정이 없어요. 먼저 면접 일정을 추가해주세요!
                        </Text>
                    </div>
                )}
            </div>
            <div css={s_remindContainer}>
                <span css={s_remindTitleContainer}>
                    <Text as="span" type="bodySemibold" textAlign="start">
                        리마인드 알림을 설정하시겠어요?
                    </Text>
                    <Tooltip
                        content={'리마인드 알림은 면접 대상자에게 이메일로 전송돼요.'}
                        direction="right"
                        wrapperSx={s_informSvgWrapper}
                        tooltipSx={s_tooltipContent}
                    >
                        <Info css={s_informSvg} />
                    </Tooltip>
                </span>
                <Radio
                    options={[
                        { label: '면접 진행 24시간 전 안내 메일 발송', value: '24' },
                        { label: '면접 진행 3시간 전 안내 메일 발송', value: '3' },
                        { label: '리마인드 알림을 보내지 않을래요.', value: '0' },
                    ]}
                    name="variableText"
                    value={value}
                    onChange={handleChangeReminder}
                    orientation="vertical"
                    size="sm"
                    sx={s_radios}
                />
            </div>
            <InterviewSettingDialog
                open={isInterviewOpen}
                handleClose={handleInterviewSettingClose}
                handlePostInterviewSlot={handlePostInterviewSlot}
                initialTimePeriod={initialTimePeriod}
            />
            <ErrorDialog
                open={errorDialogOpen}
                handleClose={() => setErrorDialogOpen(false)}
                errorStatusCode={500}
            />
            {(openConfirmDialog || openPatchDialog) && (
                <ManageInterviewSlotDialog
                    mode={openConfirmDialog ? 'delete' : 'edit'}
                    open={openConfirmDialog || openPatchDialog}
                    handleClose={() =>
                        openConfirmDialog ? setOpenConfirmDialog(false) : setOpenPatchDialog(false)
                    }
                    handlePatchInterviewSlotPeople={handlePatchInterviewSlotPeople}
                    handleDeleteInterviewSlot={handleDeleteInterviewSlot}
                    selectedInterviewSlot={selectedInterviewSlot}
                />
            )}
        </div>
    );
}

export default InterviewSchedulePage;
