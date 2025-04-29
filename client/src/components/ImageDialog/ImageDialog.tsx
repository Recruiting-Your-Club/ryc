import React from 'react';
import { Dialog } from '@components';
import { imageContainer } from './ImageDialog.style';
import type { ImageDialogProps } from './types';

function ImageDialog(props: ImageDialogProps) {
    const { open, handleClose, imageUrl } = props;
    return (
        <Dialog open={open} handleClose={handleClose} size="md">
            <Dialog.Content sx={{ padding: 0, borderRadius: 0 }}>
                <div css={imageContainer}>
                    {imageUrl &&
                        imageUrl.map((url: string) => (
                            <img key={url} src={url} alt="clubImage" width="100%" height="100%" />
                        ))}
                </div>
            </Dialog.Content>
        </Dialog>
    );
}
export { ImageDialog };
