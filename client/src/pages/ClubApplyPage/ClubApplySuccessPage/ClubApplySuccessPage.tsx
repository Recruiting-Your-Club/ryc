import React from 'react';
import {
    s_applicationSuccessPageContainer,
    s_applicationUserInfoBox,
    s_applicationUserInfoLabel,
    s_applicationUserInfoValue,
    s_goToHomeButtonWrapper,
    s_sucecessDescriptionContainer,
} from './ClubApplySuccessPage.style';
import { Button, Text } from '@components/_common';
import { useApplicationStore } from '@stores/applicationStore';
import { useClubStore } from '@stores/clubStore';
import { useRouter } from '@hooks/useRouter';

function ClubApplySuccessPage() {
    const { clubName, clubField } = useClubStore();
    const { userName, userEmail } = useApplicationStore();
    const { goTo } = useRouter();
    return (
        <div css={s_applicationSuccessPageContainer}>
            <div css={s_sucecessDescriptionContainer}>
                <Text type="h2Bold">지원서가 성공적으로 접수되었습니다!</Text>
                <Text type="h4Semibold" color="helper">
                    지원 결과는 서류 접수 기간이 끝나는 대로 등록된 이메일로 발송됩니다.
                </Text>
            </div>
            <div css={s_applicationUserInfoBox}>
                <div css={s_applicationUserInfoLabel}>
                    <Text type="bodyRegular" color="primary">
                        지원자명
                    </Text>
                    <Text type="bodyRegular" color="primary">
                        이메일
                    </Text>
                    <Text type="bodyRegular" color="primary">
                        동아리명
                    </Text>
                    <Text type="bodyRegular" color="primary">
                        지원 분야
                    </Text>
                </div>
                <div css={s_applicationUserInfoValue}>
                    <Text type="bodyRegular">{userName}</Text>
                    <Text type="bodyRegular">{userEmail}</Text>
                    <Text type="bodyRegular">{clubName}</Text>
                    <Text type="bodyRegular">{clubField}</Text>
                </div>
            </div>
            <div css={s_goToHomeButtonWrapper}>
                <Button size="full" color="primary" onClick={() => goTo('/')}>
                    홈으로 이동
                </Button>
            </div>
        </div>
    );
}

export { ClubApplySuccessPage };
