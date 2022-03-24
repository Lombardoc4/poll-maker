import Button from "react-bootstrap/Button"
import Nav from "react-bootstrap/Nav"
import { Link } from "react-router-dom";
import useMobile from "../utils/isMobile";
import NavLayout from "./NavLayout"

const DashboardNav = () => {
    const isMobile = useMobile();
    const headerFS = isMobile ? 'display-1' : 'fs-1'
    return (
        <NavLayout color="primary" isMobile={isMobile}>
            <Nav className='h-100 p-3 container-md py-md-4'>
                <h1 className={'me-auto mt-3 my-md-0 ' + headerFS}>
                    <Link to="/" className="text-reset text-decoration-none">
                        Poll <br className="d-md-none"/>Maker
                    </Link>
                </h1>
                <div className='ms-md-auto my-auto d-flex flex-column'>
                    <Button className="m-2 shadow" variant="light">Log&nbsp;Out</Button>
                </div>
            </Nav>
        </NavLayout>
    )
}

export default DashboardNav