import React from 'react';
import {
    loadingSpinnerContainer,
    dotContainer,
    spinSpinnerContainer,
} from './LoadingSpinner.style';
import type { CSSObject } from '@emotion/react';
import theme from '@styles/theme';

export interface LoadingProps {
    size?: number;
    color?: string;
    sx?: CSSObject;
}

export interface SpinnerProps extends LoadingProps {
    backgroundColor?: string;
}

function SpinSpinner(props: SpinnerProps) {
    const defaultProps = {
        size: 30,
        backgroundColor: '#f3f3f3',
        color: theme.colors.defaultHover,
    };
    const mergeProps = { ...defaultProps, ...props };
    return (
        <>
            <div css={[spinSpinnerContainer(mergeProps), mergeProps.sx]} />
        </>
    );
}

function PulseSpinner(props: LoadingProps) {
    const defaultProps = {
        size: 8,
        color: theme.colors.white,
    };
    const mergeProps = { ...defaultProps, ...props };
    return (
        <>
            <div css={loadingSpinnerContainer}>
                <div css={[dotContainer(0, mergeProps), mergeProps.sx]} />
                <div css={[dotContainer(0.2, mergeProps), mergeProps.sx]} />
                <div css={[dotContainer(0.4, mergeProps), mergeProps.sx]} />
            </div>
        </>
    );
}

export { PulseSpinner, SpinSpinner };
