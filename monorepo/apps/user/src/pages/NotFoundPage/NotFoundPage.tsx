import AttentionTriangle from '@assets/images/attention-triangle.svg';
import { DEFAULT_DESCRIPTION, ERROR_CODE_404_PAGE_NONCODE } from '@constants/errorText';

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
                    {ERROR_CODE_404_PAGE_NONCODE}
                </Text>
                <Text type="captionRegular">{DEFAULT_DESCRIPTION}</Text>
            </div>
            <div css={s_buttonContainer}>
                <Button onClick={() => goTo('/')}>처음으로</Button>
            </div>
        </div>
    );
}

export { NotFoundPage };
