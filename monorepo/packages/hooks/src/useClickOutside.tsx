import type { RefObject } from 'react';
import React, { useEffect } from 'react';

function useClickOutside(refs: RefObject<HTMLElement>[], callback: () => void) {
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            const clickedInside = refs.some((ref) => {
                const node = ref.current;
                return node && node.contains(e.target as Node);
            });

            if (!clickedInside) {
                callback();
            }
        };

        document.addEventListener('click', handler);
        return () => {
            document.removeEventListener('click', handler);
        };
    }, [refs, callback]);
}

export { useClickOutside };
