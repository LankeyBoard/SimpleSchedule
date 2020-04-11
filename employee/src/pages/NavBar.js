import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => (
    <nav>
        <ul>
            <li>
                <Link to="/">View Schedule</Link>
            </li>
            <li>
                <Link to="/info">View Info</Link>
            </li>
            <li>
                <Link to="/TimeOff">Request Time Off</Link>
            </li>
        </ul>
    </nav>
);

export default NavBar;