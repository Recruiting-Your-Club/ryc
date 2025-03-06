import { css } from '@emotion/react';
import theme from '@styles/theme';
import type { positionType } from './BaseDialog';

export const overlay = css`
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
`;

export const dialogContainer = (width: string, height: string) => css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    min-width: 40rem;
    min-height: 30rem;
    max-width: 120rem;
    max-height: 90rem;
    width: ${width};
    height: ${height};
    border-radius: 1rem;
    background-color: white;
`;

export const headerContainer = (border: boolean) => css`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: ${border ? `1px solid ${theme.colors.gray[300]}` : 0};
    padding: 1rem 1.5rem;
`;

export const contentContainer = css`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 2rem;
`;

const positionMap: Record<positionType, string> = {
    center: 'center',
    end: 'flex-end',
    start: 'flex-start',
};

export const actionContainer = (border: boolean, position: positionType) => css`
    width: 100%;
    display: flex;
    justify-content: ${positionMap[position] || 'center'};
    align-items: center;
    padding: 1.5rem 2rem;
    gap: 0.5rem;
    border-top: ${border ? `1px solid ${theme.colors.gray[300]}` : 0};
`;
