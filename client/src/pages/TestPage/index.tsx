import React from 'react';
import { css } from '@emotion/react';

function TestPage() {
    return (
        <>
            <div
                css={css`
                    font-size: 3.2rem;
                    font-weight: bold;
                `}
            >
                Hello
            </div>
            <div
                css={css`
                    font-size: 2.8rem;
                    font-weight: bold;
                `}
            >
                Hello
            </div>
            <div
                css={css`
                    font-size: 2.4rem;
                    font-weight: bold;
                `}
            >
                Hello
            </div>
            <div
                css={css`
                    font-size: 2rem;
                    font-weight: bold;
                `}
            >
                Hello
            </div>
            <div
                css={css`
                    font-size: 1.6rem;
                    font-weight: bold;
                `}
            >
                Hello
            </div>
            <div
                css={css`
                    font-size: 1.4rem;
                    font-weight: bold;
                `}
            >
                Hello
            </div>
            <div
                css={css`
                    font-size: 1.2rem;
                    font-weight: bold;
                `}
            >
                Hello
            </div>
        </>
    );
}
export { TestPage };
