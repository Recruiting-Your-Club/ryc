import CheckCircle from '@ssoc/assets/images/check-circle.svg';

import {
    s_checkCircle,
    s_container,
    s_description,
    s_iconContainer,
    s_mainTitle,
    s_subTitle,
    s_successIcon,
    s_urlContainer,
    s_urlLabel,
    s_urlSection,
} from './RecruitSuccessPage.style';

function RecruitSuccessPage() {
    return (
        <div css={s_container}>
            <div css={s_iconContainer}>
                <div css={s_successIcon}>
                    <CheckCircle css={s_checkCircle} />
                </div>
            </div>

            <div css={s_mainTitle}>축하합니다!</div>
            <div css={s_subTitle}>공고가 성공적으로 게시되었습니다!</div>
            <div css={s_description}>
                작성하신 채용 공고가 성공적으로 등록되어 지원자들이 확인할 수 있습니다.
            </div>

            <div css={s_urlSection}>
                <div css={s_urlLabel}>공고 링크</div>
                <div css={s_urlContainer}></div>
            </div>
        </div>
    );
}

export { RecruitSuccessPage };
