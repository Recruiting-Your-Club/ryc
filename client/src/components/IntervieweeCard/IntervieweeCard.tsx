import { Avatar, Text } from '@components';
import React from 'react';
import { s_cardContainer, s_informationContainer } from './IntervieweeCard.style';
import type { IntervieweeCardProps } from './types';

function IntervieweeCard({ name, email, imageUrl }: IntervieweeCardProps) {
    return (
        <div css={s_cardContainer}>
            <Avatar shape="round" size="md" imageURL={imageUrl} />
            <div css={s_informationContainer}>
                <Text as="span" textAlign="start" type="captionRegular" cropped>
                    {name}
                </Text>
                <Text as="span" textAlign="start" type="captionRegular" cropped>
                    {email}
                </Text>
            </div>
        </div>
    );
}

export { IntervieweeCard };
