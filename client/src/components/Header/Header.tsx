import React from 'react';
import { css } from '@emotion/react';
import { homeImage, headerBarContainer, homeNavContainer, navContainer } from './Header.style';
import { Link } from 'react-router-dom';
import { Button } from '@components/_common/Button';
import Search from '@assets/images/Search.svg';
import { Text, Input } from '@components';
import theme from '@styles/theme';

function Header() {
    return (
        <header css={headerBarContainer}>
            <Link to="/" css={homeNavContainer}>
                <Text as="h1" type="h4Light">
                    <Text.HighLight sx={{ color: 'black', fontWeight: 'bold' }}>Y</Text.HighLight>
                    ecruiting
                </Text>
                <Text as="h1" type="h4Light">
                    <Text.HighLight sx={{ color: 'black', fontWeight: 'bold' }}>Y</Text.HighLight>
                    our
                    <Text.HighLight sx={{ color: 'black', fontWeight: 'bold' }}>C</Text.HighLight>
                    lub
                </Text>
            </Link>

            <nav css={navContainer}>
                <Input
                    variant="transparent"
                    startNode={
                        <Button variant="text" size="s">
                            <Search width="1.5rem" height="1.5rem" />
                        </Button>
                    }
                    inputSx={{
                        borderRadius: '10px',
                        backgroundColor: theme.colors.gray[200],
                        width: '25rem',
                        boxShadow:
                            'inset -1px -1px 1px rgba(255, 255, 255, 1), inset 1px 1px 1px rgba(0, 0, 0, 0.1)',
                    }}
                    placeholder="동아리명 검색 또는 키워드 입력"
                />
                <Link to="/login">
                    <Button size="xl" variant="primary" radius="10px">
                        관리자 로그인
                    </Button>
                </Link>
            </nav>
        </header>
    );
}
export { Header };
