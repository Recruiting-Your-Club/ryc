import type { Answer } from './types';

export const getAnswer = (answers: Answer[], questionTitle: string): string => {
    return answers.find((answer) => answer.questionTitle === questionTitle)?.value || '';
};

export const getPlaceholder = (label: string) => {
    switch (label) {
        case '학번':
            return 'ex) 19011069';
        case '이름':
            return 'ex) 홍길동, John Smith';
        case '이메일':
            return 'ex) example@gmail.com';
        case '생년월일':
            return 'ex) 990101';
        case '전화번호':
            return 'ex) 01012345678';
        case '전공':
            return 'ex) 소프트웨어학과';
        default:
            return '';
    }
};

export const getPersonalQuestionLabel = (questionTitle: string) => {
    switch (questionTitle) {
        case 'NAME':
            return '이름';
        case 'EMAIL':
            return '이메일';
        case 'STUDENT_ID':
            return '학번';
        case 'PHONE_NUMBER':
            return '전화번호';
        case 'PROFILE_IMAGE':
            return '본인사진';
        default:
            return '';
    }
};
