import React, { useState, useContext } from 'react';
import { DialogContext } from '@components';

function useDialog() {
    const dialogContext = useContext(DialogContext);

    if (!dialogContext) {
        throw new Error('DialogContext를 사용할 수 없는 컴포넌트입니다.');
    }
    const { open, openDialog, closeDialog } = dialogContext;

    return { open, openDialog, closeDialog };
}
export { useDialog };
