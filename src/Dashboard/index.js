import { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { Link, useNavigate } from "react-router-dom";
import AddSurvey from "../AddPoll";
import DashboardNav from "../Nav/DashboardNav";
import useMobile from "../utils/isMobile";

const BorderRow = ({poll}) => {
    return (
        <PollRow poll={poll} borderClasses={true}/>
    )

}

const PollRow = ({poll, borderClasses}) => {

    borderClasses = borderClasses ? 'border border-primary rounded ps-3' : '';
    // const isMobile = useMobile();
    return (
    <div className="col">
        <div className={"d-flex align-items-center flex-wrap " + (borderClasses)}>

        <div className="col-md-10 d-md-flex align-items-end">
            <div className="col-md-8 d-md-flex flex-wrap align-items-end">
                <p className="col-12 mb-0 fs-4 text-truncate">{poll.title}</p>
                {/* {!isMobile && <>
                    <div className="col-12   d-md-flex align-items-end">
                    Start And End Date?
                    </div>
                </>} */}
            </div>
            <p className="col-12 col-md-4 mt-auto mb-1 text-center">{Object.values(poll.options).reduce((sum, v) => sum + parseInt(v), 0)} Answers</p>
        </div>
            {/* <Link to={'./edit/'+poll.id.slice(0,8)} className="col-4 btn btn-white text-center fs-3">
                <i className="bi bi-pencil-square"></i>
            </Link>
            <Link to={'./results/'+poll.id.slice(0,8)} className="col-4 btn btn-white text-center fs-3">
                <i className="bi bi-list-ol"></i>
            </Link> */}
            {/* Todo Dropdown to pause/active false poll */}
            <Link to={'./edit/'+poll.id.slice(0,8)} className="btn btn-white text-center fs-3">
                <i className="bi bi-three-dots"></i>
            </Link>
        </div>
    </div>
)}

const PollGroup = ({polls, title, setView}) => {
    return (
        <div className="col-md-4 my-3 my-md-0">

        <div className="w-100 p-3 border border-primary rounded shadow">
            <h3 className="mb-2">{title}</h3>
            <hr/>
            {
                polls.map(p => <PollRow key={p.title} poll={p}/>)
            }
            <Button onClick={() => setView(title.toLowerCase())} variant="outline-primary" className="mt-3 w-100 text-decoration-underline">View All {title}</Button>
        </div>
        </div>

    )
}



const segments = ['Completed', 'Ongoing', 'Upcoming'];
const segmentLimit = 3;

const Dashboard = () => {
    const [view, setView] = useState('home');
    const navigator = useNavigate();

    const user = {
        name: 'Cris'
    }

    const data = [
        {   title: 'Poll 1',
            options: {'Test': 3, 'Test2': 1, 'Test3': 4},
            created_at: 'Mar 20, 2022',
            id: '3345fhg7',
        },
        {   title: 'Poll 2', //ongoing
            options: {'Lilac': 3, 'Tango2': 1, 'Rice3': 4},
            created_at: 'Mar 19, 2022',
            start_date: 'Mar 19, 2022',
            end_date: 'Mar 22, 2022',
            id: '33ddfhg7'
        },
        {   title: 'Poll 69', //ongoing
            options: {'Lilac': 3, 'Tango2': 1, 'Rice3': 4},
            created_at: 'Mar 19, 2022',
            start_date: 'Mar 19, 2022',
            end_date: 'Mar 22, 2022',
            id: '33ddghg8'

        },
        {   title: 'Poll 3', //completed
            options: {'Station': 3, 'TV2': 1, 'Bean3': 4},
            created_at: 'Mar 17, 2022',
            start_date: 'Mar 17, 2022',
            end_date: 'Mar 19, 2022',
            id: '443dfhg7'

        },
        {   title: 'Poll 4', //upcoming
            options: {'Wavelength': 3, 'Solar': 1, 'Philosophy': 4},
            created_at: 'Mar 20, 2022',
            start_date: 'Mar 22, 2022',
            end_date: 'Mar 30, 2022',
            id: '335566g7'
        }
    ];


    const today = new Date()
    // const tomorrow = new Date(today.setUTCHours(4,0,0,0)).setDate((today.getDate() + 1));
    const segmentPolls = {
        completed : data.filter(poll =>(today >= new Date(poll.end_date).getTime() )),
        ongoing : data.filter(poll =>((!poll.start_date && !poll.end_date) || (new Date(poll.start_date).getTime() <= today && today <= new Date(poll.end_date).getTime() ))),
        upcoming :data.filter(poll =>(new Date(poll.start_date).getTime() >= today))
    };

    // console.log(new Date(data[1].end_date).getTime() >= tomorrow)


    // Todo Check User is Logged in

    // Todo Fetch User Polls

    if (view === 'add') {
        return (
            <AddSurvey cancel={() => {navigator('/dashboard');setView('home')}} user={user}>
                <DashboardNav color="primary"/>
            </AddSurvey>
        )
    }
    return (
    <div className="position-relative col-9 w-md-100 ms-3 me-0 ms-sm-5 mx-md-auto py-3 py-md-0"
    style={{minHeight: window.innerHeight}}>
        <DashboardNav color="primary"/>
        <Container fluid='md'>

            <p className="display-3">Welcome {user.name}</p>
            <div className="d-flex">
                <Button onClick={(e) => {e.target.blur(); setView(view === 'home' ? 'all' : 'home')}} className="col col-md-3 me-1">{view === 'home' ? 'View All' : 'Home'}</Button>
                <Link to="./add" onClick={() => setView('add')} className="col col-md-3 ms-1 btn btn-success">
                    Add Poll
                </Link>
            </div>


            <div className="my-4">
                <h2 className="text-capitalize mb-1 fs-6">{view}</h2>
            </div>
            { view === 'all' && <div className="row row-cols-1 gx-5 gy-3 w-75"  >
                    {data.map(p => (
                        <BorderRow poll={p} key={p.title}/>
                        ))}
            </div>}


            { segments.includes(view.charAt(0).toUpperCase() + view.slice(1))  &&
                <div className="row row-cols-1 gx-5 gy-3 w-75">
                    {segmentPolls[view].map(p => <BorderRow key={p.title} poll={p}/>)}
                </div>
            }


            { view === 'home' &&
            <div className="row row-cols-1 g-3">
                {/* Completed (3), Ongoing (3), Upcoming(3) */}
                <PollGroup title='Completed' polls={segmentPolls.completed.slice(0, segmentLimit)} setView={setView}/>
                <PollGroup title='Ongoing' polls={segmentPolls.ongoing.slice(0, segmentLimit)}  setView={setView}/>
                <PollGroup title='Upcoming' polls={segmentPolls.upcoming.slice(0, segmentLimit)} setView={setView}/>
            </div>}
            </Container>
       </div>
    )
}

export default Dashboard;