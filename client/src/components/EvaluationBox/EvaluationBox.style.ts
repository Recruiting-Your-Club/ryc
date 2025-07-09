import { css } from '@emotion/react';
import theme from '@styles/theme';

export const s_boxContainer = (height: string = '100%') => css`
    height: ${height};
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

export const s_savedEvaluationContainer = (hasUserEvaluation: boolean) => css`
    flex: 8;
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: ${theme.colors.white};
    border-radius: 10px;
    box-shadow: 0px 0px 30px 0px rgba(0, 27, 55, 0.1);
    padding: 0.5rem 1rem;
    ${!hasUserEvaluation &&
    css`
        flex: 10;
    `}
    min-height: 20rem;
    overflow: hidden;
`;

export const s_evaluationTitleContainer = css`
    width: 100%;
    flex: 0.8;
    display: flex;
    align-items: center;
    justify-content: space-between; // 피그마는 왼쪽 정렬
    overflow: hidden;
    padding: 1rem;
    max-height: 5rem;
`;

export const s_starScoreContainer = css`
    display: flex;
    gap: 1rem;
`;

export const s_averageText = css`
    padding-top: 0.3rem;
    margin-right: 0.4rem;
`;

export const s_averageNumber = css`
    padding-top: 0.3rem;
`;

const scoreWrapper = (empty?: boolean) => css`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 1rem 0.5rem;
    overflow-y: auto;
    ${!empty &&
    css`
        align-items: center;
        justify-content: center;
    `}
    &::after {
        content: '';
        height: 0.5rem;
        flex-shrink: 0;
    }
    min-height: 0;
`;

export const perStarScoreGroup = (empty?: boolean) => css`
    flex: 7.2;
    gap: 0.8rem;
    ${scoreWrapper(empty)}
    min-height: 5rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 1rem 0.5rem;
    overflow-y: auto;

    ${!empty &&
    css`
        align-items: center;
        justify-content: center;
    `}
    &::after {
        content: '';
        height: 0.5rem;
        flex-shrink: 0;
    }
`;

export const userSavedEvaluation = css`
    flex: 2;
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 8rem;
    overflow: hidden;
`;

export const s_myEvaluationText = css`
    margin: 0.5rem 0;
`;

export const userStarScore = (empty?: boolean) => css`
    height: 100%;
    ${scoreWrapper(empty)};
    min-height: 5rem;
`;

export const userEvaluation = css`
    flex: 2;
    width: 100%;
    background-color: ${theme.colors.white};
    border-radius: 10px;
    box-shadow: 0px 0px 30px 0px rgba(0, 27, 55, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1.2rem;
    min-height: 21rem;
    overflow: hidden;
`;

export const s_myEvaluationTitleContainer = css`
    display: flex;
    justify-content: space-between;
`;

export const textareaCss = css`
    margin: -1.2rem 0;
    background-color: ${theme.colors.gray[200]};
    border: none;
    ${theme.typography.captionRegular}
    padding: 1rem;
    &:focus {
        outline: 2px solid ${theme.colors.gray[300]};
    }
`;

export const svgButtonGroup = css`
    display: flex;
    margin: 0.5rem 0;
`;

export const svgButtonCss = css`
    width: 1.2rem;
    height: 1.2rem;
    cursor: pointer;
`;
