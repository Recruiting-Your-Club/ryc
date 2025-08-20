import { roleMutations } from '@api/hooks';
import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import BaseImage from '@ssoc/assets/images/basicImage.png';
import { Button, ClubCard, Text, useToast } from '@ssoc/ui';

import { useAuthStore } from '../../stores/authStore';
import {
    s_buttonContainer,
    s_clubInfoCard,
    s_confirmText,
    s_inviteConfirmPageCard,
    s_inviteConfirmPageContainer,
} from './InviteConfirmPage.style';

const clubName = 'EN#';
const clubCategory = '학술동아리';

const InviteConfirmPage = () => {
    // prop destruction
    // lib hooks
    const navigate = useNavigate();
    const { toast } = useToast();
    const location = useLocation();
    const { clubId, inviteCode } = useParams();
    const accessToken = useAuthStore((s) => s.accessToken);
    // initial values
    // state, ref, querystring hooks
    // form hooks
    // query hooks
    const { mutate: acceptInvite, isPending } = roleMutations.usePostInviteCode({
        clubId: clubId || '',
        inviteCode: inviteCode || '',
        onSuccess: () => {
            toast.success('초대에 참여되었습니다.');
            navigate(`/settings/${clubId}`);
        },
        onError: () => {
            toast.error('초대 처리 중 오류가 발생했습니다.');
        },
    });

    // calculated values
    // handlers
    const handleConfirm = () => {
        if (!clubId || !inviteCode) {
            toast.error('잘못된 초대 링크입니다.');
            return;
        }
        if (!accessToken) {
            navigate('/login', { state: { from: location.pathname } });
            return;
        }
        acceptInvite();
    };

    const handleCancel = () => {
        navigate('/');
    };

    // effects

    return (
        <div css={s_inviteConfirmPageContainer}>
            <div css={s_inviteConfirmPageCard}>
                <Text type="h4Semibold" textAlign="center" sx={{ marginBottom: '1rem' }}>
                    초대 수락
                </Text>
                <div css={s_clubInfoCard}>
                    <ClubCard
                        imageURL={BaseImage}
                        imageName={clubName}
                        title={clubName}
                        type={clubCategory}
                        status="progress"
                        tag={['#학술', '#코딩', '#프로그래밍']}
                    />
                </div>
                <div css={s_confirmText}>
                    <Text type="bodyRegular" color="primary">
                        {clubName}
                    </Text>
                    <Text type="bodyRegular"> 동아리에 참여하시겠습니까?</Text>
                </div>

                <div css={s_buttonContainer}>
                    <Button
                        variant="primary"
                        size="lg"
                        onClick={handleConfirm}
                        disabled={isPending}
                    >
                        {isPending ? '처리 중...' : '들어가기'}
                    </Button>
                    <Button
                        variant="outlined"
                        size="lg"
                        onClick={handleCancel}
                        disabled={isPending}
                    >
                        취소
                    </Button>
                </div>
            </div>
        </div>
    );
};

export { InviteConfirmPage };
