import { useState, useEffect } from 'react';

interface UsePopularTopicsReturn {
    showPopularTopics: boolean;
    setShowPopularTopics: (show: boolean) => void;
    handleInputFocus: () => void;
    handleInputBlur: () => void;
    handleInputChange: (value: string) => void;
}

export const usePopularTopics = (): UsePopularTopicsReturn => {
    const [showPopularTopics, setShowPopularTopics] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        const shouldShow = isFocused && inputValue.length > 0 && inputValue.length < 20;
        setShowPopularTopics(shouldShow);
    }, [isFocused, inputValue]);

    const handleInputFocus = () => {
        setIsFocused(true);
    };

    const handleInputBlur = () => {
        setTimeout(() => {
            setIsFocused(false);
        }, 200);
    };

    const handleInputChange = (value: string) => {
        setInputValue(value);
    };

    return {
        showPopularTopics,
        setShowPopularTopics,
        handleInputFocus,
        handleInputBlur,
        handleInputChange,
    };
};

export default usePopularTopics;
