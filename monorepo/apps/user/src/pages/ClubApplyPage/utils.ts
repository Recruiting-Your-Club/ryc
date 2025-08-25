import type {
    ApplicationSubmissionRequest,
    PersonalInfoQuestionType,
} from '@api/domain/announcement/types';

import type { ValidationKey } from './constants';
import { ERROR_MESSAGES, VALIDATION_PATTERNS } from './constants';
import type { Answer } from './types';

export const getAnswer = (answers: Answer[], questionTitle: string): string => {
    const answer = answers.find((answer) => answer.questionTitle === questionTitle);

    if (!answer) return '';

    // 옵션 질문인 경우
    if (answer.optionIds) {
        if (answer.optionIds.length === 1) {
            return answer.optionIds[0];
        }

        return answer.optionIds.join(',');
    }

    // 일반 입력 질문인 경우
    return answer.value || '';
};

export const updateAnswers = (
    prev: Answer[],
    existingAnswer: Answer | undefined,
    newAnswer: Answer,
    questionTitle: string,
): Answer[] => {
    if (existingAnswer) {
        return prev.map((answer) => (answer.questionTitle === questionTitle ? newAnswer : answer));
    } else {
        return [...prev, newAnswer];
    }
};

export const getValidationError = (questionTitle: string, value: string): boolean => {
    if (!value.trim()) return false;
    if (!VALIDATION_PATTERNS[questionTitle as ValidationKey]) {
        return false;
    }
    const pattern = VALIDATION_PATTERNS[questionTitle as ValidationKey];
    return !pattern.test(value);
};

export const getErrorMessage = (questionTitle: string, value: string): string | undefined => {
    return getValidationError(questionTitle, value)
        ? ERROR_MESSAGES[questionTitle as ValidationKey]
        : undefined;
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

export const getPersonalInfoQuestionType = (questionTitle: string) => {
    switch (questionTitle) {
        case '이름':
            return 'NAME';
        case '이메일':
            return 'EMAIL';
        case '학번':
            return 'STUDENT_ID';
        case '전화번호':
            return 'PHONE_NUMBER';
        case '본인사진':
            return 'PROFILE_IMAGE';
        default:
            return '';
    }
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
        default:
            return '';
    }
};

export const makeAnsewerDataForSubmit = (answers: Answer[]): ApplicationSubmissionRequest => {
    const nameAnswer = answers.find((answer) => answer.questionTitle === '이름');
    const emailAnswer = answers.find((answer) => answer.questionTitle === '이메일');

    // 사전질문 데이터 (이름, 이메일 제외한 개인정보 질문들)
    const personalInfoAnswers = answers.filter((answer) => {
        const questionType = getPersonalInfoQuestionType(answer.questionTitle);
        return questionType && answer.questionTitle !== '이름' && answer.questionTitle !== '이메일';
    });

    // 자기소개서 질문 데이터 (개인정보 질문이 아닌 것들 + 옵션 질문들)
    const applicationAnswers = answers.filter((answer) => {
        const questionType = getPersonalInfoQuestionType(answer.questionTitle);
        return !questionType || answer.optionIds;
    });

    const applicantData = {
        name: nameAnswer?.value || '',
        email: emailAnswer?.value || '',
        personalInfos: personalInfoAnswers.map((answer) => ({
            personalInfoQuestionType: getPersonalInfoQuestionType(
                answer.questionTitle,
            ) as PersonalInfoQuestionType,
            value: answer.value,
        })),
    };

    const applicationData = {
        answers: applicationAnswers.map((answer) => ({
            questionId: answer.id === null ? '' : answer.id,
            textAnswer:
                answer.optionIds ||
                answer.questionType === 'FILE' ||
                answer.questionType === 'PROFILE_IMAGE'
                    ? null
                    : answer.value,
            fileMetadataId:
                answer.questionType === 'FILE' || answer.questionType === 'PROFILE_IMAGE'
                    ? answer.value
                    : null,
            answerChoices:
                answer.optionIds?.map((optionId) => ({
                    optionId: optionId,
                })) || [],
        })),
    };

    return {
        applicant: applicantData,
        application: applicationData,
    };
};

/**
 * {
  "applicant": {
    "email": "string",
    "name": "string",
    "personalInfos": [
      {
        "personalInfoQuestionType": "STUDENT_ID",
        "value": "string"
      }
    ]
  },
  "application": {
    "answers": [
      {
        "questionId": "string",
        "textAnswer": "string",
        "fileMetadataId": "string",
        "answerChoices": [
          {
            "optionId": "string"
          }
        ]
      }
    ]
  }
}

 */
