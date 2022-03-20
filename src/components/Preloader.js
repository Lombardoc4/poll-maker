import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";

const Preloader = ({loading}) => {
    const [dNone, setDNone] = useState(false);
    useEffect(() => {
        const hideTimeout = setTimeout(() => {
            setDNone(true)
        }, 1000)

        return () => {
            clearTimeout(hideTimeout);
        }
    },[])

    return (
        <div className={"pointer-events-none position-absolute bg-primary w-100 top-0 bottom-0 overflow-hidden "
         + (!loading ? 'opacity-0 ' : '')
         + (dNone ? 'd-none ' : '')}
        style={{height: window.innerHeight, transition: 'opacity 0.6s 0.6s'}}>
            <div className="position-absolute top-50 start-50"
                style={{transform: ('translate(-50%,-50%) ' + (!loading ? 'scale(20)' : '')), transition: 'transform 0.6s 0.6s'}}>
                <Spinner animation="grow" variant="white"/>
            </div>
        </div>
    )
}

export default Preloader