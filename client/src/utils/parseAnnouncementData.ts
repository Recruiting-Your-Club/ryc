import { Announcement } from '@api/domain/announcement/types';

export const parseAnnouncementClubBoxData = (announcementDetaildata: Announcement) => {
    return [
        {
            title: '모집 정원',
            value: announcementDetaildata?.numberOfPeople || '미정',
        },
        {
            title: '활동 기간',
            value: announcementDetaildata?.activityPeriod || '미정',
        },
        {
            title: '모집 대상',
            value: announcementDetaildata?.target || '미정',
        },
        {
            title: '면접 여부',
            value: announcementDetaildata?.hasInterview ? '있음' : '없음',
        },
        {
            title: '서류 접수 기간',
            value: announcementDetaildata?.applicationPeriod
                ? `${announcementDetaildata.applicationPeriod.startDate?.split('T')[0] || '-'} ~ ${announcementDetaildata.applicationPeriod.endDate?.split('T')[0] || '-'}`
                : '미정',
        },
        {
            title: '면접 기간',
            value: announcementDetaildata?.interviewPeriod
                ? `${announcementDetaildata.interviewPeriod.startDate?.split('T')[0] || '-'} ~ ${announcementDetaildata.interviewPeriod.endDate?.split('T')[0] || '-'}`
                : '미정',
        },
        {
            title: '서류 합격 발표',
            value: announcementDetaildata?.documentResultPeriod
                ? `${announcementDetaildata.documentResultPeriod.startDate?.split('T')[0] || '-'} ~ ${announcementDetaildata.documentResultPeriod.endDate?.split('T')[0] || '-'}`
                : '미정',
        },
        {
            title: '최종 합격',
            value: announcementDetaildata?.finalResultPeriod
                ? `${announcementDetaildata.finalResultPeriod.startDate?.split('T')[0] || '-'} ~ ${announcementDetaildata.finalResultPeriod.endDate?.split('T')[0] || '-'}`
                : '미정',
        },
    ];
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
