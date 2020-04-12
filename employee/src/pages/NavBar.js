import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => (
    <nav>
        <ul className="nav">
            <li>
                <Link to="/">View Schedule</Link>
            </li>
            <li>
                <Link to="/info">View Info</Link>
            </li>
            <li>
                <Link to="/TimeOff">Request Time Off</Link>
            </li>
            <li className="logout">
                <Link to="/">Log Out</Link>
            </li>
        </ul>
    </nav>
);

export default NavBar;