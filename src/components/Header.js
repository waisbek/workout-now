import React from 'react'
import {
    Navbar,
    NavbarBrand
} from 'reactstrap';

const Header = () => {

    return (
        <Navbar color="light" light expand="md">
            <NavbarBrand href="/">WORKOUT NOW</NavbarBrand>
        </Navbar>
    )
}

export default Header