import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import useMobile from "../utils/isMobile";

const NavLayout = ({color = 'white', children, isMobile}) => {
    const [openNav, toggleNav] = useState(false);
    const bgColor = 'bg-' + color;
    const navVariant = color === 'white' ? 'light' : 'dark'
    const textColor = color !== 'white' ? 'text-white' : '';

    useEffect(() => {
        if (isMobile) {
            const nav = document.getElementById('basic-navbar-nav');
            nav.classList.remove('opacity-0', 'opacity-100');
            const opacity = openNav ? 'opacity-100' : 'opacity-0';
            nav.classList.add(opacity);
        }
    },[openNav])


    const height = isMobile ? 'h-100' : 'h-auto';
    const position = isMobile ? 'position-fixed' : '' ;

    return(
    <Navbar className={"py-md-0 top-0 end-0 flex-nowrap overflow-hidden col-md-9 " + bgColor + ' ' + textColor + ' ' + height + ' ' + position}
    expand="md"
    variant={navVariant}
    style={isMobile ? {width: openNav ? '75%' : '55px', zIndex: 1060} : {zIndex: 1060, width: '100%'}}>
        <Container fluid='md' className="h-100 px-0 flex-column ">

        <Navbar.Collapse id="basic-navbar-nav" className="w-100">
            {children}
        </Navbar.Collapse>
        <Navbar.Toggle aria-controls="basic-navbar-nav"
        onClick={() => toggleNav(!openNav)}
        className='border-0 shadow-none mt-auto w-100'/>
        </Container>
    </Navbar>
)};

export default NavLayout;