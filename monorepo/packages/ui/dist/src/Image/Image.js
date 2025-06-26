import { jsx as _jsx } from "@emotion/react/jsx-runtime";
import { imageContainer } from './Image.style';
function Image(imageProps) {
    const { src, alt, width = '100%', height = '100%', radius = '10px', sx } = imageProps;
    return (_jsx("img", { src: src, alt: alt, width: width, height: height, css: [imageContainer(radius), sx] }));
}
export { Image };
//# sourceMappingURL=Image.js.map