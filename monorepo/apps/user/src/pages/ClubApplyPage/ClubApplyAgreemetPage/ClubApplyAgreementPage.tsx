import { TermsOfUse } from '@components';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { useRouter } from '@ssoc/hooks';

function ClubApplyAgreementPage() {
    // prop destruction
    // lib hooks
    const { announcementId } = useParams();

    const navigate = useNavigate();
    const locationState = useLocation().state as { clubId?: string } | null;
    const clubId = locationState?.clubId;

    // initial values
    // state, ref, querystring hooks

    // effects
    return (
        <TermsOfUse
            title="서비스 약관 동의"
            description="지원서 제출을 위해 필수 약관에 동의해 주세요."
            ctaLabel="동의 후 작성하기"
            onAgree={() => {
                if (!announcementId) return;
                navigate(`/announcements/${announcementId}/application`, {
                    replace: true,
                    state: clubId ? { clubId } : undefined,
                });
            }}
        />
    );
}
export { ClubApplyAgreementPage };
