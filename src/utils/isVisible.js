
import { useState, useEffect } from 'react'

const useOnScreen = (element) => {
    const [isVisible, setState] = useState(false);


    const scrollHandler = () => {
        console.log(isVisible)
        if(window.pageYOffset + window.innerHeight >= element.current.offsetTop){
            setState(true);
        }

    }

    useEffect(() => {
        window.addEventListener('scroll', scrollHandler);

        return () => window.removeEventListener('scroll', scrollHandler);

    }, []);

    return isVisible;
};

export default useOnScreen;