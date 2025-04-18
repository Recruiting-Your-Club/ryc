import React from 'react';
export const handleNewRange = (textNode: Text, selection: Selection) => {
    const newRange = document.createRange();
    newRange.setStart(textNode, 1);
    newRange.collapse(true);

    selection.removeAllRanges();
    selection.addRange(newRange);
};
