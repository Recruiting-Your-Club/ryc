import React, { useEffect, useState, useMemo } from 'react';
import dayjs from 'dayjs';
import {
    clubApplyPageContainer,
    clubApplyPageMainContainer,
    clubApplyTabContainer,
    clubApplyTabName,
    clubLogoAndNameContainer,
    clubNameContainer,
    clubTagContainer,
    svgContainer,
    submitButtonContainer,
    clubApplyPage,
    mobileQuestionStatus,
    nextButtonContainer,
} from './ClubApplyPage.style';
import Ryc from '@assets/images/Ryc.svg';
import { Button } from '@components';
import { ClubSubmitCard } from '@components/ClubSubmitCard';
import { BREAKPOINT } from '@styles/theme/breakPoint';
import { ClubApplyPersonalInfoPage } from './PersonalInfoPage';
import { ClubApplyDetailQuestionPage } from './DetailQuestionPage';
import { useTheme } from '@emotion/react';
import SubmitDialog from '@components/SubmitDialog/SubmitDialog';

// 임시 데이터 (서버 응답 형식에 맞춤)
export const clubData = {
    announcementId: '213123',
    title: 'EN# (Enjoy C#)',
    description: '',
    target: '1,2학년',
    tag: '학술동아리',
    numberOfPeople: 0,
    announcementPeriod: [
        {
            start: '2025-05-03T03:13:11.173Z',
            end: '2025-05-23T03:13:11.173Z',
        },
    ],
    applicationPeriod: [
        {
            start: '2025-05-03T03:13:11.173Z',
            end: '2025-05-03T03:13:11.173Z',
        },
    ],
    interviewPeriod: [
        {
            start: '2025-05-03T03:13:11.173Z',
            end: '2025-05-03T03:13:11.173Z',
        },
    ],
    resultAnnouncementDate: '2025-06-30T15:00:00.000Z',
    durationDate: '한 학기',
    preQuestions: [
        {
            personalInfoQuestions: ['STUDENT_ID', 'PROFILE_IMAGE'],
            additionalQuestions: [
                {
                    category: 'SHORT_ANSWER',
                    title: '이름',
                },
                {
                    category: 'SHORT_ANSWER',
                    title: '생년월일',
                },
                {
                    category: 'SHORT_ANSWER',
                    title: '전화번호',
                },
                {
                    category: 'MULTIPLE_CHOICE',
                    title: '성별',
                    options: ['남', '여'],
                },
            ],
        },
    ],
    questions: [
        {
            title: 'EN#에 지원한 동기가 무엇인가요?',
            description: 'EN#에 지원하게 된 계기와 동기를 자유롭게 작성해주세요.',
        },
        {
            title: 'EN#에서 기대하는 활동을 작성해주세요.',
            description: 'EN#에서 하고 싶은 활동이나 목표를 자유롭게 작성해주세요.',
        },
        {
            title: '프로젝트 경험이 있다면 자세히 설명해주세요.',
            description: '참여했던 프로젝트의 내용, 역할, 기간 등을 자세히 작성해주세요.',
        },
    ],
};

// 사전질문 데이터 변환
export const clubPersonalQuestions = clubData.preQuestions[0].additionalQuestions.map(
    (question, index) => ({
        id: index + 1,
        question: question.title,
        type: question.category === 'MULTIPLE_CHOICE' ? 'boolean' : 'string',
        options: question.options ?? [],
    }),
);

// 자기소개서 질문 데이터 변환
export const detailQuestions = clubData.questions.map((question, index) => ({
    id: index + clubPersonalQuestions.length + 1,
    question: question.title,
    description: question.description,
}));

// 모든 질문을 하나의 배열로 통합
const allQuestions = [...clubPersonalQuestions, ...detailQuestions];

const applyData = [
    {
        question: '사전질문',
        index: 0,
    },
    {
        question: '자기소개서',
        index: 1,
    },
];

