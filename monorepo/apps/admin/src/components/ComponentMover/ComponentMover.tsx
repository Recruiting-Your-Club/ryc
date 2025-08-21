import LeftArrow from '@assets/images/arrow_left.svg';
import RightArrow from '@assets/images/arrow_right.svg';
import React from 'react';

import { Button, Divider } from '@ssoc/ui';

import { s_arrowButton, s_arrowSvg, s_moverComponent } from './ComponentMover.style';
import type { ComponentMoverProps } from './types';

function ComponentMover({ onMoveLeft, onMoveRight }: ComponentMoverProps) {
    return (
        <div css={s_moverComponent}>
            <Button variant="transparent" sx={s_arrowButton} onClick={onMoveRight}>
                <RightArrow css={s_arrowSvg} />
            </Button>
            <Divider />
            <Button variant="transparent" sx={s_arrowButton} onClick={onMoveLeft}>
                <LeftArrow css={s_arrowSvg} />
            </Button>
        </div>
    );
}

export { ComponentMover };
