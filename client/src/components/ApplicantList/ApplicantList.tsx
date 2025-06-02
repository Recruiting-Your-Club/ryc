import Search from '@assets/images/search.svg';
import { Button, Divider, Input } from '@components/_common';
import theme from '@styles/theme';
import type { ReactNode } from 'react';
import React from 'react';
import {
    boxContainer,
    dividerCss,
    inputCss,
    miniCardGroupSection,
    titleSection,
} from './ApplicantList.style';

interface ApplicationListProps {
    height?: string;
    children?: ReactNode;
}

function ApplicantList({ height, children }: ApplicationListProps) {
    return (
        <div css={boxContainer(height)}>
            <div css={titleSection}>
                <span>
                    <Input
                        variant="transparent"
                        startNode={
                            <Button variant="text" size="s">
                                <Search
                                    width="1.5rem"
                                    height="1.5rem"
                                    css={{ color: theme.colors.gray[400] }}
                                />
                            </Button>
                        }
                        height="3rem"
                        inputSx={inputCss}
                        placeholder="이름 검색"
                    />
                </span>
            </div>
            <Divider sx={dividerCss} />
            <div css={miniCardGroupSection}>{children}</div>
        </div>
    );
}

export { ApplicantList };
