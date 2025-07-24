export interface ImageEditDialogProps {
    open: boolean;
    handleClose: () => void;
    image?: string;
    setCroppedImage: (imageSrc: string) => void;
}
