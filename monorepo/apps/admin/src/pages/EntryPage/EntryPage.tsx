import demo from '@assets/images/demo.png';
import { useAuthStore } from '@stores/authStore';
import React, { useEffect, useState } from 'react';

import { useRouter } from '@ssoc/hooks';
import { Button, Text } from '@ssoc/ui';

import {
    s_container,
    s_demoImage,
    s_demoImageContainer,
    s_entryButton,
    s_entryButtonContainer,
    s_entryDescription,
    s_entryTitle,
    s_footer,
    s_main,
} from './EntryPage.style';

function EntryPage() {
    const { goTo, removeHistoryAndGo } = useRouter();
    const { accessToken, bootstrap } = useAuthStore();
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        if (!checking) return;
        let cancelled = false;

        (async () => {
            const token = accessToken ?? (await bootstrap());
            if (cancelled) return;

            if (token) removeHistoryAndGo('/myClub');
            setChecking(false);
        })();

        return () => {
            cancelled = true;
        };
    }, [checking, accessToken, bootstrap]);

    return (
        <div css={s_container}>
            {/* Main Content */}
            <main css={s_main}>
                <h1 css={s_entryTitle}>
                    동아리 지원부터 관리까지
                    <br />
                    쏙에서 쉽고 간편하게
                </h1>
                <Text type="captionSemibold" color="caption" sx={s_entryDescription}>
                    Sejong Students Of Club는 세종대학교의 동아리 지원 및 관리서비스예요. <br />
                    동아리 모집부터 지원자 관리, 면접 일정까지 쏙이 해결해드릴게요.
                </Text>
                <div css={s_entryButtonContainer}>
                    <button css={s_entryButton} onClick={() => goTo('/login')}>
                        무료로 시작하기
                    </button>
                </div>
                <div css={s_demoImageContainer}>
                    <img src={demo} alt="demo" css={s_demoImage} />
                </div>
            </main>

            {/* Footer */}
            <footer css={s_footer}>
                <p>© 2024 SSOC. All rights reserved.</p>
            </footer>
        </div>
    );
}

export { EntryPage };
