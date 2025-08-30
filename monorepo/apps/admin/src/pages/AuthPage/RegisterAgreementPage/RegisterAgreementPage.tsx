import { TermOfUseRegister } from '@components';
import React from 'react';

import { useRouter } from '@ssoc/hooks';

function RegisterAgreementPage() {
    const { removeHistoryAndGo } = useRouter();

    return (
        <TermOfUseRegister
            title="관리자 회원가입 이용 약관 동의"
            description="회원가입을 위해 필수 약관에 동의해 주세요."
            ctaLabel="동의 후 계속하기"
            onAgree={() => {
                removeHistoryAndGo('/register');
            }}
        />
    );
}

export { RegisterAgreementPage };
