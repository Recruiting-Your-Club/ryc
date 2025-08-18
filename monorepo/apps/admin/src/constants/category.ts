import type { category } from '@api/domain/club/types';

export const CATEGORY_LABEL = {
    PERFORMANCE_ARTS: '공연동아리',
    CULTURE: '문화동아리',
    SPORTS: '체육동아리',
    ACADEMIC: '학술동아리',
    VOLUNTEER: '봉사동아리',
    RELIGION: '종교동아리',
} as const satisfies Record<category, string>;
