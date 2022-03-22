import React, { useEffect, useState} from "react"
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "../AddPoll/DatePicker";
import InitForm from "../AddPoll/InitForm";
import Settings from "../AddPoll/Settings";
import Share from "../AddPoll/Share";

import { DataStore } from '@aws-amplify/datastore';
import { Poll } from '../models';
import DashboardNav from "../Nav/DashboardNav";

const EditPoll = () => {
    const [loading, setLoading] = useState(true);
    const [savedPoll, setSaved] = useState(false);
    const [view, setView] = useState('init');
    const [pollData, setPollData] = useState({});


    const { pollId } = useParams();
    const navigator = useNavigate();

    useEffect(() => {
        // Todo confirm it belongs to user with auth
        const getPoll = async () => {
            const models = await DataStore.query(Poll, p => p.id("beginsWith", pollId));
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


        if (newView === 'preview') {
            savePoll({...pollData, ...data});
        }
        setPollData({...pollData, ...data});
    }

    const savePoll = async (data) => {

        // Todo set alert for user to confirm update

        const options = [...data.options];
        // eslint-disable-next-line no-sequences
        data.options = JSON.stringify(JSON.stringify(options.reduce((o,curr)=> (o[curr]='', o),{})));

        const updated =await DataStore.save(
            Poll.copyOf(savedPoll, updated => {
                updated = data
            })
        )

        setSaved({...updated, shareId: updated.id.slice(0,8)});
        return;
    }

    console.log(pollData)

    return (
        <div className='d-flex position-relative bg-gradient bg-primary'>
            <div className={'d-flex align-items-center pb-5 ' + bgStyles}
            style={{
                minHeight: window.innerHeight,
                transition: 'background-color 0.6s, width 0.6s'
            }}>
                <div className={"px-3 pt-5 pb-2 w-80 " + displayStyles} style={{transition: 'opacity 0.6s 0.6s'}}>
                    {view === 'init' && <InitForm cancel={() => navigator('/dashboard')} submitForm={submitForm} data={{title: pollData.title, options: pollData.options}}/>}
                    {view === 'settings' && <Settings onBack={onBack} submit={submitForm} data={{dates: pollData.dates, custom: pollData.custom}}/> }
                    {view === 'dates' && <DatePicker onBack={onBack} submit={submitForm} data={pollData.dates}/> }
                    {view === 'preview' && <Share onBack={onBack} data={savedPoll}/>}
                </div>
            </div>

            <DashboardNav/>
        </div>
    )
}

export default EditPoll;
