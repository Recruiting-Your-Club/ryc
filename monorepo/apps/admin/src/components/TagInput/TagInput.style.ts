import { css, keyframes } from '@emotion/react';

import theme from '@ssoc/styles';

const tagInput_fadeInZoom = keyframes`
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
`;

export const s_container = css`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem;
    border: 1px solid ${theme.colors.gray[200]};
    border-radius: 0.6rem;
    background: ${theme.colors.white};
    cursor: text;
    transition: all 200ms ease;

    &:focus-within {
        outline: none;
        box-shadow:
            0 0 0 2px hsl(var(--ring)),
            0 0 0 4px hsl(var(--background));
    }
`;

export const s_tag = css`
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.25rem 0.75rem;
    background: ${theme.colors.blue[100]};
    color: ${theme.colors.default};
    border-radius: 0.375rem;
    animation: ${tagInput_fadeInZoom} 200ms ease;
`;

export const s_hash = css`
    opacity: 0.8;
    color: ${theme.colors.default};
`;

export const s_tagText = css`
    color: ${theme.colors.default};
`;

export const s_removeButton = css`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 0.25rem;
    border-radius: 9999px;
    padding: 0.125rem;
    background-color: ${theme.colors.blue[100]};
`;

export const s_counter = css`
    margin-left: 0.5rem;
    color: ${theme.colors.gray[400]};
`;

export const s_input = css`
    flex: 1;
    min-width: 12rem;
    background: transparent;
    border: none;
    outline: none;

    &::placeholder {
        color: ${theme.colors.gray[500]};
    }
`;

export const s_xIcon = css`
    width: 0.8rem;
    height: 0.8rem;
`;
