import backgroundImage from '@assets/images/background.webp';
import { css, keyframes } from '@emotion/react';

import theme from '@ssoc/styles';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const s_container = css`
    height: 100%;
    width: 100%;
    background-image: url(${backgroundImage});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow-y: auto;
    position: fixed;
    top: 0;
    left: 0;
`;

export const s_main = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 2rem;
    width: 100%;
    height: 100%;
`;
export const s_entryTitle = css`
    font-size: 66px;
    margin-top: 6rem;
    margin-bottom: 2rem;
    text-align: center;
    line-height: 1.4;
    font-weight: 700;
    animation: ${fadeInUp} 1.5s ease-out;
`;
export const s_entryDescription = css`
    animation: ${fadeInUp} 1.5s ease-out 0.3s both;
`;
export const s_entryButtonContainer = css`
    display: flex;
    gap: 1rem;
    ${theme.typography.h4Bold}
    animation: ${fadeInUp} 1.5s ease-out 0.3s both;
`;
export const s_entryButton = css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    font-size: 1.7rem;
    font-weight: 500;
    line-height: 18px;
    white-space: nowrap;
    text-align: center;
    width: 16rem;
    height: 5rem;
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    margin-top: 4rem;
    color: ${theme.colors.white};
    background-color: ${theme.colors.default};
    &:hover {
        background-color: ${theme.colors.defaultHover};
    }
    transition: background-color 0.3s ease;
    animation: ${fadeInUp} 1s ease-out 0.7s both;
`;

export const s_demoImageContainer = css`
    margin-top: 10rem;
    width: 82rem;
    height: 50rem;
    animation: ${fadeInUp} 1s ease-out 1s both; // 3초 후에 애니메이션 시작
    opacity: 0;
`;
export const s_demoImage = css`
    width: 100%;
    height: 100%;
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

export const s_footer = css`
    bottom: 2rem;
    text-align: center;
    color: ${theme.colors.gray[500]};
    font-size: 1.2rem;
`;
