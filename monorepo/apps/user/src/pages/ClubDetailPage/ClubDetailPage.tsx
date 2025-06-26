import { ClubNavigation, Text } from '@components';
import React from 'react';

import {
    clubDetailPageContainer,
    clubHeader,
    clubHeaderTextContainer,
    clubHeaderTitle,
    clubImage,
    contentContainer,
} from './ClubDetailPage.style';
import { ClubIntroPage } from './ClubIntroPage';
import { RecruitmentPage } from './RecruitmentPage';

function ClubDetailPage() {
    // prop destruction
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
    const tempImage = 'https://cdn.pixabay.com/photo/2013/07/26/08/08/shield-167582_640.jpg';
    const clubName = 'En#(엔샵)';
    const clubDescription = '동아리 설명';
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
                            src={tempImage}
                            alt="대표이미지"
                            width="100%"
                            height="100%"
                            css={{ borderRadius: '10px' }}
                        />
                    </div>
                    <div css={clubHeaderTextContainer}>
                        <Text as="h4" type="h1Semibold" textAlign="start" sx={clubHeaderTitle}>
                            {clubName}
                        </Text>
                        <Text as="div" type="captionSemibold" color="helper" textAlign="start">
                            {clubDescription}
                        </Text>
                    </div>
                </div>

                <ClubNavigation navigationItem={navigationItem} />
            </div>
        </div>
    );
}
export { ClubDetailPage };
