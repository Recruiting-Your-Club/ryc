import { useEffect } from 'react';
function useClickOutside(refs, callback) {
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (refs.every((ref) => ref.current && !ref.current.contains(e.target))) {
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
//# sourceMappingURL=useClickOutside.js.map