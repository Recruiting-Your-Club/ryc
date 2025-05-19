import React from 'react';
import { Dialog } from '@components';
import { useDialog } from '@hooks/useDialog';
function TestPage() {
    const { openDialog, closeDialog } = useDialog();
    return (
        <>
            <div>
                <button onClick={openDialog}>다이얼로그 오픈</button>

                <Dialog>
                    <Dialog.Header closeIcon>하이</Dialog.Header>
                    <Dialog.Content>하이</Dialog.Content>
                    <Dialog.Action>
                        <button>확인</button>
                        <button>취소</button>
                    </Dialog.Action>
                </Dialog>
            </div>
        </>
    );
}
export { TestPage };
