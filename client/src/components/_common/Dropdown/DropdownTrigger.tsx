import type { ButtonHTMLAttributes, ReactNode, Ref } from 'react';
import React from 'react';
import { useDropdownContext } from './DropdownContext';

interface DropdownTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    asChild?: boolean;
    forwardedRef?: Ref<HTMLButtonElement>;
}

function DropdownTrigger({
    children,
    asChild = false,
    forwardedRef,
    ...props
}: DropdownTriggerProps) {
    const { open, setOpen, triggerRef } = useDropdownContext();

    const ref = forwardedRef || triggerRef;
}
