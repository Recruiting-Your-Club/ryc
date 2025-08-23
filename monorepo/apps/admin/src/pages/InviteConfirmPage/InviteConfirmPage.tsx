import { roleMutations } from '@api/hooks';
import { myClubQueries } from '@api/queryFactory';
import { roleQueries } from '@api/queryFactory/roleQueries';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

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
    const { clubId, inviteCode } = useParams();
    const accessToken = useAuthStore((state) => state.accessToken);
    // initial values
    // state, ref, querystring hooks
    // form hooks
    // query hooks

    // const { data: clubInfo, isLoading: isClubInfoLoading } = useQuery({
    //     ...roleQueries.getClubInfoByInviteCode(inviteCode || ''),
    //     enabled: !!inviteCode,
    //     retry: false,
    // });

    const { data: clubInformation, isLoading: isClubInformationLoading } = useQuery({
        ...myClubQueries.detail(clubId || ''),
        enabled: !!clubId,
        retry: false,
    });

    const { mutate: acceptInvite, isPending } = roleMutations.usePostInviteCode({
        clubId: clubId || '',
        inviteCode: inviteCode || '',
        onSuccess: () => {
            toast.success('초대에 참여되었습니다.');
            navigate(`/settings/${clubId}`);
        },
        onError: (error) => {
            if (error instanceof HttpError && error.statusCode === 500) {
                return;
            }
            toast.error('초대 처리 중 오류가 발생했습니다.');
        },
    });

    // calculated values
    const tags = clubInformation?.clubTags?.map((tag) => `#${tag.name}`) || [];
    // handlers
    const handleConfirm = async () => {
        if (!clubId || !inviteCode) {
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
                    {isClubInformationLoading ? (
                        <SpinSpinner />
                    ) : (
                        <ClubCard
                            imageURL={clubInformation?.representativeImage?.url || ''}
                            imageName={clubInformation?.representativeImage?.originalFileName || ''}
                            title={clubInformation?.name || ''}
                            type={getCategory(clubInformation?.category || '')}
                            tag={tags}
                        />
                    )}
                </div>
                <div css={s_confirmText}>
                    <Text type="bodyRegular" color="primary">
                        {clubInformation?.name}
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
