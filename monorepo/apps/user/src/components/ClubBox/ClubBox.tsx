import React from 'react';

import { Text } from '@ssoc/ui';

import { clubBoxContainer, clubBoxItem, s_TextContetnSx, s_TextTitleSx } from './ClubBox.style';
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
                        sx={s_TextTitleSx}
                        textAlign="start"
                        noWrap
                    >
                        {data.title}
                    </Text>
                    <Text
                        as="div"
                        type="bodyRegular"
                        sx={s_TextContetnSx}
                        textAlign="start"
                        noWrap
                        cropped
                    >
                        {data.content}
                    </Text>
                </div>
            ))}
        </div>
    );
}
export { ClubBox };
