import type { Answer } from './types';

export const getAnswer = (answers: Answer[], questionTitle: string): string => {
    return answers.find((answer) => answer.questionTitle === questionTitle)?.value || '';
};
