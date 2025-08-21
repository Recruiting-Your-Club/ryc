import type { StepApplicant } from '@api/domain/step/types';
import Search from '@assets/images/search.svg';
import { ApplicantMiniCard } from '@components';
import React, { useCallback, useState } from 'react';

import { Button, Divider, Input, Text } from '@ssoc/ui';

import {
    s_listContainer,
    s_miniCardContainer,
    s_miniCardGroupWrapper,
    s_searchButton,
    s_searchInput,
    s_searchSvg,
    s_titleContainer,
} from './ApplicantList.style';
import type { ApplicationListProps } from './types';

function ApplicantList({
    title = '지원자 목록',
    height,
    applicantList,
    selectedApplicantId,
    onSelectApplicantId,
    titleMode = 'titleString',
    children,
    sx,
}: ApplicationListProps) {
    // prop destruction
    // lib hooks
    // initial values
    // state, ref, querystring hooks
    const [searchText, setSearchText] = useState<string>('');

    // form hooks
    // query hooks
    // calculated values
    const searchApplicants = useCallback(
        (applicants: StepApplicant[]) => {
            return applicants.filter((value) =>
                value.name.toLowerCase().includes(searchText.toLowerCase()),
            );
        },
        [searchText],
    );
    const visibleApplicants: StepApplicant[] = searchApplicants(applicantList);

    // handlers
    // effects
    return (
        <div css={[s_listContainer(height), sx]}>
            <div css={s_titleContainer}>
                <Text as="span" type="captionSemibold" textAlign="start">
                    {titleMode === 'titleString' ? title : children}
                </Text>
                <span>
                    <Input
                        variant="transparent"
                        startNode={
                            <Button variant="text" size="s" sx={s_searchButton}>
                                <Search width="1.5rem" height="1.5rem" css={s_searchSvg} />
                            </Button>
                        }
                        height="3rem"
                        inputSx={s_searchInput}
                        placeholder="이름 검색"
                        onChange={(event) => setSearchText(event.target.value)}
                    />
                </span>
            </div>
            <Divider />
            <div css={s_miniCardGroupWrapper}>
                <div css={s_miniCardContainer(visibleApplicants.length !== 0)}>
                    {visibleApplicants.length > 0 ? (
                        visibleApplicants.map((applicant) => (
                            <ApplicantMiniCard
                                key={applicant.applicantId}
                                applicant={applicant}
                                onClick={() => onSelectApplicantId(applicant.applicantId)}
                                isActivated={selectedApplicantId === applicant.applicantId}
                            />
                        ))
                    ) : (
                        <Text as="span" type="captionSemibold">
                            지원자가 없습니다.
                        </Text>
                    )}
                </div>
            </div>
        </div>
    );
}

export { ApplicantList };
