import {useCallback, useEffect, useState} from "react";

const useDocumentOnEnter = (initialCount = 0) => {
    const [entersCount, setEntersCount] = useState(initialCount);

    const handleUserKeyPress = useCallback((e) => {
        if (e.keyCode === 13) {
            setEntersCount(entersCount + 1);
        }
    }, [entersCount]);

    useEffect(() => {
        document.addEventListener("keyup", handleUserKeyPress);

        return () => {
            document.removeEventListener('keyup', handleUserKeyPress);
        };
    }, [entersCount]);

    return entersCount;
};

export default useDocumentOnEnter;