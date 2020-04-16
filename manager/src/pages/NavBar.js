import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => (
    <nav>
        <ul className="nav">
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/info">Create Schedule</Link>
            </li>
            <li>
                <Link to="/TimeOff">View Time Off Request</Link>
            </li>
            <li>
                <Link to="/TimeOff">Employee Info</Link>
            </li>
            <li className="logout">
                <Link to="/">Log Out</Link>
            </li>
        </ul>
    </nav>
);

export default NavBar;