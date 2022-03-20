import { useParams } from "react-router-dom";
import { DataStore } from '@aws-amplify/datastore';
import { Poll } from '../models';
import { useEffect, useRef, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import CustomNav from "../Nav/CustomNav";
import UserPoll from "./UserPoll";
import useOnScreen from "../utils/isVisible";
import { Button } from "react-bootstrap";
import { selectClasses } from "@mui/material";
import Question from "./Question";
import Preloader from "../components/Preloader";




const PollMain = () => {
    const [loading, toggleLoading] = useState(true);
    const [data, setData] = useState({});
    const [results, toggleResults] = useState(false)
    const [submitted, toggleSubmited] = useState(false)

    const { pollId } = useParams();
    const scrollBottomEl = useRef();


    useEffect(() => {
        const getPoll = async () => {
            const models = await DataStore.query(Poll, p => p.id("beginsWith", pollId));
            return models;
        }

        getPoll().then(models => {
            const pollData =  models.length > 0 ? models[0] : {err: 'Poll Does Not Exist'}
            setData(pollData)
        });

        toggleLoading(false);

    }, [])

    // useEffect(() => {
    //     if (!loading && isVisible && optionsViewed === 'init') {
    //         hideHint();
    //     }
    // }, [isVisible])

    // const hideHint = () => {
    //     setViewed('animate');

    //     setTimeout(() => {
    //         setViewed('hide')
    //     }, 1000)
    // }

    const handleSubmit = async (selected) => {

        const vote = await DataStore.save(
            Poll.copyOf(data, updated => {
                updated.options[selected] = data.options[selected] + 1;
            })
        );

        toggleSubmited(true)
        toggleResults(true)

        console.log('vote', vote)
    }


    return (<>
        <div className="position-relative w-80 pt-3" style={{minHeight: window.innerHeight}}>

            {results && <h1 className="display-3">Standing Results</h1>}
            { (data.id && !results) &&
            <Question data={data} scrollToEl={scrollBottomEl} submit={handleSubmit}>
                <Button
                type="submit"
                variant='secondary'
                disabled={!submitted}
                className={"mb-2 fs-4 bg-gradient w-100 text-uppercase " + (!submitted ? 'd-none': '')}>
                    Results
                </Button>
            </Question>}
            {}
            {/* {data.id &&
            <>
            <div className="ps-3 d-flex align-items-center flex-wrap">
                {!results && <>
                <h1 className="display-3 py-5 w-100">{data.title}</h1>
                {optionsViewed !== 'hide' && <div onClick={() => {hideHint()}} className={"d-flex flex-column justify-content-center w-100 text-center overflow-hidden " + (optionsViewed === 'animate' ? 'opacity-0' : 'opacity-100')}
                style={{transition: 'opacity 0.6s, height 0.6s', height: (optionsViewed === 'animate' ? '0' : '150px')}}>
                    <h2 className="fs-5 mb-0">Options</h2>
                    <p className="bounce-2">
                        <i className="fs-5 fw-bold bi bi-chevron-down"></i>
                    </p>
                </div>}
                <Button
                    type="submit"
                    variant='secondary'
                    disabled={!submitted}
                    className={"mb-2 fs-4 bg-gradient w-100 text-uppercase " + (!submitted ? 'd-none': '')}>
                    Results
                </Button>
                <form onSubmit={handleSubmit} className='w-100'>

                    <Button
                    type="submit"
                    variant={selected ? 'success' : 'secondary'}
                    disabled={!selected}
                    className="fs-4 bg-gradient w-100 text-uppercase">
                    Submit
                    </Button>
                </form>
                </>}
            </div>
            {!results && <>
                <UserPoll poll={data} selectState={[selected, setSelected]}/>
             </>}
            </>} */}
            {data.err && <h1>Poll Does not Exist</h1>}

            <CustomNav color="primary"/>

        </div>

        <Preloader loading={loading}/>

        <div style={{ float:"left", clear: "both", height: '1px' }} ref={scrollBottomEl}></div>
    </>)
}

export default PollMain;