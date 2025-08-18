import React from 'react';

import { Text } from '@ssoc/ui';

import { clubBoxContainer, clubBoxItem } from './ClubInformationBox.style';
import type { ClubBoxProps } from './types';

function ClubInformationBox({ data }: ClubBoxProps) {
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
        <div css={clubBoxContainer}>
            {data?.map((data) => (
                <div key={data.title} css={clubBoxItem}>
                    <Text
                        as="div"
                        type="bodyRegular"
                        color="caption"
                        sx={{ width: '40%' }}
                        textAlign="start"
                        noWrap
                    >
                        {data.title}
                    </Text>
                    <Text as="div" type="bodyRegular" textAlign="start" noWrap>
                        {data.value}
                    </Text>
                </div>
            ))}
        </div>
    );
}
export { ClubInformationBox };
