import { useRef, useState } from "react";
import Button from "react-bootstrap/Button";


const CopyInput = ({value}) => {
    const [copied, setCopied] = useState(false);
    const copyRef = useRef(null);

    const copyToClipboard = (ref) => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(value)
        }
        const isIos = navigator.userAgent.match(/ipad|iphone/i);
        const { current } = ref;

        // select text
        if (isIos) {
            const range = document.createRange();
            range.selectNodeContents(current);
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
            current.setSelectionRange(0, 999999);
        } else {
            current.select();
        }

        // copy selection
        document.execCommand('copy');

        // cleanup
        current.focus();
    }

    const handleCopy = (ref) => {
        copyToClipboard(ref);
        setCopied(true)
        setTimeout(() => {
            setCopied(false);
        }, 4000)
    }
    return (
        <div className="d-flex align-items-center border-0 border-bottom ">
            <input ref={copyRef} className="font-monospace  border-0 bg-transparent outline-0 w-75 text-truncate" type="text" readOnly={true} value={value}/>
            <Button variant='white' onClick={() => handleCopy(copyRef)} className="py-0 mx-auto">
                <i className={"fs-5 bi " + (copied ? 'bi-clipboard2-check' : 'bi-clipboard2')}></i>
            </Button>
        </div>
    )
}

export default CopyInput;