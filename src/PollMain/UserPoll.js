import { useState } from "react"
import Button from "react-bootstrap/Button"


const UserPoll = ({poll, selectState}) => {
    const [selected, setSelected] = selectState

    const handleClick = (o) => {
        const val = selected === o ? '' : o
        setSelected(val);
    }
    return (
        <div className="py-4">
            {Object.keys(poll.options).map(o => (
                <Button onClick={() => handleClick(o)}
                key={o}
                className={"w-100 mt-2 mb-3 text-start fs-3 shadow bg-gradient " + (selected === o ? 'bg-success' : '') }>
                    {o}
                </Button>
            ))}
        </div>
    )
}

export default UserPoll