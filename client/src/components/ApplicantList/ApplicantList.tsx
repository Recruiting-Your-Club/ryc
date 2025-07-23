import Search from '@assets/images/search.svg';
import { ApplicantMiniCard, Button, Divider, Input, Text } from '@components';
import { Applicant } from '@components/ApplicantMiniCard/types';
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
    const [searchText, setSearchText] = useState<string>('');

    // form hooks
    // query hooks
    // calculated values
    const searchApplicants = useCallback(
        (applicants: Applicant[]) => {
            return applicants.filter((value) =>
                value.name.toLowerCase().includes(searchText.toLowerCase()),
            );
        },
        [searchText],
    );
    const visibleApplicants: Applicant[] = searchApplicants(applicantList);

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
