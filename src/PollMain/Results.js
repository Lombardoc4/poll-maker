


const Results = ({data}) => {
    const optionArrays = Object.entries(data.options).sort((a,b) => b[1] - a[1])
    const totalVotes =  Object.values(data.options).reduce((sum, v) => sum + parseInt(v), 0);



    return (<div className="py-5 d-flex align-items-center flex-wrap">
        <h1 className="display-3">Standing Results</h1>
        <h2>{data.title}</h2>
        {optionArrays.map(([option, value], i) => {
            const percentage = Math.floor(value/totalVotes * 100)
            return (
                <div key={option} className='w-100 my-3'>
                    <div className="d-flex">
                        <p className="fs-3 mb-0 w-75">{option}</p>
                        <p className="ms-auto">{percentage > 0 ? percentage : 1}%</p>
                    </div>
                    <div className="bg-primary py-2 rounded-pill" style={{width: ((percentage > 0 ? percentage : 1) + '%')}}/>
                </div>
            )
        })}

        {/* TODO This is where redirect link will go */}
    </div>)
}

export default Results