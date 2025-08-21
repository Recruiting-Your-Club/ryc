import type { AnnouncementList } from '@api/domain/announcement/types';

export interface DialogSectionProps {
    title: string;
    items: AnnouncementList[];
    emptyText: string;
    onSelect: (announcement: AnnouncementList) => void;
}
