import React from 'react';
import { Avatar, Tag, Text } from '@components';
import {
    cardBodyContainer,
    cardContainer,
    cardFooterContainer,
    cardHeaderContainer,
    cardTitleContainer,
    logoAndTitleContainer,
} from './MainCard.style';
import type { MainCardProps } from './types';
import { Link } from 'react-router-dom';

// FIXME: 나중에 useMemo로 최적화 해야할듯?
const getTagStatus = (status: string) => {
    switch (status) {
        case 'progress':
            return <Tag text="모집중" variant="progress" />;
        case 'primary':
            return <Tag text="모집예정" variant="primary" />;
        case 'end':
            return <Tag text="모집마감" variant="end" />;
        default:
            return <Tag text="미상" variant="progress" />;
    }
};

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
function MainCard({
    title = 'En#',
    category = '학술동아리',
    description = 'IT 동아리 EN# 신규 멤버 모집이야쥐기네~~~~~~',
    status = 'progress',
    hashTag = ['프로그래밍', '코딩', '자바스크립트'],
    link = 'http://localhost:3000/manager',
    imageURL = '',
}: MainCardProps) {
    // prop destruction
    // lib hooks
    // initial values
    // state, ref, querystring hooks
    // form hooks
    // query hooks
    // calculated values
    const hashTagList = hashTag.map((tag) => `#${tag} `);
    // handlers
    // effects
    return (
        <Link to={link} css={cardContainer}>
            <div css={cardHeaderContainer}>
                <div css={logoAndTitleContainer}>
                    <Avatar
                        shape="square"
                        size="xl"
                        radius="10px"
                        imageURL={imageURL}
                        imageName="logo"
                    />
                    <div css={cardTitleContainer}>
                        <Text
                            as="div"
                            type="bodySemibold"
                            color="black"
                            textAlign="start"
                            noWrap
                            cropped
                            sx={{ width: '19rem' }}
                        >
                            {title}
                        </Text>
                        <Text as="div" type="bodyLight" color="caption" noWrap cropped>
                            {getCategory(category)}
                        </Text>
                    </div>
                </div>
                {getTagStatus(status)}
            </div>
            <div css={cardBodyContainer}>
                <Text textAlign="start" type="bodyLight" cropped noWrap>
                    {description}
                </Text>
            </div>
            <div css={cardFooterContainer}>
                <Text type="captionLight" color="primary" noWrap cropped>
                    {hashTagList}
                </Text>
            </div>
        </Link>
    );
}
export { MainCard };
