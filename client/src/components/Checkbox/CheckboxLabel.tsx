import { Text } from '@components/Text';
import React from 'react';
import { labelCss } from './Checkbox.style';
import { useCheckboxContext } from './CheckboxContext';

interface LabelProps {
    children: React.ReactNode;
}
function CheckboxLabel({ children }: LabelProps) {
    const { id } = useCheckboxContext();

    return (
        <>
            <label htmlFor={id} css={labelCss}>
                <Text as="span" type="captionSemibold" color="black">
                    {children}
                </Text>
            </label>
        </>
    );
}
export { CheckboxLabel };