function ClubApplyPage() {
    const [idx, setIdx] = useState<number>(0);
    const [isDesktop, setIsDesktop] = useState<boolean>(
        window.innerWidth > parseInt(BREAKPOINT.mobile),
    );
    const [answers, setAnswers] = useState<{ [key: number]: string }>({});
    const [completedQuestions, setCompletedQuestions] = useState<number>(0);
    const totalQuestions = allQuestions.length;
    const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);

    // 마감일 계산 리팩토링할 때 유틸함수 가져다 써야함.
    const today = dayjs().format('YYYY-MM-DD');
    const formattedDeadline = dayjs(clubData.announcementPeriod[0].end);
    const diffDay = formattedDeadline.diff(today, 'day');

    const calculateDeadline = useMemo(() => {
        if (diffDay > 7) {
            return `~${formattedDeadline.format('MM.DD')}`;
        } else if (diffDay > 0) {
            return `D-${diffDay}`;
        } else if (diffDay === 0) {
            return `D-Day`;
        } else {
            return `마감`;
        }
    }, [formattedDeadline, today, diffDay]);

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth > parseInt(BREAKPOINT.mobile));
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // 답변 완료 상태 업데이트
    useEffect(() => {
        const completedCount = Object.values(answers).filter(
            (answer) => answer.trim() !== '',
        ).length;
        setCompletedQuestions(completedCount);
    }, [answers]);

    // 답변 변경 핸들러
    const handleAnswerChange = (id: number, value: string) => {
        setAnswers((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const theme = useTheme();

    const handleSubmit = () => {
        setIsSubmitDialogOpen(true);
    };

    const handleConfirmSubmit = () => {
        // TODO: 실제 제출 로직 구현
        setIsSubmitDialogOpen(false);
    };

    // 현재 페이지의 답변만 추출
    const getCurrentPageAnswers = () => {
        if (idx === 0) {
            return clubPersonalQuestions.reduce(
                (acc, q) => {
                    acc[q.id] = answers[q.id] || '';
                    return acc;
                },
                {} as { [key: number]: string },
            );
        } else {
            return detailQuestions.reduce(
                (acc, q) => {
                    acc[q.id] = answers[q.id] || '';
                    return acc;
                },
                {} as { [key: number]: string },
            );
        }
    };

    // 다음 버튼 클릭 핸들러
    const handleNext = () => {
        // 현재 페이지 답변만 저장
        const pageAnswers = getCurrentPageAnswers();
        localStorage.setItem(`club-apply-answers-page-${idx}`, JSON.stringify(pageAnswers));
        // 다음 탭으로 이동
        if (idx < applyData.length - 1) {
            setIdx(idx + 1);
        }
    };

    return (
        <div css={clubApplyPageContainer}>
            <div css={clubApplyPage}>
                <div css={clubApplyPageMainContainer} style={{ position: 'relative' }}>
                    <div css={clubLogoAndNameContainer}>
                        <Ryc css={svgContainer} />
                        <div css={clubNameContainer}>
                            {clubData.title}
                            <div css={clubTagContainer}>{clubData.tag}</div>
                        </div>
                    </div>

                    <div css={clubApplyTabContainer}>
                        {applyData.map((data) => (
                            <Button
                                key={data.question}
                                variant="text"
                                sx={clubApplyTabName}
                                onClick={() => setIdx(data.index)}
                            >
                                {data.question}
                            </Button>
                        ))}
                        {/* 모바일에서만 작성한 항목 표시 */}
                        {!isDesktop && (
                            <span
                                css={mobileQuestionStatus}
                                style={{
                                    color:
                                        completedQuestions === totalQuestions
                                            ? theme.colors.default
                                            : theme.colors.red[800],
                                }}
                            >
                                작성한 항목 ({completedQuestions} / {totalQuestions})
                            </span>
                        )}
                    </div>
                    {/* 페이지 */}
                    {idx === 0 ? (
                        <ClubApplyPersonalInfoPage
                            idx={idx}
                            answers={answers}
                            onAnswerChange={handleAnswerChange}
                        />
                    ) : (
                        <ClubApplyDetailQuestionPage
                            idx={idx}
                            answers={answers}
                            onAnswerChange={handleAnswerChange}
                        />
                    )}
                    {/* 오른쪽 하단 다음 버튼 */}
                    {idx < applyData.length - 1 && (
                        <div css={nextButtonContainer}>
                            <Button variant="primary" onClick={handleNext}>
                                다음
                            </Button>
                        </div>
                    )}
                </div>
                {isDesktop ? (
                    <ClubSubmitCard
                        clubName={clubData.title}
                        tag={clubData.tag}
                        deadline={calculateDeadline}
                        completedQuestions={completedQuestions}
                        totalQuestions={totalQuestions}
                        deadlineColor={diffDay > 3 ? theme.colors.gray[300] : theme.colors.red[800]}
                        isDesktop={isDesktop}
                        onSubmit={handleSubmit}
                    />
                ) : (
                    <div css={submitButtonContainer}>
                        <Button
                            variant="primary"
                            sx={{ width: '100%' }}
                            disabled={completedQuestions !== totalQuestions}
                            onClick={handleSubmit}
                        >
                            제출하기
                        </Button>
                    </div>
                )}
            </div>

            <SubmitDialog
                open={isSubmitDialogOpen}
                onConfirm={handleConfirmSubmit}
                onClose={() => setIsSubmitDialogOpen(false)}
            />
        </div>
    );
}

export { ClubApplyPage };
