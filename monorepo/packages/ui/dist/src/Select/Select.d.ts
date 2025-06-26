import type { CSSObject } from '@emotion/react';
import type { ReactNode } from 'react';
import { SelectContent } from './SelectContent';
import { SelectGroup } from './SelectGroup';
import { SelectItem } from './SelectItem';
import { SelectLabel } from './SelectLabel';
import { SelectSeparator } from './SelectSeparator';
import { SelectTrigger } from './SelectTrigger';
import { SelectValue } from './SelectValue';
export type SelectSize = 'xs' | 's' | 'md' | 'lg' | 'xl' | 'full';
interface SelectProps {
    children: ReactNode;
    value?: string;
    size?: SelectSize;
    onValueChange?: (value: string) => void;
    sx?: CSSObject;
}
declare function SelectRoot({ children, value: controlledValue, onValueChange, size, sx, }: SelectProps): import("@emotion/react/jsx-runtime").JSX.Element;
declare const Select: typeof SelectRoot & {
    Trigger: typeof SelectTrigger;
    Value: typeof SelectValue;
    Content: typeof SelectContent;
    Group: typeof SelectGroup;
    Label: typeof SelectLabel;
    Item: typeof SelectItem;
    Separator: typeof SelectSeparator;
};
export { Select };
//# sourceMappingURL=Select.d.ts.map