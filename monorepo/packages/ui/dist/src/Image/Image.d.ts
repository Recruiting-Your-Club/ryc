import React from 'react';
import type { CSSObject } from '@emotion/react';
interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src?: string;
    radius?: CSSObject['borderRadius'];
    sx?: CSSObject;
}
declare function Image(imageProps: ImageProps): import("@emotion/react/jsx-runtime").JSX.Element;
export { Image };
//# sourceMappingURL=Image.d.ts.map