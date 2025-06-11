import React from 'react';
import { Dialog, Text } from '@components';
function ImageEditDialog() {
    return (
        <Dialog>
            <Dialog.Header position="start">
                <Text type="h4Semibold" textAlign="start">
                    사진 업로드하기
                </Text>
            </Dialog.Header>
            <Dialog.Content></Dialog.Content>
            <Dialog.Action></Dialog.Action>
        </Dialog>
    );
}
export { ImageEditDialog };
