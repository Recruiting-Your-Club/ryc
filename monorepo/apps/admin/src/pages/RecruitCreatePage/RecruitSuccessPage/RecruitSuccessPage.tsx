import { useState } from 'react';

import CheckCircle from '@ssoc/assets/images/check-circle.svg';
import Copy from '@ssoc/assets/images/copy.svg';
import ExternalLink from '@ssoc/assets/images/external-link.svg';
import { Button, Text, useToast } from '@ssoc/ui';

import {
    s_buttonContainer,
    s_checkCircle,
    s_container,
    s_copy,
    s_copyCheckCircle,
    s_externalLink,
    s_footerContainer,
    s_iconContainer,
    s_mainTitle,
    s_subTitle,
    s_successIcon,
    s_urlCode,
    s_urlContainer,
    s_urlLabel,
    s_urlSection,
} from './RecruitSuccessPage.style';

function RecruitSuccessPage() {
    // prop destruction
    // lib hooks
    const { toast } = useToast();

    // initial values
    const postingUrl = 'https://ssoc.kr/recruitment/success';

    // state, ref, querystring hooks
    const [copied, setCopied] = useState(false);

    // form hooks
    // query hooks
    // calculated values
    // handlers
    const handleCopyUrl = async () => {
        try {
            await navigator.clipboard.writeText(postingUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            toast.error('url 복사에 실패했습니다. 잠시 후 다시 시도해주세요', {
                toastTheme: 'black',
                position: 'topCenter',
            });
        }
    };

    // effects

    return (
        <div css={s_container}>
            <div css={s_iconContainer}>
                <div css={s_successIcon}>
                    <CheckCircle css={s_checkCircle} />
                </div>
            </div>

            <div css={s_mainTitle}>축하합니다!</div>
            <div css={s_subTitle}>공고가 성공적으로 게시되었습니다!</div>

            <div css={s_urlSection}>
                <div css={s_urlContainer}>
                    <div css={s_urlCode}>{postingUrl}</div>
                    <Button variant="transparent" onClick={handleCopyUrl} size="xs">
                        {copied ? <CheckCircle css={s_copyCheckCircle} /> : <Copy css={s_copy} />}
                    </Button>
                </div>
            </div>

            <div css={s_buttonContainer}>
                <Button>
                    <ExternalLink css={s_externalLink} />
                    공고 확인하기
                </Button>
                <Button variant="outlined">관리자 페이지 이동</Button>
            </div>

            <div css={s_footerContainer}>
                <Text type="captionRegular" color="subCaption">
                    공고는 즉시 활성화되며, 서류 모집 기간 전에는 관리자 페이지에서 언제든지 수정할
                    수 있습니다.
                </Text>
            </div>
        </div>
    );
}

export { RecruitSuccessPage };
