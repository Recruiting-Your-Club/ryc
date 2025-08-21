import React from 'react';
import { clubBoxContainer, clubBoxItem, s_TextSx } from './ClubBox.style';
import { Text } from '@components';
import type { ClubBoxProps } from './types';

function ClubBox({ data }: ClubBoxProps) {
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
                        sx={s_TextSx}
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
export { ClubBox };
