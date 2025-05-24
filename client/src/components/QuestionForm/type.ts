/**
 * short: 단답형
 * file: 첨부파일
 * single: 객관식(단일선택)
 * multiple: 객관식(중복선택)
 * long: 서술형
 */
export type QuestionType = 'short' | 'file' | 'single' | 'multiple' | 'long';

export interface QuestionOption {
    id: string;
    text: string;
}

export interface QuestionProps {
    id: string;
    type: QuestionType;
    title: string;
    options?: QuestionOption[];
}
