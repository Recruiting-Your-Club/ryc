import type { CSSObject } from '@emotion/react';
import React from 'react';

import theme from '@ssoc/styles';

import {
    loadingSpinnerContainer,
    pulseContainer,
    spinSpinnerContainer,
} from './LoadingSpinner.style';

export type Size = 'xs' | 's' | 'md' | 'lg' | 'xl';

export interface LoadingProps {
    size?: Size;
    color?: string;
    sx?: CSSObject;
}

export interface SpinnerProps extends LoadingProps {
    backgroundColor?: CSSObject['backgroundColor'];
}

function SpinSpinner(props: SpinnerProps) {
    const defaultProps: SpinnerProps = {
        size: 'xs',
        backgroundColor: '#f3f3f3',
        color: theme.colors.defaultHover,
    };
    const mergeProps = { ...defaultProps, ...props };
    return <div css={[spinSpinnerContainer(mergeProps), mergeProps.sx]} />;
}

function PulseSpinner(props: LoadingProps) {
    const defaultProps: LoadingProps = {
        size: 'xs',
        color: theme.colors.white,
    };
    const mergeProps = { ...defaultProps, ...props };
    return (
        <>
            <div css={loadingSpinnerContainer}>
                <div css={[pulseContainer(0, mergeProps), mergeProps.sx]} />
                <div css={[pulseContainer(0.2, mergeProps), mergeProps.sx]} />
                <div css={[pulseContainer(0.4, mergeProps), mergeProps.sx]} />
            </div>
        </>
    );
}

export { PulseSpinner, SpinSpinner };
