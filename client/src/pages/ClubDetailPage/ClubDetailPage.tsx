import React from 'react';
import { ClubNavigation, ClubBox, Avatar, Text } from '@components';
import {
    clubDetailPageContainer,
    clubHeader,
    clubHeaderText,
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
    return (
        <div css={clubDetailPageContainer}>
            <div css={contentContainer}>
                <div css={clubHeader}>
                    <Avatar radius="10px" />
                    <div css={clubHeaderText}>
                        <Text as="h4" type="h3Semibold" textAlign="start">
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
