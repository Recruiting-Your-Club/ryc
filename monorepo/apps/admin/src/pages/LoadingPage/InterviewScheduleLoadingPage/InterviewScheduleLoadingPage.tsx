import React from 'react';

import {
    s_allSlotContainerSkeleton,
    s_buttonContainerSkeleton,
    s_buttonSkeleton,
    s_dateHeaderSkeleton,
    s_dividerSkeleton,
    s_infoSvgSkeleton,
    s_pageContainer,
    s_perSlotContainerSkeleton,
    s_radioGroupSkeleton,
    s_radioItemSkeleton,
    s_remindContainerSkeleton,
    s_remindTitleContainerSkeleton,
    s_remindTitleTextSkeleton,
    s_scheduleContentContainerSkeleton,
    s_slotInfoSkeleton,
    s_slotRowSkeleton,
    s_slotTextSkeleton,
    s_slotTitleSkeleton,
    s_slotTitleTextContainerSkeleton,
    s_tableContainerSkeleton,
    s_tableSkeleton,
    s_timeAndNumberContainerSkeleton,
    s_titleAdditionButtonSkeleton,
    s_titleTextSkeleton,
    s_weekMoverArrow,
    s_weekMoverSkeleton,
    s_weekMoverText,
} from './InterviewScheduleLoadingPage.style';

function InterviewScheduleLoadingPage() {
    return (
        <div css={s_pageContainer()}>
            <div css={s_weekMoverSkeleton()}>
                <div css={s_weekMoverArrow()} />
                <div css={s_weekMoverText()} />
                <div css={s_weekMoverArrow()} />
            </div>

            <div css={s_tableContainerSkeleton()}>
                <div css={s_tableSkeleton()} />
            </div>

            <div css={s_scheduleContentContainerSkeleton()}>
                <div css={s_slotTitleSkeleton()}>
                    <div css={s_slotTitleTextContainerSkeleton()}>
                        <div css={s_titleTextSkeleton()} />
                        <div css={s_titleAdditionButtonSkeleton()} />
                    </div>
                    <div css={s_dividerSkeleton()} />
                </div>
                <div css={s_allSlotContainerSkeleton()}>
                    {Array.from({ length: 2 }).map((_, index) => (
                        <div key={index} css={s_perSlotContainerSkeleton()}>
                            <div css={s_dateHeaderSkeleton()} />
                            <div css={s_timeAndNumberContainerSkeleton()}>
                                <div css={s_slotRowSkeleton()}>
                                    <div css={s_slotInfoSkeleton()}>
                                        <div css={s_slotTextSkeleton()} />
                                        <div css={s_slotTextSkeleton()} />
                                    </div>
                                    <div css={s_buttonContainerSkeleton()}>
                                        <div css={s_buttonSkeleton()} />
                                        <div css={s_buttonSkeleton()} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 리마인드 알림 컨테이너 */}
            <div css={s_remindContainerSkeleton()}>
                <div css={s_remindTitleContainerSkeleton()}>
                    <div css={s_remindTitleTextSkeleton()} />
                    <div css={s_infoSvgSkeleton()} />
                </div>
                <div css={s_radioGroupSkeleton()}>
                    <div css={s_radioItemSkeleton()} />
                    <div css={s_radioItemSkeleton()} />
                    <div css={s_radioItemSkeleton()} />
                </div>
            </div>
        </div>
    );
}

export { InterviewScheduleLoadingPage };
