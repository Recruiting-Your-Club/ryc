import { jsx as _jsx, Fragment as _Fragment } from "@emotion/react/jsx-runtime";
import BasicImage from '@ssoc/assets/images/basicImage.png';
import { s_shape, s_size } from './Avatar.style';
function Avatar({ shape = 'square', size = 'xl', radius, imageURL, imageName }) {
    const cssProp = [s_size(size)];
    if (shape)
        cssProp.push(s_shape(shape, radius));
    return (_jsx(_Fragment, { children: _jsx("img", { src: imageURL ? imageURL : BasicImage, alt: imageName ? imageName : 'BasicImage', css: cssProp }) }));
}
export { Avatar };
//# sourceMappingURL=Avatar.js.map