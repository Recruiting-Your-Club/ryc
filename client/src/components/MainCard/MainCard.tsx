import React from 'react';
import { Avatar, Tag, Text } from '@components';
import {
    cardContainer,
    cardFooterContainer,
    cardHeaderContainer,
    cardTitleContainer,
    hashTagContainer,
    logoAndTitleContainer,
} from './MainCard.style';
import type { MainCardProps } from './types';

const getTagStatus = (status: string) => {
    switch (status) {
        case 'progress':
            return <Tag text="모집중" variant="progress" />;
        case 'primary':
            return <Tag text="모집예정" variant="primary" />;
        case 'end':
            return <Tag text="모집마감" variant="end" />;
    }
};
function MainCard({
    title = 'En#',
    category = '학술동아리',
    description = 'IT 동아리 EN# 신규 멤버 모집이야쥐기네~~~~~~',
    status = 'progress',
    hashTag = ['프로그래밍', '코딩', '자바스크립트'],
}: MainCardProps) {
    // prop destruction
    // lib hooks
    // initial values
    // state, ref, querystring hooks
    // form hooks
    // query hooks
    // calculated values
    // handlers
    // effects
    return (
        <div css={cardContainer}>
            <div css={cardHeaderContainer}>
                <div css={logoAndTitleContainer}>
                    <Avatar shape="square" size="xl" radius="10px" imageName="exampleImage" />
                    <div css={cardTitleContainer}>
                        <Text as="div" type="h4Semibold" color="black">
                            {title}
                        </Text>
                        <Text as="div" type="bodyLight" color="caption">
                            {category}
                        </Text>
                    </div>
                </div>
                {getTagStatus(status)}
            </div>
            <div css={cardFooterContainer}>
                <Text textAlign="start" type="bodyLight">
                    {description}
                </Text>

                <div css={hashTagContainer}>
                    {hashTag.map((tag: string) => (
                        <Text key={tag} type="captionLight" color="primary">
                            #{tag}
                        </Text>
                    ))}
                </div>
            </div>
        </div>
    );
}
export { MainCard };
