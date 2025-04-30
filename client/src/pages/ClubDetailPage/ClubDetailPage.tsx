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
import { RecruitmentPage } from './RecruitmentListPage';
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
    // state, ref, querystring hooks
    // form hooks
    // query hooks
    // calculated values
    // handlers
    // effects

    // 필요한거
    /**
     * 1. 로고 이미지
     * 2. 동아리 이름
     * 3. 동아리 설명
     */

    // compact: '0px',
    // mobileMini: '400px',
    // mobile: '480px',
    // tabletMini: '768px',
    // tablet: '1024px',
    // desktop: '1200px',
    return (
        <div css={clubDetailPageContainer}>
            <div css={contentContainer}>
                <div css={clubHeader}>
                    <div css={clubImage}>
                        <img
                            src="https://cdn.pixabay.com/photo/2013/07/26/08/08/shield-167582_640.jpg"
                            alt="대표이미지"
                            width="100%"
                            height="100%"
                            css={{ borderRadius: '10px' }}
                        />
                    </div>
                    <div css={clubHeaderTextContainer}>
                        <Text as="h4" type="h1Semibold" textAlign="start" sx={clubHeaderTitle}>
                            En#(엔샵)
                        </Text>
                        <Text as="div" type="captionSemibold" color="helper">
                            동아리 설명
                        </Text>
                    </div>
                </div>

                <ClubNavigation navigationItem={navigationItem} />
            </div>
        </div>
    );
}
export { ClubDetailPage };
