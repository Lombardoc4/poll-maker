import React, { useEffect, useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import AddSurvey from '../AddPoll';

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
            className='position-relative bg-primary bg-gradient'
            ref={fullHeightEl}
            style={{
                height: window.innerHeight,
            }}>
                <CustomNav/>
                <Container fluid='md' className='pt-5'>

                <div className='m-auto ms-3 ms-lg-0 mt-md-5 pt-md-5' >
                    <h1 className='display-1 text-bold text-white'>Poll Maker</h1>
                    <p className='fs-3 text-bold text-white'>Get the answers to all your&nbsp;questions</p>
                    <Button onClick={() => toggleAdd(!addSurvey)} size="lg" variant='light' className="mt-md-3">
                        Create Now
                        <i className="fs-5 ms-2 bi bi-arrow-right"></i>
                    </Button>
                </div>
                </Container>
            </div>
        </>
    );
}

export default Landing;
