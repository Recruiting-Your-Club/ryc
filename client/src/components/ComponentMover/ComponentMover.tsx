import React from 'react';
import type { ComponentMoverProps } from './types';
import RightArrow from '@assets/images/arrow_right.svg';
import LeftArrow from '@assets/images/arrow_left.svg';
import { Button, Divider } from '@components/_common';
import { s_arrowButton, s_arrowSvg, s_moverComponent } from './ComponentMover.style';

function ComponentMover({ onMoveLeft, onMoveRight }: ComponentMoverProps) {
    return (
        <div css={s_moverComponent}>
            <Button variant="transparent" sx={s_arrowButton} onClick={() => onMoveRight}>
                <RightArrow css={s_arrowSvg} />
            </Button>
            <Divider />
            <Button variant="transparent" sx={s_arrowButton} onClick={() => onMoveLeft}>
                <LeftArrow css={s_arrowSvg} />
            </Button>
        </div>
    );
}

export { ComponentMover };
