import { useEffect } from 'react';

const useScrollLock = (isLocked: boolean) => {
    useEffect(() => {
        if (isLocked) {
            document.body.style.overflow = 'hidden'; 
        } else {
            document.body.style.overflow = 'unset';
        }

        // Cleanup function to restore scrolling when the component is unmounted
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isLocked]);
};

export default useScrollLock;
