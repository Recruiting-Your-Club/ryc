import type { CSSObject } from '@emotion/react';
import React from 'react';

import { imageContainer } from './Image.style';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src?: string;
    radius?: CSSObject['borderRadius'];
    sx?: CSSObject;
}

function Image(imageProps: ImageProps) {
    // prop destruction
    const { src, alt, width = '100%', height = '100%', radius = '10px', sx } = imageProps;
    // lib hooks
    // initial values
    // state, ref, querystring hooks
    // form hooks
    // query hooks
    // calculated values
    // handlers
    // effects
    return (
        <img src={src} alt={alt} width={width} height={height} css={[imageContainer(radius), sx]} />
    );
}
export { Image };
