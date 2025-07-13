import Search from '@assets/images/search.svg';
import { ApplicantMiniCard, Button, Divider, Input, Text } from '@components';
import { ApplicantSummary } from '@components/ApplicantMiniCard/types';
import React, { useCallback, useState } from 'react';
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
import { filterQuery } from './utils/searchValue';

function ApplicantList({
    title = '지원자 목록',
    height,
    applicantList,
    selectedApplicantId,
    onSelectApplicantId,
}: ApplicationListProps) {
    // prop destruction
    // lib hooks
    // initial values
    // state, ref, querystring hooks
    const [query, setQuery] = useState('');

    // form hooks
    // query hooks
    // calculated values
    const filterApplicants = useCallback(
        (applicants: ApplicantSummary[]) => filterQuery(applicants, query),
        [query],
    );
    const filteredApplicants: ApplicantSummary[] = filterApplicants(applicantList);
    // handlers
    // effects
    return (
        <div css={s_listContainer(height)}>
            <div css={s_titleContainer}>
                <Text as="span" type="captionSemibold" textAlign="start">
                    {title}
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
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </span>
            </div>
            <Divider />
            <div css={s_miniCardGroupWrapper}>
                <div css={s_miniCardContainer(filteredApplicants.length !== 0)}>
                    {filteredApplicants.length > 0 ? (
                        filteredApplicants.map((applicant) => (
                            <ApplicantMiniCard
                                key={applicant.id}
                                applicant={applicant}
                                onClick={() => onSelectApplicantId(applicant.id)}
                                isActivated={selectedApplicantId === applicant.id}
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
