import React, { useState } from 'react';

function useToggle() {
    const [isChecked, setIsChecked] = useState(true);

    const handleToggle = () => {
        setIsChecked(!isChecked);
    };

    return {
        isChecked,
        handleToggle,
    };
}
export { useToggle };
