import { useEffect, useState } from "react";
import Navbar from "react-bootstrap/Navbar";

const NavLayout = ({color = 'white', children}) => {
    const [openNav, toggleNav] = useState(false);
    const bgColor = 'bg-' + color;
    const navVariant = color === 'white' ? 'light' : 'dark'
    const textColor = color !== 'white' ? 'text-white' : '';

    useEffect(() => {
        const nav = document.getElementById('basic-navbar-nav');
        nav.classList.remove('opacity-0', 'opacity-100');
        const opacity = openNav ? 'opacity-100' : 'opacity-0';
        nav.classList.add(opacity);
    },[openNav])

    return(
    <Navbar className={"position-fixed top-0 end-0 h-100 flex-nowrap flex-column overflow-hidden " + bgColor + ' ' + textColor}
    expand="md"
    variant={navVariant}
    style={{width: openNav ? '75%' : '55px'}}>
        <Navbar.Collapse id="basic-navbar-nav">
            {children}
        </Navbar.Collapse>
        <Navbar.Toggle aria-controls="basic-navbar-nav"
        onClick={() => toggleNav(!openNav)}
        className='border-0 shadow-none mt-auto w-100'/>
    </Navbar>
)};

export default NavLayout;