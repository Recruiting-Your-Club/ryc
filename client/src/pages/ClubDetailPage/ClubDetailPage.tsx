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

function ClubDetailPage() {
    // prop destruction
    // lib hooks
    // initial values
    const navigationItem = [
        {
            title: '동아리 소개',
            page: <ClubIntroPage />,
        },
        {
            title: '모집 공고',
            page: <RecruitmentPage />,
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
                        <Text as="div" type="captionSemibold" color="helper">
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
