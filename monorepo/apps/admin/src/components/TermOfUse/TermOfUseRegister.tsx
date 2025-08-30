import React, { useMemo, useRef, useState } from 'react';

import ChevronDown from '@ssoc/assets/images/chevron-down.svg';
import { Button, Checkbox, Tag, Text } from '@ssoc/ui';

import {
    s_allAgreeLabel,
    s_allAgreeRow,
    s_badgeRequired,
    s_card,
    s_details,
    s_detailsExpanded,
    s_detailsInner,
    s_detailToggle,
    s_footerButton,
    s_footerText,
    s_header,
    s_labelBlock,
    s_labelText,
    s_main,
    s_missingAnchor,
    s_page,
    s_row,
    s_titleText,
} from './TermOfUse.style';
import type { ConsentKeys, TermsConsentState, TermsOfUseRegisterProps } from './types';

function TermOfUseRegister({
    onAgree,
    initialState,
    ctaLabel,
    title,
    description,
}: TermsOfUseRegisterProps) {
    const [state, setState] = useState<TermsConsentState>({
        service: !!initialState?.service,
        manager: !!initialState?.manager,
    });

    const [expanded, setExpanded] = useState<Record<ConsentKeys, boolean>>({
        service: false,
        manager: true, // 공고 관리자 동의 기본 펼침
    });

    const firstMissingRef = useRef<HTMLDivElement | null>(null);

    const allRequiredChecked = useMemo(() => state.service && state.manager, [state]);
    const allChecked = allRequiredChecked;

    const toggleAll = () => {
        const next = !allChecked;
        setState({ service: next, manager: next });
    };

    const toggleOne = (key: ConsentKeys) => {
        setState((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const handleSubmit = () => {
        if (!allRequiredChecked) {
            firstMissingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }
        onAgree(state);
    };

    const firstMissingKey: ConsentKeys | null = !state.service
        ? 'service'
        : !state.manager
          ? 'manager'
          : null;

    return (
        <div css={s_page}>
            <div css={s_header}>
                <Text type="h1Bold" sx={s_titleText}>
                    {title}
                </Text>
                <Text type="bodySemibold" color="caption">
                    {description}
                </Text>
            </div>

            <div css={s_main}>
                <section css={s_card}>
                    {/* 전체 동의 */}
                    <div css={s_allAgreeRow}>
                        <div css={s_labelBlock}>
                            <Checkbox.Root
                                isChecked={allChecked}
                                onChange={toggleAll}
                                variant="solid"
                                size="lg"
                            >
                                <Checkbox.HiddenInput />
                                <Checkbox.Control />
                            </Checkbox.Root>
                            <Text sx={s_allAgreeLabel}>
                                전체 동의 <small>한번에 모두 동의할 수 있어요</small>
                            </Text>
                        </div>
                        <div>필수 2개</div>
                    </div>

                    {/* [필수] 서비스 이용약관 동의 */}
                    <div css={s_row}>
                        <div>
                            {!state.service && firstMissingKey === 'service' && (
                                <div ref={firstMissingRef} css={s_missingAnchor} />
                            )}
                            <div css={s_labelBlock}>
                                <Checkbox.Root
                                    isChecked={state.service}
                                    onChange={() => toggleOne('service')}
                                    variant="solid"
                                    size="lg"
                                >
                                    <Checkbox.HiddenInput />
                                    <Checkbox.Control />
                                </Checkbox.Root>
                                <Text sx={s_labelText}>[필수] 서비스 이용약관 동의</Text>
                                <Tag text="필수" variant="primary" sx={s_badgeRequired} />
                            </div>
                        </div>
                        <Button
                            onClick={() => setExpanded((e) => ({ ...e, service: !e.service }))}
                            data-expanded={expanded.service ? 'true' : 'false'}
                            sx={s_detailToggle}
                        >
                            내용 보기 <ChevronDown />
                        </Button>
                    </div>
                    <div css={[s_details, expanded.service && s_detailsExpanded]}>
                        <div css={s_detailsInner}>
                            <Text>
                                SSOC 서비스 및 제품(이하 ‘서비스’)를 이용해 주셔서 감사합니다.
                            </Text>
                            <br />
                            <Text>
                                본인은 SSOC 서비스에서 제공하는 지원자 관리 및 평가 서비스(서비스 내
                                모든 기능)를 이용함에 있어, 서비스 운영정책 및 관련 규정을 준수할
                                것을 동의합니다.
                            </Text>
                            <br />
                            <Text>
                                본인은 SSOC 관리자 계정 생성을 위해 개인정보를 제공하며, 해당 정보는
                                계정 관리 및 서비스 이용 목적 외에는 사용되지 않습니다.
                            </Text>
                            <br />
                            <Text>
                                본인의 개인정보는 회원 탈퇴 시 지체 없이 파기되며, 관련 법령에 따라
                                일정 기간 보관이 필요한 경우 해당 기간 동안만 보관됩니다. SSOC는
                                기술적·관리적 보호조치를 제공하나, 관리자가 설정한 지원서 문항의
                                적법성·필요성은 보장하지 않으며, 이에 따른 법적 책임은 전적으로 공고
                                관리자에게 있습니다.
                            </Text>
                            <br />
                            <Text>본인은 서비스 이용약관 및 개인정보 처리방침에 동의합니다.</Text>
                        </div>
                    </div>

                    {/* [필수] 공고 관리자 동의 */}
                    <div css={s_row}>
                        <div>
                            {!state.manager && firstMissingKey === 'manager' && (
                                <div ref={firstMissingRef} css={s_missingAnchor} />
                            )}
                            <div css={s_labelBlock}>
                                <Checkbox.Root
                                    isChecked={state.manager}
                                    onChange={() => toggleOne('manager')}
                                    variant="solid"
                                    size="lg"
                                >
                                    <Checkbox.HiddenInput />
                                    <Checkbox.Control />
                                </Checkbox.Root>
                                <Text sx={s_labelText}>[필수] 공고 관리자 동의</Text>
                                <Tag text="필수" variant="primary" sx={s_badgeRequired} />
                            </div>
                        </div>
                        <Button
                            onClick={() => setExpanded((e) => ({ ...e, manager: !e.manager }))}
                            sx={s_detailToggle}
                            data-expanded={expanded.manager ? 'true' : 'false'}
                        >
                            내용 보기 <ChevronDown />
                        </Button>
                    </div>
                    <div css={[s_details, expanded.manager && s_detailsExpanded]}>
                        <div css={s_detailsInner}>
                            <Text>
                                본인은 SSOC 서비스의 공고 생성 및 운영 과정에서 다음 사항에
                                동의합니다.
                            </Text>
                            <ul>
                                <li>
                                    <Text>
                                        본 서비스에서는 “이름”과 “이메일” 항목이 모든 지원자에게
                                        기본 필수로 수집됩니다.
                                    </Text>
                                </li>
                                <li>
                                    <Text>
                                        이외 항목(휴대전화번호, 사진, 학번, 경력, 포트폴리오, 자격증
                                        등)은 공고 관리자가 필요에 따라 지원서 질문으로 추가할 수
                                        있습니다.
                                    </Text>
                                </li>
                                <li>
                                    <Text>
                                        관리자가 추가하는 질문(예: 자기소개서, 서술형 문항, 기타
                                        항목 등)은 모두 개인정보에 해당하며,
                                        <strong>
                                            {' '}
                                            지원자가 동의한 범위 내에서만 수집·이용
                                        </strong>{' '}
                                        가능합니다.
                                    </Text>
                                </li>
                                <li>
                                    <Text>
                                        SSOC 서비스는 지원자에게 동의 절차를 제공하나, 개별 공고
                                        관리자가 설정한 질문의 적법성에 대한 법적 책임은 전적으로
                                        해당 공고 관리자에게 있습니다.
                                    </Text>
                                </li>
                                <li>
                                    <Text>
                                        관리자는 「개인정보보호법」에서 정한 민감정보(사상·신념,
                                        노동조합·정당 가입, 정치적 견해, 건강, 성생활 등)를 요구할
                                        수 없으며, 이를 위반할 경우 해당 법적 책임은 공고 관리자에게
                                        있습니다.
                                    </Text>
                                </li>
                                <li>
                                    <Text>
                                        SSOC 서비스는 초대코드 방식을 통해 동아리 내부 관리자를
                                        추가할 수 있는 기능을 제공합니다. 초대코드를 보유한 모든
                                        사람은 해당 공고 및 지원자의 개인정보에 접근할 수 있으므로,
                                        <strong>
                                            {' '}
                                            초대코드의 발급·배포·관리 책임은 전적으로 공고
                                            관리자에게 있습니다.
                                        </strong>
                                        공고 관리자는 초대코드가 외부에 유출되지 않도록 주의해야
                                        하며, 초대코드의 부주의한 관리 또는 오남용으로 발생한
                                        개인정보 유출 및 피해에 대한 모든 법적 책임은 공고
                                        관리자에게 있습니다.
                                    </Text>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* 하단 CTA 영역 */}
                <div>
                    <Button
                        onClick={handleSubmit}
                        disabled={!allRequiredChecked}
                        size="full"
                        sx={s_footerButton}
                    >
                        {ctaLabel}
                    </Button>
                    {!allRequiredChecked && (
                        <Text sx={s_footerText} color="caption">
                            필수 항목 2개를 모두 동의해야 계속할 수 있어요.
                        </Text>
                    )}
                </div>
            </div>
        </div>
    );
}

export { TermOfUseRegister };
