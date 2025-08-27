import React from 'react';

import { Avatar, Text } from '@ssoc/ui';

import { s_avatar, s_cardContainer, s_informationContainer } from './IntervieweeCard.style';
import type { IntervieweeCardProps } from './types';

function IntervieweeCard({
    name,
    email,
    imageUrl,
    isActivated = false,
    ...props
}: IntervieweeCardProps) {
    return (
        <button css={s_cardContainer(isActivated)} {...props}>
            <Avatar shape="round" size="md" imageURL={imageUrl} sx={s_avatar} />
            <div css={s_informationContainer}>
                <Text as="span" textAlign="start" type="captionRegular" cropped>
                    {name}
                </Text>
                <Text as="span" textAlign="start" type="captionRegular" cropped>
                    {email}
                </Text>
            </div>
        </button>
    );
}

export { IntervieweeCard };
