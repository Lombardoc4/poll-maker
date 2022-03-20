import { useState } from "react";

const Toggler = ({onClick, disabled, init}) => {
    const [toggle, setToggle] = useState(init || false);
    const onToggle = () => {
        if (disabled) {
            return false;
        }
        setToggle(!toggle)
        onClick();
    }

    let bgColor = toggle ? 'bg-success' : 'bg-secondary';
    bgColor = disabled ? 'bg-light' : bgColor;
    const sliderMargin = toggle ? '2px 3px 2px auto' : '2px 3px';

    return (
        <div
        onClick={() => onToggle()}
        className={"overflow-hidden d-flex align-items-center rounded-pill bg-gradient " + bgColor}
        style={{height: '26px', width: '40px', boxShadow: 'inset 0 1px 3px #212529'}}>
            <div className="rounded-circle shadow-md bg-light bg-gradient"
            style={{margin: sliderMargin, height: '20px', width: '20px', boxShadow: '0 1px 3px #212529'}}/>
        </div>
    )
}

export default Toggler;