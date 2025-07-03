import React from 'react';
import { headerBarContainer, homeNavContainer, navContainer } from './Header.style';
import { Link } from 'react-router-dom';
import Search from '@assets/images/search.svg';
import theme from '@styles/theme';
import { Button, Text, Input } from '@components';

function Header() {
    return (
        <header css={headerBarContainer}>
            <div css={homeNavContainer}>
                <Link to="/">
                    <Text as="h1" type="h4Light" color="caption">
                        <Text.HighLight sx={{ color: 'black', fontWeight: 'bold' }}>
                            R
                        </Text.HighLight>
                        ecruiting
                    </Text>
                    <Text as="h1" type="h4Light" color="caption" textAlign="start">
                        <Text.HighLight sx={{ color: 'black', fontWeight: 'bold' }}>
                            Y
                        </Text.HighLight>
                        our
                        <Text.HighLight sx={{ color: 'black', fontWeight: 'bold' }}>
                            C
                        </Text.HighLight>
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
                </nav>
            </div>
        </header>
    );
}
export { Header };
