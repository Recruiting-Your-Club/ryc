import React, { useState } from 'react';

function useCheckbox() {
    const [isChecked, setIsChecked] = useState(true);

    const handleCheckBox = () => {
        setIsChecked(!isChecked);
    };

    return {
        isChecked,
        handleCheckBox,
    };
}
export { useCheckbox };
