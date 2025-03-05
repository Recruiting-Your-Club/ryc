import { css } from '@emotion/react';
import { colors } from '@styles/color';

export const s_stepper = (orientation: string, alternativeLabel: boolean) => {
    return css`
        display: flex;
        flex-direction: ${orientation === 'vertical' ? 'column' : 'row'};
        align-items: ${alternativeLabel ? 'flex-start' : 'center'};
    `;
};

export const s_stepConnector = (alternativeLabel: boolean, orientation: string) => {
    return css`
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1 1 auto;
        position: relative;

        ${alternativeLabel &&
        css`
            position: absolute;
            top: 0.7rem;
            left: calc(-50% + 20px);
            right: calc(50% + 20px);
        `}
    `;
};

export const s_stepConnectorLine = (orientation: string, completed: boolean) => {
    return css`
        width: 100px;
        height: 2px;
        background-color: #ccc;
    `;
};

export const s_step = (orientation: string, alternativeLabel: boolean) => {
    return css`
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        display: flex;
        position: ${alternativeLabel ? 'relative' : ''};
        flex: ${alternativeLabel ? 1 : ''};
        flex-direction: ${orientation === 'vertical' ? 'column' : 'row'};
        align-items: ${alternativeLabel ? 'flex-start' : 'center'};
    `;
};

export const s_stepLabel = (alternativeLabel: boolean, disabled: boolean) => {
    return css`
        display: flex;
        align-items: center;
        flex-direction: ${alternativeLabel ? 'column' : 'row'};
        opacity: ${disabled ? 0.5 : 1};
    `;
};

//폰트 수정 필요
export const s_stepLabelText = (active: boolean, completed: boolean, error: boolean, disabled: boolean) => {
    return css`
        font-weight: ${active ? 600 : 400};
        color: ${disabled ? 'gray' : error ? 'red' : completed ? 'gray' : active ? colors.default : 'gray'};
        transition: color 0.2s;
    `;
};

export const s_stepLabelIconContainer = (alternativeLabel: boolean) => {
    return css`
        flex-shrink: 0;
        display: flex;
        padding-right: ${alternativeLabel ? '0' : '0.5rem'};
        padding-bottom: ${alternativeLabel ? '1rem' : '0'};
    `;
};

export const s_stepLabelOptional = () => {
    return css`
        font-size: 12px;
        color: gray;
    `;
};

export const s_stepIcon = (active: boolean, completed: boolean, error: boolean, disabled: boolean) => {
    return css`
        display: block;
        width: 1.5rem;
        height: 1.5rem;
        transition: color 0.2s;
        color: ${disabled ? colors.disabled : error ? 'red' : completed ? 'gray' : active ? colors.default : 'gray'};
    `;
};

export const s_stepIconText = css`
    fill: white;
    font-size: 1.8rem;
`;
