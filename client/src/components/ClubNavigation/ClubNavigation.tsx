import React, { useState } from 'react';
import { Divider, Button } from '@components';
import { NavigationButton, NavigationContainer } from './ClubNavigation.style';
import type { NavigationItem } from './types';
import type { ReactNode } from 'react';

function ClubNavigation({
    navigationItem,
    navItem,
}: {
    navigationItem: NavigationItem[];
    navItem?: ReactNode;
}) {
    // prop destruction
    // lib hooks
    // initial values
    // state, ref, querystring hooks
    const [active, setActive] = useState<string>(navigationItem[0].title);

    // form hooks
    // query hooks
    // calculated values
    const activeContent = navigationItem.find((content) => content.title === active);

    // handlers
    // effects

    return (
        <>
            <div css={NavigationContainer}>
                <div css={{ display: 'flex' }}>
                    {navigationItem &&
                        navigationItem.map((content) => (
                            <Button
                                key={content.title}
                                variant="text"
                                size="s"
                                sx={NavigationButton(active === content.title)}
                                onClick={() => setActive(content.title)}
                            >
                                {content.title}
                            </Button>
                        ))}
                </div>
                {navItem && navItem}
            </div>
            <Divider />
            {activeContent && activeContent.page}
        </>
    );
}
export { ClubNavigation };
