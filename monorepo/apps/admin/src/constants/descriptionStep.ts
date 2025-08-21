import type { DetailQuestionList } from '@pages/RecruitCreatePage/DescriptionStep/types';

export const DETAIL_QUESTION_LIST: DetailQuestionList = [
    {
        label: '모집 정원',
        key: 'recruitmentNumber',
        placeholder: 'ex) 10명 / 미정',
        required: false,
        type: 'input',
    },
    {
        label: '서류 접수 기간',
        key: 'documentPeriod',
        placeholder: '날짜를 선택해주세요',
        required: true,
        type: 'date',
        mode: 'range',
    },
    {
        label: '모집 분야',
        key: 'recruitmentField',
        placeholder: 'ex) 디자이너 / FE / BE / 신입 부원 / 집행 부원 등',
        required: false,
        type: 'input',
    },
    {
        label: '서류 합격 발표',
        key: 'documentResult',
        placeholder: '날짜를 선택해주세요',
        required: false,
        type: 'date',
        mode: 'single',
    },
    {
        label: '활동 기간',
        key: 'activityPeriod',
        placeholder: 'ex) 1년 6개월',
        required: false,
        type: 'input',
    },
    {
        label: '면접 일정',
        key: 'interviewSchedule',
        placeholder: '날짜를 선택해주세요',
        required: false,
        type: 'date',
        mode: 'range',
    },
    {
        label: '모집 대상',
        key: 'recruitmentTarget',
        placeholder: 'ex) 세종대 재학생 / 휴학생 등',
        required: false,
        type: 'input',
    },
    {
        label: '최종 합격 발표',
        key: 'finalResult',
        placeholder: '날짜를 선택해주세요',
        required: false,
        type: 'date',
        mode: 'single',
    },
];
