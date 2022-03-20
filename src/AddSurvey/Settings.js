import { useState } from "react";
import Button from "react-bootstrap/Button";
import Toggler from "../components/Toggler"

const Settings = ({onBack, submit, data}) => {
    const [custom, toggleCustom] = useState(data.custom || false);
    const [results, toggleResults] = useState(data.results || false);
    const [dates, setDates] = useState(data.dates || false);
    // const [view, setView] = useState('menu');

    console.log(custom);


    const handleSubmit = () => {
        const data = {
            custom: custom,
            dates: dates,
        }
        submit('preview', data);
    }


    return (<>

        <h1 className="mb-3">Settings</h1>
        <div className="py-1">
            <div onClick={() => submit('dates')} className="position-relative">
                <div className="position-absolute top-50 end-0 translate-middle-y">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15.14" height="19.8" viewBox="0 0 15.14 19.8"><line x1="2" y1="2" x2="13.14" y2="9.8" fill="none" stroke="#000" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="4"/><line x1="2" y1="17.8" x2="13.14" y2="10" fill="none" stroke="#000" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="4"/></svg>
                </div>
                <h2 className="fs-5 w-75">Start & End Date</h2>
                {(dates.from && dates.to) && <p>{dates.from.toLocaleDateString()} - {dates.to.toLocaleDateString()}</p>}

            </div>
            <hr/>
        </div>
        <div className="py-1">
            <div className="position-relative">
                <div className="position-absolute top-50 end-0 translate-middle-y">
                    <Toggler onClick={() => toggleCustom(!custom)} init={custom}/>
                </div>
                <h2  className="fs-5 w-75">Custom options<br/><span className="fs-6">Users add options to poll</span></h2>
            </div>
            <hr/>
        </div>
        <div className="py-1">
            <div className="position-relative">
                <div className="position-absolute top-50 end-0 translate-middle-y">
                    <Toggler onClick={() => toggleResults(!results)} init={results}/>
                </div>
                <h2  className="fs-5 w-75">Hide Results<br/><span className="fs-6">Users can not view results</span></h2>
            </div>
            <hr/>
        </div>
        <div className="py-1">
            <div className="position-relative">
                <div className="position-absolute top-50 end-0 translate-middle-y">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15.14" height="19.8" viewBox="0 0 15.14 19.8"><line x1="2" y1="2" x2="13.14" y2="9.8" fill="none" stroke="#000" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="4"/><line x1="2" y1="17.8" x2="13.14" y2="10" fill="none" stroke="#000" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="4"/></svg>
                </div>
                <h2  className="fs-5 w-75">Customize Style <br/><span className="fs-6">Coming Soon!</span></h2>
            </div>
            <hr/>
        </div>
        <div className="py-1">
            <div className="position-relative">
                <div className="position-absolute top-50 end-0 translate-middle-y">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15.14" height="19.8" viewBox="0 0 15.14 19.8"><line x1="2" y1="2" x2="13.14" y2="9.8" fill="none" stroke="#000" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="4"/><line x1="2" y1="17.8" x2="13.14" y2="10" fill="none" stroke="#000" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="4"/></svg>
                </div>
                <h2  className="fs-5 w-75">Customize Security<br/><span className="fs-6">Coming Soon!</span></h2>
            </div>
            <hr/>
        </div>
        {/* <div className="py-3">
            <div className="position-relative">
                <div className="position-absolute top-50 end-0 translate-middle-y" >
                    <Toggler disabled={true}/>
                </div>
                <h2 className="fs-5 w-75">Redirect after complete <br/><span className="fs-6">(Coming Soon)</span></h2>
            </div>
            <hr/>
        </div> */}
        <Button variant="success" onClick={()=> handleSubmit()} className="position-fixed bottom-0 start-50 translate-middle-x mb-3 shadow">
                <svg className="" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25"><line x2="20.42" y2="12.5" x1="2.5" y1="12.5" fill="none" stroke="#fff" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="4"/><line x2="22.5" y2="12.5" x1="16.26" y1="7.7" fill="none" stroke="#fff" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="4"/><line x2="22.5" y2="12.5" x1="16.26" y1="17.3" fill="none" stroke="#fff" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="4"/></svg>
        </Button>
        <Button onClick={() => onBack('init')} className="position-fixed bottom-0 mb-3 shadow">
                    <svg className="rotate-180" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25"><line x1="4.58" y1="12.5" x2="22.5" y2="12.5" fill="none" stroke="#fff" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="4"/><line x1="2.5" y1="12.5" x2="8.74" y2="7.7" fill="none" stroke="#fff" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="4"/><line x1="2.5" y1="12.5" x2="8.74" y2="17.3" fill="none" stroke="#fff" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="4"/></svg>
        </Button>
    </>)
}

export default Settings;