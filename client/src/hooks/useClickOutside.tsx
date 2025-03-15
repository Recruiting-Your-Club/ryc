import type { RefObject} from 'react';
import React, { useEffect } from 'react';

function useClickOutside(refs: RefObject<HTMLElement>[], callback: () => void) {
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (refs.every((ref) => ref.current && !ref.current.contains(e.target as Node))) {
                callback();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
}

export { useClickOutside };
