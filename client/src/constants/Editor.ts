import Decimal from '@assets/images/list_decimal.svg';
import Disc from '@assets/images/list_disc.svg';
import Divider from '@assets/images/option_divider.svg';
import Image from '@assets/images/option_image.svg';
import Center from '@assets/images/text-align-center.svg';
import Justify from '@assets/images/text-align-justify.svg';
import Left from '@assets/images/text-align-left.svg';
import Right from '@assets/images/text-align-right.svg';
import BackgroundText from '@assets/images/text-background-color.svg';
import Bold from '@assets/images/text-bold.svg';
import ColorText from '@assets/images/text-color.svg';
import Italic from '@assets/images/text-italic.svg';
import Strikethrough from '@assets/images/text-strikethrough.svg';
import Underline from '@assets/images/text-underline.svg';
import type { Size } from '@components/_common/Editor/EditorToolbar';

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
    // { option: 'link', Svg: Link },
    { option: 'image', Svg: Image },
    // { option: 'code', Svg: Code },
    // { option: 'quote', Svg: Quote },
    { option: 'divider', Svg: Divider },
];

export const textButtons = [
    { text: 'color', Svg: ColorText },
    { text: 'background', Svg: BackgroundText },
];

export const DEFAULT_FONT_SIZE: Size = '14px';
export const MAX_FONT_SIZE: Size = '36px';

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
