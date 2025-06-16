import Search from '@assets/images/search.svg';
import { Button, Divider, Input, Text } from '@components/_common';
import type { ReactNode } from 'react';
import React from 'react';
import {
    s_listContainer,
    s_miniCardContainer,
    s_miniCardGroupWrapper,
    s_searchButton,
    s_searchInput,
    s_searchSvg,
    s_titleContainer,
} from './ApplicantList.style';

interface ApplicationListProps {
    title?: string;
    height?: string;
    children?: ReactNode;
    isList: boolean;
}

function ApplicantList({ title = '지원자 목록', height, children, isList }: ApplicationListProps) {
    // prop destruction
    // lib hooks
    // initial values
    // state, ref, querystring hooks
    // form hooks
    // query hooks
    // calculated values
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
                    />
                </span>
            </div>
            <Divider />
            <div css={s_miniCardGroupWrapper}>
                <div css={s_miniCardContainer(isList)}>{children}</div>
            </div>
        </div>
    );
}

export { ApplicantList };
