import { roleMutations } from '@api/hooks';
import { myClubQueries } from '@api/queryFactory';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { useRouter } from '@ssoc/hooks';
import { Button, ClubCard, SpinSpinner, Text, useToast } from '@ssoc/ui';
import { getCategory } from '@ssoc/utils';

import { HttpError } from '../../api/common/httpError';
import { useAuthStore } from '../../stores/authStore';
import {
    s_buttonContainer,
    s_clubInfoCard,
    s_confirmText,
    s_inviteConfirmPageCard,
    s_inviteConfirmPageContainer,
} from './InviteConfirmPage.style';

const InviteConfirmPage = () => {
    // prop destruction
    // lib hooks
    const navigate = useNavigate();
    const { toast } = useToast();
    const location = useLocation();
    const { goBack } = useRouter();
    const { inviteCode } = useParams();
    const accessToken = useAuthStore((state) => state.accessToken);
    // initial values
    // state, ref, querystring hooks
    // form hooks
    // query hooks

    const { data: clubInfo, isLoading: isClubInfoLoading } = useQuery({
        ...myClubQueries.getClubInfoByInviteCode(inviteCode || ''),
        enabled: !!inviteCode,
        retry: false,
        throwOnError: true,
    });

    const { mutate: acceptInvite, isPending } = roleMutations.usePostInviteCode({
        clubId: clubInfo?.id || '',
        inviteCode: inviteCode || '',
        onSuccess: () => {
            toast.success('초대에 참여되었습니다.');
            navigate(`/settings/${clubInfo?.id}`);
        },
        onError: (error) => {
            if (error instanceof HttpError && error.statusCode === 500) {
                return;
            } else if (error instanceof HttpError && error.statusCode === 409) {
                toast.error('이미 초대에 참여한 동아리입니다.');
                return;
            }
            toast.error('초대 처리 중 오류가 발생했습니다.');
        },
    });

    // calculated values
    const tags = clubInfo?.clubTags?.map((tag) => `#${tag.name}`) || [];
    // handlers
    const handleConfirm = async () => {
        if (!inviteCode || !clubInfo?.id) {
            toast.error('잘못된 초대 링크입니다.');
            return;
        }

        const currentToken = accessToken;

        if (!currentToken) {
            navigate('/login', { state: { from: location.pathname } });
            return;
        }

        acceptInvite();
    };

    const handleCancel = () => {
        goBack();
    };

    // effects

    return (
        <div css={s_inviteConfirmPageContainer}>
            <div css={s_inviteConfirmPageCard}>
                <Text type="h4Semibold" textAlign="center" sx={{ marginBottom: '1rem' }}>
                    초대 수락
                </Text>
                <div css={s_clubInfoCard}>
                    {isClubInfoLoading ? (
                        <SpinSpinner />
                    ) : (
                        <ClubCard
                            imageURL={clubInfo?.representativeImage?.url || ''}
                            imageName={clubInfo?.representativeImage?.originalFileName || ''}
                            title={clubInfo?.name || ''}
                            type={getCategory(clubInfo?.category || '')}
                            tag={tags}
                        />
                    )}
                </div>
                <div css={s_confirmText}>
                    <Text type="bodyRegular" color="primary">
                        {clubInfo?.name}
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
