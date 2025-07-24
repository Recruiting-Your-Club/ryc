import React from 'react';

import { Dialog } from '../Dialog';
import { imageContainer, responsiveSize } from './ImageDialog.style';
import type { ImageDialogProps } from './types';

function ImageDialog(props: ImageDialogProps) {
    const { open, handleClose, imageUrl } = props;
    return (
        <Dialog open={open} handleClose={handleClose} size="md" sx={responsiveSize}>
            <Dialog.Content sx={{ padding: 0, borderRadius: 0 }}>
                <div css={imageContainer}>
                    <img src={imageUrl} alt="clubImage" width="100%" height="100%" />
                </div>
            </Dialog.Content>
        </Dialog>
    );
}
export { ImageDialog };
