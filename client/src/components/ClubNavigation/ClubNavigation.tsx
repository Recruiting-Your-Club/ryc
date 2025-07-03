import React, { useState, useEffect } from 'react';
import { Button } from '@components/_common';
import {
    divider,
    navigationButton,
    navigationContainer,
    navigationSlider,
} from './ClubNavigation.style';
import type { ClubNavigationProps } from './types';

function ClubNavigation(props: ClubNavigationProps) {
    // prop destruction
    const { navigationItem, controlledActive, onActiveChange } = props;
    // lib hooks
    // initial values
    // state, ref, querystring hooks
    const [uncontrolledActive, setUncontrolledActive] = useState<string>(navigationItem[0].title);
    const [sliderPosition, setSliderPosition] = useState<number>(0);
    const [sliderWidth, setSliderWidth] = useState<string>(navigationItem[0].width);

    // form hooks
    // query hooks
    // calculated values
    const active = controlledActive !== undefined ? controlledActive : uncontrolledActive;
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
        if (onActiveChange) {
            onActiveChange(title);
        } else {
            setUncontrolledActive(title);
            calculateSliderPosition(title);
        }
    };
    // effects
    useEffect(() => {
        calculateSliderPosition(active);
    }, [active]);
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
            <div css={divider}>
                <hr css={navigationSlider(sliderPosition, sliderWidth)} />
            </div>
            {activeContent && activeContent.page}
        </>
    );
}
export { ClubNavigation };
