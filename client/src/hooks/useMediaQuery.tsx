import { useEffect, useState } from 'react';
import { BREAKPOINT } from '@styles/theme/breakPoint';

export function useMediaQuery(breakpoint: keyof typeof BREAKPOINT) {
    const [matches, setMatches] = useState(false);
    useEffect(() => {
        const query = `(max-width: ${BREAKPOINT[breakpoint]})`;
        const media = window.matchMedia(query);
        if (media.matches !== matches) setMatches(media.matches);
        const listener = () => setMatches(media.matches);
        media.addEventListener('change', listener);
        return () => media.removeEventListener('change', listener);
    }, [matches, breakpoint]);
    return matches;
}
