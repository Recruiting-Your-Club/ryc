import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useRouter } from '@ssoc/hooks';
import { Button, Text } from '@ssoc/ui';

import { useApplicationStore } from '../../../stores';
import { useClubStore } from '../../../stores';
import {
    s_applicationSuccessPageContainer,
    s_applicationUserInfoBox,
    s_applicationUserInfoLabel,
    s_applicationUserInfoValue,
    s_goToHomeButtonWrapper,
    s_successDescriptionContainer,
    s_successDescriptionTextSx,
    s_successSubDescriptionTextSx,
} from './ClubApplySuccessPage.style';

function ClubApplySuccessPage() {
    // prop destruction
    // lib hooks
    const { announcementId } = useParams<{ announcementId: string }>();
    const { clubName, clubField } = useClubStore();
    const { getAnswers, clear } = useApplicationStore();

    const { goTo } = useRouter();
    // initial values
    const applicationAnswers = getAnswers(announcementId || '');
    // state, ref, querystring hooks
    // form hooks
    // query hooks
    // calculated values
    const userName = applicationAnswers.find((answer) => answer.questionTitle === '이름')?.value;
    const userEmail = applicationAnswers.find((answer) => answer.questionTitle === '이메일')?.value;
    // handlers
    // effects
    useEffect(() => {
        return () => {
            clear(announcementId);
        };
    }, []);

    return (
        <div css={s_applicationSuccessPageContainer}>
            <div css={s_successDescriptionContainer}>
                <Text type="h2Bold" sx={s_successDescriptionTextSx}>
                    지원서가 성공적으로 접수되었습니다!
                </Text>
                <Text type="h4Semibold" color="helper" sx={s_successSubDescriptionTextSx}>
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
                    <Text type="bodyRegular">{userName || '-'}</Text>
                    <Text type="bodyRegular">{userEmail || '-'}</Text>
                    <Text type="bodyRegular">{clubName || '-'}</Text>
                    <Text type="bodyRegular">{clubField || '-'}</Text>
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
