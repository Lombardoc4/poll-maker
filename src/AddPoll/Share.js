import Button from "react-bootstrap/Button";
import CopyInput from "../components/CopyInput";


const Share = ({onBack, data}) => {

    const pollCode = data.edit_code || 'loading';
    const shareURL = 'https://localhost:3000/poll/' + data.shareId;
    const previewURL = '/preview/' + data.shareId;

    return (<>
        <h1>Share URL</h1>
        <CopyInput value={shareURL}/>

        <p className="fs-5 mt-4 mb-0">Edit your poll using this code</p>
        <CopyInput value={pollCode}/>

        <div className="d-flex align-items-center mt-4">
            <p className="mb-0 fs-5">Test Your Poll</p>
            {data && <a href={previewURL} target="_blank" rel="noopener noreferrer" className="w-50 ms-auto ">
                <Button variant="secondary" className="w-100 shadow ">Preview</Button>
            </a>}
        </div>
        <br/>
        <h2  className=" mt-4 ">Track Your Results</h2>
        <div className="d-flex mb-4 mb-md-5">
            <Button variant="success" onClick={() => onBack('settings')} className="me-2 shadow">Login</Button>
            <Button variant="primary" onClick={() => onBack('settings')} className="ms-2 shadow">Create Account</Button>
        </div>
        <Button onClick={() => onBack('settings')} className="position-relative start-0 bottom-0 mb-3 shadow">
            <svg className="rotate-180" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25"><line x1="4.58" y1="12.5" x2="22.5" y2="12.5" fill="none" stroke="#fff" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="4"/><line x1="2.5" y1="12.5" x2="8.74" y2="7.7" fill="none" stroke="#fff" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="4"/><line x1="2.5" y1="12.5" x2="8.74" y2="17.3" fill="none" stroke="#fff" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="4"/></svg>
        </Button>
    </>)
}

export default Share;