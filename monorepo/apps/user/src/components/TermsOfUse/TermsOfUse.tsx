import React, { useEffect, useMemo, useRef, useState } from 'react';

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
    s_h4Text,
    s_header,
    s_labelBlock,
    s_labelText,
    s_main,
    s_missingAnchor,
    s_page,
    s_row,
    s_titleText,
} from './TermsOfUse.style';

function TermsOfUse({ onAgree, initialState, ctaLabel, title, description }: TermsOfUseProps) {
    const [state, setState] = useState<TermsConsentState>({
        service: !!initialState?.service,
        privacy: !!initialState?.privacy,
        sensitive: !!initialState?.sensitive,
    });

    const [expanded, setExpanded] = useState<Record<ConsentKeys, boolean>>({
        service: false,
        privacy: true, //개인정보라서 일단 필수 펼침으로 설정
        sensitive: false,
    });

    const firstMissingRef = useRef<HTMLDivElement | null>(null);

    const allRequiredChecked = useMemo(
        () => state.service && state.privacy && state.sensitive,
        [state],
    );

    const allChecked = allRequiredChecked;

    const toggleAll = () => {
        const next = !allChecked;
        setState({ service: next, privacy: next, sensitive: next });
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
        : !state.privacy
          ? 'privacy'
          : !state.sensitive
            ? 'sensitive'
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
                    {/**전체 동의 */}
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
                        <div>필수 3개</div>
                    </div>

                    {/**서비스 이용약관 동의 */}
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
                                본인은 SSOC 서비스에서 제공하는 지원서 제출 서비스를 이용함에 있어,
                                서비스 운영정책 및 관련 규정을 준수할 것을 동의합니다.
                            </Text>
                        </div>
                    </div>

                    {/* [필수] 개인정보 수집·이용 동의 */}
                    <div css={s_row}>
                        <div>
                            {!state.privacy && firstMissingKey === 'privacy' && (
                                <div ref={firstMissingRef} css={s_missingAnchor} />
                            )}
                            <div css={s_labelBlock}>
                                <Checkbox.Root
                                    isChecked={state.privacy}
                                    onChange={() => toggleOne('privacy')}
                                    variant="solid"
                                    size="lg"
                                >
                                    <Checkbox.HiddenInput />
                                    <Checkbox.Control />
                                </Checkbox.Root>
                                <Text sx={s_labelText}>[필수] 개인정보 수집·이용 동의</Text>
                                <Tag text="필수" variant="primary" sx={s_badgeRequired} />
                            </div>
                        </div>
                        <Button
                            onClick={() => setExpanded((e) => ({ ...e, privacy: !e.privacy }))}
                            sx={s_detailToggle}
                            data-expanded={expanded.privacy ? 'true' : 'false'}
                        >
                            내용 보기 <ChevronDown />
                        </Button>
                    </div>
                    <div css={[s_details, expanded.privacy && s_detailsExpanded]}>
                        <div css={s_detailsInner}>
                            <Text>
                                개인정보보호법에 따라 SSOC를 통해 지원서를 제출하시는 분께 <br />
                                수집 항목, 이용 목적, 보유 기간, 거부권 및 불이익을 안내드립니다.
                                <br />
                                <strong>
                                    필수 항목에 대한 동의를 거부하실 경우 지원서 제출이 불가능
                                </strong>
                                합니다.
                            </Text>

                            <Text sx={s_h4Text}>1) 수집 항목</Text>
                            <ul>
                                <li>
                                    <Text>기본 필수: 이름, 이메일</Text>
                                </li>
                                <li>
                                    <Text>
                                        관리자 설정 항목: 휴대전화번호, 사진, 학번, 경력,
                                        포트폴리오, 자격증 등
                                    </Text>
                                    <br />
                                    <Text>
                                        (공고가 해당 문항을 필수로 지정한 경우, 지원자는 필수 입력)
                                    </Text>
                                </li>
                                <li>
                                    <Text>
                                        추가 문항: 공고 작성자가 직접 작성한 질문 및 이에 대한 답변
                                    </Text>
                                    <br />
                                    <Text>(예: 사전질문, 자기소개서, 주관식/단답형/객관식 등)</Text>
                                </li>
                            </ul>

                            <Text sx={s_h4Text}>2) 수집 및 이용 목적</Text>
                            <ul>
                                <li>
                                    <Text>지원자 본인 확인 및 지원서 접수 처리</Text>
                                </li>
                                <li>
                                    <Text>공고 단체의 지원서 검토 및 평가, 합격 여부 결정</Text>
                                </li>
                                <li>
                                    <Text>면접 일정 안내 및 결과 통보, 합격자 선발 및 안내</Text>
                                </li>
                                <li>
                                    <Text>단체 모집 절차의 원활한 진행</Text>
                                </li>
                            </ul>

                            <Text sx={s_h4Text}>3) 보유 및 이용 기간</Text>
                            <ul>
                                <li>
                                    <Text>
                                        해당 공고의 모집 절차 종료 후 1년간 보관 후 지체 없이 파기
                                    </Text>
                                </li>
                                <li>
                                    <Text>지원자가 삭제를 요청하는 경우 즉시 파기</Text>
                                </li>
                                <li>
                                    <Text>
                                        관계 법령에 따라 별도의 보존 기간이 정해진 경우 해당 기간
                                        동안 보관
                                    </Text>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* [필수] 민감정보 처리 동의 */}
                    <div css={s_row}>
                        <div>
                            {!state.sensitive && firstMissingKey === 'sensitive' && (
                                <div ref={firstMissingRef} css={s_missingAnchor} />
                            )}
                            <div css={s_labelBlock}>
                                <Checkbox.Root
                                    isChecked={state.sensitive}
                                    onChange={() => toggleOne('sensitive')}
                                    variant="solid"
                                    size="lg"
                                >
                                    <Checkbox.HiddenInput />
                                    <Checkbox.Control />
                                </Checkbox.Root>
                                <Text sx={s_labelText}>[필수] 민감정보 처리 동의 </Text>
                                <Tag text="필수" variant="primary" sx={s_badgeRequired}></Tag>
                            </div>
                        </div>
                        <Button
                            onClick={() => setExpanded((e) => ({ ...e, sensitive: !e.sensitive }))}
                            sx={s_detailToggle}
                            data-expanded={expanded.sensitive ? 'true' : 'false'}
                        >
                            내용 보기 <ChevronDown />
                        </Button>
                    </div>
                    <div css={[s_details, expanded.sensitive && s_detailsExpanded]}>
                        <div css={s_detailsInner}>
                            <ul>
                                <li>
                                    <Text>
                                        본인은 지원 과정에서 제출하는 사진, 성별, 학력·경력 등
                                        민감한 정보가 포함될 수 있으며, <br />
                                        모집 절차에 필요한 범위 내에서만 이용됨에 동의합니다.
                                    </Text>
                                </li>
                                <li>
                                    <Text>
                                        민감정보에는 건강, 장애 여부, 종교, 생체정보 등 관련
                                        법령에서 정한 모든 민감정보가 포함될 수 있습니다.
                                    </Text>
                                </li>
                                <li>
                                    <Text>
                                        본 민감정보의 수집 여부 및 범위는 공고 관리자 설정에 따라
                                        결정되며, 불필요하거나 법령상 제한된 민감정보 요구에 대한
                                        법적 책임은 해당 관리자에게 있습니다.
                                    </Text>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>
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
                            필수 항목 3개를 모두 동의해야 계속할 수 있어요.
                        </Text>
                    )}
                </div>
            </div>
        </div>
    );
}

export { TermsOfUse };
