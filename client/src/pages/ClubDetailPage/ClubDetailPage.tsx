import React from 'react';
import { ClubNavigation, Text } from '@components';
import {
    clubDetailPageContainer,
    clubHeader,
    clubHeaderTextContainer,
    clubHeaderTitle,
    clubImage,
    contentContainer,
} from './ClubDetailPage.style';
import { RecruitmentPage } from './RecruitmentPage';
import { ClubIntroPage } from './ClubIntroPage';
import { useLocation } from 'react-router-dom';

const getCategory = (category: string) => {
    switch (category) {
        case 'PERFORMANCE_ARTS':
            return '공연동아리';
        case 'CULTURE':
            return '문화동아리';
        case 'SPORTS':
            return '체육동아리';
        case 'ACADEMIC':
            return '학술동아리';
        case 'VOLUNTEER':
            return '봉사동아리';
        case 'RELIGION':
            return '종교동아리';
        default:
            return '미정';
    }
};

function ClubDetailPage() {
    // prop destruction
    const location = useLocation();
    const { title, category, clubLogo } = location.state;
    // lib hooks
    // initial values
    const navigationItem = [
        {
            title: '동아리 소개',
            page: <ClubIntroPage />,
            width: '7.5rem',
        },
        {
            title: '모집 공고',
            page: <RecruitmentPage />,
            width: '6.4rem',
        },
        {
            title: '테스트',
            page: <RecruitmentPage />,
            width: '4.6rem',
        },
    ];

    // state, ref, querystring hooks
    // form hooks
    // query hooks
    // calculated values
    // handlers
    // effects

    return (
        <div css={clubDetailPageContainer}>
            <div css={contentContainer}>
                <div css={clubHeader}>
                    <div css={clubImage}>
                        <img
                            src={clubLogo}
                            alt="대표이미지"
                            width="100%"
                            height="100%"
                            css={{ borderRadius: '10px' }}
                        />
                    </div>
                    <div css={clubHeaderTextContainer}>
                        <Text as="h4" type="h1Semibold" textAlign="start" sx={clubHeaderTitle}>
                            {title}
                        </Text>
                        <Text as="div" type="captionSemibold" color="helper" textAlign="start">
                            {getCategory(category)}
                        </Text>
                    </div>
                </div>

                <ClubNavigation navigationItem={navigationItem} />
            </div>
        </div>
    );
}
export { ClubDetailPage };
