import { css } from '@emotion/react';
import theme from '@styles/theme';

export const clubContainerLayout = css`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const clubContainer = css`
    display: flex;
    gap: 5rem;
`;

export const clubCreateExampleText = css`
    padding-left: 0.5rem;
    margin-bottom: 1rem;
`;
export const clubPreviewBox = css`
    display: flex;
    flex-direction: column;
    height: 35rem;
    width: 45rem;
    padding: 2rem;
    box-shadow: 1px 2px 10px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
`;
export const clubCreatetitle = css`
    padding-bottom: 2rem;
`;
export const clubListContainer = css`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow-y: auto;
`;
export const clubContentContainer = (index: number) => css`
    display: flex;
    gap: 1rem;
    padding: 0.3rem;
    border-radius: 5px;
    ${index === 0 &&
    css`
        border: 2px solid ${theme.colors.default};
        border-radius: 10px;
    `}
`;
export const clubContentTextContainer = css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 33rem;
`;

export const clubCreateBox = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin-top: 5rem;
    height: 34rem;
    width: 40rem;
    padding: 0 2rem;
`;
export const clubCreateInputBox = css`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 2rem;
    padding: 2rem 0rem;
`;
export const createInputLabel = css`
    ${theme.typography.bodyRegular}
    margin-bottom: 0.5rem;
`;
export const createSubmitButton = css`
    width: 100%;
    margin-top: 3rem;
`;
