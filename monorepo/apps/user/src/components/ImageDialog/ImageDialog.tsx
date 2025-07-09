import { Dialog, Image } from '@ssoc/ui';

import { imageContainer, responsiveSize } from './ImageDialog.style';
import type { ImageDialogProps } from './types';

function ImageDialog(props: ImageDialogProps) {
    const { open, handleClose, imageUrl } = props;
    return (
        <Dialog open={open} handleClose={handleClose} size="md" sx={responsiveSize}>
            <Dialog.Content sx={{ padding: 0, borderRadius: 0 }}>
                <div css={imageContainer}>
                    <Image src={imageUrl} alt="clubImage" />
                </div>
            </Dialog.Content>
        </Dialog>
    );
}
export { ImageDialog };
