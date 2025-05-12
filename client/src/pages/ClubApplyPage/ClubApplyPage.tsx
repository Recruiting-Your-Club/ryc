import React, { useEffect, useState } from 'react';
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
} from './ClubApplyPage.style';
import Ryc from '@assets/images/Ryc.svg';
import { Button } from '@components';
import { ClubSubmitCard } from '@components/ClubSubmitCard';
import { BREAKPOINT } from '@styles/theme/breakPoint';
import { ClubApplyPersonalInfoPage } from './PersonalInfoPage';
import { ClubApplyDetailQuestionPage } from './DetailQuestionPage';

export const clubData = {
    clubName: '엔샵 (Enjoy C#)',
    tag: '학술동아리',
};

export const clubPersonalQuestions = [
    {
        id: 1,
        question: '이름',
        type: 'string',
    },
    {
        id: 2,
        question: '생년월일',
        type: 'string',
    },
    {
        id: 3,
        question: '전화번호',
        type: 'string',
    },
    {
        id: 4,
        question: '성별',
        type: 'boolean',
    },
];

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
        window.innerWidth > parseInt(BREAKPOINT.tablet),
    );
    const [completedQuestions, setCompletedQuestions] = useState<number>(0);
    const totalQuestions = clubPersonalQuestions.length;

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth > parseInt(BREAKPOINT.tablet));
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleQuestionComplete = (completed: number) => {
        setCompletedQuestions(completed);
    };

    return (
        <div css={clubApplyPageContainer}>
            <div css={clubApplyPage}>
                <div css={clubApplyPageMainContainer}>
                    <div css={clubLogoAndNameContainer}>
                        <Ryc css={svgContainer} />
                        <div css={clubNameContainer}>
                            {clubData.clubName}
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
                    </div>
                    {/* 페이지 */}
                    {idx === 0 ? (
                        <ClubApplyPersonalInfoPage
                            idx={idx}
                            onQuestionComplete={handleQuestionComplete}
                        />
                    ) : (
                        <ClubApplyDetailQuestionPage idx={idx} />
                    )}
                </div>
                {isDesktop ? (
                    <ClubSubmitCard
                        clubName={clubData.clubName}
                        tag={clubData.tag}
                        deadline="D-1"
                        completedQuestions={completedQuestions}
                        totalQuestions={totalQuestions}
                    />
                ) : (
                    <div css={submitButtonContainer}>
                        <Button variant="primary" sx={{ width: '100%' }}>
                            제출하기
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}

export { ClubApplyPage };
