import AttentionTriangle from '@assets/images/attention-triangle.svg';

import { useRouter } from '@ssoc/hooks';
import { Button, Text } from '@ssoc/ui';

import {
    s_buttonContainer,
    s_captionText,
    s_fallbackContainer,
    s_iconContainer,
    s_textBox,
    s_warningIcon,
    s_warningIconWrapper,
} from './NotFoundPage.style';

function NotFoundPage() {
    // prop destruction
    // lib hooks
    const { goTo } = useRouter();

    // initial values
    // state, ref, querystring hooks
    // form hooks
    // query hooks
    // calculated values
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
                    404 ERROR
                </Text>
                <Text type="h4Semibold" sx={s_captionText}>
                    페이지를 찾을 수 없습니다.
                </Text>
                <Text type="captionRegular">
                    {
                        '불편을 드려 죄송합니다.\n궁금한 점이 있으시면 언제든지 채널톡을 통해 문의해주세요!'
                    }
                </Text>
            </div>
            <div css={s_buttonContainer}>
                <Button onClick={() => goTo('/')}>처음으로</Button>
            </div>
        </div>
    );
}

export { NotFoundPage };
