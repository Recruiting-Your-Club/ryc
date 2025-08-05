import { ClubNavigation } from '@components';
import { getCategory } from '@utils/changeCategory';
import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { Text } from '@ssoc/ui';

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
    const location = useLocation();
    const { title, category, clubLogo } = location.state;
    // lib hooks
    // initial values
    const navigationItem = useMemo(
        () => [
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
        ],
        [],
    );

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
                        <Text
                            as="div"
                            type="captionSemibold"
                            color="helper"
                            textAlign="start"
                            sx={{ marginLeft: '0.4rem' }}
                        >
                            {getCategory(category)}
                        </Text>
                    </div>
                </div>

                <ClubNavigation navigationItem={navigationItem} />
            </div>
        </div>
    );
}
export default ClubDetailPage;
