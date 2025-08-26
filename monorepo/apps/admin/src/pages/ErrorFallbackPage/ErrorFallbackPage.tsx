import AttentionTriangle from '@assets/images/attention-triangle.svg';

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
import type { ErrorFallbackPageProps } from './types';

function ErrorFallbackPage({ error, resetErrorBoundary }: ErrorFallbackPageProps) {
    const { goTo } = useRouter();

    let message = '알 수 없는 오류가 발생했습니다.';

    if (error.statusCode === 500) {
        message = '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
    } else if (error.statusCode === 404) {
        message = '요청하신 데이터를 찾을 수 없습니다.';
    } else if (error.statusCode === 403) {
        message = '페이지 접근 권한이 없습니다.';
    } else if (error.statusCode === 401) {
        message = '세션이 만료되었습니다. 다시 로그인해주세요.';
    } else if (error.statusCode == 400) {
        message = '잘못된 요청입니다. 페이지를 새로고침 후 다시 시도해주세요.';
    } else {
        message = error.message;
    }

    return (
        <div css={s_fallbackContainer}>
            <div css={s_textBox}>
                <div css={s_iconContainer}>
                    <div css={s_warningIconWrapper}>
                        <AttentionTriangle css={s_warningIcon} />
                    </div>
                </div>
                <Text type="h1Bold" sx={s_captionText}>
                    {error.statusCode ? `${error.statusCode} ERROR` : 'ERROR'}
                </Text>
                <Text type="h4Semibold" sx={s_captionText}>
                    {message}
                </Text>
                <Text type="captionRegular">
                    {error.statusCode === 500
                        ? '불편을 드려 죄송합니다.\n지속적으로 오류가 발생할 경우, 아래 버튼을 통해 오류 신고 부탁드립니다.'
                        : '불편을 드려 죄송합니다.\n궁금한 점이 있으시면 언제든지 채널톡을 통해 문의해주세요!'}
                </Text>
            </div>
            {error.statusCode === 500 ? (
                <div css={s_buttonContainer}>
                    <Button onClick={() => goTo('/')}>오류 신고</Button>
                    <Button onClick={resetErrorBoundary}>다시 시도</Button>
                </div>
            ) : error.statusCode === 401 ? (
                <div css={s_buttonContainer}>
                    <Button onClick={() => goTo('/login')}>로그인 하기</Button>
                </div>
            ) : (
                <div css={s_buttonContainer}>
                    <Button onClick={resetErrorBoundary}>다시 시도</Button>
                </div>
            )}
            <Button size="xs" variant="text" onClick={() => goTo('/')} sx={s_homeTextButton}>
                처음으로
            </Button>
        </div>
    );
}

export { ErrorFallbackPage };
