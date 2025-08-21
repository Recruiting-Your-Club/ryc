import React from 'react';
import { Link } from 'react-router-dom';

import mainLogo from '@ssoc/assets/images/mainLogo.png';
import Search from '@ssoc/assets/images/search.svg';
import theme from '@ssoc/styles';
import { Button, Input, Text } from '@ssoc/ui';

import { headerBarContainer, homeNavContainer, navContainer, s_homeLogo } from './Header.style';

function Header() {
    return (
        <header css={headerBarContainer}>
            <div css={homeNavContainer}>
                <Link to="/" css={s_homeLogo}>
                    <img src={mainLogo} alt="mainLogo" width="100%" height="55rem" />
                </Link>
                {/* <nav css={navContainer}>
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
                </nav> */}
            </div>
        </header>
    );
}
export { Header };
