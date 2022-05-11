import React, { useEffect, useState} from "react"
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "../AddPoll/DatePicker";
import InitForm from "../AddPoll/InitForm";
import Settings from "../AddPoll/Settings";
import Share from "../AddPoll/Share";
import Container from "react-bootstrap/Container";
import Preloader from "../components/Preloader";

import { DataStore } from '@aws-amplify/datastore';
import { Poll } from '../models';
import useMobile from "../utils/isMobile";

const EditPoll = ({children, home='/'}) => {
    const [loading, setLoading] = useState(true);
    const [savedPoll, setSaved] = useState(false);
    const [view, setView] = useState('init');
    const [pollData, setPollData] = useState({});


    const { pollId } = useParams();
    const navigator = useNavigate();
    const isMobile = useMobile();
    
    useEffect(() => {
        // Todo confirm it belongs to user with auth
        const getPoll = async () => {
            const models = await DataStore.query(Poll, p => p.edit_code("eq", pollId));
            return models;
        }

        getPoll().then(models => {
            const pollData =  models.length > 0 ? models[0] : {err: 'Poll Does Not Exist'}
            setPollData(pollData);
            setSaved(pollData);
        });

        setLoading(false);
    }, [])

    const bgStyles = loading ? 'bg-primary w-0' : 'bg-white w-100';
    const displayStyles = loading ? 'opacity-0' : 'opacity-100';


    const onBack = (newView) => {
        setView(newView);
    }

    const submitForm = (newView, data) => {
        setView(newView);

        // 
        if (data.options) {
            const newOptions = {};
            const currValues = Object.values(pollData.options)
            data.options.map((o, i) => newOptions[o] = currValues[i] || 0); 
            data.options = newOptions;  
        }
        

        if (newView === 'preview') {
            savePoll({...pollData, ...data});
        }
        setPollData({...pollData, ...data});
    }

    const savePoll = async (data) => {
        // console.log(data);

        // Todo set alert for user to confirm update
        
        const updated =await DataStore.save(
            Poll.copyOf(savedPoll, updated => {
                updated.title = data.title;
                updated.options = data.options;
                updated.active = data.active;
                updated.edit_code= data.edit_code;
                updated.hide_results= data.hide_results;
                updated.start_date= data.start_date;
                updated.end_date= data.end_date;
                updated.custom= data.custom;
            })
        )

        // console.log(updated);
        setSaved({...updated, shareId: updated.id.slice(0,8)});
        return;
    }

    // console.log('pollDate', pollData.title)

    return (
        <div className='position-relative bg-gradient bg-primary'>
            {children}
            <div className={'d-flex align-items-center pb-5 ' + bgStyles}
            style={{
                minHeight: isMobile ? window.innerHeight : 'auto',
                transition: 'background-color 0.6s, width 0.6s'
            }}>
            <Container fluid="md">
                {pollData.id &&
                    <div className={"px-3 pt-5 pb-2 pb-md-5 w-80 w-md-50 mr-auto mx-md-auto " + displayStyles} style={{transition: 'opacity 0.6s 0.6s'}}>
                        {view === 'init' && <InitForm cancel={() => navigator(home)} submitForm={submitForm} data={{title: pollData.title, options: pollData.options}}/>}
                        {view === 'settings' && <Settings onBack={onBack} submit={submitForm} data={{dates: pollData.dates, custom: pollData.custom}}/> }
                        {view === 'dates' && <DatePicker onBack={onBack} submit={submitForm} data={pollData.dates}/> }
                        {view === 'preview' && <Share onBack={onBack} data={savedPoll}/>}
                    </div>
                }
            </Container>
            </div>
            {!isMobile && <Preloader loading={loading}/>}
        </div>
    )
}

export default EditPoll;
