import { css } from '@emotion/react';
import type { CSSObject } from '@emotion/react';

export const imageContainer = (radius: CSSObject['borderRadius']) => css`
    border-radius: ${radius};
`;
