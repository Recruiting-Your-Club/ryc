import type { Theme } from '@emotion/react';

import { BREAKPOINT } from './breakPoint';
import { COLORS } from './colors';
import { TYPOGRAPHY } from './typography';

const theme: Theme = {
    colors: COLORS,
    typography: TYPOGRAPHY,
    breakpoint: BREAKPOINT,
};

export default theme;
