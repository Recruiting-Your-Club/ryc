import type { AnnouncementInfoPageProps } from '@pages/AnnouncementPage/types';

type TagVariant = 'primary' | 'progress' | 'end';
type AnnouncementStatus = AnnouncementInfoPageProps['announcementStatus'];

export const STATUS_ANNOUNCEMENT = {
    UPCOMING: { text: '모집예정', variant: 'primary' as TagVariant },
    RECRUITING: { text: '모집중', variant: 'progress' as TagVariant },
    CLOSED: { text: '모집마감', variant: 'end' as TagVariant },
    EMPTY: { text: '지원불가', variant: 'end' as TagVariant },
};

export const toTagProps = (status: AnnouncementStatus) => STATUS_ANNOUNCEMENT[status];
