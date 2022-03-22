
import { useState, useEffect } from 'react'

const useMobile = () => {
    const [isMobile, setState] = useState(false);


    const resizeHandler = () => {
        console.log(isMobile)
        if(window.innerWidth < 576){
            setState(true);
        }

    }

    useEffect(() => {
        resizeHandler()
        window.addEventListener('resize', resizeHandler);

        return () => window.removeEventListener('resize', resizeHandler);

    }, []);

    return isMobile;
};

export default useMobile;