import type { DetailQuestionList } from '@pages/RecruitCreatePage/DescriptionStep/types';

export const DETAIL_QUESTION_LIST: DetailQuestionList = [
    {
        label: '모집 정원',
        key: 'recruitmentNumber',
        placeholder: 'ex) 10명 / 미정',
        required: true,
    },
    {
        label: '서류 접수 기간',
        key: 'documentPeriod',
        placeholder: 'ex) 2025.03.31 ~ 2025.04.14',
        required: true,
    },
    {
        label: '모집 분야',
        key: 'recruitmentField',
        placeholder: 'ex) 디자이너 / FE / BE /신입 부원 / 집행 부원 등',
        required: true,
    },
    {
        label: '서류 합격 발표',
        key: 'documentResult',
        placeholder: 'ex) 2025.04.17',
        required: true,
    },
    {
        label: '활동 기간',
        key: 'activityPeriod',
        placeholder: 'ex) 1년 6개월',
        required: true,
    },
    {
        label: '면접 일정',
        key: 'interviewSchedule',
        placeholder: 'ex) 2025.04.19 ~ 2025.04.22',
        required: true,
    },
    {
        label: '모집 대상',
        key: 'recruitmentTarget',
        placeholder: 'ex) 세종대 재학생 / 휴학생 등',
        required: true,
    },
    {
        label: '최종 합격 발표',
        key: 'finalResult',
        placeholder: 'ex) 2025.04.28',
        required: true,
    },
];
