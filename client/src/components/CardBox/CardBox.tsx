import MeatBallMenu from '@assets/images/meatball-menu.svg';
import { Divider, Text } from '@components';
import React from 'react';
import { boxContainer, cardGroupWrapper, dividerCss, svgCss, titleGroup } from './CardBox.style';
import type { CardBoxProps } from './types';

function CardBox({ stepTitle, step, toggleDropdown, height, children, sx }: CardBoxProps) {
    return (
        <div css={[boxContainer(height, step), sx]}>
            <div css={titleGroup}>
                <Text as="span" type="captionSemibold">
                    {stepTitle}
                </Text>
                <MeatBallMenu onClick={toggleDropdown} css={svgCss} />
            </div>
            <Divider sx={dividerCss} />
            <div css={cardGroupWrapper}>{children}</div>
        </div>
    );
}
export { CardBox };
