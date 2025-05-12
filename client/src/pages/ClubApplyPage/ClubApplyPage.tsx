import React, { useState } from 'react';
import {
    clubApplyPageContainer,
    clubApplyPageMainContainer,
    clubApplySubmitCardContainer,
    clubApplyTabContainer,
    clubApplyTabName,
    clubLogoAndNameContainer,
    clubNameContainer,
    clubTagContainer,
    svgContainer,
    submitButtonContainer,
} from './ClubApplyPage.style';
import Ryc from '@assets/images/Ryc.svg';
import { Button } from '@components';
import { ClubApplySubmitCard } from './ClubApplySubmitCard';
import { ClubApplyPersonalInfoPage } from './ClubApplyPersonalInfoPage';
import { ClubApplyDetailQuestionPage } from './ClubApplyDetailQuestionPage';
import { BREAKPOINT } from '@styles/theme/breakPoint';
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

    React.useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth > parseInt(BREAKPOINT.tablet));
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div css={clubApplyPageContainer}>
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
                <div css={clubApplySubmitCardContainer}>
                    <ClubApplySubmitCard />
                </div>
            ) : (
                <div css={submitButtonContainer}>
                    <Button variant="primary" sx={{ width: '100%' }}>
                        제출하기
                    </Button>
                </div>
            )}
        </div>
    );
}

export { ClubApplyPage };
