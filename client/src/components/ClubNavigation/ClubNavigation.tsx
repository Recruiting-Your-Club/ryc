import React, { useState, useEffect } from 'react';
import { Divider, Button } from '@components';
import { navigationButton, navigationContainer, navigationSlider } from './ClubNavigation.style';
import type { ClubNavigationProps } from './types';

function ClubNavigation(props: ClubNavigationProps) {
    // prop destruction
    const { navigationItem } = props;
    // lib hooks
    // initial values
    // state, ref, querystring hooks
    const [active, setActive] = useState<string>(navigationItem[0].title);
    const [sliderPosition, setSliderPosition] = useState<number>(0);
    const [sliderWidth, setSliderWidth] = useState<string>(navigationItem[0].width);

    // form hooks
    // query hooks
    // calculated values
    const activeContent = navigationItem.find((content) => content.title === active);

    const calculateSliderPosition = (title: string) => {
        let position: number = 0;
        for (const content of navigationItem) {
            if (content.title === title) {
                setSliderPosition(position);
                setSliderWidth(content.width);
            } else {
                const width = parseInt(content.width);
                position += width + 1.5;
            }
        }
    };
    // handlers
    const handlePosition = (title: string) => {
        setActive(title);
        calculateSliderPosition(title);
    };
    // effects
    return (
        <>
            <div css={navigationContainer}>
                {navigationItem &&
                    navigationItem.map((content) => (
                        <Button
                            key={content.title}
                            variant="text"
                            size="s"
                            sx={navigationButton(active === content.title)}
                            onClick={() => handlePosition(content.title)}
                        >
                            {content.title}
                        </Button>
                    ))}
            </div>
            <hr css={navigationSlider(sliderPosition, sliderWidth)} />
            <Divider sx={{ display: 'relative' }} />
            {activeContent && activeContent.page}
        </>
    );
}
export { ClubNavigation };
