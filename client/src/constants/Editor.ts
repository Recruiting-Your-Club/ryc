import Decimal from '@assets/images/list_decimal.svg';
import Disc from '@assets/images/list_disc.svg';
import Center from '@assets/images/text-align-center.svg';
import Justify from '@assets/images/text-align-justify.svg';
import Left from '@assets/images/text-align-left.svg';
import Right from '@assets/images/text-align-right.svg';
import Bold from '@assets/images/text-bold.svg';
import Italic from '@assets/images/text-italic.svg';
import Strikethrough from '@assets/images/text-strikethrough.svg';
import Underline from '@assets/images/text-underline.svg';
import Code from '@assets/images/option_code.svg';
import Image from '@assets/images/option_image.svg';
import Link from '@assets/images/option_link.svg';
import Quote from '@assets/images/option_quote.svg';
import Divider from '@assets/images/option_divider.svg';

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

export const listButtons = [
    { list: 'disc', Svg: Disc },
    { list: 'decimal', Svg: Decimal },
];

export const optionButtons = [
    { option: 'link', Svg: Link },
    { option: 'image', Svg: Image },
    { option: 'code', Svg: Code },
    { option: 'quote', Svg: Quote },
    { option: 'divider', Svg: Divider },
];
