// 백엔드에서 받아올 임시 데이터 타입
export type ClubNotice = {
    document: boolean;
    interview: boolean;
};

export type Applicant = {
    name: string;
    email: string;
    date: string;
    score: string;
    status: string;
};
