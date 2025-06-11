import { css } from '@emotion/react';
import theme from '@styles/theme';

export const ImageEditorButton = css`
    position: relative;
    width: 4rem;
    height: 4rem;
    border-radius: 10px;
    background-color: white;
    :hover {
        background-color: gray;
    }
    cursor: pointer;
`;

export const ImageEditorInput = css`
    display: hidden;
    position: absolute;
    opacity: 0;
    width: 100%;
    height: 100%;
`;

export const EdtiorTriggerButton = css`
    position: absolute;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background-color: white;
    bottom: -0.7rem;
    right: -0.7rem;
`;

export const ImageEditorDialogTriggerWrapper = css`
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
export const uploadImageButton = css`
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
export const deleteImageButton = css`
    width: 100%;
    justify-content: start;
    padding-left: 1rem;
    color: red;
`;
