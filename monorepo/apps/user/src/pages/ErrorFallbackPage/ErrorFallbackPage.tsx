import AttentionTriangle from '@assets/images/attention-triangle.svg';
import {
    DEFAULT_DESCRIPTION,
    ERROR_500_DESCRIPTION,
    ERROR_500_DESCRIPTION_ADDITIONAL,
    ERROR_CODE_400,
    ERROR_CODE_401,
    ERROR_CODE_403,
    ERROR_CODE_404_DATA,
    ERROR_CODE_500,
    ERROR_DEFAULT,
} from '@constants/errorText';
import React from 'react';

import { useRouter } from '@ssoc/hooks';
import { Button, Text } from '@ssoc/ui';

import {
    s_buttonContainer,
    s_captionText,
    s_fallbackContainer,
    s_homeTextButton,
    s_iconContainer,
    s_textBox,
    s_warningIcon,
    s_warningIconWrapper,
} from './ErrorFallbackPage.style';
import type { ErrorFallbackPageProps, ErrorResponse } from './types';

function ErrorFallbackPage({ error, resetErrorBoundary }: ErrorFallbackPageProps) {
    // prop destruction
    // lib hooks
    const { goTo } = useRouter();

    // initial values
    let message = ERROR_DEFAULT;

    // state, ref, querystring hooks
    // form hooks
    // query hooks
    // calculated values
    switch (error.statusCode) {
        case 500:
            message = ERROR_CODE_500;
            break;
        case 404:
            message = error.message ? `${error.message} (404)` : ERROR_CODE_404_DATA;
            break;
        case 403:
            message = error.message ? `${error.message} (403)` : ERROR_CODE_403;
            break;
        case 401:
            message = ERROR_CODE_401;
            break;
        case 400:
            if (error.response?.errors && Array.isArray(error.response.errors)) {
                message = error.response.errors
                    .map((error: ErrorResponse) => error.message)
                    .join('\n');
            } else {
                message = error.message ? `${error.message} (400)` : ERROR_CODE_400;
            }
            break;
        default:
            message = error.message ?? ERROR_DEFAULT;
            break;
    }

    // handlers
    // effects

    return (
        <div css={s_fallbackContainer}>
            <div css={s_textBox}>
                <div css={s_iconContainer}>
                    <div css={s_warningIconWrapper}>
                        <AttentionTriangle css={s_warningIcon} />
                    </div>
                </div>
                <Text type="h1Bold" sx={s_captionText}>
                    ERROR
                </Text>
                <Text type="h4Semibold" sx={s_captionText}>
                    {message}
                </Text>
                <Text type="captionRegular">
                    {error.statusCode === 500
                        ? ERROR_500_DESCRIPTION_ADDITIONAL
                        : DEFAULT_DESCRIPTION}
                </Text>
            </div>
            {
                // error.statusCode === 500 ? (
                //     <div css={s_buttonContainer}>
                //         <Button onClick={() => goTo('/')}>오류 신고</Button>
                //         <Button onClick={resetErrorBoundary}>다시 시도</Button>
                //     </div>
                // ) :
                error.statusCode === 401 ? (
                    <div css={s_buttonContainer}>
                        <Button onClick={() => goTo('/login')}>로그인 하기</Button>
                    </div>
                ) : (
                    <div css={s_buttonContainer}>
                        <Button onClick={resetErrorBoundary}>다시 시도</Button>
                    </div>
                )
            }
            <Button size="xs" variant="text" onClick={() => goTo('/')} sx={s_homeTextButton}>
                처음으로
            </Button>
        </div>
    );
}

export { ErrorFallbackPage };
