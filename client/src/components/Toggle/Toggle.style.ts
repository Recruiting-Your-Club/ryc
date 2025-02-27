import { css } from '@emotion/react';
import { colors } from '@styles/color';

export const hiddenCheckbox = css`
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
`;

const toggleBase = css`
    position: relative;
    display: inline-flex;
    align-items: center;
    cursor: pointer;
    user-select: none;
    justify-content: space-between;
`;

export const toggleContainer = (width: string, isChecked: boolean) => ({
    primary: css`
        ${toggleBase}
        padding: 0.2rem 0.1rem;
        ${isChecked
            ? `background-color: ${colors.disabled};`
            : `background-color: ${colors.default};`}
        border-radius: 1.1rem;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        width: ${width};
    `,
    text: css`
        ${toggleBase}
        padding: 0.25rem;
        background-color: white;
        border-radius: 0.375rem;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        width: ${width};
    `,
    secondText: css`
        ${toggleBase}
        padding: 0.25rem;
        background-color: ${colors.default};
        border-radius: 1.2rem;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        width: ${width};
    `,
});

const noneTextBase = css`
    display: flex;
    align-items: center;
    border-radius: 5rem;
    padding: 1rem 1rem;
`;

const textBase = css`
    display: flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.5rem 1.125rem;
    font-size: 1rem;
    font-weight: 500;
    white-space: nowrap;
`;

export const leftTextContainer = (isChecked: boolean) => ({
    primary: css`
        ${noneTextBase}
        ${isChecked ? `background-color: ${colors.white};` : `color: #64748b;`}
    `,
    text: css`
        border-radius: 0.25rem;
        ${textBase}
        ${isChecked
            ? ` color: ${colors.default};   background-color: #f4f7ff; `
            : ` color: #64748b;`}
    `,
    secondText: css`
        border-radius: 1rem;
        ${textBase}
        ${isChecked
            ? `color: ${colors.default}; background-color: ${colors.white};`
            : `color: ${colors.white};`}
    `,
});

export const rightTextContainer = (isChecked: boolean) => ({
    primary: css`
        ${noneTextBase}
        ${!isChecked ? `background-color: ${colors.white};` : `color: #64748b;`}
    `,

    text: css`
        border-radius: 0.25rem;
        ${textBase}
        ${!isChecked ? `color: ${colors.default};background-color: #f4f7ff;` : `color: #64748b;`}
    `,
    secondText: css`
        border-radius: 1rem;
        ${textBase}
        ${!isChecked
            ? `color: ${colors.default};background-color: ${colors.white};`
            : `color: ${colors.white};`}
    `,
});
