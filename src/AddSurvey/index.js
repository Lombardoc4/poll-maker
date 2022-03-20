import React, { useEffect, useState} from "react"
import DatePicker from "./DatePicker";
import InitForm from "./InitForm";
import Settings from "./Settings";
import Share from "./Share";

import { DataStore } from '@aws-amplify/datastore';
import { Poll } from '../models';

import getIp from '../utils/getIp';

const AddSurvey = ({cancel, children}) => {
    const [loading, setLoading] = useState(true);
    const [savedPoll, setSaved] = useState(false);
    const [view, setView] = useState('init');
    const [pollData, setPollData] = useState({});

    useEffect(() => {
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
        const options = [...data.options];
        // eslint-disable-next-line no-sequences
        data.options = JSON.stringify(JSON.stringify(options.reduce((o,curr)=> (o[curr]='', o),{})));

        if (savedPoll) {
            const updated =await DataStore.save(
                Poll.copyOf(savedPoll, updated => {
                    updated = data
                })
            )
            setSaved(updated);
            return;
        }

        const genCode = async (length = 2) => {
            const result           = [];
            const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
            const charactersLength = characters.length;
            for ( let i = 0; i < length; i++ ) {
                result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
            }
            const timeNow = new Date().getTime().toString().slice(-8);
            return result.join('') + timeNow;
        }

        data.editCode = await genCode();
        data.active = true;

        const saveData =  await DataStore.save(
            new Poll(data)
        );

        const shareId = saveData.id.slice(0,8);
        setSaved({...saveData, shareId: shareId})

    }


    return (
        <div className='d-flex position-relative bg-gradient bg-primary'>
            <div className={'d-flex align-items-center pb-5 ' + bgStyles}
            style={{
                minHeight: window.innerHeight,
                transition: 'background-color 0.6s, width 0.6s'
            }}>
                <div className={"px-3 pt-5 pb-2 w-80 " + displayStyles} style={{transition: 'opacity 0.6s 0.6s'}}>
                    {view === 'init' && <InitForm cancel={cancel} submitForm={submitForm} data={{title: pollData.title, options: pollData.options}}/>}
                    {view === 'settings' && <Settings onBack={onBack} submit={submitForm} data={{dates: pollData.dates, custom: pollData.custom}}/> }
                    {view === 'dates' && <DatePicker onBack={onBack} submit={submitForm} data={pollData.dates}/> }
                    {view === 'preview' && <Share onBack={onBack} data={savedPoll}/>}
                </div>
            </div>

            {children}
        </div>
    )
}

export default AddSurvey;