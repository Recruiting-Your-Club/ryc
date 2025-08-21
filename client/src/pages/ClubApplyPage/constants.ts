// 정규식 패턴
export const VALIDATION_PATTERNS = {
    이름: /^[가-힣a-zA-Z\s]{2,}$/,
    생년월일: /^\d{6}$/,
    이메일: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    전화번호: /^01\d{8,9}$/,
    학번: /^\d{8}$/,
} as const;

// 에러 메시지
export const ERROR_MESSAGES = {
    이름: '올바른 이름을 입력해주세요. (예: 홍길동, John Smith)',
    생년월일: '생년월일을 YYMMDD 형식으로 입력해주세요.',
    전화번호: '올바른 전화번호를 입력해주세요. (예: 01012345678)',
    학번: '올바른 학번을 입력해주세요. (예: 학번 8자리)',
    이메일: '올바른 이메일을 입력해주세요. (예: example@gmail.com)',
} as const;

export type ValidationKey = keyof typeof VALIDATION_PATTERNS;
