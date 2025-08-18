import React from 'react';

import { Text } from '@ssoc/ui';

import { clubBoxContainer, clubBoxItem, s_TextSx } from './ClubBox.style';
import type { ClubBoxProps } from './types';

function ClubBox({ data }: ClubBoxProps) {
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
                    <Text as="div" type="bodyRegular" textAlign="start" noWrap cropped>
                        {data.value}
                    </Text>
                </div>
            ))}
        </div>
    );
}
export { ClubBox };
