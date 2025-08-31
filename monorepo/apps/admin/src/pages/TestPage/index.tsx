import React from 'react';

function TestPage() {
    return (
        <div>
            <button
                onClick={() => {
                    throw new Error('Sentry test from button!');
                }}
            >
                Sentry Test
            </button>
        </div>
    );
}
export { TestPage };
