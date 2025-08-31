// TermsOfUse.tsx
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

type ConsentKeys = 'manager';
type TermsConsentState = Record<ConsentKeys, boolean>;

interface TermsOfUseProps {
    onAgree: (state: TermsConsentState) => void;
    initialState?: Partial<TermsConsentState>;
    ctaLabel: string;
    title: string;
    description: string;
}

function TermsOfUseRecruit({
    onAgree,
    initialState,
    ctaLabel,
    title,
    description,
}: TermsOfUseProps) {
    const [state, setState] = useState<TermsConsentState>({
        manager: !!initialState?.manager,
    });

    const [expanded, setExpanded] = useState<Record<ConsentKeys, boolean>>({
        manager: true, // 기본 펼침
    });

    const firstMissingRef = useRef<HTMLDivElement | null>(null);

    const allRequiredChecked = useMemo(() => state.manager, [state]);
    const allChecked = allRequiredChecked;

    const toggleAll = () => {
        const next = !allChecked;
        setState({ manager: next });
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

    const firstMissingKey: ConsentKeys | null = !state.manager ? 'manager' : null;

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
                        <div>필수 1개</div>
                    </div>

                    {/* [필수] 공고 생성·수정 시 공고 관리자 동의 */}
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
                                <Text sx={s_labelText}>
                                    [필수] 공고 생성·수정 시 공고 관리자 동의
                                </Text>
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
                                SSOC는 관리자가 추가·변경한 문항이 지원자에게 고지되고 동의 절차를
                                거칠 수 있도록 시스템을 제공합니다. 단, 해당 문항의 적법성·필요성에
                                대한 법적 책임은 전적으로 공고 관리자에게 있습니다.
                            </Text>
                            <br />
                            <Text>
                                본인은 이번 공고 생성 또는 수정 과정에서 추가·변경하는 모든 문항이
                                개인정보 수집 행위에 해당함을 이해하며, 다음 사항에 동의합니다.
                            </Text>
                            <ul>
                                <li>
                                    <Text>
                                        모든 공고에서{' '}
                                        <strong>이름과 이메일은 지원자에게 기본 필수 항목</strong>
                                        으로 수집됩니다.
                                    </Text>
                                </li>
                                <li>
                                    <Text>
                                        본 공고에서 관리자가 추가·변경하는 문항(예: 휴대전화번호,
                                        사진, 학번, 경력, 포트폴리오, 자격증, 자기소개서, 서술형
                                        문항 등)은 모두 개인정보에 해당하며,{' '}
                                        <strong>지원자가 동의한 범위 내에서만 수집·이용</strong>{' '}
                                        가능합니다.
                                    </Text>
                                </li>
                                <li>
                                    <Text>
                                        공고 수정 시에도 동일한 원칙이 적용되며, 새로운 문항 추가는{' '}
                                        <strong>새로운 개인정보 수집 행위</strong>로 간주됩니다.
                                    </Text>
                                </li>
                                <li>
                                    <Text>
                                        SSOC 서비스는 지원자에게 동의 절차를 제공하나, 본 공고에
                                        포함된 개별 문항의 적법성에 대한 법적 책임은{' '}
                                        <strong>전적으로 공고 관리자에게 있습니다.</strong>
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
                            </ul>
                        </div>
                    </div>
                </section>

                {/* 하단 CTA */}
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
                            필수 항목 1개를 동의해야 계속할 수 있어요.
                        </Text>
                    )}
                </div>
            </div>
        </div>
    );
}

export { TermsOfUseRecruit };
