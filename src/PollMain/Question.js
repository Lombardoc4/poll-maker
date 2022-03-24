import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button"
import useMobile from "../utils/isMobile";
import useOnScreen from "../utils/isVisible";
import UserPoll from "./UserPoll";


const Question = ({data, scrollToEl, submit, children}) => {
    const [selected, setSelected] = useState('')
    const [optionsViewed, setViewed] = useState('init');

    const isMobile = useMobile();
    const isVisible = useOnScreen(scrollToEl);

    console.log('data', data);
    
    useEffect(() => {
        if (isVisible && optionsViewed === 'init' && isMobile) {
            hideHint();
        }
    }, [isVisible])

    const hideHint = () => {
        setViewed('animate');

        setTimeout(() => {
            setViewed('hide')
        }, 1000)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        submit(selected);
    }

    const opacity = optionsViewed === 'animate' ? 'opacity-0' : 'opacity-100';
    const height = optionsViewed === 'animate' ? '0' : '150px';
    return (<>
        <div className="d-flex align-items-center flex-wrap">
            <h1 className="display-3 py-5 w-100">{data.title}</h1>

            {(optionsViewed !== 'hide' && isMobile) &&
            <div
            onClick={() => {hideHint()}}
            className={"d-flex flex-column justify-content-center w-100 text-center overflow-hidden " + opacity}
            style={{height: height, transition: 'opacity 0.6s, height 0.6s' }}>
                <h2 className="fs-5 mb-0">Options</h2>
                <p className="bounce-2">
                    <i className="fs-5 fw-bold bi bi-chevron-down"></i>
                </p>
            </div>}

            {children}
            <form onSubmit={handleSubmit} className='w-100'>

                <Button
                type="submit"
                variant={selected ? 'success' : 'secondary'}
                disabled={!selected}
                className="fs-4 bg-gradient w-100 text-uppercase">
                Submit
                </Button>
            </form>
        </div>
        <UserPoll poll={data} selectState={[selected, setSelected]}/>
    </>)
}

export default Question;