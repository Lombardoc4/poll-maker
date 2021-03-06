import React, { useEffect, useState } from "react"
import Button from "react-bootstrap/Button";

const InitForm = ({cancel, submitForm, data}) => {
    // console.log('data', data);
    // Todo useRef instead or rerending on every type
    const [title, modTitle] = useState('');
    const [options, modOptions] = useState(['', '']);
    const [optionComponents, modOptionComp] = useState([]);

    useEffect(() => {
        if (data.title && data.options) {
            modTitle(data.title);
            modOptions(Object.keys(data.options))
        }
    }, [])
    
    useEffect(() => {
        let OptionInputs = [];
        while (OptionInputs.length < options.length) {
            OptionInputs.push(createOption(OptionInputs.length));
        }

        modOptionComp([...OptionInputs])
    }, [options.length])

    const createOption = (index) => {
        const title = 'Option ' + (index + 1);
        const Label = (
            <div className="d-flex">
                <label className="fs-5 mb-0" htmlFor={"Option" + index}>{title}</label>
                {index >= 2 && <i onClick={() => {options.splice(index, 1); modOptions([...options])}} className="ms-auto bi bi-x-circle-fill"></i>}
            </div>
        );

        return (
            <React.Fragment key={"Option" + index + 1}>
                {Label}
                <input
                    id={"Option" + index}
                    defaultValue={options[index]}
                    onChange={(e) => {options[index] = e.target.value; modOptions([...options]);}}
                    className="fs-5 bg-transparent overflow-hidden w-100 border-0 border-bottom outline-0 shadow-0 rounded-0 mb-4"
                    type='text'
                />
            </React.Fragment>
        )
    }


    const autoSize = (el) => {
        el.style.height = "1rem";
        el.style.height = (el.scrollHeight)+"px";
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        submitForm('settings', { title, options })
    }

    return (
        <form onSubmit={handleSubmit} className="w-md-100 mx-md-auto position-relative pb-5">
            <h1 className="opacity-0 user-select-none h-0">Your Question</h1>
            <label className="h1 mb-0" htmlFor="Question">Your Question</label>
            <textarea
                id="Question"
                rows='1'
                defaultValue={title}
                style={{resize: 'none', minHeight: '1rem'}}
                className="fs-5 bg-transparent overflow-hidden w-100 border-0 border-bottom outline-0 shadow-0 rounded-0 mb-4"
                onInput={(e) => {autoSize(e.target); modTitle(e.target.value)}}
            />
            {optionComponents}

            {optionComponents.length < 10 &&
                <p onClick={() => modOptions([...options, ''])}>
                    <i className="bi bi-plus-circle"></i>
                    <span className="fs-5 ms-2">Add Option</span>
                </p>
            }
            {/* TODO: Update to have only need the 2 options, and filter out on saving */}
            {(title.length > 6 && (options.filter(o => o.length > 0)).length === options.length) &&
            <Button variant="success" type="submit" className="position-absolute bottom-0 end-0 mb-md-0 shadow">
                <svg className="" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25"><line x2="20.42" y2="12.5" x1="2.5" y1="12.5" fill="none" stroke="#fff" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="4"/><line x2="22.5" y2="12.5" x1="16.26" y1="7.7" fill="none" stroke="#fff" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="4"/><line x2="22.5" y2="12.5" x1="16.26" y1="17.3" fill="none" stroke="#fff" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="4"/></svg>
            </Button>
            }

            <Button onClick={() => cancel()} className="position-absolute bottom-0  shadow">
                    <svg className="rotate-180" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25"><line x1="4.58" y1="12.5" x2="22.5" y2="12.5" fill="none" stroke="#fff" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="4"/><line x1="2.5" y1="12.5" x2="8.74" y2="7.7" fill="none" stroke="#fff" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="4"/><line x1="2.5" y1="12.5" x2="8.74" y2="17.3" fill="none" stroke="#fff" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="4"/></svg>
            </Button>
        </form>
    )
}

export default InitForm;