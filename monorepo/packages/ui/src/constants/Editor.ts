import Decimal from '@ssoc/assets/images/list_decimal.svg';
import Disc from '@ssoc/assets/images/list_disc.svg';
import Divider from '@ssoc/assets/images/option_divider.svg';
import Image from '@ssoc/assets/images/option_image.svg';
import Center from '@ssoc/assets/images/text-align-center.svg';
import Justify from '@ssoc/assets/images/text-align-justify.svg';
import Left from '@ssoc/assets/images/text-align-left.svg';
import Right from '@ssoc/assets/images/text-align-right.svg';
import BackgroundText from '@ssoc/assets/images/text-background-color.svg';
import Bold from '@ssoc/assets/images/text-bold.svg';
import ColorText from '@ssoc/assets/images/text-color.svg';
import Italic from '@ssoc/assets/images/text-italic.svg';
import Strikethrough from '@ssoc/assets/images/text-strikethrough.svg';
import Underline from '@ssoc/assets/images/text-underline.svg';

import type { Align, Option, Size } from '../components/Editor/types';

export const formatButtons = [
    { format: 'bold', Svg: Bold },
    { format: 'italic', Svg: Italic },
    { format: 'underline', Svg: Underline },
    { format: 'strikethrough', Svg: Strikethrough },
];

export const alignButtons = [
    { alignment: 'left', Svg: Left },
    { alignment: 'center', Svg: Center },
    { alignment: 'right', Svg: Right },
    { alignment: 'justify', Svg: Justify },
];

export const listButtons = [
    { list: 'disc', Svg: Disc },
    { list: 'decimal', Svg: Decimal },
];

export const optionButtons = [
    { option: 'image', Svg: Image },
    { option: 'divider', Svg: Divider },
];

export const textButtons = [
    { text: 'color', Svg: ColorText },
    { text: 'background', Svg: BackgroundText },
];

export const DEFAULT_FONT_SIZE: Size = '14px';
export const MAX_FONT_SIZE: Size = '36px';
export const DEFAULT_TEXT_ALIGN: Align = 'inherit';
export const DEFAULT_OPTIONS: Record<Option, boolean> = {
    image: false,
    divider: false,
};

export const PICKER_COLORS = [
    '#000000',
    '#E60000',
    '#FF9900',
    '#FFFF00',
    '#008A00',
    '#0066CC',
    '#9933FF',
    '#FFFFFF',
    '#FACCCC',
    '#FFEBCC',
    '#FFFFCC',
    '#CCE8CC',
    '#CCE0F5',
    '#EBD6FF',
    '#BBBBBB',
    '#F06666',
    '#FFC266',
    '#FFFF66',
    '#66B966',
    '#66A3E0',
    '#C285FF',
    '#888888',
    '#A10000',
    '#B26B00',
    '#B2B200',
    '#006100',
    '#0047B2',
    '#6B24B2',
    '#444444',
    '#5C0000',
    '#663D00',
    '#666600',
    '#003700',
    '#002966',
    '#3D1466',
];
