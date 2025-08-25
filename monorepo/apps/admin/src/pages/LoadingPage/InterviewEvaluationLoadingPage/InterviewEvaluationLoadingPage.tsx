import React from 'react';

import {
    s_avatarSkeleton,
    s_contentContainer,
    s_emailSkeleton,
    s_evaluationAuthorSkeleton,
    s_evaluationBoxSkeleton,
    s_evaluationBoxWrapper,
    s_evaluationCommentSkeleton,
    s_evaluationItemSkeleton,
    s_evaluationStarSkeleton,
    s_evaluationTitleSkeleton,
    s_evaluationTitleStarContainer,
    s_informationAndEvaluationContainer,
    s_informationBoxSkeleton,
    s_informationBoxWrapper,
    s_infoSectionContentSkeleton,
    s_infoSectionTitleSkeleton,
    s_infoTabItem,
    s_infoTabs,
    s_intervieweeListContainer,
    s_intervieweeListItemSkeleton,
    s_intervieweeListSkeleton,
    s_interviewInformationPageContainer,
    s_leftTitleContainer,
    s_listSearchBar,
    s_listTabItem,
    s_listTabs,
    s_nameEmailSkeleton,
    s_nameSkeleton,
    s_selectionContainer,
    s_textContentContainer,
    s_titleContainer,
} from './InterviewEvaluationLoadingPage.style';

function InterviewEvaluationLoadingPage() {
    return (
        <div css={s_interviewInformationPageContainer()}>
            <div css={s_selectionContainer()}>
                <div css={s_intervieweeListSkeleton()}>
                    <div css={s_titleContainer}>
                        <div css={s_leftTitleContainer}>
                            <div css={s_listSearchBar()} />
                            <div css={s_listTabs()}>
                                <div css={s_listTabItem()} />
                            </div>
                        </div>
                        <div css={s_listTabs()}>
                            <div css={s_listTabItem()} />
                        </div>
                    </div>
                    <div css={s_intervieweeListContainer}>
                        {Array.from({ length: 6 }).map((_, index) => (
                            <div key={index} css={s_intervieweeListItemSkeleton()}>
                                <div css={s_avatarSkeleton()} />
                                <div css={s_nameEmailSkeleton()}>
                                    <div css={s_nameSkeleton()} />
                                    <div css={s_emailSkeleton()} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div css={s_informationAndEvaluationContainer()}>
                <div css={s_informationBoxWrapper()}>
                    <div css={s_informationBoxSkeleton()}>
                        <div css={s_infoTabs()}>
                            <div css={s_infoTabItem()} />
                            <div css={s_infoTabItem()} />
                        </div>
                        <div css={s_contentContainer}>
                            <div css={s_infoSectionTitleSkeleton()} />
                            <div css={s_textContentContainer}>
                                <div css={s_infoSectionContentSkeleton()} />
                                <div css={s_infoSectionContentSkeleton()} />
                                <div css={s_infoSectionContentSkeleton()} />
                                <div css={s_infoSectionContentSkeleton()} />
                            </div>
                        </div>
                        <div css={s_infoSectionContentSkeleton()} />
                        <div css={s_infoSectionContentSkeleton()} />
                    </div>
                </div>
                <div css={s_evaluationBoxWrapper()}>
                    <div css={s_evaluationBoxSkeleton()}>
                        <div css={s_evaluationTitleStarContainer}>
                            <div css={s_evaluationTitleSkeleton()} />
                            <div css={s_evaluationStarSkeleton()} />
                        </div>
                        {Array.from({ length: 5 }).map((_, index) => (
                            <div key={index} css={s_evaluationItemSkeleton()}>
                                <div css={s_evaluationAuthorSkeleton()} />
                                <div css={s_evaluationCommentSkeleton()} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export { InterviewEvaluationLoadingPage };
