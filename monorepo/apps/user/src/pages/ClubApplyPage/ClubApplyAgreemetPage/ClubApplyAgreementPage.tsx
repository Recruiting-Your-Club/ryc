import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useRouter } from '@ssoc/hooks';
import { Checkbox, Text, useToast } from '@ssoc/ui';
import { Button } from '@ssoc/ui';

import {
    s_agreementContainer,
    s_agreementPageContainer,
    s_agreementPageContentContainer,
    s_agreementTextArea,
    s_allAgreeContainer,
    s_buttonContainer,
    s_checkboxAndTextContainer,
} from './ClubApplyAgreementPage.style';

function ClubApplyAgreementPage() {
    // prop destruction
    // lib hooks
    const { announcementId } = useParams();
    const { goTo } = useRouter();
    // initial values
    // state, ref, querystring hooks
    const [isAllAgree, setIsAllAgree] = useState<boolean>(false);
    const [isAgree1, setIsAgree1] = useState<boolean>(false);
    const [isAgree2, setIsAgree2] = useState<boolean>(false);
    const [isAgree3, setIsAgree3] = useState<boolean>(false);
    // form hooks
    // query hooks
    // calculated values
    // handlers
    const handleAllAgree = () => {
        setIsAllAgree(!isAllAgree);
        setIsAgree1(!isAllAgree);
        setIsAgree2(!isAllAgree);
        setIsAgree3(!isAllAgree);
    };

    const handleAgree1 = () => {
        setIsAgree1(!isAgree1);
    };

    const handleAgree2 = () => {
        setIsAgree2(!isAgree2);
    };

    const handleAgree3 = () => {
        setIsAgree3(!isAgree3);
    };

    const handleSubmit = () => {
        if (!isAllAgree || !isAgree1 || !isAgree2 || !isAgree3) return;
        if (!announcementId) return;
        goTo(`/announcements/${announcementId}/application`);
    };
    // effects
    return (
        <div css={s_agreementPageContainer}>
            <Text type="h2Bold" textAlign="center">
                서비스 약관 동의
            </Text>
            <div css={s_agreementPageContentContainer}>
                <div css={s_allAgreeContainer}>
                    <div css={s_checkboxAndTextContainer}>
                        <Checkbox.Root isChecked={isAllAgree} onChange={handleAllAgree}>
                            <Checkbox.HiddenInput />
                            <Checkbox.Control></Checkbox.Control>
                        </Checkbox.Root>
                        <Text type="h4Bold" textAlign="left">
                            모두 동의합니다.
                        </Text>
                    </div>
                    <Text type="bodyRegular" textAlign="left">
                        이용약관, 개인정보 수집 및 이용 동의 내용을 확인하였으며, 이에 모두
                        동의합니다.
                    </Text>
                </div>
                <div css={s_agreementContainer}>
                    <Text type="h4Bold" textAlign="left">
                        1. [필수] 서비스 이용약관 동의
                    </Text>
                    <textarea readOnly css={s_agreementTextArea}>
                        SSOC 서비스 및 제품(이하 ‘서비스’)를 이용해 주셔서 감사합니다. 본인은 SSOC
                        서비스에서 제공하는 지원서 제출 및 지원자 관리 서비스를 이용함에 있어,
                        서비스 운영정책 및 관련 규정을 준수할 것을 동의합니다.
                    </textarea>
                    <div css={s_checkboxAndTextContainer}>
                        <Checkbox.Root isChecked={isAgree1} onChange={handleAgree1}>
                            <Checkbox.HiddenInput />
                            <Checkbox.Control></Checkbox.Control>
                        </Checkbox.Root>
                        <Text type="bodyRegular" textAlign="left">
                            이용약관 내용을 확인했으며 약관에 동의합니다.
                        </Text>
                    </div>
                </div>
                <div css={s_agreementContainer}>
                    <Text type="h4Bold" textAlign="left">
                        2. [필수] 개인정보 수집·이용 동의
                    </Text>
                    <textarea readOnly css={s_agreementTextArea}>
                        개인정보보호법에 따라 SSOC를 통해 지원서를 제출하시는 분께 수집하는
                        개인정보의 항목, 개인정보의 수집 및 이용목적, 개인정보의 보유 및 이용기간,
                        동의 거부권 및 동의 거부 시 불이익에 관한 사항을 안내 드리오니 자세히 읽은
                        후 동의하여 주시기 바랍니다. 1. 지원서 작성 시점에 SSOC가 이용자로부터
                        수집하는 개인정보는 아래와 같습니다. - 기본 필수: 이름, 이메일 - 관리자 설정
                        항목: 휴대전화번호, 사진, 학번, 경력, 포트폴리오, 자격증 등 (공고를 올린
                        단체에서 지원서 문항으로 지정한 경우 필수적으로 수집됨) - 추가 문항: 모집
                        단체가 직접 작성한 질문 및 이에 대한 답변 (예: 자기소개서, 서술형 문항 등)
                        2. 수집 및 이용 목적 - 지원자 신원 확인 및 지원서 접수 - 모집 단체(관리자)에
                        의한 지원자 평가 및 합격 여부 결정 - 합격자 안내 및 채용 절차 진행 3. 보유
                        및 이용 기간 - 해당 모집 단체의 채용(모집) 절차 종료 후 1년간 보관 후 지체
                        없이 파기 - 단, 지원자가 삭제를 요청하는 경우 즉시 파기
                    </textarea>
                    <div css={s_checkboxAndTextContainer}>
                        <Checkbox.Root isChecked={isAgree2} onChange={handleAgree2}>
                            <Checkbox.HiddenInput />
                            <Checkbox.Control></Checkbox.Control>
                        </Checkbox.Root>
                        <Text type="bodyRegular" textAlign="left">
                            이용약관 내용을 확인했으며 약관에 동의합니다.
                        </Text>
                    </div>
                </div>
                <div css={s_agreementContainer}>
                    <Text type="h4Bold" textAlign="left">
                        2. [필수] 개인정보 수집·이용 동의
                    </Text>
                    <textarea readOnly css={s_agreementTextArea}>
                        본인은 지원 과정에서 제출하는 사진, 성별, 학력·경력 등 민감한 정보가 포함될
                        수 있으며, 해당 정보가 채용 절차에 필요한 범위 내에서만 이용됨을 동의합니다.
                    </textarea>
                    <div css={s_checkboxAndTextContainer}>
                        <Checkbox.Root isChecked={isAgree3} onChange={handleAgree3}>
                            <Checkbox.HiddenInput />
                            <Checkbox.Control></Checkbox.Control>
                        </Checkbox.Root>
                        <Text type="bodyRegular" textAlign="left">
                            이용약관 내용을 확인했으며 약관에 동의합니다.
                        </Text>
                    </div>
                </div>
                <div css={s_buttonContainer}>
                    <Button
                        variant="primary"
                        size="full"
                        disabled={!isAllAgree || !isAgree1 || !isAgree2 || !isAgree3}
                        onClick={handleSubmit}
                    >
                        동의합니다.
                    </Button>
                </div>
            </div>
        </div>
    );
}
export { ClubApplyAgreementPage };
