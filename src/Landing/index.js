import React, { useEffect, useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import AddSurvey from '../AddSurvey';

import './index.css';
import CustomNav from '../Nav/CustomNav';




function Landing() {
    const [addSurvey, toggleAdd] = useState(false);

    const fullHeightEl = useRef(null);
    useEffect(() => {
        window.onresize = () => {
            fullHeightEl.current.style.height = window.innerHeight+'px';
        }
    }, [])

    if (addSurvey) {
        return (
            <AddSurvey cancel={() => toggleAdd(!addSurvey)}>
                <CustomNav color="primary"/>
            </AddSurvey>
        )
    }

    return (
        <>
            <div
            className='d-flex bg-primary bg-gradient'
            ref={fullHeightEl}
            style={{
                height: window.innerHeight,
                position: 'relative'
            }}>
                <div className='m-auto ms-3 ms-lg-5' >
                    <h1 className='display-1 text-bold text-white'>Poll Maker</h1>
                    <p className='fs-3 text-bold text-white'>Get the answers to all your&nbsp;questions</p>
                    <p className='text-white text-uppercase'></p>
                    <Button onClick={() => toggleAdd(!addSurvey)} size="lg" variant='light'><i className="bi bi-list-task me-2"></i> Create Now </Button>
                </div>
                <CustomNav/>
            </div>
        </>
    );
}

export default Landing;
