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

//질문 배열로 받아서 form map으로 뿌리기

export const clubData = {
    clubName: '엔샵 (Enjoy C#)',
    tag: '학술동아리',
    name: '이름',
    birth: '생년월일',
    phoneNumber: '전화번호',
    gender: '성별',
};
const applyData = [
    {
        question: '사전질문',
        index: 0,
    },
    { question: '자기소개서', index: 1 },
];

function ClubApplyPage() {
    const [idx, setIdx] = useState<number>(0);
    const [isDesktop, setIsDesktop] = useState<boolean>(
        window.innerWidth > parseInt(BREAKPOINT.tablet),
    );
    const [completedQuestions, setCompletedQuestions] = useState<number>(0);
    const totalQuestions = 5; // 전체 질문 개수는 예시로 5개로 설정했습니다.

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth > parseInt(BREAKPOINT.tablet));
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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
                        <ClubApplyPersonalInfoPage idx={idx} />
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
