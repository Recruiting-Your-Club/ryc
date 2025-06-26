import { css } from '@emotion/react';
import PretendardLight from '@ssoc/assets/fonts/Pretendard-Light.subset.woff2';
import PretendardRegular from '@ssoc/assets/fonts/Pretendard-Regular.subset.woff2';
import PretendardMedium from '@ssoc/assets/fonts/Pretendard-Medium.subset.woff2';
import PretendardSemiBold from '@ssoc/assets/fonts/Pretendard-SemiBold.subset.woff2';
import PretendardBold from '@ssoc/assets/fonts/Pretendard-Bold.subset.woff2';
export const fontFaces = css `
    @font-face {
        font-family: Pretendard;
        font-weight: 300;
        src: url(${PretendardLight}) format('woff2');
    }

    @font-face {
        font-family: Pretendard;
        font-weight: 400;
        src: url(${PretendardRegular}) format('woff2');
    }

    @font-face {
        font-family: Pretendard;
        font-weight: 500;
        src: url(${PretendardMedium}) format('woff2');
    }

    @font-face {
        font-family: Pretendard;
        font-weight: 600;
        src: url(${PretendardSemiBold}) format('woff2');
    }

    @font-face {
        font-family: Pretendard;
        font-weight: 700;
        src: url(${PretendardBold}) format('woff2');
    }
`;
//# sourceMappingURL=fonts.js.map