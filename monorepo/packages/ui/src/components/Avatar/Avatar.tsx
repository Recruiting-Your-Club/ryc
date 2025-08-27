import type { CSSObject } from '@emotion/react';
import React from 'react';

import AvatarDefault from '@ssoc/assets/images/avatarDefault.png';
import BasicImage from '@ssoc/assets/images/basicImage.png';

import { s_shape, s_size } from './Avatar.style';

export type AvatarSize = 'xs' | 's' | 'md' | 'lg' | 'xl' | 'full';
export type AvatarShape = 'square' | 'round';

interface AvatarProps {
    shape?: AvatarShape;
    size?: AvatarSize;
    radius?: string;
    imageURL?: string;
    imageName?: string;
    sx?: CSSObject;
}

function Avatar({ shape = 'square', size = 'xl', radius, imageURL, imageName, sx }: AvatarProps) {
    const cssProp = [s_size(size), sx];

    if (shape) cssProp.push(s_shape(shape, radius));

    return (
        <>
            <img
                src={imageURL ? imageURL : AvatarDefault}
                alt={imageName ? imageName : 'BasicImage'}
                css={cssProp}
            />
        </>
    );
}

export { Avatar };
