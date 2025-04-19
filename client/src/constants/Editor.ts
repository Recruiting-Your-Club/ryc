import Center from '@assets/images/text-align-center.svg';
import Justify from '@assets/images/text-align-justify.svg';
import Left from '@assets/images/text-align-left.svg';
import Right from '@assets/images/text-align-right.svg';
import Bold from '@assets/images/text-bold.svg';
import Italic from '@assets/images/text-italic.svg';
import Strikethrough from '@assets/images/text-strikethrough.svg';
import Underline from '@assets/images/text-underline.svg';

export const formatButtons = [
    { format: 'bold', Svg: Bold },
    { format: 'italic', Svg: Italic },
    { format: 'underline', Svg: Underline },
    { format: 'strikethrough', Svg: Strikethrough },
];

export const alignButtons = [
    { align: 'left', Svg: Left },
    { align: 'center', Svg: Center },
    { align: 'right', Svg: Right },
    { align: 'justify', Svg: Justify },
];
