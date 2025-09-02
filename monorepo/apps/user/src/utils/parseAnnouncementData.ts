import type { Announcement } from '@api/domain/announcement/types';
import type { ClubBoxItem } from '@components/ClubBox/types';

export const parseAnnouncementClubBoxData = (announcementDetaildata: Announcement) => {
    const applicationStartDate =
        announcementDetaildata.applicationPeriod === null
            ? '미정'
            : announcementDetaildata.applicationPeriod.startDate
                  ?.split('T')[0]
                  .slice(2)
                  .replace(/-/g, '.');
    const applicationEndDate =
        announcementDetaildata.applicationPeriod === null
            ? '미정'
            : announcementDetaildata.applicationPeriod.endDate
                  ?.split('T')[0]
                  .slice(2)
                  .replace(/-/g, '.');

    const interviewStartDate =
        announcementDetaildata.interviewPeriod === null
            ? '미정'
            : announcementDetaildata.interviewPeriod.startDate
                  ?.split('T')[0]
                  .slice(2)
                  .replace(/-/g, '.');
    const interviewEndDate =
        announcementDetaildata.interviewPeriod === null
            ? '미정'
            : announcementDetaildata.interviewPeriod.endDate
                  ?.split('T')[0]
                  .slice(2)
                  .replace(/-/g, '.');

    const documentResultStartDate =
        announcementDetaildata.documentResultPeriod === null
            ? '미정'
            : announcementDetaildata.documentResultPeriod.startDate
                  ?.split('T')[0]
                  .slice(2)
                  .replace(/-/g, '.');
    const documentResultEndDate =
        announcementDetaildata.documentResultPeriod === null
            ? '미정'
            : announcementDetaildata.documentResultPeriod.endDate
                  ?.split('T')[0]
                  .slice(2)
                  .replace(/-/g, '.');

    const finalResultStartDate =
        announcementDetaildata.finalResultPeriod === null
            ? '미정'
            : announcementDetaildata.finalResultPeriod.startDate
                  ?.split('T')[0]
                  .slice(2)
                  .replace(/-/g, '.');
    const finalResultEndDate =
        announcementDetaildata.finalResultPeriod === null
            ? '미정'
            : announcementDetaildata.finalResultPeriod.endDate
                  ?.split('T')[0]
                  .slice(2)
                  .replace(/-/g, '.');
    const applicationPeriod =
        announcementDetaildata.applicationPeriod === null
            ? '미정'
            : applicationStartDate === applicationEndDate
              ? applicationStartDate
              : `${applicationStartDate} ~ ${applicationEndDate}`;
    const interviewPeriod =
        announcementDetaildata.interviewPeriod === null
            ? '미정'
            : interviewStartDate === interviewEndDate
              ? interviewStartDate
              : `${interviewStartDate} ~ ${interviewEndDate}`;
    const documentResultPeriod =
        announcementDetaildata.documentResultPeriod === null
            ? '미정'
            : documentResultStartDate === documentResultEndDate
              ? documentResultStartDate
              : `${documentResultStartDate} ~ ${documentResultEndDate}`;
    const finalResultPeriod =
        announcementDetaildata.finalResultPeriod === null
            ? '미정'
            : finalResultStartDate === finalResultEndDate
              ? finalResultStartDate
              : `${finalResultStartDate} ~ ${finalResultEndDate}`;

    return [
        {
            id: crypto.randomUUID(),
            title: '모집 대상',
            content: announcementDetaildata?.target || '미정',
        },
        {
            id: crypto.randomUUID(),
            title: '모집 분야',
            content: announcementDetaildata?.field || '미정',
        },
        {
            id: crypto.randomUUID(),
            title: '활동 기간',
            content: announcementDetaildata?.activityPeriod || '미정',
        },
        {
            id: crypto.randomUUID(),
            title: '모집 인원',
            content: announcementDetaildata?.numberOfPeople || '미정',
        },

        {
            id: crypto.randomUUID(),
            title: '서류 접수',
            content: applicationPeriod
                ? applicationPeriod.includes('99')
                    ? '상시 모집'
                    : applicationPeriod
                : '미정',
        },
        {
            id: crypto.randomUUID(),
            title: '서류 발표',
            content: documentResultPeriod
                ? applicationPeriod.includes('99')
                    ? '상시 모집'
                    : documentResultPeriod
                : '미정',
        },
        {
            id: crypto.randomUUID(),
            title: '면접 일정',
            content: interviewPeriod
                ? applicationPeriod.includes('99')
                    ? '상시 모집'
                    : interviewPeriod
                : '미정',
        },

        {
            id: crypto.randomUUID(),
            title: '최종 합격',
            content: finalResultPeriod
                ? applicationPeriod.includes('99')
                    ? '상시 모집'
                    : finalResultPeriod
                : '미정',
        },
    ] as ClubBoxItem[];
};

export const parseAnnouncementData = (announcementDetaildata: Announcement) => {
    switch (announcementDetaildata?.announcementStatus) {
        case 'RECRUITING':
            return {
                id: announcementDetaildata?.id,
                clubName: announcementDetaildata?.clubName,
                title: announcementDetaildata?.title,
                summaryDescription: announcementDetaildata?.summaryDescription,
                detailDescription: announcementDetaildata?.detailDescription,
                images: announcementDetaildata?.images,
                announcementStatus: '모집중',
                announcementStatusVariant: 'progress',
            };
        case 'CLOSED':
            return {
                id: announcementDetaildata?.id,
                clubName: announcementDetaildata?.clubName,
                title: announcementDetaildata?.title,
                summaryDescription: announcementDetaildata?.summaryDescription,
                detailDescription: announcementDetaildata?.detailDescription,
                images: announcementDetaildata?.images,
                announcementStatus: '마감',
                announcementStatusVariant: 'end',
            };
        case 'UPCOMING':
            return {
                id: announcementDetaildata?.id,
                clubName: announcementDetaildata?.clubName,
                title: announcementDetaildata?.title,
                summaryDescription: announcementDetaildata?.summaryDescription,
                detailDescription: announcementDetaildata?.detailDescription,
                images: announcementDetaildata?.images,
                announcementStatus: '모집전',
                announcementStatusVariant: 'primary',
            };
        default:
            return {
                clubName: announcementDetaildata?.clubName,
                title: announcementDetaildata?.title,
                summaryDescription: announcementDetaildata?.summaryDescription,
                detailDescription: announcementDetaildata?.detailDescription,
                images: announcementDetaildata?.images,
                announcementStatus: '미정',
                announcementStatusVariant: 'primary',
            };
    }
};
