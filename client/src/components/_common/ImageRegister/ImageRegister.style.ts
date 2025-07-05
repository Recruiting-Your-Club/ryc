import { css } from '@emotion/react';
import theme from '@styles/theme';

export const s_imageContainer = css`
    position: relative;
    width: 4rem;
    height: 4rem;
    border-radius: 10px;
    background-color: white;
    cursor: pointer;
`;

export const s_imageEdtiorTriggerIcon = css`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background-color: ${theme.colors.white};
    bottom: -0.9rem;
    right: -0.8rem;
`;

export const ImageEditorInput = css`
    display: hidden;
    position: absolute;
    opacity: 0;
    width: 100%;
    height: 100%;
`;

export const s_imageEditorDialogTriggerContainer = css`
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    width: 14rem;
    z-index: 100;
    background-color: white;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
    padding: 1rem;
    gap: 0.5rem;
    border-radius: 10px;
    cursor: pointer;
    bottom: 0;
`;
export const s_uploadImageWrapper = css`
    width: 100%;
    ${theme.typography.captionRegular}
    padding: 1rem;
    justify-content: start;
    color: black;
    border-radius: 5px;
    :hover {
        background-color: ${theme.colors.gray[100]};
    }
`;
export const s_deleteImageWrapper = css`
    width: 100%;
    justify-content: start;
    padding-left: 1rem;
    color: red;
`;
