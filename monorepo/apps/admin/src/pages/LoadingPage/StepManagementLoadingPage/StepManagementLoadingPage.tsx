import React from 'react';

import {
    s_cardBoxSkeleton,
    s_cardItemSkeleton,
    s_cardTitleSkeleton,
    s_searchBarContainer,
    s_searchBarSkeleton,
    s_stepBoxContainer,
    s_stepManagementPageContainer,
    s_titleContainer,
    s_topContainer,
} from './StepManagementLoadingPage.style';

function StepManagementLoadingPage() {
    return (
        <div css={s_stepManagementPageContainer}>
            <div css={s_topContainer}>
                <nav css={s_searchBarContainer}>
                    <div css={s_searchBarSkeleton} />
                </nav>
            </div>
            <div css={s_stepBoxContainer}>
                <div css={s_cardBoxSkeleton}>
                    <div css={s_titleContainer}>
                        <div css={s_cardTitleSkeleton} />
                        <div css={s_cardTitleSkeleton} />
                    </div>
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div key={index} css={s_cardItemSkeleton} />
                    ))}
                </div>

                <div css={s_cardBoxSkeleton}>
                    <div css={s_titleContainer}>
                        <div css={s_cardTitleSkeleton} />
                        <div css={s_cardTitleSkeleton} />
                    </div>
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div key={index} css={s_cardItemSkeleton} />
                    ))}
                </div>

                <div css={s_cardBoxSkeleton}>
                    <div css={s_titleContainer}>
                        <div css={s_cardTitleSkeleton} />
                        <div css={s_cardTitleSkeleton} />
                    </div>
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div key={index} css={s_cardItemSkeleton} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export { StepManagementLoadingPage };
