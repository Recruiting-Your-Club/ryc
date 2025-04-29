import React from 'react';
import { ClubNavigation, Avatar, Text } from '@components';
import {
    clubDetailPageContainer,
    clubHeader,
    clubHeaderText,
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
                    <div css={clubHeaderText}>
                        <Text as="h4" type="h1Semibold" textAlign="start">
                            엔샵(enjoy C#)
                        </Text>
                        <Text
                            as="div"
                            type="captionSemibold"
                            color="caption"
                            sx={{ marginLeft: '0.3rem' }}
                        >
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
