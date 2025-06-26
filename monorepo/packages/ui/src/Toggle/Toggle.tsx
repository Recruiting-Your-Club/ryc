import React from 'react';

import { hiddenCheckbox, toggleCircle, toggleContainer } from './Toggle.style';
import type { ToggleProps } from './types';

function Toggle({ isChecked = false, size = 'md', sx, handleToggle, ...props }: ToggleProps) {
    return (
        <label css={[toggleContainer(isChecked, size), sx]}>
            <input
                type="checkbox"
                css={hiddenCheckbox}
                checked={isChecked}
                onChange={handleToggle}
                {...props}
            />
            <div css={toggleCircle(isChecked, size)} />
        </label>
    );
}

export { Toggle };
